'use client';

import clarity from '@microsoft/clarity';
import { useEffect } from 'react';

export function ClarityProvider() {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID) {
      clarity.init(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID);
    }
  }, []);
  
  return null;
}