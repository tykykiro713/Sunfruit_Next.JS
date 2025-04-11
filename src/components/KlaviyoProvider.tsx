'use client';

import Script from 'next/script';

export function KlaviyoProvider() {
  // You could add any additional Klaviyo-specific logic here if needed in the future
  return (
    <Script
      src={`https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID}`}
      strategy="afterInteractive"
    />
  );
}