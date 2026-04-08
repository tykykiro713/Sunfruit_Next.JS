'use client';

import React from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';

interface SampleOptionDisplayProps {
  flavorName: string;
}

export default function SampleOptionDisplay({ flavorName }: SampleOptionDisplayProps) {
  return (
    <div className="mt-8">
      <div className="relative rounded-lg border-2 border-emeraldgreen-500 bg-emeraldgreen-50 p-4">
        {/* FREE Badge */}
        <div className="absolute -top-2 right-4">
          <span className="inline-flex items-center rounded-md bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800 border border-amber-200">
            FREE
          </span>
        </div>

        <div className="flex w-full items-start">
          <div className="flex-1">
            {/* Title */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                FREE SAMPLE PACK
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Try our delicious {flavorName} before committing
              </p>
            </div>

            {/* Benefits with checkmarks */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emeraldgreen-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">3 {flavorName} samples</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emeraldgreen-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">Try before you buy</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emeraldgreen-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">Just pay $5 shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="w-4 h-4 text-emeraldgreen-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">Samples ship today!</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
