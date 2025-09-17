'use client';

import React from 'react';
import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

export type PurchaseOption = {
  id: string;
  title: string;
  description: string;
  value: 'one-time' | 'subscription';
  discountPercentage?: number;
  deliveryFrequency?: string;
};

interface SubscriptionSelectorProps {
  options: PurchaseOption[];
  selectedOption: PurchaseOption;
  onChange: (option: PurchaseOption) => void;
}

export default function SubscriptionSelector({ 
  options, 
  selectedOption, 
  onChange 
}: SubscriptionSelectorProps) {

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Purchase Options</h3>
        {selectedOption.discountPercentage && (
          <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-emeraldgreen-700">
            Save {selectedOption.discountPercentage}%
          </span>
        )}
      </div>


      <RadioGroup value={selectedOption} onChange={onChange} className="mt-2">
        <RadioGroup.Label className="sr-only">Choose a purchase option</RadioGroup.Label>
        <div className="grid grid-cols-1 gap-y-3">
          {options.map((option) => (
            <RadioGroup.Option
              key={option.id}
              value={option}
              className={({ checked, active }) =>
                `relative flex cursor-pointer rounded-lg border p-4 focus:outline-none ${
                  checked
                    ? 'border-emeraldgreen-500 bg-emeraldgreen-50'
                    : 'border-gray-300'
                } ${active ? 'ring-2 ring-emeraldgreen-500 ring-offset-2' : ''}`
              }
            >
              {({ checked, active }) => (
                <>
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className="font-medium text-gray-900"
                        >
                          {option.title}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="p"
                          className="text-gray-500"
                        >
                          {option.description}
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <CheckCircleIcon
                        className="h-5 w-5 text-emeraldgreen-600"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                  {active && (
                    <span
                      className="pointer-events-none absolute -inset-px rounded-lg ring-2 ring-emeraldgreen-500"
                      aria-hidden="true"
                    />
                  )}
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}