"use client";

import React from 'react';
import Image from 'next/image';

interface SunfruitLogoProps {
  className?: string;
}

export default function SunfruitLogo({ className = "" }: SunfruitLogoProps) {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Image
        src="/images/Sunfruit_Green_Logo.svg"
        alt="Sunfruit"
        width={120}
        height={32}
        className="h-6 w-auto sm:h-7 lg:h-8"
        priority // Logo is above the fold
        style={{
          height: 'auto',
          width: 'auto',
          maxHeight: '32px',
          minHeight: '24px',
        }}
      />
    </div>
  );
}