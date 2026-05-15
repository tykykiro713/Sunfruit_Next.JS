'use client';

import { useState } from 'react';
import TryCheckoutButton from './TryCheckoutButton';

const faqs = [
  {
    question: 'Is this really free?',
    answer:
      "Yes — the samples are on us. You just cover a flat $5 shipping fee. No hidden charges, no subscription, no upsell at checkout.",
  },
  {
    question: 'When does it ship?',
    answer:
      'Ships today. If your order is placed after 5pm EST, it will ship the next morning. Most orders arrive within 2–3 days.',
  },
  {
    question: "What flavors are in the pack?",
    answer:
      "All three of our launch flavors: Lemon Mint, Grapefruit Ginger, and Raspberry Hibiscus. One of each.",
  },
  {
    question: 'Is this a subscription?',
    answer:
      'No. One-time purchase, no auto-renewal, nothing to cancel. We won&apos;t charge you again unless you decide to come back and order more.',
  },
  {
    question: 'Can I order more than one pack?',
    answer:
      "One per customer — we want as many people as possible to try Sunfruit. If you love it, our full-size products are a click away after you place the order.",
  },
  {
    question: "What if I don&apos;t like it?",
    answer:
      "We back every order with a 100% satisfaction guarantee. Email us and we&apos;ll make it right.",
  },
  {
    question: "What's in Sunfruit?",
    answer:
      "Organic fruit, organic botanicals, and a little monk fruit and stevia leaf for natural sweetness. No sugar, no sodium, no artificial sweeteners, no artificial colors. That&apos;s it.",
  },
];

function decode(text: string) {
  return text.replace(/&apos;/g, "’");
}

export default function TryFaqs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <h2 className="font-poppins text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl md:text-5xl">
          Frequently asked
        </h2>

        <dl className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
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
                      {decode(faq.question)}
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
                  <dd className="mt-3 pr-9 text-base text-gray-700 sm:text-lg">
                    {decode(faq.answer)}
                  </dd>
                )}
              </div>
            );
          })}
        </dl>

        <div className="mt-12 flex justify-center">
          <TryCheckoutButton id="try-faq-cta" label="Get my free samples" />
        </div>
      </div>
    </section>
  );
}
