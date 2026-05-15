export default function TryCategoryClaim() {
  return (
    <section className="relative overflow-hidden bg-emeraldgreen-500 py-16 text-white sm:py-20 lg:py-28">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.6) 1px, transparent 1px), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '40px 40px, 60px 60px',
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-customYellow-500">
          A new category
        </p>
        <h2 className="mt-4 font-poppins text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:text-[3.5rem]">
          Sunfruit. The first daily{' '}
          <span className="relative inline-block whitespace-nowrap">
            <span className="relative z-10">organic</span>
            <span className="absolute inset-x-0 bottom-1 h-3 bg-customYellow-500/40" aria-hidden="true" />
          </span>{' '}
          beverage mix.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-white/85 sm:text-lg">
          Not flavored water. Not an electrolyte mix. Not another wellness powder.
          A clean, daily drink built on real fruit and botanicals — and nothing else.
        </p>
      </div>
    </section>
  );
}
