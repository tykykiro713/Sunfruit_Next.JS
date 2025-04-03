'use client';

import React from 'react';
import Image from 'next/image';

export default function ProductHeroSplit() {
  return (
    <section className="w-full flex flex-col md:flex-row">
       {/* Image Section */}
       <div className="relative w-full md:w-1/2 h-80 md:h-96 lg:h-screen lg:max-h-[800px]">
        <Image
          src="/images/Grapefruit_2.png"
          alt="Hero Left"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Image Section */}
      <div className="relative w-full md:w-1/2 h-80 md:h-96 lg:h-screen lg:max-h-[800px]">
        <Image
          src="/images/Grapefruit_3.png"
          alt="Hero Right"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}