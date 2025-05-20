"use client";

import React from 'react';

interface SunfruitLogoProps {
  className?: string;
}

export default function SunfruitLogo({ className = "" }: SunfruitLogoProps) {
  return (
    <div 
      className={`inline-block ${className}`}
      style={{ 
        // Preserve dimensions while ensuring crisp rendering
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Force high-quality rendering
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'subpixel-antialiased'
      }}
    >
      <object
        type="image/svg+xml"
        data="/images/Sunfruit_Green_Logo.svg"
        className="h-6 w-auto sm:h-7 lg:h-8"
        aria-label="Sunfruit"
        style={{
          // Additional rendering optimizations
          imageRendering: 'crisp-edges',
          filter: 'none'
        }}
      >
        {/* Fallback for browsers that don't support object */}
        <img
          src="/images/Sunfruit_Green_Logo.svg"
          alt="Sunfruit"
          className="h-6 w-auto sm:h-7 lg:h-8"
          style={{
            imageRendering: 'crisp-edges',
            filter: 'none'
          }}
        />
      </object>
    </div>
  );
}