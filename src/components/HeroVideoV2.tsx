'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroVideoV2() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check device width for responsive video source
  useEffect(() => {
    const checkDeviceWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDeviceWidth();
    window.addEventListener('resize', checkDeviceWidth);
    
    return () => window.removeEventListener('resize', checkDeviceWidth);
  }, []);

  // Lazy load video with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            const video = videoRef.current;
            const src = isMobile 
              ? '/Lemonade_Creation_Mobile.webm'
              : '/Lemonade_Creation.mp4';
            
            // Only load if not already loaded
            if (!video.src.includes(src)) {
              video.src = src;
              video.load();
              
              // Play when loaded
              video.addEventListener('loadeddata', () => {
                video.play().then(() => {
                  setIsVideoLoaded(true);
                }).catch((err) => {
                  console.log('Video autoplay failed:', err);
                });
              }, { once: true });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden">
      {/* Video Background - positioned to show the important part */}
      <div className="absolute inset-0 w-full h-full">
        {/* Poster Image - Loads immediately for LCP */}
        <Image
          src="/images/video-poster.jpg"
          alt="Sunfruit organic powder drink mix"
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-0' : 'opacity-100'
          }`}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAQABgDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABwAI/8QAIhAAAQQCAgIDAQAAAAAAAAAAAQIDBAUGABESIQdBE1H/xAAVAQEBAAAAAAAAAAAAAAAAAAADBP/EABwRAAICAgMAAAAAAAAAAAAAAAECAAMEERIhMf/aAAwDAQACEQMRAD8AZ8vyS2fzWxiUktMZEdLEdRaScpVyVFRI9nkddfgzyJXNTavJZcRDk8lIjPJSEqJJ6II7565A57WdsnRiXTCwNL2aOz2yj/hj/9k="
        />
        
        {/* Video - Lazy loaded */}
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-label="Lemonade creation process video"
        >
          <source src="/Lemonade_Creation.mp4" type="video/mp4" />
          <source src="/Lemonade_Creation_Mobile.webm" type="video/webm" />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center mt-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-poppins font-bold tracking-tight text-white">
            Zero Sugar, Organic Powder Drink Mix
          </h1>

          {/* CTA Button */}
          <div className="mt-8">
            <button
              onClick={() => {
                const element = document.getElementById('samples');
                if (element) {
                  const yOffset = -80; // Offset for fixed navigation
                  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className="inline-block rounded-3xl bg-emeraldgreen-500 px-8 sm:px-12 py-3 text-base md:text-lg font-medium text-white transition hover:bg-brightgreen-500 focus:outline-none focus:ring focus:ring-green-500"
            >
              Get FREE Samples*
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <svg 
          className="h-8 w-8 text-white drop-shadow-lg" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M19 14l-7 7m0 0l-7-7m7 7V3" 
          />
        </svg>
        <span className="sr-only">Scroll down</span>
      </div>
    </section>
  );
}