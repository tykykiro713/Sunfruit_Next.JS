'use client';

import { useEffect, useState } from 'react';
import TryCheckoutButton from './TryCheckoutButton';

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('try-hero-cta');
    const finalCta = document.getElementById('try-final-cta');

    // Show sticky once the hero CTA has scrolled out of view.
    const heroObserver = hero
      ? new IntersectionObserver(
          ([entry]) => {
            setIsVisible(!entry.isIntersecting);
          },
          { rootMargin: '0px 0px -20% 0px' },
        )
      : null;

    // Hide sticky again when the final CTA is in view (avoid double-stack).
    const finalObserver = finalCta
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) setIsVisible(false);
          },
          { threshold: 0.3 },
        )
      : null;

    if (hero && heroObserver) heroObserver.observe(hero);
    if (finalCta && finalObserver) finalObserver.observe(finalCta);

    return () => {
      heroObserver?.disconnect();
      finalObserver?.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!isVisible}
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white/95 px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-300 md:hidden ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="mx-auto flex max-w-md flex-col items-center gap-1">
        <TryCheckoutButton
          id="try-sticky-cta"
          label="Get my free samples — $5 shipping"
          fullWidth
        />
        <p className="text-xs text-gray-600">Ships today! · 100% satisfaction guarantee</p>
      </div>
    </div>
  );
}
