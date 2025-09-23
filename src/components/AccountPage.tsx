'use client';

import React, { useState } from 'react';
import { useCustomer } from '@/context/CustomerContext';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import RechargePortalAccess from './account/RechargePortalAccess';

export default function AccountPage() {
  const { customer, isLoggedIn, isLoading, logout } = useCustomer();
  const router = useRouter();
  const [subscriptionError, setSubscriptionError] = useState('');

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push('/');
  };

  // If still loading, show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-emeraldgreen-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    router.push('/account/login');
    return null;
  }

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

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Account Header */}
          <div className="px-6 py-8 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">My Account</h1>
                <p className="mt-1 text-sm text-gray-500">
                  Welcome back, {customer?.firstName || customer?.displayName || customer?.email}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-500 hover:bg-gray-800 rounded-md"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="px-6 py-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Manage Your Account</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/account/orders"
                className="px-4 py-4 bg-emeraldgreen-500 hover:bg-brightgreen-500 rounded-md flex items-center justify-center"
              >
                <span className="text-white font-medium">Order History</span>
              </Link>
              <Link
                href="/account/addresses"
                className="px-4 py-4 bg-emeraldgreen-500 hover:bg-brightgreen-500 rounded-md flex items-center justify-center"
              >
                <span className="text-white font-medium">Saved Addresses</span>
              </Link>
              <Link
                href="/account/settings"
                className="px-4 py-4 bg-emeraldgreen-500 hover:bg-brightgreen-500 rounded-md flex items-center justify-center"
              >
                <span className="text-white font-medium">Profile Settings</span>
              </Link>
              <RechargePortalAccess />
            </div>
            
            {/* Subscription Error Message */}
            {subscriptionError && (
              <div className="mt-4 p-3 rounded-md bg-yellow-50 border border-yellow-200 text-center">
                <p className="text-sm text-yellow-800">{subscriptionError}</p>
              </div>
            )}
          </div>

          {/* Recent Orders */}
          <div className="px-6 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
              <Link href="/account/orders" className="text-sm text-emeraldgreen-600 hover:text-emeraldgreen-500">
                View all orders
              </Link>
            </div>

            {customer && customer.orders.edges.length > 0 ? (
              <div className="space-y-6">
                {customer.orders.edges.slice(0, 3).map(({ node: order }) => (
                  <div key={order.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex flex-wrap justify-between items-center mb-2">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Order #{order.orderNumber}
                        </p>
                        <p className="text-xs text-gray-500">
                          Placed on {formatDate(order.processedAt)}
                        </p>
                      </div>
                      <div className="flex space-x-3">
                        <span className="text-sm font-medium text-gray-900">
                          {formatPrice(
                            order.totalPrice.amount,
                            order.totalPrice.currencyCode
                          )}
                        </span>
                        <a
                          href={order.statusUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-emeraldgreen-600 hover:text-emeraldgreen-500"
                        >
                          View Details
                        </a>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {order.lineItems.edges.slice(0, 3).map(({ node: item }, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          {item.variant?.image && (
                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <Image
                                src={item.variant.image.url}
                                alt={item.variant.image.altText || item.title}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                          )}
                          <div className="flex-1 text-sm">
                            <p className="font-medium text-gray-900">{item.title}</p>
                            <p className="text-gray-500">Qty {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                      {order.lineItems.edges.length > 3 && (
                        <div className="text-xs text-gray-500 self-end">
                          + {order.lineItems.edges.length - 3} more items
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-gray-500">You haven&apos;t placed any orders yet.</p>
                <Link
                  href="/"
                  className="mt-2 inline-block text-sm text-emeraldgreen-600 hover:text-emeraldgreen-500"
                >
                  Start shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}