import TryCheckoutButton from './TryCheckoutButton';

const steps = [
  {
    title: 'Pick your pack',
    body: "We picked for you — all 3 flavors, one of each.",
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
  {
    title: 'Ships today',
    body: 'Flat $5 shipping, anywhere in the US. Most orders arrive in 2–3 days.',
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9-1.5h10.5a1.5 1.5 0 001.5-1.5V6.75a1.5 1.5 0 00-1.5-1.5H4.5A1.5 1.5 0 003 6.75v9a1.5 1.5 0 001.5 1.5zm12 1.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.5a1.5 1.5 0 001.5-1.5v-4.5a1.5 1.5 0 00-.44-1.06l-3.5-3.5a1.5 1.5 0 00-1.06-.44H15" />
      </svg>
    ),
  },
  {
    title: 'Find your flavor',
    body: 'Try them all. Decide what you love. Come back for more.',
    icon: (
      <svg className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.572L16.5 21.75l-.398-1.178a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.179-.398a2.25 2.25 0 001.423-1.423l.398-1.178.398 1.178a2.25 2.25 0 001.423 1.423l1.179.398-1.179.398a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
];

export default function TryHowItWorks() {
  return (
    <section className="bg-chewsyskin-500">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-poppins text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl md:text-5xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Three steps from this page to a sip.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emeraldgreen-500 text-white">
                {step.icon}
              </div>
              <div className="mt-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-emeraldgreen-50 text-sm font-bold text-emeraldgreen-500">
                {i + 1}
              </div>
              <h3 className="mt-3 font-poppins text-xl font-semibold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-base text-gray-700">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <TryCheckoutButton id="try-howitworks-cta" label="Get my free samples" />
        </div>
      </div>
    </section>
  );
}
