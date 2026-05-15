import Image from 'next/image';
import StarRatingInline from './StarRatingInline';
import TryCheckoutButton from './TryCheckoutButton';

const heroBadges = [
  'USDA Organic',
  'Non-GMO',
  '0g Sugar',
  '0mg Sodium',
  'Keto',
  'Made in USA',
];

export default function TryHero() {
  return (
    <section className="relative overflow-hidden bg-custombeige-500">
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-customYellow-500/20 blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-40 -right-32 h-[28rem] w-[28rem] rounded-full bg-emeraldgreen-500/10 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="text-center lg:col-span-7 lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-emeraldgreen-500/20 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-emeraldgreen-500 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emeraldgreen-500" />
              Sample pack · One per customer
            </span>
            <h1 className="mt-5 font-poppins text-[2.75rem] font-semibold leading-[1.05] tracking-tight text-emeraldgreen-500 sm:text-6xl md:text-7xl lg:text-[5.25rem]">
              Try samples
              <br />
              <span className="relative inline-block">
                for free.
                <span className="absolute -bottom-1 left-0 h-1.5 w-full bg-customYellow-500" aria-hidden="true" />
              </span>
            </h1>
            <p className="mt-6 text-xl text-gray-800 sm:text-2xl">
              Just pay <span className="font-semibold">$5 shipping</span>.
            </p>
            <p className="mt-3 max-w-xl text-base text-gray-700 sm:text-lg lg:mx-0">
              The first daily organic beverage mix. Three botanical flavors.
              Zero sugar. Zero sodium. Nothing artificial — ever.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
              <TryCheckoutButton id="try-hero-cta" label="Get my free samples" />
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-emeraldgreen-500">Ships today!</span>
                {' '}· 3 flavors · 100% satisfaction guaranteed
              </p>
              <StarRatingInline rating={5} reviewCount={2300} className="mt-1" />
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 lg:justify-start">
              {heroBadges.map((badge) => (
                <li
                  key={badge}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/60 px-3 py-1 text-xs font-medium text-emeraldgreen-700 backdrop-blur sm:text-sm"
                >
                  <svg className="h-3.5 w-3.5 text-emeraldgreen-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {badge}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-chewsyskin-500 shadow-[0_30px_60px_-20px_rgba(0,78,54,0.35)]">
              {/* PLACEHOLDER: hero bundle shot — all 3 sample sachets, top-down on beige, natural light. Swap with /public/images/try/hero-bundle.jpg */}
              <Image
                src="/images/samples-desktop.jpg"
                alt="Sunfruit sample pack — all 3 flavors"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute left-6 top-6 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emeraldgreen-500 shadow-sm">
                Variety pack
              </div>
              <div className="pointer-events-none absolute right-6 top-6 flex h-20 w-20 rotate-12 items-center justify-center rounded-full bg-customYellow-500 text-center text-base font-extrabold leading-tight text-emeraldgreen-500 shadow-lg">
                FREE
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden rounded-2xl bg-white px-5 py-3 shadow-lg sm:block">
              <p className="text-xs uppercase tracking-wider text-gray-500">Inside the pack</p>
              <p className="mt-1 text-sm font-semibold text-emeraldgreen-500">
                Lemon Mint · Grapefruit Ginger · Raspberry Hibiscus
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
