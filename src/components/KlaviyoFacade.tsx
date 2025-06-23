// Smart facade for pre-launch email capture
// ========================================
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Lazy load the real Klaviyo provider
const KlaviyoProvider = dynamic(
  () => import('@/components/KlaviyoProvider').then(mod => mod.KlaviyoProvider).catch(() => () => null),
  { 
    ssr: false,
    loading: () => null
  }
);

interface KlaviyoFacadeProps {
  triggerText: string;
  buttonClassName?: string;
  onClick?: () => void;
  formId?: string; // Klaviyo form ID
}

export function KlaviyoFacade({ 
  triggerText, 
  buttonClassName,
  onClick,
  formId = process.env.NEXT_PUBLIC_KLAVIYO_FORM_ID
}: KlaviyoFacadeProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldTrigger, setShouldTrigger] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Track analytics
    if (window.gtag) {
      window.gtag('event', 'prelaunch_cta_click', {
        button_text: triggerText
      });
    }
    
    // Call any additional onClick handler
    onClick?.();
    
    if (!isLoaded && !isLoading) {
      setIsLoading(true);
      setShouldTrigger(true);
    } else if (isLoaded && window.klaviyo && formId) {
      // Klaviyo is loaded, trigger the form
      window.klaviyo.push(['openForm', formId]);
    }
  };

  // When Klaviyo loads, trigger the form
  useEffect(() => {
    if (isLoaded && shouldTrigger && window.klaviyo && formId) {
      window.klaviyo.push(['openForm', formId]);
      setShouldTrigger(false);
    }
  }, [isLoaded, shouldTrigger, formId]);

  // Monitor when Klaviyo actually loads
  useEffect(() => {
    if (isLoading) {
      const checkInterval = setInterval(() => {
        if (window.klaviyo || window._klOnsite) {
          setIsLoaded(true);
          setIsLoading(false);
          clearInterval(checkInterval);
        }
      }, 100);

      // Timeout after 5 seconds
      const timeout = setTimeout(() => {
        clearInterval(checkInterval);
        setIsLoading(false);
        console.error('Klaviyo failed to load');
      }, 5000);

      return () => {
        clearInterval(checkInterval);
        clearTimeout(timeout);
      };
    }
  }, [isLoading]);

  return (
    <>
      <button
        onClick={handleClick}
        className={buttonClassName}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="inline-flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </span>
        ) : (
          triggerText
        )}
      </button>
      
      {/* Only load Klaviyo when needed */}
      {isLoading && <KlaviyoProvider />}
    </>
  );
}