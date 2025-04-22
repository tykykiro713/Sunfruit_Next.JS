// components/GoogleAdsTag.tsx
'use client';

import Script from 'next/script';

export default function GoogleAdsTag() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-16998825904"
        strategy="afterInteractive"
      />
      <Script id="google-ads-tag" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16998825904');
        `}
      </Script>
    </>
  );
}