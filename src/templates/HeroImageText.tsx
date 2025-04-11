"use client";

import React from "react";
import Image from "next/image";

interface AboutHeroProps {
  imageUrl: string;
  imageAlt: string;
  tagline: string;
  title: string;
  paragraphs: string[];
}

export default function AboutHero({
  imageUrl = "/images/AustynHarper.jpg",
  imageAlt = "Founder of Cure",
  tagline = "MEET LAUREN, FOUNDER OF CURE",
  title = "It all started with hydration.",
  paragraphs = [
    "Exercise is supposed to make you feel great, but I would get headaches and nausea after a long run or bike ride. It turns out I was just dehydrated – along with 75% of America. I tried to drink more water, but it was a struggle to drink enough. Even when I did, I still didn't feel my best.",
    "Then I found out that hydration is about not just drinking water. You also need to replace electrolytes lost through sweat, sleep, drinking alcohol and regular daily life. Water alone can't do that. When I looked at the electrolyte drinks out there, I was shocked. They were all neon-colored and full of sugar and artificial ingredients.",
    "So I decided to make my own — an electrolyte drink mix with only plant-based, non-GMO ingredients that tastes as good as it feels. Because when it comes to our health, we shouldn't have to make trade-offs."
  ]
}: AboutHeroProps) {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 py-12 md:py-16 lg:py-20 items-center">
          {/* Image container - left side */}
          <div className="w-full h-full flex justify-center md:justify-end">
            <div className="relative w-full md:w-full md:max-w-xl lg:max-w-2xl aspect-[3/4] overflow-hidden">
              <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                className="object-cover rounded-md"
                priority
              />
            </div>
          </div>

          {/* Content container - right side */}
          <div className="flex flex-col space-y-4 md:space-y-6">
            <div className="uppercase text-xs md:text-sm tracking-wider text-gray-500 font-medium">
              {tagline}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-semibold text-emeraldgreen-500">
              {title}
            </h1>
            
            <div className="space-y-5 text-gray-700">
              {paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lg md:text-xl">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}