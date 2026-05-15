import Image from 'next/image';
import TryCheckoutButton from './TryCheckoutButton';

export default function TryFinalCTA() {
  return (
    <section id="try-final-cta" className="relative overflow-hidden bg-emeraldgreen-500 text-white">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 30% 40%, rgba(255,255,255,0.5) 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px, 70px 70px',
        }}
        aria-hidden="true"
      />
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-customYellow-500/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full bg-brightgreen-500/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="text-center lg:col-span-7 lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-customYellow-500">
              Last call
            </p>
            <h2 className="mt-4 font-poppins text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Try all 3 flavors.
              <br />
              <span className="relative inline-block">
                Free.
                <span className="absolute -bottom-1 left-0 h-2 w-full bg-customYellow-500" aria-hidden="true" />
              </span>
            </h2>
            <p className="mt-6 text-xl text-white/90 sm:text-2xl">
              Just <span className="font-semibold">$5 shipping</span>. That&apos;s the deal.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
              <TryCheckoutButton
                id="try-final-cta-button"
                label="Get my free samples"
                variant="inverse"
              />
              <p className="text-sm text-white/85">
                Ships today! · 100% satisfaction guarantee · No subscription
              </p>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 text-center lg:max-w-md lg:text-left">
              <div className="rounded-2xl bg-emeraldgreen-700/40 p-4">
                <p className="text-3xl font-bold sm:text-4xl">0g</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/70 sm:text-xs">
                  Added sugar
                </p>
              </div>
              <div className="rounded-2xl bg-emeraldgreen-700/40 p-4">
                <p className="text-3xl font-bold sm:text-4xl">0mg</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/70 sm:text-xs">
                  Sodium
                </p>
              </div>
              <div className="rounded-2xl bg-emeraldgreen-700/40 p-4">
                <p className="text-3xl font-bold sm:text-4xl">5</p>
                <p className="mt-1 text-[10px] uppercase tracking-wider text-white/70 sm:text-xs">
                  Ingredients
                </p>
              </div>
            </div>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-emeraldgreen-700/40 shadow-2xl">
              {/* PLACEHOLDER: bundle shot reused — final asset should be a hero-quality top-down or 3-up flat lay. */}
              <Image
                src="/images/Stick_Packs.png"
                alt="Sunfruit sample pack"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
