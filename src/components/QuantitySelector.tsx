'use client';

import { RadioGroup } from '@headlessui/react';

interface QuantityOption {
  id: string;
  quantity: number;
  label: string;
  sticks: number;
}

interface QuantitySelectorProps {
  selectedQuantity: number;
  onChange: (quantity: number) => void;
}

const quantityOptions: QuantityOption[] = [
  { id: '1-tin', quantity: 1, label: '1 Tin', sticks: 15 },
  { id: '2-tins', quantity: 2, label: '2 Tins', sticks: 30 },
  { id: '3-tins', quantity: 3, label: '3 Tins', sticks: 45 },
];

export default function QuantitySelector({ selectedQuantity, onChange }: QuantitySelectorProps) {
  const selectedOption = quantityOptions.find(opt => opt.quantity === selectedQuantity) || quantityOptions[0];

  return (
    <div className="mb-4">
      <RadioGroup value={selectedOption} onChange={(option) => onChange(option.quantity)}>
        <RadioGroup.Label className="sr-only">Choose quantity</RadioGroup.Label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {quantityOptions.map((option) => (
            <RadioGroup.Option
              key={option.id}
              value={option}
              className={({ checked }) =>
                `relative flex cursor-pointer rounded-lg border-2 p-3 sm:p-4 focus:outline-none ${
                  checked
                    ? 'border-emeraldgreen-500 bg-emeraldgreen-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`
              }
            >
              {({ checked }) => (
                <div className="flex w-full flex-col items-center justify-center text-center">
                  <RadioGroup.Label className="text-sm sm:text-base font-semibold text-emeraldgreen-500">
                    {option.label}
                  </RadioGroup.Label>
                  <RadioGroup.Description className="text-xs sm:text-sm text-gray-500 mt-1">
                    {option.sticks} sticks
                  </RadioGroup.Description>
                </div>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}