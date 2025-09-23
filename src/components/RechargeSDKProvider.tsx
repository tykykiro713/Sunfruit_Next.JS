'use client';

import { useEffect, useState } from 'react';
import { initRecharge } from '@rechargeapps/storefront-client';
import { rechargeConfig } from '@/lib/recharge/config';

export default function RechargeSDKProvider() {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize Recharge SDK only on client side
    if (typeof window !== 'undefined') {
      try {
        console.log('🔍 Environment variables check:', {
          domain: process.env.NEXT_PUBLIC_RECHARGE_DOMAIN,
          hasToken: !!process.env.NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN,
          tokenPrefix: process.env.NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN?.slice(0, 10)
        });
        
        console.log('🔍 Initializing Recharge SDK with config:', {
          storeIdentifier: rechargeConfig.storeIdentifier,
          hasToken: !!rechargeConfig.storefrontAccessToken,
          tokenPrefix: rechargeConfig.storefrontAccessToken?.slice(0, 10),
          appName: rechargeConfig.appName
        });
        
        if (!rechargeConfig.storeIdentifier) {
          throw new Error('Missing storeIdentifier in config');
        }
        if (!rechargeConfig.storefrontAccessToken) {
          throw new Error('Missing storefrontAccessToken in config');
        }
        
        initRecharge(rechargeConfig);
        setIsInitialized(true);
        console.log('✅ Recharge SDK initialized successfully');
        
        // Store initialization status for other components to check
        window._rechargeInitialized = true;
      } catch (error) {
        console.error('❌ Failed to initialize Recharge SDK:', error);
        console.error('❌ Config used:', rechargeConfig);
        console.error('❌ Error details:', {
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined
        });
      }
    }
  }, []);

  return null; // This component doesn't render anything
}