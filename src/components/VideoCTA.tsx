'use client';

import { useEffect, useRef, useState } from 'react';

export default function VideoCTA() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
  
  useEffect(() => {
    // Preload the video when component mounts
    const videoElement = videoRef.current;
    
    if (videoElement) {
      // Set up event listener for when video can play through
      const handleCanPlayThrough = () => {
        setIsVideoLoaded(true);
      };
      
      // Add the event listener
      videoElement.addEventListener('canplaythrough', handleCanPlayThrough);
      
      // Set preload attribute
      videoElement.preload = "auto";
      
      // Start loading the video
      videoElement.load();
      
      // Clean up
      return () => {
        videoElement.removeEventListener('canplaythrough', handleCanPlayThrough);
      };
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-gray-50 sm:grid sm:grid-cols-2 sm:items-center z-10 py-12 md:py-20 min-h-[600px]">
      {/* Video Section - Will show first on mobile, second on desktop */}
      <div className="order-first mb-8 sm:order-last sm:mb-0">
        {/* Poster image shown while video loads */}
        {!isVideoLoaded && (
          <div 
            className="h-full w-full bg-gray-200 animate-pulse sm:rounded-ss-[30px] sm:rounded-bl-[30px] md:rounded-ss-[60px] md:rounded-bl-[60px]"
            style={{ 
              backgroundImage: 'url(/images/video-poster.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '350px'
            }}
            aria-label="Video loading"
          />
        )}
        
        <video
          ref={videoRef}
          className={`h-full w-full object-cover sm:rounded-ss-[30px] sm:rounded-bl-[30px] md:rounded-ss-[60px] md:rounded-bl-[60px] ${!isVideoLoaded ? 'hidden' : ''}`}
          autoPlay
          loop
          muted
          playsInline
          poster="/images/video-poster.jpg"
          aria-label="Lemonade creation video"
        >
          {/* Use WebM format for better compression and performance */}
          <source 
            src={isMobile ? "/Lemonade_Creation_Mobile.webm" : "/Lemonade_Creation.webm"} 
            type="video/webm" 
          />
          {/* Fallback to MP4 for browsers that don't support WebM */}
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
            100% Organic Powder Drink Mix
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