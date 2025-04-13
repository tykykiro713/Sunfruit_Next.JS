'use client';

import Navigation from "@/components/Navigation";
import ProductRecirculation from "@/components/ProductRecirculation"
import Footer from "@/components/Footer";
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid';
import { Suspense } from 'react';

// Content component to wrap in Suspense
function FindUsContent() {
  return (
    <div>
      <Navigation />
      <div className="bg-gray-50 px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
          <h1 className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl">
            Where to Find Sunfruit
          </h1>
          <p className="mt-6 text-xl/8">
          Right now Sunfruit is exclusively available on Sunfruit.com. It’s where you’ll always find the broadest selection, limited releases, and exclusive early access to what’s next. We’re launching on Amazon very soon, so you can find us there as well.
          </p>
          <p className="mt-6 text-xl/8">
          In addition, we’re actively accepting wholesale applications from retailers who share our passion for clean-label products and better-for-you hydration. If you run a grocery store, yoga studio, wellness shop, or boutique market and want to bring Sunfruit to your shelves, we’d love to hear from you!
          </p>
          <p className="mt-6 text-xl/8">
          As we expand, we’ll be updating this page with a list of local retailers. So whether you&aptos;re looking to grab Sunfruit at your neighborhood store or discover a new favorite while traveling, check back here soon.
          </p>
        </div>
      </div>
      <ProductRecirculation />
      <div className="h-16 bg-white"></div>
      <Footer />
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FindUsContent />
    </Suspense>
  );
}