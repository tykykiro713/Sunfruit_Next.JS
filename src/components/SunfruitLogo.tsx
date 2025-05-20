"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image'; // Using Next.js Image to resolve ESLint warning

interface SunfruitLogoProps {
  className?: string;
}

export default function SunfruitLogo({ className = "" }: SunfruitLogoProps) {
  const logoRef = useRef<HTMLObjectElement>(null);

  // Preload the SVG to improve performance
  useEffect(() => {
    // Apply inline SVG optimization
    const preloadLogo = () => {
      // Create link for preload
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = '/images/Sunfruit_Green_Logo.svg';
      link.as = 'image';
      link.type = 'image/svg+xml';
      document.head.appendChild(link);
    };
    
    preloadLogo();
    
    // Fix: Store ref value in variable to avoid React Hook exhaustive-deps warning
    const currentLogoRef = logoRef.current;
    
    // Monitor loading to avoid layout shifts
    if (currentLogoRef) {
      const updateLogoClass = () => {
        if (currentLogoRef && currentLogoRef.parentElement) {
          currentLogoRef.parentElement.classList.add('logo-loaded');
        }
      };
      
      currentLogoRef.addEventListener('load', updateLogoClass);
      
      return () => {
        // Use the stored variable in cleanup
        if (currentLogoRef) {
          currentLogoRef.removeEventListener('load', updateLogoClass);
        }
      };
    }
  }, []);

  return (
    <div 
      className={`inline-block ${className}`}
      style={{ 
        // Enforce consistent dimensions to prevent layout shifts
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '32px', // Fixed height to match h-8
        width: 'auto',
        // High-quality rendering optimizations
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        WebkitFontSmoothing: 'subpixel-antialiased'
      }}
    >
      {/* Using object tag for main SVG rendering */}
      <object
        ref={logoRef}
        type="image/svg+xml"
        data="/images/Sunfruit_Green_Logo.svg"
        className="h-6 w-auto sm:h-7 lg:h-8" 
        aria-label="Sunfruit"
        style={{
          // Set explicit dimensions to prevent layout shifts
          height: '32px',
          width: 'auto',
          // Optimization for SVG rendering
          imageRendering: 'crisp-edges',
          filter: 'none'
        }}
      >
        {/* Fallback for browsers that don't support object - Using Next.js Image */}
        <div style={{ width: '120px', height: '32px', position: 'relative' }}>
          <Image
            src="/images/Sunfruit_Green_Logo.svg"
            alt="Sunfruit"
            fill
            style={{
              objectFit: 'contain',
              imageRendering: 'crisp-edges',
              filter: 'none'
            }}
            sizes="120px"
            priority
          />
        </div>
      </object>
    </div>
  );
}