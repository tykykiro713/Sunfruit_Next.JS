'use client';

import React from 'react';

// Custom Check Icon
const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-brightgreen-500">
    <path d="M20 6 9 17l-5-5"/>
  </svg>
);

// Custom X Icon
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
    <path d="M18 6 6 18"/>
    <path d="M6 6l12 12"/>
  </svg>
);

export default function IngredientsSection() {
  return (
    <section className="bg-chewsyskin-500 py-16 px-4 text-center text-neutral-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-6 text-emeraldgreen-500">
          Organic Fruits and Botanicals
        </h2>
        <p className="max-w-3xl mx-auto mb-12 text-lg md:text-xl text-neutral-700">
          We care about ingredients as much as you do. By combining organic fruits and botanicals,
          Sunfruit flavors are delicious without any of the bad stuff.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredients Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-left border border-black/10">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight border-b border-emeraldgreen-500 pb-4 mb-6 text-emeraldgreen-500">
              Ingredients
            </h3>
            <div className="space-y-4">
              {[
                "Organic Fruits",
                "Organic Botanicals",
                "Organic Inulin (Prebiotic)",
                "Organic Monk Fruit"
              ].map((ingredient) => (
                <div key={ingredient} className="flex items-center text-lg md:text-xl text-neutral-800">
                  <span className="mr-4 w-6 h-6 flex-shrink-0">
                    <CheckIcon />
                  </span>
                  <span>{ingredient}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What's Not In It Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 text-left border border-black/10">
            <h3 className="text-2xl md:text-3xl font-semibold tracking-tight border-b border-emeraldgreen-500 pb-4 mb-6 text-emeraldgreen-500">
              What&apos;s NOT in it?
            </h3>
            <div className="space-y-4">
              {[
                "NO Sugar or Salt",
                "NO Artificial Sweeteners",
                "NO Preservatives",
                "NO Artificial Colors",
              ].map((item) => (
                <div key={item} className="flex items-center text-lg md:text-xl text-neutral-800">
                  <span className="mr-4 w-6 h-6 flex-shrink-0">
                    <XIcon />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}