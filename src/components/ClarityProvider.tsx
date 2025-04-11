'use client';

import clarity from '@microsoft/clarity';
import { useEffect } from 'react';

export function ClarityProvider() {
  useEffect(() => {
    // Check if we have a Clarity Project ID and we're not on localhost
    if (
      process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID &&
      typeof window !== 'undefined' &&
      window.location.hostname !== 'localhost' &&
      window.location.hostname !== '127.0.0.1'
    ) {
      clarity.init(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID);
    }
  }, []);
  
  return null;
}