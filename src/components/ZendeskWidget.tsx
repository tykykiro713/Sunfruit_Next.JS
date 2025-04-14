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

    // Cleanup function to remove the script when component unmounts
    return () => {
      const scriptElement = document.getElementById('ze-snippet');
      if (scriptElement) {
        document.head.removeChild(scriptElement);
      }
      // Clean up any global variables
      delete window.zE;
      delete window.zESettings;
    };
  }, []);

  return null; // This component doesn't render any visible elements
}