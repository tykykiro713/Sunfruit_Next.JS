"use client";

import React from "react";
import Image from "next/image";

export default function AboutHero() {
  // Founder story - Tyson's personal journey
  const founderContent = {
    imageUrl: "/images/AustynHarper.jpg", // Keep existing image or update as needed
    imageAlt: "Founder of Sunfruit",
    title: "The Wake-Up Call That Changed Everything",
    paragraphs: [
      "One night, I found myself in the ER, clutching my chest with pain so sharp I thought I was dying. My blood pressure was 160/100. I was 100% sure I was having a heart attack.",
      "All I could think about were my two little girls—Austyn (5) and Harper (3). Would I ever see them again? Would I get the chance to be the father I promised I'd be?",
      "Luckily, it wasn't a heart attack. But it was the moment everything changed.",
      "I knew I had to fix things—fast. I wasn't going to leave my health or my family's future to chance. So I made a decision right there: No more sugar. No more processed junk. No more 'eating pretty well' but not actually being well."
    ]
  };

  // Health journey content
  const journeyContent = {
    imageUrl: "/images/Tyson.jpg", // Keep existing image or update as needed
    imageAlt: "The journey to better health",
    title: "The Journey to Better Health",
    paragraphs: [
      "I started fasting in the mornings, walking every day, lifting weights again, and cleaning up everything I put in my body.",
      "What happened next blew me away… I lost 30 pounds. My blood pressure dropped back to normal. The energy came back. My joints stopped aching. Even my dentist was shocked—'No plaque or tartar at all,' she said. That had never happened before.",
      "But there was one thing missing: flavor. I found myself drinking just coffee, tea, and water. Which was fine—until it wasn't. I needed something more. Something I could sip throughout the day that felt refreshing and exciting, without loading up on chemicals or sugar."
    ]
  };

  // Birth of Sunfruit content
  const sunfruitBirthContent = {
    imageUrl: "/images/Lemon_3.jpg", // Keep existing image or update as needed
    imageAlt: "The birth of Sunfruit",
    title: "The Birth of Sunfruit",
    paragraphs: [
      "I tried hydration powders. I read every label. Most were full of sweeteners, fillers, or fake 'natural' ingredients. A few salty mixes were okay for after a workout—but not something I wanted all day long.",
      "Then I had an idea. What if I could take real fruit and real botanicals and create clean, bold flavors... with no sugar, no salt, no preservatives, no sketchy stuff at all?",
      "That's how Sunfruit was born. Every stick pack is 100% organic. It's clean enough for me—and safe enough for my kids. In fact, they love the Lemon Mint flavor. They think it's lemonade. I know it's way better."
    ]
  };



  // Health revolution content - modified from original
  const revolutionContent = {
    title: "Create Your Health Revolution",
    paragraphs: [
      "Sunfruit is now part of our daily routine—and it might just become part of yours too.",
      "We're building more than just a company – we're creating a community of people who care deeply about what they put into their bodies. People who understand that proper hydration with clean ingredients is fundamental to health and wellness.",
      "Our customers include busy parents, diabetics, fitness enthusiasts, heart-conscious individuals, and anyone who wants to feel their best throughout the day. What unites them is a commitment to quality and a refusal to settle for artificial ingredients or sugar-laden beverage options.",
      "When you choose Sunfruit, you're not just purchasing a product – you're joining a movement toward better health and better living. We're honored to be part of your journey.",
      "To better health, Tyson R."
    ]
  };

  return (
    <div className="bg-white sm:pt-16 md:pt-24 lg:pt-32">
      {/* First section: Image left, text right - Founder's Story */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 py-12 md:py-16 lg:py-20 items-start">
            {/* Image container - left side with circular image */}
            <div className="w-full h-full flex justify-center md:justify-end">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-4 border-emeraldgreen-100 shadow-lg">
                <Image
                  src={founderContent.imageUrl}
                  alt={founderContent.imageAlt}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Content container - right side */}
            <div className="flex flex-col space-y-4 md:space-y-6">
              <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-emeraldgreen-500">
                {founderContent.title}
              </h2>
              
              <div className="space-y-5 text-gray-700">
                {founderContent.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg md:text-xl">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second section: Image right, text left - Health Journey */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 py-12 md:py-16 lg:py-20 items-start">
            {/* Content container - left side */}
            <div className="flex flex-col space-y-4 md:space-y-6 md:order-1 order-2">
              <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-emeraldgreen-500">
                {journeyContent.title}
              </h2>
              
              <div className="space-y-5 text-gray-700">
                {journeyContent.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg md:text-xl">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Image container - right side with circular image */}
            <div className="w-full h-full flex justify-center md:justify-start md:order-2 order-1">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-4 border-emeraldgreen-100 shadow-lg">
                <Image
                  src={journeyContent.imageUrl}
                  alt={journeyContent.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Third section: Image left, text right - Birth of Sunfruit */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 py-12 md:py-16 lg:py-20 items-start">
            {/* Image container - left side with circular image */}
            <div className="w-full h-full flex justify-center md:justify-end">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] rounded-full overflow-hidden border-4 border-emeraldgreen-100 shadow-lg">
                <Image
                  src={sunfruitBirthContent.imageUrl}
                  alt={sunfruitBirthContent.imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Content container - right side */}
            <div className="flex flex-col space-y-4 md:space-y-6">
              <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-emeraldgreen-500">
                {sunfruitBirthContent.title}
              </h2>
              
              <div className="space-y-5 text-gray-700">
                {sunfruitBirthContent.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg md:text-xl">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Second full width text section - Health Revolution */}
      <section className="w-full bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
          <h2 className="text-3xl md:text-4xl font-poppins font-semibold text-emeraldgreen-500 mb-8 text-center">
            {revolutionContent.title}
          </h2>
          
          <div className="space-y-5 text-gray-700">
            {revolutionContent.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg md:text-xl">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}