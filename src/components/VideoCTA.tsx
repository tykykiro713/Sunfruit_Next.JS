'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

// Import the poster image for static optimization
// Note: For public folder assets, we don't use imports - we reference them directly

export default function OptimizedVideoCTA() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile
  useEffect(() => {
    const checkDeviceWidth = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkDeviceWidth();
    window.addEventListener('resize', checkDeviceWidth);
    
    return () => window.removeEventListener('resize', checkDeviceWidth);
  }, []);
  
  // Lazy load video after image loads
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && videoRef.current) {
          const dataSrc = videoRef.current.getAttribute('data-src');
          if (dataSrc && !videoRef.current.getAttribute('src')) {
            const src = isMobile 
              ? videoRef.current.getAttribute('data-src-mobile') || dataSrc
              : dataSrc;
            
            videoRef.current.setAttribute('src', src);
            
            // Play video after loading
            videoRef.current.addEventListener('loadeddata', () => {
              videoRef.current?.play().then(() => {
                setIsVideoVisible(true);
              }).catch(console.log);
            });
          }
          observer.disconnect();
        }
      });
    }, { threshold: 0.1 });
    
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }
    
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section className="relative overflow-hidden bg-gray-50 py-8 md:py-10 lg:py-20 min-h-[400px] md:min-h-[500px] lg:min-h-[600px] sm:grid sm:grid-cols-2 sm:items-center z-10">
      {/* Video Section */}
      <div className="order-first mb-6 sm:mb-0 sm:order-last relative">
        <div className={`relative w-full overflow-hidden sm:rounded-ss-[30px] sm:rounded-bl-[30px] md:rounded-ss-[60px] md:rounded-bl-[60px] ${isMobile ? 'aspect-[16/9] max-h-[240px]' : 'aspect-video'}`}>
          {/* CRITICAL: Use static import for immediate loading */}
          <Image
            src="/images/video-poster.jpg"
            alt="Sunfruit organic powder drink mix"
            priority={true}
            sizes="(max-width: 640px) 100vw, 50vw"
            className={`w-full h-full object-cover ${isVideoVisible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIhAAAQQCAgIDAQAAAAAAAAAAAQIDBAUGABESIQdBE1H/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABwRAAICAgMAAAAAAAAAAAAAAAECAAMEERIhMf/aAAwDAQACEQMRAD8AZ8vyS2fzWxiUktMZEdLEdRaScpVyVFRI9nkddfgzyJXNTavJZcRDk8lIjPJSEqJJ6II7565A57WdsnRiXTCwNL2aOz2yj/hj/9k="
            fill
          />
          
          {/* Video element - loads after image */}
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover sm:rounded-ss-[30px] sm:rounded-bl-[30px] md:rounded-ss-[60px] md:rounded-bl-[60px] transition-opacity duration-1000 ${isVideoVisible ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            data-src="/Lemonade_Creation.mp4"
            data-src-mobile="/Lemonade_Creation_Mobile.webm"
            aria-label="Lemonade creation process video"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="p-4 sm:p-8 md:p-12 lg:px-16 lg:py-24 order-last sm:order-first">
        <div className="mx-auto max-w-xl text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-poppins font-semibold tracking-tight text-emeraldgreen-500 md:text-5xl">
            Zero Sugar, Organic Powder Drink Mix
          </h2>

          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-gray-600">
            Sunfruit is made from real fruits and botanicals. Just add water for clean, refreshing hydration—no sugar, no sodium, no preservatives, no fillers. Only the good stuff.
          </p>
          <div className="mt-4 md:mt-8">
            <a
              href="#samples"
              className="mt-4 inline-block rounded-3xl bg-emeraldgreen-500 px-8 sm:px-12 py-3 text-base md:text-lg font-medium text-white transition hover:bg-brightgreen-500 focus:outline-none focus:ring focus:ring-green-500"
            >
              Get FREE Samples*
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}