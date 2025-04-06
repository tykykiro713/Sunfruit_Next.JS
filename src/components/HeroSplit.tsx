// src/components/HeroSplit.tsx
'use client';

import React from 'react';
import Image from 'next/image';

export default function HeroSplit() {
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
        />
        <div className="absolute bottom-4 inset-x-0 text-center md:text-right md:bottom-6 md:right-6 md:left-auto text-black z-10">
          <a
            href="#"
            className="text-lg md:text-xl font-semibold underline hover:text-gray-700 transition"
          >
            GET YOURS NOW - SHIPS TODAY!
          </a>
        </div>
      </div>

      {/* Video Section */}
      <div className="relative w-full aspect-square md:aspect-auto md:w-1/2">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/GrapefruitSD.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white z-10">
          <h2 className="text-base md:text-lg font-semibold mb-1"></h2>
          <a
            href="#"
            className="text-sm underline hover:text-gray-300 transition"
          >
            
          </a>
        </div>
      </div>
    </section>
  );
}