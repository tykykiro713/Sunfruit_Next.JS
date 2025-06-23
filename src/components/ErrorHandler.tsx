'use client';

import { useEffect } from 'react';

export default function ErrorHandler() {
  useEffect(() => {
    // Suppress errors from browser extensions
    const handleError = (event: ErrorEvent) => {
      if (event.filename?.includes('extension://')) {
        event.preventDefault();
        return false;
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (event.reason?.stack?.includes('extension://')) {
        event.preventDefault();
        return false;
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
}