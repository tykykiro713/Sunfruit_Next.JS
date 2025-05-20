'use client';

import Navigation from "@/components/Navigation";
import FindUsHero from "@/components/FindUsHero";
import ProductRecirculation from "@/components/ProductRecirculation";
import Footer from "@/components/Footer";
import { Suspense } from 'react';

// Content component to wrap in Suspense
function FindUsContent() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <main>
        <FindUsHero />
        <ProductRecirculation />
        <div className="h-16 bg-white"></div>
      </main>
      <Footer />
    </div>
  );
}

export default function FindUsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FindUsContent />
    </Suspense>
  );
}