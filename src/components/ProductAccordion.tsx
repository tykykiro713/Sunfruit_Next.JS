"use client";  

import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import type { AccordionItem } from '@/data/productAccordionData';

interface ProductAccordionProps {
  items: AccordionItem[];
}

export default function ProductAccordion({ items }: ProductAccordionProps) {
  return (
    <section aria-labelledby="details-heading" className="mt-12">
      <h2 id="details-heading" className="sr-only">
        Additional details
      </h2>

      <div className="divide-y divide-gray-200 border-t">
        {items.map((item, idx) => (
          <Disclosure key={idx} as="div">
            <h3>
              <DisclosureButton className="group relative flex w-full items-center justify-between py-6 text-left">
                <span className="text-base md:text-lg font-medium text-gray-900 group-data-[open]:text-green-600">
                  {item.name}
                </span>
                <span className="ml-6 flex items-center">
                  <PlusIcon
                    aria-hidden="true"
                    className="block size-6 text-gray-400 group-hover:text-gray-500 group-data-[open]:hidden"
                  />
                  <MinusIcon
                    aria-hidden="true"
                    className="hidden size-6 text-green-400 group-hover:text-green-500 group-data-[open]:block"
                  />
                </span>
              </DisclosureButton>
            </h3>
            <DisclosurePanel className="pb-6">
              <ul
                role="list"
                className="list-disc space-y-2 pl-5 text-base md:text-lg text-gray-700 marker:text-gray-300"
              >
                {item.content.map((content, idx) => (
                  <li key={idx} className="pl-2">
                    {content}
                  </li>
                ))}
              </ul>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </div>
    </section>
  );
}