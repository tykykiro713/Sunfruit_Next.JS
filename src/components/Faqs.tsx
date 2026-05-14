"use client";

import { useState } from "react";

export default function Faqs() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "What are the health benefits of Sunfruit?",
      answer:
        "Sunfruit is USDA Certified Organic with no sugar added, no sodium, and no artificial ingredients. We believe the best ingredient list is a short one. Just real ingredients you can actually pronounce.",
    },
    {
      question: "Is Sunfruit safe for my dietary restrictions?",
      answer:
        "Sunfruit is certified organic, non-GMO and keto friendly. Sunfruit is also soy-free, dairy-free, and gluten-free. For additional dietary questions, please contact our friendly customer service team.",
    },
    {
      question: "How do I prepare Sunfruit organic beverage mixes?",
      answer:
        "To prepare, simply add the contents of one stick pack to 12-16 oz water. Find your preferred flavor intensity by adding more or less water.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Most orders are delivered within 3-5 days from placing your order. 1-2 days for order processing, and 2-3 days for shipping.",
    },
    {
      question: "How do I manage my subscription?",
      answer:
        "You can modify or cancel your subscription at any time through text messages, your customer account on our website, or by contacting us.",
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-4xl font-poppins font-semibold tracking-tight text-emeraldgreen-500 sm:text-5xl">
            FAQs
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq, index) => (
              <div key={index} className="pt-6">
                <dt>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between text-left text-gray-900 group relative"
                    aria-expanded={openFAQ === index}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-lg md:text-xl lg:text-2xl font-medium text-gray-900 group-data-[open]:text-green-600">
                      {faq.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      {openFAQ === index ? (
                        <svg
                          className="size-6 text-green-400 group-hover:text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-icon="minus"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                        </svg>
                      ) : (
                        <svg
                          className="size-6 text-gray-400 group-hover:text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                          data-icon="plus"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
                        </svg>
                      )}
                    </span>
                  </button>
                </dt>
                {openFAQ === index && (
                  <dd className="mt-4 pr-12">
                    <p className="text-lg md:text-xl text-gray-700">
                      {faq.answer}
                    </p>
                  </dd>
                )}
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}