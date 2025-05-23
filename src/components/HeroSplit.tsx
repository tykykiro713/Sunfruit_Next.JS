// src/components/HeroSplit.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HeroSplit() {
  const [isMobile, setIsMobile] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Function to determine if viewport is mobile
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint in Tailwind
    };

    // Set initial value
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Preload hero images for better performance
  useEffect(() => {
    // Preload the most critical images
    const preloadImages = () => {
      const imagesToPreload = [
        '/images/Grapefruit_3.png',
        isMobile ? '/images/Grapefruit.png' : '/images/grapefruit-poster.jpg'
      ];
      
      imagesToPreload.forEach(src => {
        // Fix: Create the Image with proper HTML image element
        const img = new window.Image();
        img.src = src;
      });
    };
    
    preloadImages();
  }, [isMobile]);

  return (
    <section className="w-full flex flex-col md:flex-row">
      {/* Image Section */}
      <div className="relative w-full aspect-square md:aspect-auto md:w-1/2">
        <Image
          src="/images/Grapefruit_3.png"
          alt="Hero Right"
          width={800}
          height={600}
          className="w-full h-full object-cover"
          priority={true}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute bottom-4 inset-x-0 text-center md:text-right md:bottom-6 md:right-6 md:left-auto text-black z-10">
          <a
            href="./products/grapefruit-ginger"
            className="text-lg md:text-xl font-semibold underline hover:text-gray-700 transition"
          >
            GET YOURS NOW - SHIPS TODAY!
          </a>
        </div>
      </div>

      {/* Video/Image Section - Updated to use static image for all devices */}
      <div className="relative w-full aspect-square md:aspect-auto md:w-1/2">
        {isMobile ? (
          // Image for mobile (unchanged)
          <Image
            src="/images/Grapefruit.png"
            alt="Grapefruit Product"
            width={500}
            height={500}
            className="w-full h-full object-cover"
            priority={true}
            sizes="100vw"
          />
        ) : (
          // Static image for tablet and desktop (replacing video)
          <Image
            src="/images/grapefruit-poster.jpg"
            alt="Grapefruit Product"
            width={800}
            height={600}
            className="w-full h-full object-cover"
            priority={true}
            sizes="50vw"
          />
        )}
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white z-10">
          {/* Empty container for potential future content */}
        </div>
      </div>
    </section>
  );
}