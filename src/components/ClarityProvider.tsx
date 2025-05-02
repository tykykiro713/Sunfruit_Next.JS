'use client';

import clarity from '@microsoft/clarity';
import { useEffect, useState } from 'react';

export function ClarityProvider() {
  const [clarityLoaded, setClarityLoaded] = useState(false);
  
  useEffect(() => {
    // Function to initialize Clarity
    const initClarity = () => {
      // Check if we have a Clarity Project ID and we're not on localhost
      if (
        process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID &&
        typeof window !== 'undefined' &&
        window.location.hostname !== 'localhost' &&
        window.location.hostname !== '127.0.0.1' &&
        !clarityLoaded
      ) {
        clarity.init(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID);
        setClarityLoaded(true);
      }
    };
    
    // Load Clarity after everything else is loaded and user has had time to interact
    if (document.readyState === 'complete') {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(() => {
          // Add a small delay to prioritize other critical resources
          setTimeout(initClarity, 1500);
        });
      } else {
        setTimeout(initClarity, 2500);
      }
    } else {
      window.addEventListener('load', () => {
        setTimeout(initClarity, 1500);
      });
      return () => {
        window.removeEventListener('load', () => {
          setTimeout(initClarity, 1500);
        });
      };
    }
  }, [clarityLoaded]);
  
  return null;
}