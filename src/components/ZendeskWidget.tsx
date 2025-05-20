'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// Define the Zendesk window object types
declare global {
  interface Window {
    zE?: any;
    $zopim?: any;
    zESettings?: any;
  }
}

export default function ZendeskWidget() {
  const [zendeskLoaded, setZendeskLoaded] = useState(false);
  const pathname = usePathname();

  // Only load Zendesk after the page has completely loaded and only on certain pages
  useEffect(() => {
    // Lazy load logic - only load Zendesk after everything else is rendered
    // and the user has had time to interact with the page
    const shouldLoadZendesk = () => {
      // Don't load on checkout, cart, or other performance-critical pages
      const excludedPaths = ['/checkout', '/cart'];
      if (excludedPaths.some(path => pathname?.includes(path))) {
        return false;
      }
      return true;
    };

    // Use requestIdleCallback (or fallback to setTimeout) to load the script
    // when the browser is idle
    const loadZendeskWhenIdle = () => {
      if (!zendeskLoaded && shouldLoadZendesk()) {
        const loadScript = () => {
          // Create and load the Zendesk Web SDK script
          const script = document.createElement('script');
          script.id = 'ze-snippet';
          script.src = `https://static.zdassets.com/ekr/snippet.js?key=${process.env.NEXT_PUBLIC_ZENDESK_KEY}`;
          script.async = true;
          document.head.appendChild(script);
          
          // Add custom CSS to hide on mobile
          const style = document.createElement('style');
          style.id = 'zendesk-mobile-styles';
          style.textContent = `
            /* Hide Zendesk Widget on mobile devices */
            @media screen and (max-width: 640px) {
              iframe#launcher, 
              div[data-brand-color="#10b981"],
              div[role="presentation"][aria-hidden="true"][data-garden-id],
              div[data-garden-id="modals.modal"],
              div[data-garden-id="buttons.icon_button"],
              div[data-testid="launcher"] {
                display: none !important;
              }
            }
          `;
          document.head.appendChild(style);
          
          setZendeskLoaded(true);
        };

        // Use requestIdleCallback for modern browsers or setTimeout as fallback
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(loadScript);
        } else {
          // For browsers that don't support requestIdleCallback, use a 3-second timeout
          setTimeout(loadScript, 3000);
        }
      }
    };

    // Only attempt to load Zendesk after the page is fully loaded
    if (document.readyState === 'complete') {
      loadZendeskWhenIdle();
    } else {
      window.addEventListener('load', loadZendeskWhenIdle);
      return () => {
        window.removeEventListener('load', loadZendeskWhenIdle);
      };
    }

    // Cleanup function to remove the script when component unmounts
    return () => {
      if (zendeskLoaded) {
        const scriptElement = document.getElementById('ze-snippet');
        if (scriptElement) {
          document.head.removeChild(scriptElement);
        }
        
        const styleElement = document.getElementById('zendesk-mobile-styles');
        if (styleElement) {
          document.head.removeChild(styleElement);
        }
        
        // Clean up any global variables
        delete window.zE;
        delete window.zESettings;
      }
    };
  }, [pathname, zendeskLoaded]);

  return null; // This component doesn't render any visible elements
} 