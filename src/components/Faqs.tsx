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
        "While we don't make health claims. The Sunbfruit differnce is that we use 100% organic ingredients with no sugar, sodium, preservatives or fillers.",
    },
    {
      question: "Is Sunfruit safe for my dietary restricions?",
      answer:
        "We are certified organic, keto and paleo frindly, Whole30, kosher, and non-GMO. We are also soy-free, dairy-free, and gluten-free. For addtional dietary questions, please contact our friendly customer service team.",
    },
    {
      question: "How do I prepare Sunfruit organic beverage mixes?",
      answer:
        "To prepare, simply add the contents of one stick pack to 16 oz of hot or cold water. For more intense flavor, you can add more organic drink mix or use less water.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Most orders are delivered within 3-5 days from placing your order. 1-2 days for order processing, and 2-3 days for shipping.",
    },
    {
      question: "How do I manage my subscription?",
      answer:
        "You can modify or cancel your subscription at any time using this link XXX.",
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
                    className="flex w-full items-start justify-between text-left text-gray-900"
                    aria-expanded={openFAQ === index}
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="text-base/7 font-semibold">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      {openFAQ === index ? (
                        <svg
                          className="size-6"
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
                          className="size-6"
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
                  <dd className="mt-2 pr-12">
                    <p className="text-base/7 text-gray-600">{faq.answer}</p>
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
