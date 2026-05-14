'use client';

import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/20/solid';

export type PurchaseOption = {
  id: string;
  title: string;
  description: string;
  value: 'one-time' | 'subscription';
  discountPercentage?: number;
  deliveryFrequency?: string;
  basePrice?: string;
  stickCount?: number;
  badgeLabel?: string;
  deliveryLabel?: string;
  hideBenefits?: boolean;
};

interface SubscriptionMonthlyOneTimeCardsProps {
  options: PurchaseOption[];
  selectedOption: PurchaseOption;
  onChange: (option: PurchaseOption) => void;
  productPrice?: string;
  quantity?: number;
  stickCount?: number;
}

export default function SubscriptionMonthlyOneTimeCards({
  options,
  selectedOption,
  onChange,
  productPrice,
  quantity = 1,
  stickCount = 24,
}: SubscriptionMonthlyOneTimeCardsProps) {
  return (
    <div className="mt-8">
      <RadioGroup value={selectedOption} onChange={onChange} className="space-y-3">
        <RadioGroup.Label className="sr-only">Choose a purchase option</RadioGroup.Label>

        {options.map((option) => {
          const isSubscription = option.value === 'subscription';
          const showBenefits = isSubscription && !option.hideBenefits;

          const effectiveBasePrice = option.basePrice ?? productPrice;
          const effectiveStickCount = option.stickCount ?? stickCount;

          const unitPrice = effectiveBasePrice ? parseFloat(effectiveBasePrice) : 38.40;
          const oneTimePrice = unitPrice * quantity;

          const discountPercentage = isSubscription ? (option.discountPercentage || 30) : 0;
          const totalPrice = isSubscription
            ? oneTimePrice * (1 - discountPercentage / 100)
            : oneTimePrice;

          const pricePerStick = totalPrice / effectiveStickCount;

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
                  {checked && option.badgeLabel && (
                    <div className="absolute -top-2 right-4">
                      <span className="inline-flex items-center rounded-md bg-brightgreen-500 px-3 py-1 text-xs font-medium text-emeraldgreen-800 border border-brightgreen-600">
                        {option.badgeLabel}
                      </span>
                    </div>
                  )}

                  <div className="flex w-full items-start justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            checked
                              ? 'border-emeraldgreen-500 bg-emeraldgreen-500'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          {checked && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                      </div>

                      <div className="ml-3 flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                          <div className="flex-1">
                            <RadioGroup.Label className="text-lg font-semibold text-gray-900">
                              {option.title}
                            </RadioGroup.Label>
                            <div className="flex items-center gap-2 mt-1">
                              {isSubscription && option.discountPercentage ? (
                                <>
                                  <span className="text-gray-500 line-through text-base">
                                    ${oneTimePrice.toFixed(2)}
                                  </span>
                                  <span className="text-lg font-semibold text-emeraldgreen-500">
                                    ${totalPrice.toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-lg font-semibold text-emeraldgreen-500">
                                  ${totalPrice.toFixed(2)}
                                </span>
                              )}
                              <span className="text-xs text-gray-500">
                                (${pricePerStick.toFixed(2)} / Stick)
                              </span>
                            </div>
                          </div>
                        </div>

                        {showBenefits && (
                          <div className="space-y-2 mb-3">
                            {option.deliveryLabel && (
                              <div className="flex items-center gap-2">
                                <CheckIcon className="w-4 h-4 text-emeraldgreen-600 flex-shrink-0" />
                                <span className="text-sm text-gray-700">{option.deliveryLabel}</span>
                              </div>
                            )}
                            <div className="flex items-center gap-2">
                              <CheckIcon className="w-4 h-4 text-emeraldgreen-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">Free Shipping</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckIcon className="w-4 h-4 text-emeraldgreen-600 flex-shrink-0" />
                              <span className="text-sm text-gray-700">Pause or cancel anytime</span>
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
