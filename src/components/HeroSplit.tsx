// src/components/HeroSplit.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function HeroSplit() {
  const [isMobile, setIsMobile] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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

  // Handle video load success
  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  // Handle video error - fallback to image
  const handleVideoError = () => {
    console.log('Video failed to load, using fallback image');
    setVideoError(true);
  };

  return (
    <section className="w-full flex flex-col md:flex-row">
      {/* Image Section - Left side */}
      <div className="relative w-full aspect-square md:aspect-auto md:w-1/2">
        <Image
          src="/images/Grapefruit_3.png"
          alt="Hero Right"
          width={800}
          height={600}
          className="w-full h-full object-cover"
          loading="lazy" // LAZY LOADING: This component is below the fold
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
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

      {/* Video/Image Section - Right side */}
      <div className="relative w-full aspect-square md:aspect-auto md:w-1/2">
        {isMobile ? (
          // Static image for mobile (unchanged)
          <Image
            src="/images/Grapefruit.png"
            alt="Grapefruit Product"
            width={500}
            height={500}
            className="w-full h-full object-cover"
            loading="lazy"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
          />
        ) : (
          // Video for desktop with image fallback
          <>
            {/* Poster image - always visible initially, hidden when video loads successfully */}
            <Image
              src="/images/grapefruit-poster.jpg"
              alt="Grapefruit Product"
              width={800}
              height={600}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                isVideoLoaded && !videoError ? 'opacity-0' : 'opacity-100'
              }`}
              loading="lazy"
              sizes="50vw"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAwDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0Dp9R6WxagHJ6PPRgACw2UE7gY+1axTKMYt8K5xUbhqq/HSIZeeOXIy03jBELFYhEchT5c3RmfavhJbAHDUPGkREyLAMR7WNuqxJNK//2Q=="
            />
            
            {/* Video element - only render if no error */}
            {!videoError && (
              <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isVideoLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                autoPlay
                loop
                muted
                playsInline
                poster="/images/grapefruit-poster.jpg"
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                preload="none"
              >
                <source src="/GrapefruitSD_Mobile.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </>
        )}
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white z-10">
          {/* Empty container for potential future content */}
        </div>
      </div>
    </section>
  );
}