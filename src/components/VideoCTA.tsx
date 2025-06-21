'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function OptimizedVideoCTA() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile - we'll still load video but optimize differently
  useEffect(() => {
    const checkDeviceWidth = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint in Tailwind
    };
    
    checkDeviceWidth(); // Initial check
    window.addEventListener('resize', checkDeviceWidth);
    
    return () => window.removeEventListener('resize', checkDeviceWidth);
  }, []);
  
  // Optimized lazy loading with fallback
  useEffect(() => {
    // Use Intersection Observer for efficient lazy loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Only set src when component is in viewport
          if (videoRef.current && !videoRef.current.getAttribute('src')) {
            const dataSrc = videoRef.current.getAttribute('data-src');
            if (dataSrc) {
              // On mobile, use smaller video if available
              const src = isMobile 
                ? videoRef.current.getAttribute('data-src-mobile') || dataSrc
                : dataSrc;
              
              videoRef.current.setAttribute('src', src);
              videoRef.current.setAttribute('data-ll-status', 'loaded');
              
              // Play video after a short delay to ensure loading doesn't block rendering
              setTimeout(() => {
                if (videoRef.current) {
                  videoRef.current.play().catch(error => {
                    console.log('Video autoplay failed:', error);
                  });
                  // Fade in video after it starts playing
                  setIsVideoVisible(true);
                }
              }, isMobile ? 1000 : 500); // Longer delay on mobile for better performance
            }
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
      {/* Video Section - Will show first on mobile, second on desktop */}
      <div className="order-first mb-6 sm:mb-0 sm:order-last relative">
        {/* Use a more rectangular aspect ratio on mobile, closer to 16:9 */}
        <div className={`relative w-full overflow-hidden sm:rounded-ss-[30px] sm:rounded-bl-[30px] md:rounded-ss-[60px] md:rounded-bl-[60px] ${isMobile ? 'aspect-[16/9] max-h-[240px]' : 'aspect-video'}`}>
          {/* High-quality poster image - used as LCP element and video fallback */}
          <Image
            src="/images/video-poster.jpg"
            alt="Sunfruit organic powder drink mix"
            width={854}
            height={480}
            priority={true}
            sizes="(max-width: 640px) 100vw, 50vw"
            className={`w-full h-full object-cover ${isVideoVisible ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIhAAAQQCAgIDAQAAAAAAAAAAAQIDBAUGABESIQdBE1H/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABwRAAICAgMAAAAAAAAAAAAAAAECAAMEERIhMf/aAAwDAQACEQMRAD8AZ8vyS2fzWxiUktMZEdLEdRaScpVyVFRI9nkddfgzyJXNTavJZcRDk8lIjPJSEqJJ6II7565A57WdsnRiXTCwNL2aOz2yj/hj/9k="
          />
          
          {/* Video element - loads lazily with proper settings */}
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover sm:rounded-ss-[30px] sm:rounded-bl-[30px] md:rounded-ss-[60px] md:rounded-bl-[60px] transition-opacity duration-1000 ${isVideoVisible ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            loop
            muted
            playsInline
            poster="/images/video-poster.jpg"  // Same as Image src
            preload="metadata"                 // Only load metadata initially
            data-src="/Lemonade_Creation.mp4"  // Desktop video source
            data-src-mobile="/Lemonade_Creation_Mobile.webm"  // Mobile-optimized video
            data-ll-status="loading"
            aria-label="Lemonade creation process video"
          />
          
          {/* Optional loading indicator that disappears when video is visible */}
          {!isVideoVisible && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-10">
              <div className="w-10 h-10 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
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