import Image from 'next/image';

export default function TryWhyBlock() {
  return (
    <section className="bg-custombeige-500">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-chewsyskin-500 shadow-md">
              <Image
                src="/images/organic_lemons.avif"
                alt="Real organic ingredients"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-poppins text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl md:text-5xl">
              We read every label so you don&apos;t have to.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-gray-700 sm:text-xl">
              No sugar. No sodium. No artificial anything. Just organic fruit
              and botanicals you can actually pronounce — and water you&apos;ll
              actually want to drink.
            </p>

            <ul className="mt-8 space-y-3">
              {[
                'USDA Certified Organic',
                'Non-GMO, gluten-free, keto-friendly',
                'Sweetened with monk fruit & stevia leaf — never artificial sweeteners',
                'Made in the USA',
              ].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <svg
                    className="mt-1 h-5 w-5 flex-shrink-0 text-emeraldgreen-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base text-gray-800 sm:text-lg">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
