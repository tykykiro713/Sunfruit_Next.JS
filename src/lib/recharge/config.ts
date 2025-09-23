// Debug environment variables
console.log('Recharge Config Debug:', {
  storeId: process.env.NEXT_PUBLIC_RECHARGE_STORE_ID,
  token: process.env.NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN?.slice(0, 10) + '...',
  hasToken: !!process.env.NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN,
  hasStoreId: !!process.env.NEXT_PUBLIC_RECHARGE_STORE_ID
});

export const rechargeConfig = {
  storeIdentifier: process.env.NEXT_PUBLIC_RECHARGE_STORE_ID || '8ycn0a-6x-sp',
  storefrontAccessToken: process.env.NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN || '',
  appName: 'Sunfruit Customer Portal',
  appVersion: '1.0.0',
  loginRetryFn: async () => {
    // Handle session refresh if needed
    if (typeof window !== 'undefined') {
      const storedSession = localStorage.getItem('rechargeSession');
      if (storedSession) {
        return JSON.parse(storedSession);
      }
    }
    return null;
  }
};

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