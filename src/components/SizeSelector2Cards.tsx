'use client';

import { RadioGroup } from '@headlessui/react';
import { ProductSize, SizeOption, SIZE_OPTIONS } from '@/lib/productUtils';

interface SizeSelector2CardsProps {
  selectedSize: ProductSize;
  onChange: (size: ProductSize) => void;
  availableSizes?: ProductSize[];
}

export default function SizeSelector2Cards({
  selectedSize,
  onChange,
  availableSizes = ['sample', '24pack']
}: SizeSelector2CardsProps) {
  // Filter to only show available sizes (72pack is filtered out by the parent — no tile for it).
  const displayOptions = SIZE_OPTIONS.filter(opt => availableSizes.includes(opt.id));

  // 72pack has no tile of its own — it's a 3-month cadence of the 24-pack bundle.
  // For tile highlighting purposes, treat it as 24pack so the "1 Tin" tile stays active.
  const tileSize: ProductSize = selectedSize === '72pack' ? '24pack' : selectedSize;
  const selectedOption = displayOptions.find(opt => opt.id === tileSize) || displayOptions[0];

  // When the highlighted tile doesn't match the true `selectedSize` (i.e. 3-Month is active,
  // which resolves to 72pack), we swap the tile's label/description to the actual selection's.
  // So the 24pack tile renders as "3 Tins / 72 sticks" when 3-Month is chosen.
  const actualSelectedOption = SIZE_OPTIONS.find(opt => opt.id === selectedSize);

  return (
    <div className="mb-4">
      <RadioGroup
        value={selectedOption}
        onChange={(option: SizeOption) => onChange(option.id)}
      >
        <RadioGroup.Label className="sr-only">Choose size</RadioGroup.Label>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {displayOptions.map((option) => (
            <RadioGroup.Option
              key={option.id}
              value={option}
              className={({ checked }) =>
                `relative flex cursor-pointer rounded-lg border-2 p-4 sm:p-5 min-h-[72px] sm:min-h-[84px] focus:outline-none ${
                  checked
                    ? 'border-emeraldgreen-500 bg-emeraldgreen-50'
                    : 'border-gray-300 bg-white hover:border-gray-400'
                }`
              }
            >
              {({ checked }) => {
                // If this is the highlighted tile and the real selection is a
                // "virtual" size (72pack under the 24pack tile), show the real
                // selection's label/description instead of the tile's own.
                const shouldSwap = checked && actualSelectedOption && actualSelectedOption.id !== option.id;
                const displayName = shouldSwap ? actualSelectedOption!.name : option.name;
                const displayDescription = shouldSwap ? actualSelectedOption!.description : option.description;

                return (
                  <div className="flex w-full flex-col items-center justify-center text-center">
                    <RadioGroup.Label
                      as="span"
                      className="text-base sm:text-lg font-semibold text-emeraldgreen-500 transition-opacity duration-150"
                      key={`name-${displayName}`}
                    >
                      {displayName}
                    </RadioGroup.Label>
                    <span
                      className="mt-1 text-sm sm:text-base text-gray-600 transition-opacity duration-150"
                      key={`desc-${displayDescription}`}
                    >
                      {displayDescription}
                    </span>
                  </div>
                );
              }}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
