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
  // Per-option overrides (used when an option references a different variant
  // than the default `productPrice`/`stickCount` props — e.g. 3-Month uses 72-pack).
  basePrice?: string;
  stickCount?: number;
  hideBenefits?: boolean;
  badgeLabel?: string;
  // First bullet in the benefits list — e.g. "1 Tin delivered monthly",
  // "3 Tins delivered every 3 months". Per-option so each cadence shows accurate copy.
  deliveryLabel?: string;
};

interface SubscriptionMonthly3MonthCardsProps {
  options: PurchaseOptionV2[];
  selectedOption: PurchaseOptionV2;
  onChange: (option: PurchaseOptionV2) => void;
  productPrice?: string;
  quantity?: number;
  stickCount?: number;
}

export default function SubscriptionMonthly3MonthCards({
  options,
  selectedOption,
  onChange,
  productPrice,
  quantity = 1,
  stickCount = 24,
}: SubscriptionMonthly3MonthCardsProps) {
  
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
  const getPerServingPrice = (totalPrice: string, servings: number = 24) => {
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
          const showBenefits = isSubscription && !option.hideBenefits;

          // Use per-option basePrice/stickCount if set (e.g. 3-Month uses 72-pack price),
          // otherwise fall back to the component-level props.
          const effectiveBasePrice = option.basePrice ?? productPrice;
          const effectiveStickCount = option.stickCount ?? stickCount;

          const unitPrice = effectiveBasePrice ? parseFloat(effectiveBasePrice) : 38.40;
          const oneTimePrice = unitPrice * quantity;

          // Apply subscription discount if applicable
          const discountPercentage = isSubscription ? (option.discountPercentage || 30) : 0;
          const totalPrice = isSubscription
            ? oneTimePrice * (1 - discountPercentage / 100)
            : oneTimePrice;

          // Calculate per stick pricing for display
          const pricePerStick = totalPrice / effectiveStickCount;

          const savingsAmount = isSubscription
            ? oneTimePrice - totalPrice
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
                  {/* Per-option badge — only rendered on the currently-checked option,
                      so the badge always reflects the user's active selection. */}
                  {checked && option.badgeLabel && (
                    <div className="absolute -top-2 right-4">
                      <span className="inline-flex items-center rounded-md bg-brightgreen-500 px-3 py-1 text-xs font-medium text-emeraldgreen-800 border border-brightgreen-600">
                        {option.badgeLabel}
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

                        {/* Benefits for Subscription (per-option opt-out via hideBenefits).
                            First bullet is option-specific (delivery cadence + quantity),
                            remaining bullets are shared across all subscription cadences. */}
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