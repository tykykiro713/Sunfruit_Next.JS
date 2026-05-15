const whatsIn = [
  'Organic fruits & botanicals',
  'Organic monk fruit',
  'Organic stevia leaf',
  'Prebiotic fiber',
  'Vitamin C (from acerola cherry)',
  'About 5 ingredients per flavor',
];

const whatsNot = [
  'Cane sugar, corn syrup, agave',
  'Sodium (zero, on purpose)',
  'Sucralose, aspartame, ace-K',
  'Artificial flavors',
  'Artificial colors (Red 40, Yellow 5…)',
  'Vague "natural flavors" you can’t trace',
];

export default function TryWhatsInOut() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emeraldgreen-500">
            The short list
          </p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl md:text-5xl">
            Read every label?{' '}
            <span className="text-gray-900">So do we.</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Here&apos;s exactly what&apos;s in Sunfruit, and exactly what isn&apos;t.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          {/* IN */}
          <div className="relative rounded-3xl border border-emeraldgreen-500/15 bg-emeraldgreen-50/40 p-8 sm:p-10">
            <div className="absolute -top-4 left-8 inline-flex items-center gap-2 rounded-full bg-emeraldgreen-500 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              What&apos;s in
            </div>
            <ul className="mt-4 space-y-4">
              {whatsIn.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emeraldgreen-500 text-white">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-base text-gray-900 sm:text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* OUT */}
          <div className="relative rounded-3xl border border-gray-200 bg-gray-50 p-8 sm:p-10">
            <div className="absolute -top-4 left-8 inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white shadow-sm">
              <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              What&apos;s not
            </div>
            <ul className="mt-4 space-y-4">
              {whatsNot.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-300 text-gray-700">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <span className="text-base text-gray-700 line-through decoration-gray-300 decoration-1 sm:text-lg">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-10 text-center text-sm text-gray-500">
          If &ldquo;natural flavors&rdquo; feels vague, that&apos;s because it usually is.
          Ours have a name and come from real food.
        </p>
      </div>
    </section>
  );
}
