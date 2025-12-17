'use client';

import { useEffect, useState } from 'react';

export default function DebugRecharge() {
  const [mounted, setMounted] = useState(false);
  const [envVars, setEnvVars] = useState<any>({});

  useEffect(() => {
    setMounted(true);
    setEnvVars({
      storeId: process.env.NEXT_PUBLIC_RECHARGE_STORE_ID,
      token: process.env.NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN,
      hasToken: !!process.env.NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN,
      hasStoreId: !!process.env.NEXT_PUBLIC_RECHARGE_STORE_ID,
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      tokenPrefix: process.env.NEXT_PUBLIC_RECHARGE_STOREFRONT_TOKEN?.slice(0, 15)
    });
  }, []);

  if (!mounted) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Recharge Debug</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Recharge Debug</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Environment Variables</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {JSON.stringify(envVars, null, 2)}
          </pre>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Window Object</h2>
          <p>Recharge Initialized: {String(window._rechargeInitialized)}</p>
        </div>
      </div>
    </div>
  );
}