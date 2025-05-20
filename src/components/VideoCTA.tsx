'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function VideoCTA() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if mobile on component mount
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint in Tailwind
    };
    
    // Set initial value
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Handle user interaction for video autoplay on mobile
  useEffect(() => {
    const handleUserInteraction = () => {
      setHasInteracted(true);
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);
  
  useEffect(() => {
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Progressive loading strategy
      const handleLoadedData = () => {
        // Video has loaded enough to start playing
        if (hasInteracted || !isMobile) {
          videoElement.play().catch(error => {
            console.log('Video autoplay failed:', error);
          });
        }
      };

      const handleCanPlay = () => {
        setIsVideoReady(true);
      };

      // Event listeners
      videoElement.addEventListener('loadeddata', handleLoadedData);
      videoElement.addEventListener('canplay', handleCanPlay);
      
      // Progressive loading
      videoElement.preload = 'metadata'; // Start with metadata only
      
      // After component mount, upgrade to auto preload
      const upgradePreload = setTimeout(() => {
        videoElement.preload = 'auto';
      }, 100);
      
      return () => {
        clearTimeout(upgradePreload);
        videoElement.removeEventListener('loadeddata', handleLoadedData);
        videoElement.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, [hasInteracted, isMobile]);

  return (
    <section className="relative overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center z-10 py-12 md:py-20 min-h-[600px]">
      {/* Video Section - Will show first on mobile, second on desktop */}
      <div className="order-first mb-8 sm:order-last sm:mb-0 relative">
        {/* Enhanced poster image without wrapper */}
        <div 
          className={`absolute inset-0 z-10 transition-opacity duration-500 ${isVideoReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
          <div className="relative aspect-video w-full sm:rounded-ss-[30px] sm:rounded-bl-[30px] md:rounded-ss-[60px] md:rounded-bl-[60px] overflow-hidden min-h-[350px]">
            <Image
              src="/images/video-poster.jpg"
              alt="Sunfruit organic powder drink mix"
              width={854}
              height={480}
              priority={true}
              sizes="(max-width: 640px) 100vw, 50vw"
              className="w-full h-full object-cover"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIhAAAQQCAgIDAQAAAAAAAAAAAQIDBAUGABESIQdBE1H/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABwRAAICAgMAAAAAAAAAAAAAAAECAAMEERIhMf/aAAwDAQACEQMRAD8AZ8vyS2fzWxiUktMZEdLEdRaScpVyVFRI9nkddfgzyJXNTavJZcRDk8lIjPJSEqJJ6II7565A57WdsnRiXTCwNL2aOz2yj/hj/9k="
            />
            {/* Loading spinner overlay - shown while video loads */}
            {!isVideoReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        </div>
        
        {/* Optimized video element */}
        <video
          ref={videoRef}
          className="h-full w-full object-cover sm:rounded-ss-[30px] sm:rounded-bl-[30px] md:rounded-ss-[60px] md:rounded-bl-[60px] relative z-0"
          autoPlay={!isMobile || hasInteracted}
          loop
          muted
          playsInline
          poster="/images/video-poster.jpg"
          aria-label="Lemonade creation process video"
          preload="metadata"
        >
          {/* Prioritize WebM for better compression */}
          <source 
            src={isMobile ? "/Lemonade_Creation_Mobile.webm" : "/Lemonade_Creation.webm"} 
            type="video/webm" 
          />
          {/* MP4 fallback */}
          <source 
            src={isMobile ? "/Lemonade_Creation_Mobile.mp4" : "/Lemonade_Creation.mp4"} 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Text Section */}
      <div className="p-8 md:p-12 lg:px-16 lg:py-24 order-last sm:order-first">
        <div className="mx-auto max-w-xl text-center sm:text-left">
          <h2 className="text-4xl font-poppins font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl">
            Zero Sugar, Organic Powder Drink Mix
          </h2>

          <p className="mt-6 text-xl/8 text-gray-600">
            Sunfruit is made from real fruits and botanicals. Just add water for clean, refreshing hydration—no sugar, no sodium, no preservatives, no fillers. Only the good stuff.
          </p>
          <div className="mt-4 md:mt-8">
            <a
              href="#samples"
              className="mt-4 inline-block rounded-3xl bg-emeraldgreen-500 px-12 py-3 text-base md:text-lg font-medium text-white transition hover:bg-brightgreen-500 focus:outline-none focus:ring focus:ring-green-500"
            >
              Get FREE Samples*
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}