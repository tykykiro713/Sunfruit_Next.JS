'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// This component contains the part that needs Suspense
function GoogleAnalyticsInner() {
  const pathname = usePathname() ?? '';
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only track page views once the page is fully interactive
    const trackPageView = () => {
      // Ensure we have a valid GA Measurement ID and pathname
      if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
        // Construct the full path with search params
        const fullPath = pathname + (searchParams ? `?${searchParams.toString()}` : '');
        
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
          page_path: fullPath,
          // Set transport_type to 'beacon' for more reliable analytics
          transport_type: 'beacon',
        });
      }
    };
    
    // Track page view when the component mounts
    trackPageView();
  }, [pathname, searchParams]);

  return null;
}

// Main component with Suspense boundary
export function GoogleAnalytics() {
  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
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
              send_page_view: false
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