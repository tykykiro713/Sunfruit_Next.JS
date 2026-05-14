// src/components/HeroSplit.tsx
'use client';

import React from 'react';
import Image from 'next/image';

export default function HeroSplit() {

  return (
    <section className="w-full flex flex-col md:flex-row">
      {/* Image Section - Left side */}
      <div className="relative w-full aspect-square md:aspect-auto md:w-1/2">
        <Image
          src="/images/Lemon_3.jpg"
          alt="Lemon Mint with stick pack and glass"
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
            href="./products/lemon-mint"
            className="text-lg md:text-xl font-semibold underline hover:text-gray-700 transition"
          >
            GET YOURS NOW - SHIPS TODAY!
          </a>
        </div>
      </div>

      {/* Image Section - Right side */}
      <div className="relative w-full aspect-square md:aspect-auto md:w-1/2">
        <Image
          src="/images/Lemon_Mint_2.webp"
          alt="Lemon Mint Product"
          width={800}
          height={600}
          className="w-full h-full object-cover"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
        />
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white z-10">
          {/* Empty container for potential future content */}
        </div>
      </div>
    </section>
  );
}