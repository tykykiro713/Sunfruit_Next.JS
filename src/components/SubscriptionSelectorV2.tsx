'use client';

import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';

export type PurchaseOptionV2 = {
  id: string;
  title: string;
  description: string;
  value: 'one-time' | 'subscription';
  discountPercentage?: number;
  deliveryFrequency?: string;
  savings?: string;
  perServing?: string;
};

interface SubscriptionSelectorV2Props {
  options: PurchaseOptionV2[];
  selectedOption: PurchaseOptionV2;
  onChange: (option: PurchaseOptionV2) => void;
  productPrice?: string;
  quantity?: number;
}

export default function SubscriptionSelectorV2({ 
  options, 
  selectedOption, 
  onChange,
  productPrice,
  quantity = 1 
}: SubscriptionSelectorV2Props) {
  
  // Format price to currency
  const formatPrice = (amount: string) => {
    const price = parseFloat(amount);
    return `$${price.toFixed(2)}`;
  };

  // Calculate discounted price
  const getDiscountedPrice = (originalPrice: string, discountPercentage: number) => {
    const price = parseFloat(originalPrice);
    const discountMultiplier = (100 - discountPercentage) / 100;
    return (price * discountMultiplier).toFixed(2);
  };

  // Calculate per serving price
  const getPerServingPrice = (totalPrice: string, servings: number = 20) => {
    const price = parseFloat(totalPrice);
    return (price / servings).toFixed(2);
  };

  // Calculate savings amount
  const getSavingsAmount = (originalPrice: string, discountPercentage: number) => {
    const price = parseFloat(originalPrice);
    const savings = price * (discountPercentage / 100);
    return savings.toFixed(0);
  };

  return (
    <div className="mt-8">
      <RadioGroup value={selectedOption} onChange={onChange} className="space-y-3">
        <RadioGroup.Label className="sr-only">Choose a purchase option</RadioGroup.Label>
        
        {options.map((option) => {
          const isSubscription = option.value === 'subscription';
          
          // Fixed price per stick
          const pricePerStick = isSubscription ? 1.09 : 1.56;
          
          // Calculate total based on sticks
          const sticksPerTin = 15;
          const totalSticks = quantity * sticksPerTin;
          const totalPrice = totalSticks * pricePerStick;
          
          // For display purposes (crossed out price on subscription)
          const oneTimeTotalPrice = totalSticks * 1.56;
          
          const savingsAmount = isSubscription 
            ? oneTimeTotalPrice - totalPrice
            : 0;

          return (
            <RadioGroup.Option
              key={option.id}
              value={option}
              className={({ checked }) =>
                `relative flex cursor-pointer rounded-lg border-2 p-4 focus:outline-none ${
                  checked
                    ? 'border-emeraldgreen-500 bg-emeraldgreen-50'
                    : 'border-gray-300 bg-white'
                }`
              }
            >
              {({ checked }) => (
                <>
                  {/* Best Value Badge */}
                  {isSubscription && (
                    <div className="absolute -top-2 right-4">
                      <span className="inline-flex items-center rounded-md bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 border border-amber-200">
                        Best value
                      </span>
                    </div>
                  )}

                  <div className="flex w-full items-start justify-between">
                    <div className="flex items-start">
                      {/* Radio Button */}
                      <div className="flex items-center h-5">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            checked
                              ? 'border-emeraldgreen-500 bg-emeraldgreen-500'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {checked && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                      </div>

                      <div className="ml-3 flex-1">
                        {/* Title and Price */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <div className="flex-1">
                            <RadioGroup.Label className="text-lg font-semibold text-gray-900">
                              {option.title}
                            </RadioGroup.Label>
                            <div className="flex items-center gap-2 mt-1">
                              {isSubscription ? (
                                <>
                                  <span className="text-gray-500 line-through text-base">
                                    ${oneTimeTotalPrice.toFixed(2)}
                                  </span>
                                  <span className="text-lg font-semibold text-emeraldgreen-500">
                                    ${totalPrice.toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="text-lg font-semibold text-emeraldgreen-500">
                                    ${totalPrice.toFixed(2)}
                                  </span>
                                </>
                              )}
                              <span className="text-xs text-gray-500">
                                (${pricePerStick.toFixed(2)} / Stick)
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Benefits for Subscription */}
                        {isSubscription && (
                          <div className="space-y-2 mb-3">
                            <div className="flex items-center gap-2">
                              <CheckIcon className="w-4 h-4 text-emeraldgreen-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">Save ${savingsAmount.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckIcon className="w-4 h-4 text-emeraldgreen-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">Convenient monthly delivery</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckIcon className="w-4 h-4 text-emeraldgreen-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">Easily change your flavors or quantities</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckIcon className="w-4 h-4 text-emeraldgreen-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">Cancel any time</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckIcon className="w-4 h-4 text-emeraldgreen-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">Pre-shipment reminders (no surprise charges)</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </RadioGroup.Option>
          );
        })}
      </RadioGroup>

    </div>
  );
}