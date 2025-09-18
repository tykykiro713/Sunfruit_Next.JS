'use client';

import { useCustomer } from '@/context/CustomerContext';
import { useEffect, useState } from 'react';

export default function SubscriptionsPage() {
  const { customer } = useCustomer();
  const [portalUrl, setPortalUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!customer) return;

    const generatePortalUrl = async () => {
      try {
        // Call your backend API to get the authenticated portal URL
        const response = await fetch('/api/recharge/portal-url', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: customer.email,
            customer_id: customer.id,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to get portal URL');
        }

        const data = await response.json();
        console.log('Portal API response:', data);
        
        if (data.portalUrl) {
          // Add embedded parameter to the URL
          const embeddedUrl = data.portalUrl.includes('?') 
            ? `${data.portalUrl}&embedded=true`
            : `${data.portalUrl}?embedded=true`;
          
          console.log('Final iframe URL:', embeddedUrl);
          setPortalUrl(embeddedUrl);
        } else if (data.warning) {
          console.warn('Portal warning:', data.warning);
          setPortalUrl(data.portalUrl || '');
        } else {
          throw new Error('No portal URL returned');
        }
      } catch (error) {
        console.error('Error generating portal URL:', error);
        setError('Unable to load subscription portal. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    generatePortalUrl();
  }, [customer]);

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Please log in to view your subscriptions.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emeraldgreen-500 mx-auto"></div>
          <p className="mt-4">Loading your subscriptions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-emeraldgreen-500 text-white rounded hover:bg-brightgreen-500"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Your site header/navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-emeraldgreen-500">
                sunfruit
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <a href="/account" className="text-gray-600 hover:text-emeraldgreen-500">
                Account
              </a>
              <a href="/account/orders" className="text-gray-600 hover:text-emeraldgreen-500">
                Orders
              </a>
              <span className="text-emeraldgreen-500 font-medium">Subscriptions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Recharge Portal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-sm">
          <iframe
            src={portalUrl}
            width="100%"
            height="800"
            style={{ border: 'none', minHeight: '800px' }}
            title="Manage Subscriptions"
            loading="lazy"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
}