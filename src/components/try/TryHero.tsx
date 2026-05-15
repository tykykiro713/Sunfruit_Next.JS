import Image from 'next/image';
import StarRatingInline from './StarRatingInline';
import TryCheckoutButton from './TryCheckoutButton';

export default function TryHero() {
  return (
    <section className="bg-custombeige-500">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center rounded-full bg-emeraldgreen-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emeraldgreen-500">
              Sample pack · Limit 1 per customer
            </span>
            <h1 className="mt-4 font-poppins text-5xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-6xl md:text-7xl">
              Try samples for free.
            </h1>
            <p className="mt-4 text-xl text-gray-700 sm:text-2xl">
              Just pay $5 shipping.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 lg:items-start">
              <TryCheckoutButton id="try-hero-cta" label="Get my free samples" />
              <p className="text-sm text-gray-600">
                Ships today! · 3 flavors · USDA Organic
              </p>
              <StarRatingInline rating={5} reviewCount={2300} className="mt-2" />
            </div>
          </div>

          {/* Hero image */}
          <div className="relative w-full">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-chewsyskin-500 shadow-lg lg:aspect-[5/4]">
              {/* PLACEHOLDER: bundle shot — all 3 flavor sample sachets fanned out, top-down, beige surface, natural light. Final asset goes in /public/images/try/hero-bundle.jpg */}
              <Image
                src="/images/samples-desktop.jpg"
                alt="Sunfruit sample pack — all 3 flavors"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute right-4 top-4 hidden rounded-full bg-customYellow-500 px-4 py-2 text-sm font-bold text-emeraldgreen-500 shadow-md sm:block">
                FREE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
