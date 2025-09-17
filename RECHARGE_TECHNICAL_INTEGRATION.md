# Recharge Technical Integration Guide for Sunfruit

**Last Updated**: January 2025  
**Status**: Phase 1 Complete - UI/UX & Cart Integration ✅  

## Overview
This document provides the comprehensive technical implementation details for integrating Recharge subscriptions into the Sunfruit Next.js e-commerce platform based on the latest Recharge documentation and SDK resources.

## Key Integration Clarifications

### 1. Cart Line Item Format (RESOLVED)
The exact format for adding subscription items to Shopify cart with Recharge:

```javascript
// Required format for subscription items
{
  "id": variant_id,        // Shopify variant ID
  "quantity": qty,         // Quantity
  "selling_plan": selling_plan_id  // Shopify selling plan ID
}
```

**Example Implementation:**
```typescript
// src/lib/shopify/cart.ts
export async function addSubscriptionToCart(
  variantId: string, 
  quantity: number, 
  sellingPlanId: string
) {
  const response = await fetch('/cart/add.js', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      items: [{
        id: variantId,
        quantity: quantity,
        selling_plan: sellingPlanId
      }]
    })
  });
  return response.json();
}
```

### 2. Selling Plan Integration (RESOLVED)
- Recharge works with Shopify's native selling plans
- Selling plans are created in Shopify Admin or via API
- Recharge syncs with these selling plans automatically
- Access selling plans via Shopify Storefront API:

```graphql
query getProductWithSellingPlans($handle: String!) {
  product(handle: $handle) {
    sellingPlanGroups(first: 10) {
      edges {
        node {
          name
          sellingPlans(first: 10) {
            edges {
              node {
                id
                name
                priceAdjustments {
                  adjustmentValue {
                    ... on SellingPlanPercentagePriceAdjustment {
                      adjustmentPercentage
                    }
                  }
                }
                deliveryPolicy {
                  ... on SellingPlanRecurringDeliveryPolicy {
                    interval
                    intervalCount
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### 3. JavaScript SDK Implementation (RESOLVED)

#### Installation
```bash
npm install @rechargeapps/storefront-client
```

#### Initialization for Next.js
```typescript
// src/lib/recharge/client.ts
import { initRecharge, loginShopifyAppProxy } from '@rechargeapps/storefront-client';

export function initializeRecharge() {
  initRecharge({
    storeIdentifier: 'checkout.sunfruit.com',
    storefrontAccessToken: process.env.NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN,
    appName: 'Sunfruit',
    appVersion: '1.0.0',
    loginRetryFn: async () => {
      // Handle session refresh if needed
      const session = await loginShopifyAppProxy();
      return session;
    },
  });
}
```

#### Environment Variables
```env
# .env.local
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=checkout.sunfruit.com
NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN=strfnt_xxxxxxxxxx
RECHARGE_API_KEY=sk_xxxxxxxxxx
RECHARGE_WEBHOOK_SECRET=xxxxxxxxxx
```

### 4. Customer Portal Access (RESOLVED)

The Recharge customer portal is hosted by Recharge. Access is provided via:

```typescript
// src/lib/recharge/portal.ts
export async function getCustomerPortalUrl(customerId: string): Promise<string> {
  // Option 1: Direct portal URL (if customer is already authenticated)
  return `https://checkout.sunfruit.com/tools/recurring/login/${customerId}`;
  
  // Option 2: Use SDK method (requires authentication)
  // const session = await getRechargeSession();
  // return session.portalUrl;
}
```

## Complete Implementation Architecture

### 1. Project Structure
```
src/
├── lib/
│   └── recharge/
│       ├── client.ts          # SDK initialization
│       ├── types.ts           # TypeScript types
│       ├── api.ts             # API helper functions
│       ├── webhooks.ts        # Webhook handlers
│       └── portal.ts          # Customer portal utilities
├── app/
│   └── api/
│       └── recharge/
│           └── webhooks/
│               └── route.ts   # Webhook endpoint
└── components/
    └── subscription/
        ├── SubscriptionSelector.tsx
        ├── SubscriptionManager.tsx
        └── PortalRedirect.tsx
```

### 2. TypeScript Types
```typescript
// src/lib/recharge/types.ts
export interface RechargeSubscription {
  id: string;
  customer_id: string;
  product_id: string;
  variant_id: string;
  status: 'active' | 'cancelled' | 'paused';
  frequency: number;
  frequency_unit: 'month' | 'week' | 'day';
  next_charge_date: string;
  price: string;
  quantity: number;
}

export interface RechargeSellingPlan {
  id: string;
  name: string;
  discount_percentage: number;
  frequency: string;
  delivery_interval: number;
  delivery_interval_unit: string;
}
```

### 3. Enhanced Subscription Selector Component
```typescript
// src/components/subscription/SubscriptionSelector.tsx
import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

interface SubscriptionSelectorProps {
  product: any;
  selectedVariant: any;
  onSelectionChange: (sellingPlanId: string | null) => void;
}

export function SubscriptionSelector({ 
  product, 
  selectedVariant, 
  onSelectionChange 
}: SubscriptionSelectorProps) {
  const [selectedOption, setSelectedOption] = useState<'one-time' | 'subscription'>('one-time');
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const sellingPlanGroup = product.sellingPlanGroups?.edges?.[0]?.node;
  const sellingPlans = sellingPlanGroup?.sellingPlans?.edges || [];

  const handleOptionChange = (option: 'one-time' | 'subscription') => {
    setSelectedOption(option);
    if (option === 'one-time') {
      setSelectedPlan(null);
      onSelectionChange(null);
    } else if (sellingPlans.length === 1) {
      // Auto-select if only one plan
      const planId = sellingPlans[0].node.id;
      setSelectedPlan(planId);
      onSelectionChange(planId);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-900">Purchase Options</h3>
      <RadioGroup value={selectedOption} onChange={handleOptionChange} className="mt-4">
        <div className="grid gap-3">
          {/* One-time purchase option */}
          <RadioGroup.Option
            value="one-time"
            className={({ checked }) => `
              relative rounded-lg border p-4 cursor-pointer
              ${checked ? 'border-emerald-600 ring-2 ring-emerald-600' : 'border-gray-300'}
            `}
          >
            {({ checked }) => (
              <div className="flex items-center">
                <div className="flex-1">
                  <RadioGroup.Label className="font-medium text-gray-900">
                    One-time purchase
                  </RadioGroup.Label>
                  <RadioGroup.Description className="text-sm text-gray-500">
                    ${selectedVariant?.price?.amount || '0.00'}
                  </RadioGroup.Description>
                </div>
                {checked && <CheckCircleIcon className="h-5 w-5 text-emerald-600" />}
              </div>
            )}
          </RadioGroup.Option>

          {/* Subscription option */}
          {sellingPlans.length > 0 && (
            <RadioGroup.Option
              value="subscription"
              className={({ checked }) => `
                relative rounded-lg border p-4 cursor-pointer
                ${checked ? 'border-emerald-600 ring-2 ring-emerald-600' : 'border-gray-300'}
              `}
            >
              {({ checked }) => (
                <div>
                  <div className="flex items-center">
                    <div className="flex-1">
                      <RadioGroup.Label className="font-medium text-gray-900">
                        Subscribe & Save 15%
                      </RadioGroup.Label>
                      <RadioGroup.Description className="text-sm text-gray-500">
                        ${(parseFloat(selectedVariant?.price?.amount) * 0.85).toFixed(2)} / month
                      </RadioGroup.Description>
                    </div>
                    {checked && <CheckCircleIcon className="h-5 w-5 text-emerald-600" />}
                  </div>
                  
                  {/* Frequency selector if multiple plans */}
                  {checked && sellingPlans.length > 1 && (
                    <div className="mt-4">
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300"
                        value={selectedPlan || ''}
                        onChange={(e) => {
                          setSelectedPlan(e.target.value);
                          onSelectionChange(e.target.value);
                        }}
                      >
                        <option value="">Select delivery frequency</option>
                        {sellingPlans.map(({ node: plan }) => (
                          <option key={plan.id} value={plan.id}>
                            {plan.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </RadioGroup.Option>
          )}
        </div>
      </RadioGroup>
    </div>
  );
}
```

### 4. Add to Cart Implementation
```typescript
// src/components/product/EnhancedProductForm.tsx
import { addToCart } from '@/lib/shopify';

export function EnhancedProductForm({ product, selectedVariant }) {
  const [selectedSellingPlan, setSelectedSellingPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      const variantId = selectedVariant.id;
      
      // Build the cart line item
      const cartItem = {
        id: variantId,
        quantity: 1,
        ...(selectedSellingPlan && { selling_plan: selectedSellingPlan })
      };

      // Add to cart using Shopify Ajax API
      await addToCart([cartItem]);
      
      // Show success notification
      toast.success('Added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); handleAddToCart(); }}>
      <SubscriptionSelector
        product={product}
        selectedVariant={selectedVariant}
        onSelectionChange={setSelectedSellingPlan}
      />
      
      <button
        type="submit"
        disabled={isLoading}
        className="mt-6 w-full bg-emerald-600 text-white py-3 px-8 rounded-md hover:bg-emerald-700 disabled:opacity-50"
      >
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </button>
    </form>
  );
}
```

### 5. Webhook Handler
```typescript
// src/app/api/recharge/webhooks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('X-Recharge-Hmac-Sha256');
  
  // Verify webhook signature
  const hash = crypto
    .createHmac('sha256', process.env.RECHARGE_WEBHOOK_SECRET!)
    .update(body, 'utf8')
    .digest('base64');
    
  if (hash !== signature) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const data = JSON.parse(body);
  const topic = request.headers.get('X-Recharge-Topic');
  
  // Handle different webhook topics
  switch (topic) {
    case 'subscription/created':
      await handleSubscriptionCreated(data);
      break;
    case 'subscription/cancelled':
      await handleSubscriptionCancelled(data);
      break;
    case 'subscription/updated':
      await handleSubscriptionUpdated(data);
      break;
    default:
      console.log(`Unhandled webhook topic: ${topic}`);
  }
  
  return NextResponse.json({ received: true });
}
```

### 6. Customer Portal Integration
```typescript
// src/app/account/subscriptions/page.tsx
import { redirect } from 'next/navigation';
import { getCustomer } from '@/lib/shopify';
import { getCustomerPortalUrl } from '@/lib/recharge/portal';

export default async function SubscriptionsPage() {
  const customer = await getCustomer();
  
  if (!customer) {
    redirect('/account/login');
  }
  
  // Option 1: Iframe embed (not recommended)
  // Option 2: Redirect to Recharge portal
  const portalUrl = await getCustomerPortalUrl(customer.id);
  redirect(portalUrl);
  
  // Option 3: Build custom UI using SDK
  // return <SubscriptionManager customerId={customer.id} />;
}
```

### 7. SDK Usage for Subscription Management
```typescript
// src/lib/recharge/api.ts
import { 
  listSubscriptions, 
  pauseSubscription, 
  cancelSubscription,
  updateSubscriptionFrequency 
} from '@rechargeapps/storefront-client';

export async function getCustomerSubscriptions(session: any) {
  const subscriptions = await listSubscriptions(session, {
    limit: 50,
    sort_by: 'created_at-desc'
  });
  
  return subscriptions;
}

export async function pauseCustomerSubscription(
  session: any, 
  subscriptionId: string, 
  pauseDate: string
) {
  return await pauseSubscription(session, subscriptionId, {
    pause_date: pauseDate
  });
}
```

## Selling Plan IDs (Current Configuration)

### Important Note
Currently there are two different selling plan groups due to duplicate creation. Your Recharge rep is working to consolidate these.

#### Blueberry Lavender Product
- **Plan ID**: 19756679
- **External Plan Group ID**: 4112777423  
- **External Plan ID**: 7290421455

#### Other Products (Raspberry Hibiscus, etc.)
- **Plan ID**: 19586732
- **External Plan Group ID**: 4110942415
- **External Plan ID**: 7288422607

### For Testing
Use the Raspberry Hibiscus plan ID (`19586732`) for initial testing since it represents the majority of products. Once your Recharge rep consolidates the plans, update all products to use the same plan ID.

## Implementation Checklist

### Prerequisites
- [x] Shopify domain verified (checkout.sunfruit.com)
- [x] Recharge app installed from Shopify App Store
- [ ] API tokens generated in Recharge merchant portal
- [x] Selling plans created in Shopify Admin (need consolidation)
- [ ] Environment variables configured

### Development Tasks
1. [ ] Install Recharge JavaScript SDK
2. [ ] Create recharge directory structure
3. [ ] Implement SDK initialization
4. [ ] Update SubscriptionSelector component
5. [ ] Modify cart add functionality
6. [ ] Create webhook endpoint
7. [ ] Set up customer portal redirect
8. [ ] Add subscription management UI
9. [ ] Configure analytics tracking
10. [ ] Test end-to-end flow

### Testing Checklist
- [ ] Product page displays subscription options
- [ ] Correct discount applied (15%)
- [ ] Subscription adds to cart with selling plan
- [ ] Checkout completes successfully
- [ ] Customer can access portal
- [ ] Webhooks process correctly
- [ ] Subscription appears in customer account

## Remaining Questions (Minor)

1. **Portal Customization**: Can we style the Recharge hosted portal to match our brand exactly?
2. **Analytics Integration**: Best practices for tracking subscription events in GA4?
3. **Migration**: If we have existing subscriptions, what's the migration process?

## Next Steps

1. Complete prerequisites (domain verification, app installation)
2. Generate API tokens and configure environment
3. Implement core subscription selector functionality
4. Test with a single product before rolling out site-wide
5. Monitor performance and gather customer feedback

## Resources

- [Recharge JavaScript SDK Docs](https://storefront.rechargepayments.com/client/docs/)
- [Shopify Ajax Cart API](https://shopify.dev/docs/api/ajax/reference/cart)
- [Recharge Webhooks Guide](https://docs.getrecharge.com/docs/webhooks)
- [SDK Example Theme](https://github.com/ReChargePayments/SDK-Example-Theme)