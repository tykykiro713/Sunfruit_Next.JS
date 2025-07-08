'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomer } from '@/context/CustomerContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';

interface OrderDetailClientProps {
  orderId: string;
}

export default function OrderDetailClient({ orderId }: OrderDetailClientProps) {
  const { customer, isLoggedIn, isLoading } = useCustomer();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push('/account/login');
    }
  }, [isLoading, isLoggedIn, router]);

  // Find the order in customer data if available
  const order = customer?.orders.edges.find(
    ({ node }) => node.id === orderId || node.orderNumber.toString() === orderId
  )?.node;

  // While checking authentication status, show a loading state
  if (isLoading) {
    return (
      <div>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-emeraldgreen-600"></div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-8 text-center">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">Order Details</h1>
              
              {order ? (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Order #{order.orderNumber}
                  </p>
                  <p className="text-sm text-gray-500">
                    For full order details including tracking information, please visit the Shopify order page.
                  </p>
                  <div className="flex justify-center space-x-4 mt-6">
                    <a
                      href={order.statusUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emeraldgreen-500 hover:bg-emeraldgreen-600"
                    >
                      View Full Order Details
                    </a>
                    <Link
                      href="/account/orders"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Back to Orders
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Order not found. This order may not be loaded in your current session.
                  </p>
                  <p className="text-sm text-gray-500">
                    Please return to the orders list to view your order history.
                  </p>
                  <Link
                    href="/account/orders"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emeraldgreen-500 hover:bg-emeraldgreen-600 mt-4"
                  >
                    Back to Orders
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}