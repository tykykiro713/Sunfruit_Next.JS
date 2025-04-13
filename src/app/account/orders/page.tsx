'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCustomer } from '@/context/CustomerContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';

export default function OrdersPage() {
  const { customer, isLoggedIn, isLoading } = useCustomer();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not logged in and not currently loading
    if (!isLoading && !isLoggedIn) {
      router.push('/account/login');
    }
  }, [isLoading, isLoggedIn, router]);

  // Format date for readability
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format price
  const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount));
  };

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

  // Only render order history if logged in
  if (!isLoggedIn) {
    return null; // Will redirect due to useEffect
  }

  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <h1 className="text-xl font-medium text-gray-900">Order History</h1>
                <Link href="/account" className="text-sm text-emeraldgreen-600 hover:text-emeraldgreen-500">
                  Back to Account
                </Link>
              </div>
            </div>

            {/* Orders List */}
            <div className="px-6 py-4">
              {customer && customer.orders.edges.length > 0 ? (
                <div className="space-y-6">
                  {customer.orders.edges.map(({ node: order }) => (
                    <div key={order.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition duration-150">
                      <div className="flex flex-wrap justify-between items-center mb-4">
                        <div>
                          <p className="text-lg font-medium text-gray-900">
                            Order #{order.orderNumber}
                          </p>
                          <p className="text-sm text-gray-500">
                            Placed on {formatDate(order.processedAt)}
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-lg font-medium text-gray-900">
                            {formatPrice(
                              order.totalPrice.amount,
                              order.totalPrice.currencyCode
                            )}
                          </span>
                          <a
                            href={order.statusUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-emeraldgreen-500 hover:bg-emeraldgreen-600"
                          >
                            View Details
                          </a>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.lineItems.edges.map(({ node: item }, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            {item.variant?.image && (
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <Image
                                  src={item.variant.image.url}
                                  alt={item.variant.image.altText || item.title}
                                  width={64}
                                  height={64}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                            )}
                            <div className="flex-1 text-sm">
                              <p className="font-medium text-gray-900">{item.title}</p>
                              <p className="text-gray-500">Qty {item.quantity}</p>
                              {item.variant?.price && (
                                <p className="text-gray-500">
                                  {formatPrice(
                                    item.variant.price.amount,
                                    item.variant.price.currencyCode
                                  )}
                                </p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No order history</h3>
                  <p className="mt-1 text-sm text-gray-500">You haven&apos;t placed any orders yet.</p>
                  <div className="mt-6">
                    <Link
                      href="/"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emeraldgreen-500 hover:bg-emeraldgreen-600"
                    >
                      Start Shopping
                    </Link>
                  </div>
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