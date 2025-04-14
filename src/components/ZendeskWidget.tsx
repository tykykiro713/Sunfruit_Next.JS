'use client';

import { useEffect } from 'react';

// Define the Zendesk window object types
declare global {
  interface Window {
    zE?: any;
    $zopim?: any;
    zESettings?: any;
  }
}

export default function ZendeskWidget() {
  useEffect(() => {
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

    // Cleanup function to remove the script when component unmounts
    return () => {
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
    };
  }, []);

  return null; // This component doesn't render any visible elements
}