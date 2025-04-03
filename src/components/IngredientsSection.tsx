// src/components/IngredientsSection.tsx
'use client';

import React from 'react';

export default function IngredientsSection() {
  return (
    <section className="bg-limegreen-500 py-16 px-4 text-center text-neutral-800">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">
          The Happy Taste of Simplicity
        </h2>
        <p className="max-w-3xl mx-auto mb-12 text-base md:text-lg">
          We care about our products and ingredients as much as you do. When it comes to flavor,
          we pack a punch without using anything you can&apos;t pronounce. 
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ingredients Card */}
          <div className="bg-white rounded-xl shadow p-6 text-left border border-black/20">
            <h3 className="text-lg font-semibold border-b pb-2 mb-2">Ingredients</h3>
            <p className="mb-4 font-medium">
              Crystallized Lime, Cane Sugar,Natural Flavor, Vegetable Juice (For Color), Stevia Leaf Extract. <strong>Non-GMO.</strong>
            </p>
            <p className="text-sm text-gray-600">
              The ingredient line shown is our latest. There will be packaging that will have a slightly
              different ingredient line. Please contact us with questions.
            </p>
          </div>

          {/* What's Not In It Card */}
          <div className="bg-white rounded-xl shadow p-6 text-left border border-black/20 md:col-span-1">
            <h3 className="text-lg font-semibold border-b pb-2 mb-2">What’s NOT in it?</h3>
            <ul className="list-disc list-inside text-sm space-y-1">
              <li>NO artificial sweeteners (like Acesulfame Potassium, Aspartame, Saccharin, Sucralose)</li>
              <li>NO hard-to-understand ingredients (like sodium benzoate, sorbic acid, sodium nitrate, sodium sulfite, dipotassium phosphate, magnesium oxide, BHA + BHT)</li>
              <li>NO colors from artificial sources (like Blue #1 or #2, Red #3 or #40, Yellow #5 or #6)</li>
              <li>NO soy, MSG, gluten, sodium, GMOs</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
