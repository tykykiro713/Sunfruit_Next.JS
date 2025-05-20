'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type OptimizedImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  fetchPriority?: 'high' | 'low' | 'auto';
  loading?: 'eager' | 'lazy';
  isCritical?: boolean; // New prop to mark critical above-the-fold images
};

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 640px) 90vw, (max-width: 768px) 80vw, (max-width: 1024px) 50vw, 33vw', // Enhanced sizes attribute
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  fetchPriority = 'auto',
  loading,
  isCritical = false
}: OptimizedImageProps) {
  const [isSmallViewport, setIsSmallViewport] = useState(false);
  
  // Detect mobile/small viewports for enhanced optimizations
  useEffect(() => {
    const checkViewport = () => {
      setIsSmallViewport(window.innerWidth < 768);
    };
    
    // Initial check
    checkViewport();
    
    // Listen for resize events
    window.addEventListener('resize', checkViewport);
    
    return () => {
      window.removeEventListener('resize', checkViewport);
    };
  }, []);
  
  // Optimize quality for mobile
  const optimizedQuality = isSmallViewport ? Math.min(quality, 75) : quality;
  
  // Set priority and loading attributes optimally
  const shouldPrioritize = priority || isCritical;
  const loadingAttribute = loading || (!shouldPrioritize ? 'lazy' : undefined);
  const fetchPriorityValue = shouldPrioritize ? 'high' : fetchPriority;
  
  // Use WebP format for supported browsers via srcSet
  const imgSrc = src.includes('?') ? `${src}&fm=webp` : `${src}?fm=webp`;
  
  return (
    <Image
      src={src} // Original source for fallback
      alt={alt}
      width={width}
      height={height}
      className={`${className} ${isSmallViewport ? 'mobile-optimized' : ''}`}
      priority={shouldPrioritize}
      sizes={sizes}
      quality={optimizedQuality}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      loading={loadingAttribute}
      fetchPriority={fetchPriorityValue as any} // Cast to any due to Next.js typings
      style={{
        // Ensure consistent rendering with defined dimensions
        maxWidth: '100%',
        height: 'auto',
        contain: 'layout paint',
        // Improved rendering performance
        willChange: shouldPrioritize ? 'transform' : 'auto',
      }}
      // Ensure images have explicit width/height to prevent layout shifts
      onLoad={(e) => {
        if (e.currentTarget) {
          e.currentTarget.style.opacity = '1';
        }
      }}
    />
  );
}