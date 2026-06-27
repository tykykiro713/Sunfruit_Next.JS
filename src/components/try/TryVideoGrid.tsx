'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import StarRatingInline from './StarRatingInline';

interface VideoCard {
  name: string;
  location: string;
  shortQuote: string;
  fullQuote: string;
  image: string;
}

const cards: VideoCard[] = [
  {
    name: 'Sarah M.',
    location: 'Austin, TX',
    shortQuote: 'No bloating. No weird aftertaste.',
    fullQuote:
      "I read every single label. Sunfruit was one of the only flavored drinks where I didn't have to put it back on the shelf. No bloating, no weird aftertaste, no aspartame. My body just feels good with it.",
    image: '/images/Woman.jpg',
  },
  {
    name: 'David K.',
    location: 'Brooklyn, NY',
    shortQuote: 'I finally drink water again.',
    fullQuote:
      "I was a Liquid I.V. person for years and the sodium was killing me. Sunfruit is the first thing that actually makes water taste good without dumping salt in it. I drink way more water now.",
    image: '/images/Kayak.jpg',
  },
  {
    name: 'Maya R.',
    location: 'Portland, OR',
    shortQuote: 'My kids ask for it.',
    fullQuote:
      "I won't put artificial dyes or sweeteners in front of my kids, period. Sunfruit is the first thing both of them ask for unprompted. The fact that I can drink it too is the cherry on top.",
    image: '/images/family.png',
  },
  {
    name: 'Joy B.',
    location: 'Asheville, NC',
    shortQuote: 'Hydration that fits my lifestyle.',
    fullQuote:
      "I replenish electrolytes after a hard workout. The rest of the time, I'm drinking Sunfruit. It's clean enough to drink every day and the flavors are actually interesting.",
    image: '/images/Joy.png',
  },
  {
    name: 'Tyson R.',
    location: 'Denver, CO',
    shortQuote: 'Best clean drink mix I\'ve found.',
    fullQuote:
      "I'm pretty picky about what I put in my body and I've tried every clean drink mix on the market. Sunfruit is the first one where the ingredient list and the flavor both deliver.",
    image: '/images/Tyson.jpg',
  },
  {
    name: 'Austyn H.',
    location: 'Chicago, IL',
    shortQuote: 'Replaced 3 things in my cart.',
    fullQuote:
      "I was buying Liquid I.V. for hydration, Crystal Light for flavor, and a separate fiber gummy for gut health. Sunfruit covers all three. Less in the pantry, more money saved.",
    image: '/images/AustynHarper.jpg',
  },
];

export default function TryVideoGrid() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? cards[activeIndex] : null;

  useEffect(() => {
    if (active) {
      const orig = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = orig;
      };
    }
  }, [active]);

  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [active]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emeraldgreen-500">
            Real customers · Real glasses
          </p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl md:text-5xl">
            People who got the pack.
          </h2>
          <div className="mt-4 flex justify-center">
            <StarRatingInline rating={5} reviewCount={2300} />
          </div>
        </div>

        {/* PLACEHOLDER: each card is video-shaped (9:16). Currently shows a customer photo + overlaid quote.
            Swap each card's image for an actual MP4/poster combo once real footage exists. */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
          {cards.map((c, i) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group relative aspect-[9/16] overflow-hidden rounded-2xl bg-chewsyskin-500 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-emeraldgreen-500 focus:ring-offset-2"
              aria-label={`Read ${c.name}'s review`}
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                className="object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Play badge */}
              <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-emeraldgreen-500 shadow-sm transition group-hover:scale-110 sm:h-10 sm:w-10">
                <svg className="h-3.5 w-3.5 translate-x-[1px] sm:h-4 sm:w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M6 4l10 6-10 6V4z" />
                </svg>
              </span>

              <div className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-4">
                <p className="text-xs font-semibold leading-tight sm:text-sm">
                  &ldquo;{c.shortQuote}&rdquo;
                </p>
                <p className="mt-1 text-[10px] text-white/80 sm:text-xs">
                  {c.name} · {c.location}
                </p>
              </div>
            </button>
          ))}
        </div>

        <p className="mt-10 text-center text-xs uppercase tracking-wider text-gray-400">
          Video stories coming soon · Tap a card to read the full review
        </p>
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveIndex(null)}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md transition hover:bg-white"
              aria-label="Close"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="relative aspect-[4/5] w-full bg-chewsyskin-500">
              <Image
                src={active.image}
                alt={active.name}
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-cover"
              />
            </div>
            <div className="p-6 sm:p-8">
              <StarRatingInline rating={5} showCount={false} />
              <blockquote className="mt-4 text-base leading-relaxed text-gray-800 sm:text-lg">
                &ldquo;{active.fullQuote}&rdquo;
              </blockquote>
              <p className="mt-5 text-sm font-semibold text-emeraldgreen-500">
                {active.name}
                <span className="font-normal text-gray-500">
                  {' · '}
                  {active.location}
                </span>
              </p>
              <p className="mt-1 text-xs uppercase tracking-wider text-gray-400">
                Verified Buyer
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
