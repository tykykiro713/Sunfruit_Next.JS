'use client';

import { useState } from 'react';
import TryCheckoutButton from './TryCheckoutButton';

const faqs = [
  {
    question: 'Is this really free?',
    answer:
      "Yes — the samples are on us. You just cover a flat $5 shipping fee. No hidden charges, no subscription enrollment, no upsell at checkout.",
  },
  {
    question: 'When does it ship?',
    answer:
      'Ships today. If your order is placed after 5pm EST, it ships the next morning. Most orders arrive within 2–3 business days.',
  },
  {
    question: 'What flavors are in the pack?',
    answer:
      'All three launch flavors: Lemon Mint, Grapefruit Ginger, and Raspberry Hibiscus. One stick pack of each so you can find your favorite.',
  },
  {
    question: 'Is this a subscription?',
    answer:
      'No. One-time purchase, no auto-renewal, nothing to cancel. We won\'t charge you again unless you decide to come back and order more.',
  },
  {
    question: 'Can I order more than one pack?',
    answer:
      "One per customer — we want as many people as possible to try Sunfruit. If you love it, our full-size products are one click away after the order is placed.",
  },
  {
    question: 'What if I don\'t like it?',
    answer:
      "We back every order with a 100% satisfaction guarantee. Email us and we'll make it right.",
  },
  {
    question: 'Is Sunfruit safe for kids?',
    answer:
      "Yes. There are no artificial sweeteners, no artificial colors, and no caffeine — just organic fruit and botanicals sweetened with a touch of organic monk fruit and stevia leaf. Many of our customers share Sunfruit with their kids daily.",
  },
  {
    question: 'Why monk fruit and stevia instead of sucralose or aspartame?',
    answer:
      "Monk fruit and stevia are plant-derived sweeteners with thousands of years of traditional use. Both have zero glycemic impact and no known link to gut-health issues. Sucralose, aspartame, and ace-K are artificial molecules that don't exist in nature — we just don't think they belong in a daily drink.",
  },
  {
    question: 'Is Sunfruit really USDA Organic?',
    answer:
      "Yes. Every ingredient is certified organic, the finished product is certified organic, and our facility is independently audited. The certification logo on the package is the real thing — not a marketing graphic.",
  },
  {
    question: 'Can I drink it more than once a day?',
    answer:
      "Absolutely. There's nothing in Sunfruit that limits how often you can drink it — no caffeine, no artificial sweeteners, no high sodium. Most of our daily drinkers have 1–3 a day.",
  },
];

export default function TryFaqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emeraldgreen-500">
            Honest answers
          </p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl md:text-5xl">
            Questions, answered.
          </h2>
        </div>

        <dl className="mt-12 divide-y divide-gray-200 border-y border-gray-200">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="py-5">
                <dt>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-start justify-between text-left"
                  >
                    <span className="pr-6 text-lg font-medium text-gray-900 sm:text-xl">
                      {faq.question}
                    </span>
                    <span className="ml-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-emeraldgreen-50 text-emeraldgreen-500">
                      <svg
                        className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-45' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                      </svg>
                    </span>
                  </button>
                </dt>
                {isOpen && (
                  <dd className="mt-3 pr-9 text-base leading-relaxed text-gray-700 sm:text-lg">
                    {faq.answer}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>

        <div className="mt-14 flex flex-col items-center gap-3">
          <TryCheckoutButton id="try-faq-cta" label="Get my free samples" />
          <p className="text-sm text-gray-600">Backed by our 100% satisfaction guarantee.</p>
        </div>
      </div>
    </section>
  );
}
