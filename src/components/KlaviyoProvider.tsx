'use client';

import { useEffect, useState } from 'react';

export function KlaviyoProvider() {
  const [klaviyoLoaded, setKlaviyoLoaded] = useState(false);

  useEffect(() => {
    // Load Klaviyo after the page is fully loaded and only when idle
    const loadKlaviyo = () => {
      if (!klaviyoLoaded) {
        const script = document.createElement('script');
        script.src = `https://static.klaviyo.com/onsite/js/klaviyo.js?company_id=${process.env.NEXT_PUBLIC_KLAVIYO_COMPANY_ID}`;
        script.async = true;
        script.id = 'klaviyo-script';
        document.head.appendChild(script);
        setKlaviyoLoaded(true);
      }
    };

    // Use requestIdleCallback or setTimeout as fallback
    if (document.readyState === 'complete') {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          // Add a small delay before loading Klaviyo
          setTimeout(loadKlaviyo, 2000);
        });
      } else {
        // For browsers that don't support requestIdleCallback
        setTimeout(loadKlaviyo, 3000);
      }
    } else {
      window.addEventListener('load', () => {
        setTimeout(loadKlaviyo, 2000);
      });
    }

    return () => {
      if (klaviyoLoaded) {
        const scriptElement = document.getElementById('klaviyo-script');
        if (scriptElement) {
          document.head.removeChild(scriptElement);
        }
      }
    };
  }, [klaviyoLoaded]);

  return null;
}