'use client';

import Navigation from "@/components/Navigation";
import AboutHero from "@/components/AboutHero";
import ProductRecirculation from "@/components/ProductRecirculation";
import Footer from "@/components/Footer";
import { Suspense } from 'react';

// Content component to wrap in Suspense
function AboutContent() {
  return (
    <div className="bg-white min-h-screen">
      <Navigation />
      <main>
        <AboutHero />
        <ProductRecirculation />
        <div className="h-16 bg-white"></div>
      </main>
      <Footer />
    </div>
  );
}

export default function AboutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AboutContent />
    </Suspense>
  );
}