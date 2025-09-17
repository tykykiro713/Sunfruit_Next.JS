import { initRecharge, loginShopifyAppProxy } from '@rechargeapps/storefront-client';

// Initialize Recharge SDK
export function initializeRecharge() {
  if (typeof window === 'undefined') {
    // Don't initialize on server side
    return;
  }

  initRecharge({
    storeIdentifier: 'checkout.sunfruit.com',
    storefrontAccessToken: process.env.NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN!,
    appName: 'Sunfruit',
    appVersion: '1.0.0',
    // Remove loginRetryFn to avoid automatic connection attempts
  });
}

// Initialize on import (client-side only)
if (typeof window !== 'undefined') {
  initializeRecharge();
}

// Export for manual initialization if needed
export { loginShopifyAppProxy } from '@rechargeapps/storefront-client';