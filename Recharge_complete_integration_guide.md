# Recharge Customer Portal Integration - Complete Guide for Sunfruit

**Last Updated**: September 2025  
**Status**: Ready for Customer Portal Implementation ✅

## Table of Contents

1. [Overview](#overview)
2. [Current Status & Context](#current-status--context)
3. [Business Requirements](#business-requirements)
4. [Technical Architecture](#technical-architecture)
5. [Prerequisites & Setup](#prerequisites--setup)
6. [Recharge Merchant Portal Configuration](#recharge-merchant-portal-configuration)
7. [Environment Variables & Tokens](#environment-variables--tokens)
8. [Implementation Approaches](#implementation-approaches)
9. [Complete Implementation Code](#complete-implementation-code)
10. [Performance Optimization](#performance-optimization)
11. [Testing & Validation](#testing--validation)
12. [Deployment & Monitoring](#deployment--monitoring)
13. [Timeline & Action Plan](#timeline--action-plan)
14. [Troubleshooting & Support](#troubleshooting--support)
15. [Migration & Future Considerations](#migration--future-considerations)
16. [Resources & Documentation](#resources--documentation)

## Overview

This comprehensive guide provides everything needed to implement direct integration between your Sunfruit Next.js application and the Recharge customer portal, bypassing Shopify's customer account system entirely.

### Key Integration Points
- **Customer Creation**: Through Shopify checkout → automatically synced to Recharge
- **Portal Access**: Direct from your Next.js site → no Shopify login required  
- **Portal Hosting**: On Recharge infrastructure (not embedded)
- **Authentication**: Email-based verification without Shopify accounts

### Important Requirements
- **Recharge Pro plan or higher** required for JavaScript SDK access
- **CORS Note**: The Recharge API does not support CORS for direct browser calls, but the Storefront API with SDK does
- **Customer Dependency**: Customers will never exist in Recharge without ever using Shopify

### Integration Flow
```
Customer Purchase → Shopify Checkout → Recharge Sync → Customer Exists in Both Systems
                                                          ↓
Next.js Site → Email Entry → Authentication → Recharge Portal Access
```

### What NOT to Use (Failed Approaches)
These approaches have been tested and failed:
- ❌ Manual URL construction attempts
- ❌ Direct API calls to `/portal_sessions` endpoint (returns 404)
- ❌ Hardcoded redirects without authentication (blank pages)
- ❌ `loginShopifyAppProxy()` - Requires Shopify authentication
- ❌ Iframe embedding - CSP blocks cross-origin frames
- ❌ Files to remove if they exist:
  - `src/types/recharge.d.ts` (conflicting types)
  - `src/lib/recharge/` (failed SDK implementations)
  - `src/app/api/recharge/` (non-working routes)

## Current Status & Context

### ✅ What's Complete
- **Recharge App**: Installed and configured
- **Selling Plans**: Created and active
- **Environment Variables**: 
  - `NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN`: strfnt_8c0ad3ff...
  - `RECHARGE_API_KEY`: sk_2x2_32a12613...
  - Domain: checkout.sunfruit.com
- **Product Integration**: Subscription selector on product pages
- **Cart Functionality**: Subscription items adding correctly
- **Checkout Flow**: Through Shopify with Recharge integration
- **Customer Sync**: Automatic from Shopify to Recharge

### 🎯 What's Needed
- Direct customer portal access from Next.js site
- Bypass Shopify customer accounts completely
- Seamless authentication to Recharge-hosted portal

### Current Selling Plan Configuration

#### Product-Specific Plan IDs
- **Lemon Mint**: `gid://shopify/SellingPlan/7288389839`
- **Raspberry Hibiscus**: `gid://shopify/SellingPlan/7288422607`
- **Grapefruit Ginger**: `gid://shopify/SellingPlan/7288455375`
- **Blueberry Lavender**: `gid://shopify/SellingPlan/7290421455`

#### Recharge Portal Configuration
- **Portal Location**: Hosted by Recharge
- **Passwordless Login**: Enabled (email + SMS optional)
- **Domain**: sunfruit.rechargepayments.com
- **Whitelist**: sunfruit.com added
- **Customer Sync**: Automatic from Shopify

## Business Requirements

### Subscription Configuration
- **Frequency**: Monthly (pay-as-you-go)
- **Discount**: 15% off all subscription orders
- **Product Availability**: All products except sample pack
- **Minimum Commitment**: Soft 2-order minimum
  - Retroactive charge if cancelled before 2 orders complete
  - Charged difference between subscription and regular price
  - Applied automatically by Recharge
- **Future Phase 2**: Quarterly prepaid subscriptions with 25% discount (after monthly is stable)

### Portal Features Available to Customers
- Pause/skip deliveries (max 3 months)
- Swap products (same price tier)
- Add one-time purchases to subscription orders
- Update payment methods
- Change shipping address
- Modify delivery schedule
- Cancel subscription

### Customer Journey
1. Customer purchases subscription through Shopify checkout
2. Customer data automatically syncs to Recharge
3. Customer accesses portal directly from your site (no Shopify login)
4. Customer manages subscription on Recharge-hosted portal

### Branding Requirements
- **Primary Color**: #004E36 (Emerald Green)
- **Secondary Color**: #10B981
- **Fonts**: Headings: Poppins, Body: Geist
- **Portal Style**: Match existing site design system

## Technical Architecture

### Data Flow Architecture
```
1. Customer Creation:
   Shopify Checkout → Webhook → Recharge Database
   
2. Portal Access:
   Next.js → Email Input → Recharge Auth → Portal URL → Redirect
   
3. Session Management:
   Client-Side Token → Recharge API → Authenticated Session (55 minutes)
```

### Integration Points
- **Shopify**: Customer creation and checkout
- **Recharge SDK/API**: Authentication and portal access
- **Next.js**: Frontend interface and API routes
- **Recharge Portal**: Hosted subscription management

### Subscription Status Types
- `active` - Currently active subscription
- `cancelled` - Cancelled by customer
- `expired` - Payment failed or expired
- `paused` - Temporarily paused by customer

## Prerequisites & Setup

### Technical Requirements
- Next.js 13+ with App Router
- Node.js 16+
- TypeScript support (optional but recommended)
- SSL certificate (HTTPS required)
- **Recharge Pro plan or higher** (required for JavaScript SDK access)

### Recharge Account Requirements
- Active merchant account
- Customer portal enabled
- Passwordless login configured
- Customers must have:
  - Valid email addresses in Recharge
  - Phone numbers with proper +1 country code format (if using SMS)
  - Active subscriptions or purchase history

### SMS Delivery Limitations
- **SMS only works for US/Canada numbers with +1 country code**
- International numbers will **only** receive email codes
- Configure appropriately based on customer base

### Required Permissions
- Storefront API token with customer/subscription access
- Admin API token for server-side operations
- Domain whitelisted in Recharge settings

## Recharge Merchant Portal Configuration

### Step 1: Enable Passwordless Login
1. Log into Recharge merchant portal
2. Navigate to **Storefront** → **Customer portal**
3. Locate **Customer portal login** section
4. Enable **Customer portal passwordless login**
5. Configure delivery method:
   - **Email only** (recommended for widest compatibility)
   - **SMS only** (US/Canada +1 numbers only)
   - **Both email and SMS**

### Step 2: Configure Portal Settings
1. Set portal branding to match your site
2. Configure subscription management options
3. Set up cancellation flow and retention offers
4. Enable/disable specific portal features

### Step 3: Domain Configuration
1. Add your domain to whitelist: sunfruit.com
2. Note your portal URL: https://sunfruit.rechargepayments.com
3. Configure CORS if needed

### Step 4: Webhook Configuration
1. Navigate to **Webhooks** in Recharge admin
2. Add endpoint: `https://sunfruit.com/api/recharge/webhooks`
3. Select events to monitor:
   - subscription/created
   - subscription/updated
   - subscription/cancelled
   - order/created

## Environment Variables & Tokens

### Required Environment Variables
```bash
# .env.local
NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN=strfnt_8c0ad3ff... # For client-side SDK
RECHARGE_API_KEY=sk_2x2_32a12613...                      # For server-side API
NEXT_PUBLIC_RECHARGE_DOMAIN=sunfruit.rechargepayments.com # Portal domain
RECHARGE_WEBHOOK_SECRET=whsec_xxxxx                      # For webhook verification
NEXT_PUBLIC_BASE_URL=https://sunfruit.com                # Your site URL
NODE_ENV=development                                      # Environment
```

### Alternative Portal URL Formats
- Current format: `https://sunfruit.rechargepayments.com/portal/[session]`
- Legacy format: `https://checkout.sunfruit.com/tools/recurring/login/{customer-id}`

### Token Creation Process

#### Storefront Token (Client-Side)
1. Go to **Tools & apps** → **API tokens** in Recharge
2. Click **Create new** in **Storefront token** section
3. Configure:
   - **Name**: "Next.js Portal Integration"
   - **Read customers**: Yes
   - **Read subscriptions**: Yes
   - **Write subscriptions**: Yes
4. Save token (starts with `strfnt_`)

#### Admin API Token (Server-Side)
1. Create new **Admin token**
2. Grant full access for portal sessions
3. Save token (starts with `sk_`)
4. Keep secure - never expose client-side

## Implementation Approaches

### Two Viable Options

#### Option 1: Passwordless Authentication (Recommended)
**How it works:**
1. Customer enters email
2. Recharge sends 4-digit code
3. Customer enters code
4. System validates and redirects to portal

**Pros:**
- Official SDK support
- Simple implementation
- Customer-friendly UX
- No server-side code required

**Cons:**
- Requires email verification each session
- Depends on email delivery
- Code expires after 10 minutes

#### Option 2: Server-Side Portal Sessions (Fallback)
**How it works:**
1. Customer enters email
2. Server finds customer in Recharge
3. Server creates portal session
4. Customer redirected to authenticated portal

**Pros:**
- Instant access (no code required)
- More control over flow
- Can implement custom logic
- Works as fallback if SDK fails

**Cons:**
- Requires server-side implementation
- Exposes API key to server
- More complex error handling

### Portal Destination Options
The `page_destination` parameter accepts:
- `'overview'` - Main portal page
- `'subscriptions'` - Subscription list
- `'billing'` - Payment methods
- `'delivery'` - Delivery schedule
- `'orders'` - Order history
- `'profile'` - Account settings

## Complete Implementation Code

### Directory Structure
```
src/
  lib/
    recharge/
      config.ts          # SDK configuration
      auth.ts           # Authentication logic
      client.ts         # API client
      types.ts          # TypeScript types
      errors.ts         # Error handling
      session.ts        # Session management
  hooks/
    useRechargeAuth.ts  # React hook for auth
    useRechargePortal.ts # Portal access hook
  components/
    account/
      RechargePortalAccess.tsx  # Main portal component
      EnhancedPortalAccess.tsx  # With customer display
      ServerPortalAccess.tsx    # Server-side fallback
      SessionMonitor.tsx        # Session countdown
  app/
    api/
      recharge/
        portal/
          route.ts      # Server-side portal creation
        webhooks/
          route.ts      # Webhook handler
    account/
      page.tsx          # Account page integration
  utils/
    analytics/
      recharge.ts       # Analytics tracking
    validateSetup.ts    # Setup validation

```

### 1. Install Dependencies
```bash
# NPM
npm install @rechargeapps/storefront-client

# Yarn
yarn add @rechargeapps/storefront-client

# Alternative: Load via CDN in your layout
<script src="https://checkout.rechargeapps.com/storefront/recharge-sdk.min.js"></script>
```

### 2. TypeScript Types
```typescript
// lib/recharge/types.ts
export interface RechargeSession {
  token: string;
  customer_id: string;
  expires_at: string;
}

export interface PortalAccess {
  portal_url: string;
  expires_at: string;
}

export interface RechargeCustomer {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  has_valid_payment_method: boolean;
  subscriptions_count: number;
}

export interface RechargeError {
  code: string;
  message: string;
  status?: number;
  errors?: {
    email?: string[];
    subscription?: string[];
  };
}

export interface SubscriptionStatus {
  status: 'active' | 'cancelled' | 'expired' | 'paused';
}

// Global type declarations
declare global {
  interface Window {
    recharge: any;
    gtag: any;
    _learnq: any; // Klaviyo
  }
}
```

### 3. SDK Configuration
```typescript
// lib/recharge/config.ts
export const rechargeConfig = {
  storeIdentifier: process.env.NEXT_PUBLIC_RECHARGE_DOMAIN!,
  storefrontAccessToken: process.env.NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN!,
  appName: 'Sunfruit Customer Portal',
  appVersion: '1.0.0',
  loginRetryFn: async () => {
    // Handle session refresh if needed
    const storedSession = localStorage.getItem('rechargeSession');
    if (storedSession) {
      return JSON.parse(storedSession);
    }
    return null;
  }
};

// Initialize SDK (call in layout or _app)
import { initRecharge } from '@rechargeapps/storefront-client';

export function initializeRecharge() {
  if (typeof window !== 'undefined') {
    initRecharge(rechargeConfig);
  }
}

// App Router implementation (app/layout.tsx)
// Note: Requires 'use client' directive
'use client';
import { useEffect } from 'react';
import { initializeRecharge } from '@/lib/recharge/config';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeRecharge();
  }, []);

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// Environment-specific configuration
export const environmentConfig = {
  development: {
    logLevel: 'debug',
    enableDebugTools: true,
    sessionDuration: 55 * 60 * 1000, // 55 minutes
  },
  staging: {
    logLevel: 'warn',
    enableDebugTools: true,
    sessionDuration: 55 * 60 * 1000,
  },
  production: {
    logLevel: 'error',
    enableDebugTools: false,
    sessionDuration: 55 * 60 * 1000,
  }
}[process.env.NODE_ENV || 'development'];
```

### 4. Session Storage Utilities
```typescript
// lib/recharge/session.ts
const SESSION_KEY = 'rechargeSession';
const SESSION_DURATION = 55 * 60 * 1000; // 55 minutes in milliseconds

export function saveSession(session: any) {
  try {
    const sessionWithExpiration = {
      ...session,
      expiresAt: Date.now() + SESSION_DURATION,
      savedAt: Date.now()
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionWithExpiration));
    return sessionWithExpiration;
  } catch (error) {
    console.error('Failed to save session:', error);
    return null;
  }
}

export function loadSession() {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    
    const session = JSON.parse(stored);
    
    // Check if session is expired
    if (session.expiresAt && Date.now() > session.expiresAt) {
      clearSession();
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Failed to load session:', error);
    clearSession();
    return null;
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear session:', error);
  }
}

export function isSessionValid(session: any) {
  if (!session || !session.expiresAt) return false;
  return Date.now() < session.expiresAt;
}

export function getSessionTimeRemaining(session: any) {
  if (!session || !session.expiresAt) return 0;
  return Math.max(0, session.expiresAt - Date.now());
}

export function formatTimeRemaining(milliseconds: number) {
  const minutes = Math.floor(milliseconds / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
```

### 5. Authentication Logic
```typescript
// lib/recharge/auth.ts
import { 
  sendPasswordlessCode, 
  validatePasswordlessCode,
  getCustomerPortalAccess,
  getCustomer,
  listSubscriptions
} from '@rechargeapps/storefront-client';

export class RechargeAuth {
  async sendVerificationCode(email: string) {
    try {
      const response = await sendPasswordlessCode(email, {
        send_email: true,
        send_sms: false // Set to true if SMS enabled
      });
      return response.session_token;
    } catch (error) {
      console.error('Failed to send code:', error);
      throw new Error('Failed to send verification code');
    }
  }

  async validateCodeAndGetPortal(
    email: string, 
    sessionToken: string, 
    code: string,
    pageDestination: string = 'overview'
  ) {
    try {
      // Validate the code
      const session = await validatePasswordlessCode(email, sessionToken, code);
      
      // Get portal access URL with specific destination
      // Options: 'overview', 'subscriptions', 'billing', 'delivery', 'orders', 'profile'
      const portalAccess = await getCustomerPortalAccess(session, {
        page_destination: pageDestination
      });
      
      // Note: Portal URLs have expiration times
      console.log('Portal URL expires at:', portalAccess.expires_at);
      
      return portalAccess.portal_url;
    } catch (error) {
      console.error('Validation failed:', error);
      throw new Error('Invalid verification code');
    }
  }

  async getCustomerData(session: any) {
    try {
      const customerData = await getCustomer(session);
      const subscriptionsData = await listSubscriptions(session, {
        limit: 50,
        sort_by: 'created_at-desc'
      });
      
      return {
        customer: customerData,
        subscriptions: subscriptionsData.subscriptions || []
      };
    } catch (error) {
      console.error('Failed to get customer data:', error);
      throw error;
    }
  }
}
```

### 6. Session Monitor Component
```typescript
// components/SessionMonitor.tsx
import { useState, useEffect } from 'react';
import { getSessionTimeRemaining, formatTimeRemaining } from '@/lib/recharge/session';

export default function SessionMonitor({ 
  session, 
  onSessionExpiring, 
  onSessionExpired 
}: {
  session: any;
  onSessionExpiring?: (remaining: number) => void;
  onSessionExpired?: () => void;
}) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    if (!session) {
      setTimeRemaining(0);
      setShowWarning(false);
      return;
    }

    const interval = setInterval(() => {
      const remaining = getSessionTimeRemaining(session);
      setTimeRemaining(remaining);

      // Show warning when 5 minutes remain
      const fiveMinutes = 5 * 60 * 1000;
      if (remaining <= fiveMinutes && remaining > 0) {
        if (!showWarning) {
          setShowWarning(true);
          onSessionExpiring?.(remaining);
        }
      }

      // Session expired
      if (remaining <= 0) {
        setShowWarning(false);
        onSessionExpired?.();
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [session, showWarning, onSessionExpiring, onSessionExpired]);

  if (!session || timeRemaining <= 0) return null;

  return (
    <>
      {showWarning && (
        <div className="session-warning">
          <div className="warning-content">
            <span className="warning-icon">⏰</span>
            <div className="warning-text">
              <strong>Session Expiring Soon</strong>
              <p>Your session will expire in {formatTimeRemaining(timeRemaining)}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="session-info">
        Session: {formatTimeRemaining(timeRemaining)}
      </div>

      <style jsx>{`
        .session-warning {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 8px;
          padding: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          max-width: 300px;
        }

        .warning-content {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .warning-icon {
          font-size: 1.5rem;
          margin-top: 0.2rem;
        }

        .warning-text strong {
          display: block;
          color: #856404;
          margin-bottom: 0.25rem;
        }

        .warning-text p {
          margin: 0;
          color: #856404;
          font-size: 0.9rem;
        }

        .session-info {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.8rem;
          font-family: monospace;
          z-index: 999;
        }
      `}</style>
    </>
  );
}
```

### 7. React Hook for Authentication
```typescript
// hooks/useRechargeAuth.ts
import { useState } from 'react';
import { RechargeAuth } from '@/lib/recharge/auth';
import { saveSession } from '@/lib/recharge/session';

export function useRechargeAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = new RechargeAuth();

  const sendCode = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const sessionToken = await auth.sendVerificationCode(email);
      return sessionToken;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send code';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const validateAndRedirect = async (
    email: string, 
    sessionToken: string, 
    code: string
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const portalUrl = await auth.validateCodeAndGetPortal(email, sessionToken, code);
      
      // Save session
      saveSession({ email, sessionToken });
      
      // Track successful access
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'recharge_portal_access', {
          method: 'passwordless',
          success: true
        });
      }
      
      // Redirect to portal
      window.location.href = portalUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid code';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    sendCode,
    validateAndRedirect,
    isLoading,
    error,
    clearError
  };
}
```

### 8. Enhanced Customer Portal Component with Data Display
```typescript
// components/account/EnhancedPortalAccess.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRechargeAuth } from '@/hooks/useRechargeAuth';
import { RechargeAuth } from '@/lib/recharge/auth';
import SessionMonitor from '@/components/SessionMonitor';
import { loadSession } from '@/lib/recharge/session';

export default function EnhancedPortalAccess() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sessionToken, setSessionToken] = useState('');
  const [step, setStep] = useState<'email' | 'code' | 'portal'>('email');
  const [customer, setCustomer] = useState<any>(null);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [session, setSession] = useState<any>(null);
  
  const { sendCode, validateAndRedirect, isLoading, error, clearError } = useRechargeAuth();
  const auth = new RechargeAuth();

  // Check for existing session on mount
  useEffect(() => {
    const existingSession = loadSession();
    if (existingSession) {
      setSession(existingSession);
      setEmail(existingSession.email || '');
      // Optionally load customer data
    }
  }, []);

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      const token = await sendCode(email);
      setSessionToken(token);
      setStep('code');
    } catch (err) {
      // Error displayed via hook
    }
  };

  const handleValidateCode = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      // First validate and get session
      const validatedSession = { email, sessionToken, code };
      setSession(validatedSession);
      
      // Load customer data
      const { customer: customerData, subscriptions: subs } = await auth.getCustomerData(validatedSession);
      setCustomer(customerData);
      setSubscriptions(subs);
      setStep('portal');
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePortalAccess = async (destination: string = 'overview') => {
    try {
      const portalUrl = await auth.validateCodeAndGetPortal(
        email, 
        sessionToken, 
        code, 
        destination
      );
      window.location.href = portalUrl;
    } catch (err) {
      setError('Failed to access portal');
    }
  };

  if (step === 'portal' && customer) {
    return (
      <div className="enhanced-portal">
        <SessionMonitor 
          session={session}
          onSessionExpired={() => {
            setStep('email');
            setSession(null);
            setCustomer(null);
          }}
        />
        
        <div className="customer-header">
          <div className="customer-info">
            <h2>Welcome, {customer.first_name || customer.email}!</h2>
            <p>Email: {customer.email}</p>
            {customer.phone && <p>Phone: {customer.phone}</p>}
          </div>
        </div>

        <div className="subscriptions-overview">
          <h3>Your Subscriptions ({subscriptions.length})</h3>
          {subscriptions.length > 0 ? (
            <div className="subscription-list">
              {subscriptions.slice(0, 3).map((subscription: any) => (
                <div key={subscription.id} className="subscription-card">
                  <h4>{subscription.product_title}</h4>
                  <p>Status: <span className={`status ${subscription.status}`}>
                    {subscription.status}
                  </span></p>
                  <p>Next Charge: {new Date(subscription.next_charge_scheduled_at).toLocaleDateString()}</p>
                  <p>Price: ${subscription.price}</p>
                </div>
              ))}
              {subscriptions.length > 3 && (
                <p>And {subscriptions.length - 3} more...</p>
              )}
            </div>
          ) : (
            <p>No active subscriptions found.</p>
          )}
        </div>

        <div className="portal-actions">
          <h3>Quick Access to Portal Sections</h3>
          <div className="action-grid">
            <button onClick={() => handlePortalAccess('overview')}>
              📊 Portal Overview
            </button>
            <button onClick={() => handlePortalAccess('subscriptions')}>
              📦 Manage Subscriptions
            </button>
            <button onClick={() => handlePortalAccess('billing')}>
              💳 Billing & Payment
            </button>
            <button onClick={() => handlePortalAccess('delivery')}>
              🚚 Delivery Schedule
            </button>
            <button onClick={() => handlePortalAccess('orders')}>
              📋 Order History
            </button>
            <button onClick={() => handlePortalAccess('profile')}>
              👤 Account Settings
            </button>
          </div>
        </div>

        <style jsx>{`
          .enhanced-portal {
            max-width: 800px;
            margin: 0 auto;
            padding: 2rem;
          }

          .customer-header {
            padding: 1.5rem;
            background: linear-gradient(135deg, #004E36 0%, #10B981 100%);
            color: white;
            border-radius: 8px;
            margin-bottom: 2rem;
          }

          .subscription-list {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
            margin-top: 1rem;
          }

          .subscription-card {
            padding: 1rem;
            border: 1px solid #ddd;
            border-radius: 6px;
            background-color: #f9f9f9;
          }

          .status {
            font-weight: bold;
            text-transform: uppercase;
            font-size: 0.8rem;
          }

          .status.active { color: #28a745; }
          .status.cancelled { color: #dc3545; }
          .status.expired { color: #ffc107; }
          .status.paused { color: #17a2b8; }

          .action-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
          }

          .action-grid button {
            padding: 1rem;
            background-color: #004E36;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            text-align: left;
          }

          .action-grid button:hover {
            background-color: #003825;
          }
        `}</style>
      </div>
    );
  }

  // Email and code entry forms (same as main component)
  if (step === 'code') {
    return (
      <form onSubmit={handleValidateCode}>
        <h3>Enter Verification Code</h3>
        {error && <div className="error">{error}</div>}
        <p>Check your email for a 4-digit code</p>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
          placeholder="0000"
          maxLength={4}
          required
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || code.length !== 4}>
          {isLoading ? 'Verifying...' : 'Continue'}
        </button>
        <button type="button" onClick={() => setStep('email')}>
          Use Different Email
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleSendCode}>
      <h3>Access Your Subscriptions</h3>
      {error && <div className="error">{error}</div>}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Sending...' : 'Send Verification Code'}
      </button>
    </form>
  );
}
```

### 9. Main Portal Access Component
```typescript
// components/account/RechargePortalAccess.tsx
// [Previous implementation remains the same - see section 6 in original]
```

### 10. Webhook Implementation
```typescript
// app/api/recharge/webhooks/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('X-Recharge-Hmac-Sha256');
    
    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 401 });
    }

    // Verify webhook signature
    const hash = crypto
      .createHmac('sha256', process.env.RECHARGE_WEBHOOK_SECRET!)
      .update(body, 'utf8')
      .digest('base64');
    
    if (hash !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const data = JSON.parse(body);
    const eventType = request.headers.get('X-Recharge-Topic');
    
    // Handle different webhook events
    switch (eventType) {
      case 'subscription/created':
        console.log('New subscription created:', data.subscription.id);
        // Handle new subscription
        break;
      
      case 'subscription/cancelled':
        console.log('Subscription cancelled:', data.subscription.id);
        // Check if cancelled before 2 orders (soft minimum)
        // Apply retroactive charges if needed
        break;
      
      case 'subscription/updated':
        console.log('Subscription updated:', data.subscription.id);
        // Handle update
        break;
      
      case 'order/created':
        console.log('Order created:', data.order.id);
        // Handle new order
        break;
      
      default:
        console.log('Unhandled webhook event:', eventType);
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
```

### 11. Server-Side Portal Session with Rate Limiting
```typescript
// app/api/recharge/portal/route.ts with Rate Limiting
import { NextResponse } from 'next/server';

// Simple in-memory rate limiting (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 100; // 100 requests per hour per customer
const RATE_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_WINDOW
    });
    return true;
  }
  
  if (userLimit.count >= RATE_LIMIT) {
    return false;
  }
  
  userLimit.count++;
  return true;
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Check rate limit
    if (!checkRateLimit(email)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait and try again.' },
        { status: 429 }
      );
    }

    // Step 1: Find customer by email
    const customerResponse = await fetch(
      `https://api.rechargeapps.com/customers?email=${encodeURIComponent(email)}`,
      {
        headers: {
          'X-Recharge-Access-Token': process.env.RECHARGE_API_KEY!,
          'X-Recharge-Version': '2021-11'
        }
      }
    );

    if (!customerResponse.ok) {
      console.error('Customer lookup failed:', customerResponse.status);
      
      // Handle specific error response format
      const errorData = await customerResponse.json();
      if (errorData.errors?.email) {
        return NextResponse.json(
          { error: errorData.errors.email[0] || 'Customer not found' },
          { status: 404 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to find customer' },
        { status: customerResponse.status }
      );
    }

    const { customers } = await customerResponse.json();
    
    if (!customers || customers.length === 0) {
      return NextResponse.json(
        { 
          error: 'No subscription found for this email address',
          errors: {
            subscription: ['No active subscription']
          }
        },
        { status: 404 }
      );
    }

    const customerId = customers[0].id;

    // Step 2: Create portal session
    const sessionResponse = await fetch(
      'https://api.rechargeapps.com/portal/customers/sessions',
      {
        method: 'POST',
        headers: {
          'X-Recharge-Access-Token': process.env.RECHARGE_API_KEY!,
          'X-Recharge-Version': '2021-11',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          customer_id: customerId,
          return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/account`
        })
      }
    );

    if (!sessionResponse.ok) {
      console.error('Portal session creation failed:', sessionResponse.status);
      return NextResponse.json(
        { error: 'Failed to create portal session' },
        { status: sessionResponse.status }
      );
    }

    const session = await sessionResponse.json();
    
    if (session.portal_session_url) {
      // Log successful access
      console.log(`Portal access granted for customer: ${customerId}`);
      
      return NextResponse.json({ 
        portal_url: session.portal_session_url,
        expires_at: session.expires_at // Portal session expiration
      });
    } else {
      throw new Error('No portal URL in response');
    }
    
  } catch (error) {
    console.error('Portal session error:', error);
    return NextResponse.json(
      { error: 'An error occurred accessing the portal' },
      { status: 500 }
    );
  }
}
```

### 12. Server-Side Portal Component
```typescript
// components/account/ServerPortalAccess.tsx
// [Previous implementation remains - see section 8 in original]
```

### 13. Account Page Integration
```typescript
// app/account/page.tsx with lazy loading
import { lazy, Suspense } from 'react';

const RechargePortalAccess = lazy(() => import('@/components/account/RechargePortalAccess'));
const EnhancedPortalAccess = lazy(() => import('@/components/account/EnhancedPortalAccess'));

export default function AccountPage() {
  return (
    <div className="account-page">
      <h1>My Account</h1>
      
      {/* Other account sections */}
      
      <section className="subscription-section">
        <h2>Subscription Management</h2>
        
        <Suspense fallback={<div>Loading subscription portal...</div>}>
          {/* Choose one based on your needs */}
          <RechargePortalAccess />
          {/* Or use enhanced version with customer data display */}
          {/* <EnhancedPortalAccess /> */}
        </Suspense>
      </section>
    </div>
  );
}
```

### 14. Error Handling Utility
```typescript
// lib/recharge/errors.ts
// [Previous implementation remains - see section 10 in original]
```

### 15. Analytics Tracking
```typescript
// utils/analytics/recharge.ts
// [Previous implementation remains - see section 11 in original]
```

## Performance Optimization

### Lazy Loading for Better Initial Load
```typescript
// app/account/page.tsx with lazy loading
import { lazy, Suspense } from 'react';

const RechargePortalAccess = lazy(() => import('@/components/account/RechargePortalAccess'));

export default function AccountPage() {
  return (
    <div className="account-page">
      <h1>My Account</h1>
      
      <Suspense fallback={<div>Loading subscription portal...</div>}>
        <RechargePortalAccess />
      </Suspense>
    </div>
  );
}
```

### Setup Validation Utility
```typescript
// utils/validateSetup.ts
export function validateRechargeSetup() {
  const tests = [
    {
      name: 'Environment Variables',
      test: () => {
        const required = [
          'NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN',
          'RECHARGE_API_KEY',
          'NEXT_PUBLIC_RECHARGE_DOMAIN'
        ];
        return required.every(env => process.env[env]);
      }
    },
    {
      name: 'Storefront Token Format',
      test: () => {
        const token = process.env.NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN;
        return token && token.startsWith('strfnt');
      }
    },
    {
      name: 'Admin Token Format',
      test: () => {
        const token = process.env.RECHARGE_API_KEY;
        return token && token.startsWith('sk_');
      }
    },
    {
      name: 'Domain Configuration',
      test: () => {
        const domain = process.env.NEXT_PUBLIC_RECHARGE_DOMAIN;
        return domain && domain.includes('rechargepayments.com');
      }
    }
  ];

  return tests.map(test => ({
    name: test.name,
    passed: test.test(),
    message: test.passed ? 'OK' : 'Failed'
  }));
}

// Use in development
if (process.env.NODE_ENV === 'development') {
  const results = validateRechargeSetup();
  console.table(results);
}
```

## Testing & Validation

### Test Scenarios Checklist

#### Passwordless Authentication Flow
- [ ] Customer can enter valid email
- [ ] Verification code is sent successfully
- [ ] Code arrives within 1-2 minutes
- [ ] Valid 4-digit code grants portal access
- [ ] Invalid code shows clear error message
- [ ] Expired code (>10 minutes) is rejected
- [ ] Resend code functionality works
- [ ] Different email option works
- [ ] Session persists for 55 minutes
- [ ] Session warning appears at 5 minutes remaining

#### Server-Side Portal Flow
- [ ] Email validation works correctly
- [ ] Non-existent customer shows appropriate message
- [ ] Portal URL generation succeeds
- [ ] Redirect to portal works
- [ ] Session persists on portal
- [ ] Rate limiting prevents abuse

#### Edge Cases
- [ ] Customer with no active subscriptions
- [ ] Customer with cancelled subscriptions
- [ ] Invalid email format
- [ ] Network timeout handling
- [ ] API rate limiting response
- [ ] Multiple rapid submissions prevented
- [ ] Webhook signature verification

#### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Test Data
```typescript
// Development test accounts
const TEST_CUSTOMERS = [
  {
    email: 'test-active@sunfruit.com',
    status: 'active',
    subscriptions: 2
  },
  {
    email: 'test-cancelled@sunfruit.com', 
    status: 'cancelled',
    subscriptions: 0
  },
  {
    email: 'test-paused@sunfruit.com',
    status: 'paused',
    subscriptions: 1
  }
];
```

### Development Testing Component
```typescript
// components/admin/RechargeDebug.tsx (admin only)
export default function RechargeDebug() {
  if (process.env.NODE_ENV !== 'development') return null;
  
  const validationResults = validateRechargeSetup();
  
  return (
    <div className="debug-panel">
      <h4>Recharge Debug Info</h4>
      <div>
        {validationResults.map((result, index) => (
          <div key={index} className={result.passed ? 'pass' : 'fail'}>
            {result.passed ? '✅' : '❌'} {result.name}: {result.message}
          </div>
        ))}
      </div>
      <ul>
        <li>Storefront Token: {process.env.NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN?.slice(0, 10)}...</li>
        <li>Portal Domain: {process.env.NEXT_PUBLIC_RECHARGE_DOMAIN}</li>
        <li>Environment: {process.env.NODE_ENV}</li>
      </ul>
    </div>
  );
}
```

## Deployment & Monitoring

### Pre-Deployment Checklist

#### Environment Setup
- [ ] All environment variables set in production
- [ ] Tokens verified and working
- [ ] Domain whitelisted in Recharge
- [ ] SSL certificate active
- [ ] Webhook endpoints configured

#### Code Review
- [ ] TypeScript errors resolved
- [ ] Console.logs removed
- [ ] Error handling implemented
- [ ] Loading states added
- [ ] Mobile responsive
- [ ] Session management tested

#### Security
- [ ] API keys not exposed client-side
- [ ] Rate limiting implemented
- [ ] Input validation in place
- [ ] HTTPS enforced
- [ ] Webhook signatures verified

### Deployment Steps

#### 1. Staging Deployment
```bash
# Deploy to staging
npm run build
npm run test
vercel deploy --preview

# Test all flows in staging
# Get team approval
```

#### 2. Production Deployment
```bash
# Deploy during low-traffic window
vercel deploy --prod

# Monitor for 30 minutes
# Check error tracking
# Verify analytics
```

### Monitoring & Analytics

#### Key Metrics to Track
- **Portal Access Success Rate**: Target >95%
- **Average Time to Portal**: Target <10 seconds
- **Code Delivery Rate**: Target >99%
- **Error Rate by Type**: Monitor trends
- **Drop-off Rate**: Track where customers abandon
- **Session Duration**: Average time in portal
- **Webhook Processing Time**: Monitor latency

#### Implementation
```typescript
// Add to your monitoring service
const metrics = {
  portalAccessAttempts: 0,
  portalAccessSuccess: 0,
  averageTimeToPortal: [],
  errorsByType: {},
  webhookProcessingTime: [],
  
  track(event: string, data: any) {
    // Send to your monitoring service
    console.log('Metric:', event, data);
  }
};
```

### Error Monitoring Setup
```typescript
// Example with Sentry (or your error tracking service)
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.BrowserTracing(),
  ],
  tracesSampleRate: 0.1,
});

// Wrap Recharge calls
export async function trackRechargeError(error: any, context: any) {
  Sentry.captureException(error, {
    tags: {
      service: 'recharge',
      component: 'portal-access'
    },
    extra: context
  });
}
```

## Timeline & Action Plan

### 6-Day Implementation Schedule

#### Day 1: Environment Setup
- [ ] Install `@rechargeapps/storefront-client` package
- [ ] Configure all environment variables
- [ ] Create directory structure
- [ ] Set up TypeScript types
- [ ] Initialize Recharge SDK in layout
- [ ] Set up webhook endpoints

**Deliverable**: Basic setup complete, SDK initialized

#### Day 2-3: Core Implementation
- [ ] Implement passwordless authentication flow
- [ ] Create portal access component
- [ ] Build server-side fallback API route
- [ ] Add error handling utilities
- [ ] Implement React hooks
- [ ] Add session management utilities

**Deliverable**: Both authentication methods working

#### Day 4: Integration
- [ ] Integrate with account page
- [ ] Add loading states and skeletons
- [ ] Implement analytics tracking
- [ ] Add retry mechanisms
- [ ] Style components to match brand
- [ ] Add session monitoring

**Deliverable**: Fully integrated with existing system

#### Day 5: Testing
- [ ] Complete all test scenarios
- [ ] Cross-browser testing
- [ ] Performance testing
- [ ] Security review
- [ ] User acceptance testing
- [ ] Webhook testing

**Deliverable**: All tests passing, ready for deployment

#### Day 6: Deployment
- [ ] Deploy to staging environment
- [ ] Final testing in staging
- [ ] Deploy to production
- [ ] Monitor for issues
- [ ] Document any findings

**Deliverable**: Live in production

### Post-Launch Tasks (Week 2)
- [ ] Monitor analytics and metrics
- [ ] Gather customer feedback
- [ ] Optimize based on data
- [ ] Document common issues
- [ ] Train support team
- [ ] Plan Phase 2 (quarterly subscriptions)

## Troubleshooting & Support

### Common Issues & Solutions

#### Issue: "No subscription found"
**Causes:**
- Customer hasn't purchased subscription yet
- Email typo
- Customer not synced from Shopify to Recharge

**Solutions:**
1. Verify email in Shopify admin
2. Check Recharge customer list
3. Trigger manual sync if needed
4. Clear message: "Please check your email or contact support"

#### Issue: "Invalid verification code"
**Causes:**
- Code expired (>10 minutes)
- Typo in code entry
- Session token mismatch

**Solutions:**
1. Implement "Resend code" option
2. Clear expired session
3. Show countdown timer for code expiry
4. Auto-focus code input field

#### Issue: "Portal won't load"
**Causes:**
- Browser blocking cookies
- Ad blocker interference
- Network issues
- CORS problems
- Portal URL expired

**Solutions:**
1. Check browser console for errors
2. Test in incognito mode
3. Verify domain whitelist
4. Add clear error messaging
5. Regenerate portal URL

#### Issue: Email not receiving codes
**Causes:**
- Email in spam folder
- Email delivery delay
- Invalid email format
- SMS only works for US/Canada (+1)

**Solutions:**
1. Add "Check spam folder" message
2. Implement SMS option for US/Canada
3. Add email validation
4. Provide support contact

#### Issue: Webhook not processing
**Causes:**
- Signature verification failing
- Incorrect webhook secret
- Network timeout

**Solutions:**
1. Verify webhook secret
2. Check signature calculation
3. Implement retry logic
4. Log webhook events

### Customer Support Documentation

#### Support Team Quick Reference
```
Portal Access Methods:
1. Passwordless (primary) - Customer gets email code
2. Server-side (fallback) - Instant access, no code

Common Questions:
Q: Why didn't I get a code?
A: Check spam folder, verify email address, SMS only for US/Canada

Q: Code doesn't work?
A: Codes expire after 10 minutes, request new one

Q: Can't access portal?
A: Verify active subscription exists

Q: Session expired?
A: Sessions last 55 minutes, re-authenticate needed

Escalation Path:
1. Try alternate access method
2. Verify customer in Recharge admin
3. Check sync from Shopify
4. Contact Recharge support if needed
```

## Migration & Future Considerations

### Migration Path (If Existing Subscriptions)
If you have existing subscriptions outside of Recharge that need to be migrated:

1. **Export existing subscription data** from your current system
2. **Import customers to Shopify** first (required for Recharge sync)
3. **Use Recharge API** to bulk import subscriptions
4. **Verify data integrity** after import
5. **Run parallel systems** during transition period

### Bulk Import Example
```typescript
// scripts/migrateSubscriptions.ts
async function migrateSubscriptions(subscriptions: any[]) {
  for (const sub of subscriptions) {
    // First ensure customer exists in Shopify
    // Then create subscription in Recharge
    await fetch('https://api.rechargeapps.com/subscriptions', {
      method: 'POST',
      headers: {
        'X-Recharge-Access-Token': process.env.RECHARGE_API_KEY!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customer_id: sub.customer_id,
        address_id: sub.address_id,
        next_charge_scheduled_at: sub.next_charge_date,
        // ... other subscription data
      })
    });
  }
}
```

### Future Phase 2: Quarterly Subscriptions
After monthly subscriptions are stable:
- Add quarterly prepaid option
- 25% discount for prepaid
- Bulk order processing
- Advanced scheduling options

## Resources & Documentation

### Official Recharge Documentation
- [JavaScript SDK Reference](https://storefront.rechargepayments.com/client/)
- [SDK Package Setup](https://storefront.getrecharge.com/client/docs/getting_started/package_setup/)
- [Passwordless Authentication Methods](https://storefront.rechargepayments.com/client/docs/methods/api/auth/)
- [Customer API Methods](https://storefront.rechargepayments.com/client/docs/methods/api/customer/)
- [Portal Access Response Interface](https://storefront.rechargepayments.com/client/docs/types/interfaces/CustomerPortalAccessResponse/)
- [SDK Function Reference](https://storefront.getrecharge.com/client/docs/types/)

### Recharge Guides
- [Build a Custom Customer Portal](https://docs.getrecharge.com/docs/build-a-custom-customer-portal-with-the-recharge-api)
- [Using Passwordless Login](https://docs.getrecharge.com/docs/using-passwordless-login-for-custom-customer-portals)
- [Customer Portal Tutorials](https://docs.getrecharge.com/docs/custom-customer-portal-tutorials)
- [Recharge-hosted Portal Setup](https://docs.getrecharge.com/docs/build-a-recharge-hosted-customer-portal)

### API Documentation
- [Recharge API Reference v2021-11](https://developer.rechargepayments.com/2021-11)
- [Portal Sessions API](https://developer.rechargepayments.com/2021-11/portal_sessions)
- [Customers API](https://developer.rechargepayments.com/2021-11/customers)
- [Subscriptions API](https://developer.rechargepayments.com/2021-11/subscriptions)
- [Webhooks Documentation](https://developer.rechargepayments.com/2021-11/webhooks)

### Support Resources
- [Recharge Support Center](https://support.getrecharge.com)
- [API Overview](https://support.getrecharge.com/hc/en-us/articles/360008829993-Recharge-API)
- [Passwordless Login Setup](https://support.getrecharge.com/hc/en-us/articles/8537122240023-Passwordless-login-for-the-customer-portal)
- [Webhook Configuration](https://support.rechargepayments.com/hc/en-us/articles/360008829373)

### Blog Posts & Examples
- [JavaScript SDK Announcement](https://getrecharge.com/blog/announcing-javascript-sdk-for-storefront-customizations/)
- [Passwordless Login Overview](https://getrecharge.com/blog/everything-you-need-to-know-about-passwordless-login/)
- [Hydrogen Integration Examples](https://storefront.rechargepayments.com/client/docs/examples/hydrogen/overview/)
- [Passwordless Login Example](https://storefront.rechargepayments.com/client/docs/examples/shopify/passwordless/)
- [Portal Link Example](https://storefront.rechargepayments.com/client/docs/examples/shopify/portal_link/)
- [Examples Overview](https://storefront.rechargepayments.com/client/docs/examples/overview/)
- [FAQ Documentation](https://storefront.getrecharge.com/client/docs/faq/)

### Internal Resources
- Vercel Dashboard: Environment variables
- Shopify Admin: Selling plan configuration
- Recharge Merchant Portal: Token management
- Analytics Dashboard: Portal access metrics

## Summary

This comprehensive guide provides everything needed to implement direct Recharge portal access from your Next.js application, completely bypassing Shopify's customer account system. The implementation uses customers already created through Shopify checkout and synced to Recharge.

**Key Takeaways:**
1. Use passwordless authentication as the primary method
2. Implement server-side portal sessions as a fallback
3. Never use Shopify authentication methods
4. Portal is hosted on Recharge infrastructure
5. Customer email is the key identifier
6. Sessions expire after 55 minutes - handle appropriately
7. Track everything for optimization
8. SMS only works for US/Canada (+1 numbers)
9. Webhook signature verification is critical
10. Rate limiting prevents abuse

**Success Criteria:**
- ✅ Customers access portal without Shopify login
- ✅ Email verification works reliably  
- ✅ Portal loads on Recharge infrastructure
- ✅ Error handling provides clear feedback
- ✅ Analytics tracking captures all events
- ✅ Documentation is complete and accessible
- ✅ Session monitoring shows time remaining
- ✅ Webhooks process subscription events
- ✅ Rate limiting prevents API abuse

With this implementation, your customers will have seamless access to their subscription management portal directly from your site, creating a smooth and professional user experience.