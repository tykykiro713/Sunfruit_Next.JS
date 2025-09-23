import { useState } from 'react';
import { RechargeAuth } from '@/lib/recharge/auth';
import { saveSession } from '@/lib/recharge/session';

export function useRechargeAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = new RechargeAuth();

  const sendCode = async (email: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const sessionToken = await auth.sendVerificationCode(email);
      return sessionToken;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to send code';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const validateAndRedirect = async (
    email: string, 
    sessionToken: string, 
    code: string
  ) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const portalUrl = await auth.validateCodeAndGetPortal(email, sessionToken, code);
      
      // Save session
      saveSession({ email, sessionToken });
      
      // Track successful access
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'recharge_portal_access', {
          method: 'passwordless',
          success: true
        });
      }
      
      // Redirect to portal
      window.location.href = portalUrl;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid code';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => setError(null);

  return {
    sendCode,
    validateAndRedirect,
    isLoading,
    error,
    clearError
  };
}