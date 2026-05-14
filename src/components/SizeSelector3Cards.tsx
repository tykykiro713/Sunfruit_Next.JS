'use client';

import { RadioGroup } from '@headlessui/react';
import { ProductSize, SizeOption, SIZE_OPTIONS } from '@/lib/productUtils';

interface SizeSelector3CardsProps {
  selectedSize: ProductSize;
  onChange: (size: ProductSize) => void;
  availableSizes?: ProductSize[];
}

export default function SizeSelector3Cards({
  selectedSize,
  onChange,
  availableSizes = ['sample', '24pack', '48pack'],
}: SizeSelector3CardsProps) {
  const displayOptions = SIZE_OPTIONS.filter(opt => availableSizes.includes(opt.id));
  const selectedOption = displayOptions.find(opt => opt.id === selectedSize) || displayOptions[0];

  return (
    <div className="mb-4">
      <RadioGroup
        value={selectedOption}
        onChange={(option: SizeOption) => onChange(option.id)}
      >
        <RadioGroup.Label className="sr-only">Choose size</RadioGroup.Label>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {displayOptions.map((option) => (
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
              {() => (
                <div className="flex w-full flex-col items-center justify-center text-center">
                  <RadioGroup.Label
                    as="span"
                    className="text-sm sm:text-base font-semibold text-emeraldgreen-500"
                  >
                    {option.name}
                  </RadioGroup.Label>
                  <RadioGroup.Description
                    as="span"
                    className="mt-1 text-xs sm:text-sm text-gray-500"
                  >
                    {option.description}
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
