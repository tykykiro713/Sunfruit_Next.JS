"use client";

import React from 'react';

interface SunfruitLogoProps {
  className?: string;
}

export default function SunfruitLogo({ className = "" }: SunfruitLogoProps) {
  return (
    <div 
      className={`relative ${className}`}
      style={{ 
        // Fixed height to ensure consistent size
        height: '32px',
        width: 'auto',
        // Force high-quality rendering
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'subpixel-antialiased'
      }}
    >
      <object
        type="image/svg+xml"
        data="/images/Sunfruit_Green_Logo.svg"
        className="w-auto h-full"
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
          className="w-auto h-full"
          style={{
            imageRendering: 'crisp-edges',
            filter: 'none'
          }}
        />
      </object>
    </div>
  );
}