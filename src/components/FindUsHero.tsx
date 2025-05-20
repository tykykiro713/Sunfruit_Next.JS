'use client';

import React from "react";
import Image from "next/image";
import ZendeskButton from "@/components/ZendeskButton";

export default function FindUsHero() {
  return (
    <div className="bg-white">
      {/* Full width header image */}
      <div className="w-full relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
        <Image
          src="/images/Blueberry.png"
          alt="Organic blueberries with Sunfruit products"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Optional: Add hero text overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
              Find Sunfruit Near You
            </h1>
          </div>
        </div>
      </div>

      {/* Hero content section */}
      <section className="w-full bg-white pt-16 sm:pt-20 md:pt-24 lg:pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl">
            Where to Find Sunfruit
          </h2>
          <p className="mt-6 text-xl/8 text-gray-700">
            Right now Sunfruit is exclusively available on Sunfruit.com. It&apos;s where you&apos;ll always find the broadest selection, limited releases, and early access to what&apos;s next. We&apos;re launching on Amazon very soon, so you can find us there as well.
          </p>
          <p className="mt-6 text-xl/8 text-gray-700">
            In addition, we&apos;re actively accepting wholesale applications from retailers who share our passion for clean-label products and better-for-you hydration. If you run a grocery store, yoga studio, wellness shop, or boutique market and want to bring Sunfruit to your shelves, we&apos;d love to hear from you!
          </p>
          <p className="mt-6 text-xl/8 text-gray-700">
            As we expand, we&apos;ll be updating this page with a list of local retailers. So whether you&apos;re looking to grab Sunfruit at your neighborhood store or discover a new favorite while traveling, check back here soon.
          </p>
        </div>
      </section>
      
      {/* Retailer contact section - styled with emerald green */}
      <section className="w-full bg-emeraldgreen-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl mb-8">
              Become a Retailer
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Interested in carrying Sunfruit in your store? We&apos;d love to partner with you!
            </p>
            
            {/* Using our reusable ZendeskButton component */}
            <ZendeskButton>
              Contact Our Wholesale Team
            </ZendeskButton>
          </div>
        </div>
      </section>
    </div>
  );
}