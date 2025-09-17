# Recharge Subscription Implementation Plan for Sunfruit

**Last Updated**: August 2025  
**Status**: Revised for Monthly Subscriptions (Phase 1)

## Overview
This document outlines the implementation plan for integrating Recharge subscription management into the Sunfruit e-commerce platform. The integration uses Shopify checkout with Recharge as an add-on, leveraging Recharge's hosted customer portal for subscription management.

## Phase 1: Monthly Subscriptions (Current Focus)

### Business Requirements
- **Frequency**: Monthly (pay-as-you-go)
- **Discount**: 15% off all orders
- **Product Availability**:
  - All products available as one-time purchase or subscription
  - Exception: Sample pack (one-time purchase only)
- **Minimum Commitment**: Soft 2-order minimum (retroactive charge if cancelled early)
- **Customer Features**:
  - Pause/skip deliveries (max 3 months)
  - Swap products (same price tier)
  - Add one-time purchases to subscription orders

### Phase 2: Quarterly Subscriptions (Future)
- Will add quarterly prepaid option with 25% discount after monthly is stable

### Branding Requirements
- **Primary Color**: #004E36 (Emerald Green)
- **Secondary Color**: #10B981
- **Fonts**: 
  - Headings: Poppins
  - Body: Geist
- **Portal Style**: Match existing site design system

## What We Know

### Confirmed Technical Details
1. **Recharge has a JavaScript SDK** (v1.45.0)
   - Available at: https://storefront.rechargepayments.com/client/
   - Supports both server and client-side implementations
   
2. **API Structure**
   - REST API: https://api.rechargeapps.com
   - Current version: 2021-11
   - Authentication: `X-Recharge-Access-Token` header
   
3. **Subscription Model**
   - Links to Shopify via `external_product_id` and `external_variant_id`
   - Supports address-based delivery management
   - Standard subscription operations (create, pause, skip, cancel)

4. **Integration Approach**
   - Shopify checkout handles payment processing
   - Recharge manages subscription lifecycle post-checkout
   - Customer portal hosted by Recharge

### Compatibility with Existing System
- **Next.js 15.1.6**: Compatible with App Router structure
- **Shopify Storefront API**: Works alongside existing Apollo Client setup
- **MongoDB**: No conflicts with Vine content system
- **Analytics**: Integrate with existing GA4, Clarity, and Klaviyo

## Critical Knowledge Gaps (RESOLVED)

### ✅ All Major Questions Answered:

1. **Shopify Selling Plan Integration (RESOLVED)**
   - Recharge works with Shopify's native selling plans
   - Selling plans are created in Shopify Admin or via API
   - Use the selling plan ID from Shopify when adding to cart
   - Recharge automatically syncs with Shopify selling plans

2. **Cart Line Item Format (RESOLVED)**
   - Exact format confirmed:
     ```javascript
     { 
       id: variantId, 
       quantity: 1, 
       selling_plan: sellingPlanId  // Use Shopify selling plan ID
     }
     ```
   - Use standard Shopify Ajax Cart API: `POST /cart/add.js`
   - No custom properties needed for basic subscriptions

3. **JavaScript SDK Usage (RESOLVED)**
   - SDK is designed for headless implementations
   - Authentication via Storefront Access Token (starts with `strfnt`)
   - Can run client-side safely in Next.js
   - NPM package: `@rechargeapps/storefront-client`

4. **Customer Portal Access (RESOLVED)**
   - Portal URL format: `https://checkout.sunfruit.com/tools/recurring/login/{customer-id}`
   - Recharge hosts the portal (no SSO token generation needed)
   - Can redirect customers directly to portal
   - Optional: Use SDK for custom subscription management UI

### Minor Remaining Questions:

1. **Portal Styling**
   - Can the hosted portal be fully customized to match our emerald green theme?

2. **Analytics Best Practices**
   - Recommended approach for tracking subscription events in GA4?

3. **Migration Process**
   - If we have existing subscriptions, what's the migration path?

## Revised Implementation Plan

### Ready to Build Now (All Questions Resolved)

#### 1. Complete Infrastructure
- ✅ Recharge SDK integration (`@rechargeapps/storefront-client`)
- ✅ Cart line item format confirmed
- ✅ Webhook endpoint implementation
- ✅ Customer portal redirect (direct URL)

#### 2. Full Implementation Path
- ✅ Install and configure Recharge app
- ✅ Set up all environment variables
- ✅ Build subscription selector with selling plans
- ✅ Implement add-to-cart with subscriptions
- ✅ Create subscription management UI

### No Longer Blocked
- ✅ Product page subscription selector (format confirmed)
- ✅ Add to cart functionality (use selling_plan property)
- ✅ Subscription status checking (SDK with storefront token)

## New Action Plan

### Phase 1: Immediate Actions (Can Do Now)

#### 1.1 Complete Shopify Domain Change
- [ ] Finish domain verification with Shopify support
- [x] Primary domain is checkout.sunfruit.com
- [ ] Update .env.local with new domain

#### 1.2 Install Recharge App
- [ ] Install from Shopify App Store
- [ ] Complete initial configuration
- [ ] Note any auto-created selling plans

#### 1.3 Set Up Development Infrastructure
- [ ] Create `/src/lib/recharge/` directory structure
- [ ] Add Recharge environment variables to .env.local
- [ ] Create webhook route placeholder
- [ ] Design subscription selector component UI

### Phase 2: After PM Response (Estimated 2-3 Days)

#### 2.1 Implement Subscription Selector
- [ ] Add subscription options to product page
- [ ] Implement cart line item formatting
- [ ] Test subscription add-to-cart flow

#### 2.2 Complete API Integration
- [ ] Finalize Recharge client library
- [ ] Implement webhook handlers
- [ ] Set up customer portal SSO

#### 2.3 Testing & Launch
- [ ] Test monthly subscription end-to-end
- [ ] Verify discount calculations
- [ ] Launch monthly subscriptions

### Phase 3: Future Enhancements
- [ ] Add quarterly prepaid subscriptions
- [ ] Implement advanced features (bundles, etc.)
- [ ] Optimize based on customer feedback


## Code Examples We Can Build Now

### 1. Recharge API Client Structure
```typescript
// src/lib/recharge/client.ts
export class RechargeClient {
  private apiKey: string;
  private apiUrl: string = 'https://api.rechargeapps.com';
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  
  // Portal redirect (can implement now)
  async getCustomerPortalUrl(customerId: string) {
    // Implementation pending PM response
  }
  
  // Webhook verification (can implement now)
  verifyWebhook(body: string, signature: string): boolean {
    // Standard HMAC verification
  }
}
```

### 2. Webhook Route Structure
```typescript
// src/app/api/recharge/webhooks/route.ts
export async function POST(request: Request) {
  // Ready to implement once we have webhook secret
}
```

### 3. Subscription Selector UI
```typescript
// src/components/SubscriptionSelector.tsx
// Can design the UI now, add functionality after PM response
interface SubscriptionOption {
  id: string;
  label: string;
  discount: number;
  frequency: 'one-time' | 'monthly';
}
```

### 4. Environment Variables
```env
# Add to .env.local when you get credentials
RECHARGE_API_KEY=
RECHARGE_WEBHOOK_SECRET=
RECHARGE_STOREFRONT_TOKEN=
```

## Summary

### Ready to Build
1. Basic file structure and TypeScript types
2. UI components (without cart functionality)
3. Webhook endpoint structure
4. Customer portal redirect page
5. Analytics tracking setup

### Blocked on PM Response
1. Adding subscriptions to cart
2. Fetching available subscription options
3. SDK authentication and usage
4. Actual API implementation

### Next Steps
1. Complete Shopify domain change
2. Install Recharge app
3. Send questions to Recharge PM
4. Build what we can while waiting
5. Complete integration once we have answers