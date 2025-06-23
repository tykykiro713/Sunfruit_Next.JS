// Optimized loading with async script
// ========================================
'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function GoogleAnalyticsInner() {
  const pathname = usePathname() ?? '';
  const searchParams = useSearchParams();

  useEffect(() => {
    // Delay pageview tracking slightly to not block initial render
    const timer = setTimeout(() => {
      if (window.gtag && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        const fullPath = pathname + (searchParams ? `?${searchParams.toString()}` : '');
        
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
          page_path: fullPath,
          transport_type: 'beacon',
          send_page_view: true,
          anonymize_ip: true,
        });
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalytics() {
  return (
    <>
      <Script
        id="google-analytics-script"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        async
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
              page_location: window.location.href,
              page_title: document.title,
              send_page_view: false,
              cookie_flags: 'SameSite=None;Secure',
              restricted_data_processing: true
            });
          `,
        }}
      />

      <Suspense fallback={null}>
        <GoogleAnalyticsInner />
      </Suspense>
    </>
  );
}