'use client';

import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { CartEdge } from '@/lib/cart'; // Import the CartEdge type

export default function CartDrawer() {
  const { 
    isCartOpen, 
    closeCart, 
    cart, 
    isLoading, 
    updateItem, 
    removeItem, 
    checkout,
    cartCount,
    subscriptionItems
  } = useCart();

  function formatPrice(amount: string, currencyCode: string) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
    }).format(parseFloat(amount));
  }

  // Function to check if an item is a subscription
  function isSubscription(lineId: string) {
    return !!subscriptionItems[lineId];
  }

  // Function to get subscription details text
  function getSubscriptionText(lineId: string) {
    const item = subscriptionItems[lineId];
    if (!item) return null;
    
    return `${item.frequency} delivery${item.discountPercentage ? `, ${item.discountPercentage}% off` : ''}`;
  }

  // Function to calculate discounted price for subscription items
  function getDiscountedPrice(originalPrice: string, lineId: string, quantity: number) {
    const item = subscriptionItems[lineId];
    if (!item || !item.discountPercentage) {
      return parseFloat(originalPrice) * quantity;
    }
    
    const discountMultiplier = (100 - item.discountPercentage) / 100;
    return parseFloat(originalPrice) * quantity * discountMultiplier;
  }

  return (
    <Transition.Root show={isCartOpen} as={Fragment}>
      <Dialog as="div" className="relative z-40" onClose={closeCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={closeCart}
                          >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      {isLoading ? (
                        <div className="mt-20 flex justify-center">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-emeraldgreen-600" />
                        </div>
                      ) : cartCount === 0 || !cart?.lines?.edges ? (
                        <div className="mt-20 text-center">
                          <p className="text-gray-500">Your cart is empty</p>
                          <div className="mt-6">
                            <button
                              onClick={closeCart}
                              className="inline-flex items-center rounded-md border border-transparent bg-emeraldgreen-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-brightgreen-500"
                            >
                              Continue Shopping
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                              {cart.lines.edges.map(({ node }: CartEdge) => (
                                <li key={node.id} className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    {node.merchandise.image && (
                                      <Image
                                        src={node.merchandise.image.url}
                                        alt={node.merchandise.image.altText || ''}
                                        width={96}
                                        height={96}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    )}
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <Link href={`/products/${node.merchandise.product.handle}`} onClick={closeCart}>
                                            {node.merchandise.product.title}
                                          </Link>
                                        </h3>
                                        <div className="ml-4 text-right">
                                          {isSubscription(node.id) && subscriptionItems[node.id]?.discountPercentage ? (
                                            <div className="flex flex-col">
                                              <p className="text-sm text-gray-500 line-through">
                                                {formatPrice(
                                                  (parseFloat(node.merchandise.priceV2.amount) * node.quantity).toString(),
                                                  node.merchandise.priceV2.currencyCode
                                                )}
                                              </p>
                                              <p className="text-base font-medium text-gray-900">
                                                {formatPrice(
                                                  getDiscountedPrice(node.merchandise.priceV2.amount, node.id, node.quantity).toString(),
                                                  node.merchandise.priceV2.currencyCode
                                                )}
                                              </p>
                                            </div>
                                          ) : (
                                            <p className="text-base font-medium text-gray-900">
                                              {formatPrice(
                                                (parseFloat(node.merchandise.priceV2.amount) * node.quantity).toString(),
                                                node.merchandise.priceV2.currencyCode
                                              )}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {node.merchandise.title !== 'Default Title' ? node.merchandise.title : ''}
                                      </p>
                                      
                                      {/* Show subscription badge if this is a subscription item */}
                                      {isSubscription(node.id) && (
                                        <span className="inline-flex items-center mt-1 rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-emeraldgreen-700">
                                          {getSubscriptionText(node.id)}
                                        </span>
                                      )}
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <div className="flex items-center border border-gray-900 rounded">
                                        <button
                                          onClick={() => updateItem(node.id, Math.max(1, node.quantity - 1))}
                                          className="px-3 py-1 text-gray-900 hover:text-gray-800"
                                          disabled={node.quantity <= 1}
                                        >
                                          -
                                        </button>
                                        <span className="px-3 py-1 text-gray-900">{node.quantity}</span>
                                        <button
                                          onClick={() => updateItem(node.id, node.quantity + 1)}
                                          className="px-3 py-1 text-gray-900 hover:text-gray-800"
                                        >
                                          +
                                        </button>
                                      </div>

                                      <div className="flex">
                                        <button
                                          type="button"
                                          onClick={() => removeItem(node.id)}
                                          className="font-medium text-emeraldgreen-600 hover:text-brightgreen-500"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>

                    {cartCount > 0 && (cart?.cost?.subtotalAmount || cart?.estimatedCost?.totalAmount) && (
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <p>
                            {formatPrice(
                              cart?.cost?.subtotalAmount?.amount || cart.estimatedCost.totalAmount.amount,
                              cart?.cost?.subtotalAmount?.currencyCode || cart.estimatedCost.totalAmount.currencyCode
                            )}
                          </p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        
                        {/* Subscription information summary */}
                        {Object.keys(subscriptionItems).length > 0 && (
                          <div className="mt-2 rounded-md bg-green-50 p-2">
                            <p className="text-xs text-emeraldgreen-700">
                              Your cart includes subscription items that will renew automatically according to your selected schedule.
                            </p>
                          </div>
                        )}
                        
                        <div className="mt-6">
                          <button
                            onClick={checkout}
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-emeraldgreen-500 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-brightgreen-500"
                          >
                            Checkout
                          </button>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or{' '}
                            <button
                              type="button"
                              className="font-medium text-emeraldgreen-600 hover:text-brightgreen-500"
                              onClick={closeCart}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}