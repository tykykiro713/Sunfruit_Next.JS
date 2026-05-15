import Image from 'next/image';

interface Flavor {
  name: string;
  botanicals: string;
  taste: string;
  useCase: string;
  image: string;
  bandClass: string;
  pillClass: string;
  accent: string;
}

const flavors: Flavor[] = [
  {
    name: 'Lemon Mint',
    botanicals: 'Real lemon · Organic mint',
    taste:
      'Bright, herbaceous, garden-fresh. Like cold lemonade picked from a windowsill — only cleaner.',
    useCase: 'Morning. Afternoon. Anytime your water tastes like nothing.',
    image: '/images/lemon_mint.png',
    bandClass: 'bg-gradient-to-br from-customYellow-100 via-customYellow-50 to-white',
    pillClass: 'bg-customYellow-500 text-emeraldgreen-700',
    accent: 'text-emeraldgreen-700',
  },
  {
    name: 'Grapefruit Ginger',
    botanicals: 'Real grapefruit · Organic ginger root',
    taste:
      'Citrus up top, warm and spicy on the finish. Brisk and grown-up — not a juice-box grapefruit.',
    useCase: 'Pre-workout. Post-lunch. Anywhere a sparkling water would feel boring.',
    image: '/images/Grapefruit_3.png',
    bandClass: 'bg-gradient-to-br from-orange-100 via-orange-50 to-white',
    pillClass: 'bg-orange-500 text-white',
    accent: 'text-orange-700',
  },
  {
    name: 'Raspberry Hibiscus',
    botanicals: 'Real raspberry · Organic hibiscus',
    taste:
      'Tart, floral, ridiculously refreshing. Hibiscus pulls it into adult territory — think iced tea more than fruit punch.',
    useCase: 'The afternoon slump. The friend who only drinks rosé. Anytime you want pink.',
    image: '/images/Blueberry.png',
    bandClass: 'bg-gradient-to-br from-pink-100 via-pink-50 to-white',
    pillClass: 'bg-pink-500 text-white',
    accent: 'text-pink-700',
  },
];

export default function TryFlavorShowcase() {
  return (
    <section>
      <div className="bg-white">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emeraldgreen-500">
            Meet the lineup
          </p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl md:text-5xl">
            Flavors with depth.
            <br />
            <span className="text-gray-900">Not just citrus.</span>
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Three botanical blends — fruit paired with herbs, roots, and florals.
            The kind of flavor you&apos;d expect from a cocktail menu, not a packet.
          </p>
        </div>
      </div>

      {flavors.map((flavor, i) => (
        <div key={flavor.name} className={`relative ${flavor.bandClass}`}>
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
            <div
              className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
                i % 2 === 1 ? '' : ''
              }`}
            >
              <div
                className={`relative lg:col-span-6 ${
                  i % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                }`}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-[0_30px_50px_-20px_rgba(0,0,0,0.2)]">
                  <Image
                    src={flavor.image}
                    alt={flavor.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -top-3 -left-3 hidden rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emeraldgreen-700 shadow sm:block">
                  Flavor 0{i + 1}
                </div>
              </div>

              <div
                className={`lg:col-span-6 ${
                  i % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                }`}
              >
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${flavor.pillClass}`}
                >
                  {flavor.botanicals}
                </span>
                <h3
                  className={`mt-4 font-poppins text-4xl font-semibold leading-tight tracking-tight sm:text-5xl md:text-6xl ${flavor.accent}`}
                >
                  {flavor.name}
                </h3>
                <p className="mt-5 text-lg leading-relaxed text-gray-800 sm:text-xl">
                  {flavor.taste}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm text-gray-700 shadow-sm backdrop-blur">
                  <svg
                    className="h-4 w-4 text-emeraldgreen-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {flavor.useCase}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
