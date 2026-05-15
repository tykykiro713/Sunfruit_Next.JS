import Image from 'next/image';
import TryCheckoutButton from './TryCheckoutButton';

export default function TryFinalCTA() {
  return (
    <section id="try-final-cta" className="relative overflow-hidden bg-emeraldgreen-500">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="text-center text-white lg:text-left">
            <h2 className="font-poppins text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Try all 3 flavors. Free.
            </h2>
            <p className="mt-4 text-xl text-white/90 sm:text-2xl">
              Just $5 shipping. That&apos;s the deal.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
              <TryCheckoutButton
                id="try-final-cta-button"
                label="Get my free samples"
                variant="inverse"
              />
              <p className="text-sm text-white/80">
                Backed by our 100% satisfaction guarantee.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-emeraldgreen-700/40 shadow-2xl">
              {/* PLACEHOLDER: hero bundle shot reuse — replace with final asset */}
              <Image
                src="/images/Stick_Packs.png"
                alt="Sunfruit sample pack"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
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
