'use client';

import React from "react";
import Image from "next/image";
import { EnvelopeIcon, CheckIcon } from '@heroicons/react/24/outline';

export default function AboutHero() {
  return (
    <div className="bg-white">
      {/* Full width header image */}
      <div className="w-full relative h-64 sm:h-80 md:h-96 lg:h-[500px]">
        <Image
          src="/images/GrapefruitTree3.png"
          alt="Child holding lemons from a tree"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        
        {/* Added hero text overlay to match FindUsHero */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg">
              About Us
            </h1>
          </div>
        </div>
      </div>

      {/* Hero Section: About Sunfruit */}
      <section className="w-full bg-white pt-16 sm:pt-20 md:pt-24 lg:pt-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          
          {/* Our Mission */}
          <div className="mb-16">
            <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl">
              Our Mission
            </h2>
            <p className="mt-6 text-xl/8 text-gray-700">
              At Sunfruit, we believe everyone deserves beverages that are both delicious and genuinely healthy. 
              We create organic, sugar-free beverages using real fruits and botanicals. No sugar, No sodium, 
              no preservatives, no hard-to-pronounce ingredients.
            </p>
          </div>
          
          {/* How it all Started */}
          <div className="mb-16">
            <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl">
              How it all Started
            </h2>
            <p className="mt-6 text-xl/8 text-gray-700">
              Sunfruit was born from a simple observation: too many people compromise their health goals 
              because healthy drinks are boring. We saw an opportunity for beverages that could deliver 
              both exceptional flavor and uncompromising nutrition.
            </p>
          </div>
        </div>
      </section>
      
      {/* What's the Problem Section */}
      <section className="w-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 py-12 md:py-16 lg:py-20 items-center">
            {/* Content container - left side */}
            <div className="flex flex-col space-y-4 md:space-y-6">
              <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl">
                What&apos;s the Problem
              </h2>
              
              <p className="mt-6 text-xl/8 text-gray-700">
                For most people, avoiding sugar and processed ingredients means limiting drink choices 
                to coffee, tea, and water. The hydration powders on the market are often loaded with 
                sodium, artificial ingredients, or synthetic flavors that defeat the purpose of healthy 
                living. We knew there had to be a better solution.
              </p>
            </div>

            {/* Image container - right side */}
            <div className="w-full h-full flex justify-center md:justify-start">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-4 border-emeraldgreen-100 shadow-lg">
                <Image
                  src="/images/Lemon_3.jpg"
                  alt="Sunfruit Lemon"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* The Sunfruit Solution Section */}
      <section className="w-full bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl mb-6">
            The Sunfruit Solution
          </h2>
          
          <p className="mt-6 text-xl/8 text-gray-700 mb-8">
            Our bold, refreshing flavors are made from the best ingredients available. 
            No sugar. No sodium. No preservatives or dodgy ingredients. Just certified 
            organic fruits and botanicals that make hydration exciting again.
          </p>
          
          {/* Benefits Cards - Updated with checkmarks and added fourth card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="bg-emeraldgreen-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <CheckIcon className="h-6 w-6 text-emeraldgreen-500 mr-2 flex-shrink-0" />
                <div className="text-emeraldgreen-500 text-xl font-semibold">Organic</div>
              </div>
              <p className="text-gray-700 mt-2">Certified organic ingredients you can trust</p>
            </div>
            
            <div className="bg-emeraldgreen-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <CheckIcon className="h-6 w-6 text-emeraldgreen-500 mr-2 flex-shrink-0" />
                <div className="text-emeraldgreen-500 text-xl font-semibold">Sugar-Free</div>
              </div>
              <p className="text-gray-700 mt-2">Zero sugar, no artificial sweeteners</p>
            </div>
            
            <div className="bg-emeraldgreen-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <CheckIcon className="h-6 w-6 text-emeraldgreen-500 mr-2 flex-shrink-0" />
                <div className="text-emeraldgreen-500 text-xl font-semibold">No Sodium</div>
              </div>
              <p className="text-gray-700 mt-2">Perfect for those watching their salt intake</p>
            </div>
            
            {/* New card for No Preservatives */}
            <div className="bg-emeraldgreen-50 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <CheckIcon className="h-6 w-6 text-emeraldgreen-500 mr-2 flex-shrink-0" />
                <div className="text-emeraldgreen-500 text-xl font-semibold">No Preservatives</div>
              </div>
              <p className="text-gray-700 mt-2">Pure ingredients with nothing artificial added</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Who Drinks Sunfruit Section */}
      <section className="w-full bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 py-12 md:py-16 lg:py-20 items-center">
            {/* Changed the order of elements for mobile */}
            {/* Image container - appears first on mobile, moved to left on desktop */}
            <div className="w-full h-full flex justify-center md:justify-end md:order-1">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-4 border-emeraldgreen-100 shadow-lg">
                <Image
                  src="/images/Drexel_Harper3.png"
                  alt="Who drinks Sunfruit"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            
            {/* Content container - appears second on mobile, moved to right on desktop */}
            <div className="flex flex-col space-y-4 md:space-y-6 mt-8 md:mt-0 md:order-2">
              <h2 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl">
                Who Drinks Sunfruit
              </h2>
              
              <p className="mt-6 text-xl/8 text-gray-700 mb-4">
                Our community includes:
              </p>
              
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li className="text-xl/8">Parents seeking better options for their families</li>
                <li className="text-xl/8">Anyone following keto, paleo, or sugar-free diets</li>
                <li className="text-xl/8">People managing blood sugar or diabetes</li>
                <li className="text-xl/8">Athletes who want to supplement their sodium drinks</li>
                <li className="text-xl/8">Anyone who refuses to compromise on ingredients</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}