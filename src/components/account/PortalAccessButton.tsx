'use client';

import { useCustomer } from '@/context/CustomerContext';
import { useState } from 'react';

interface PortalAccessButtonProps {
  onError?: (error: string) => void;
}

export default function PortalAccessButton({ onError }: PortalAccessButtonProps) {
  const { customer } = useCustomer();
  const [isLoading, setIsLoading] = useState(false);

  const handlePortalAccess = async () => {
    if (!customer) {
      onError?.("You don't have any subscriptions to manage. If you believe you have active subscriptions, please contact our customer support team.");
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('🔐 Redirecting to embedded subscription portal...', { email: customer.email });
      
      // Redirect to your embedded subscriptions page
      window.location.href = '/account/subscriptions';
      
    } catch (error) {
      console.error('❌ Redirect failed:', error);
      onError?.('Unable to access the subscription portal. Please try again later or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handlePortalAccess}
      disabled={!customer || isLoading}
      className={`w-full flex items-center justify-center px-4 py-4 rounded-md text-base font-medium text-white transition-colors ${
        !customer || isLoading
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-emeraldgreen-500 hover:bg-brightgreen-500 focus:outline-none focus:ring-2 focus:ring-emeraldgreen-500'
      }`}
    >
      {isLoading ? 'Loading...' : 'Manage Subscriptions'}
    </button>
  );
}