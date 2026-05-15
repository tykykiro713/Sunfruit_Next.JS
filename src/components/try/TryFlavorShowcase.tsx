import Image from 'next/image';

const flavors = [
  {
    name: 'Lemon Mint',
    description: 'Bright. Clean. A little garden-fresh.',
    image: '/images/Lemon_Mint_2.webp',
    bg: 'bg-yellow-50',
  },
  {
    name: 'Grapefruit Ginger',
    description: 'Citrus with a warm, spicy finish.',
    image: '/images/Grapefruit_3.png',
    bg: 'bg-orange-50',
  },
  {
    name: 'Raspberry Hibiscus',
    description: 'Tart, floral, and ridiculously refreshing.',
    image: '/images/Blueberry.png',
    bg: 'bg-pink-50',
  },
];

export default function TryFlavorShowcase() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-poppins text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl md:text-5xl">
            3 flavors. One little box.
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Every sample pack includes one of each. Try them all — keep what you love.
          </p>
        </div>

        {/* PLACEHOLDER NOTE: replace these images with sachet-only product photography
            (transparent or beige backgrounds, square crops) under /public/images/try/. */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {flavors.map((flavor) => (
            <div
              key={flavor.name}
              className={`group flex flex-col items-center rounded-2xl ${flavor.bg} p-6 text-center transition hover:-translate-y-1 hover:shadow-lg`}
            >
              <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-xl">
                <Image
                  src={flavor.image}
                  alt={`Sunfruit ${flavor.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-contain"
                />
              </div>
              <h3 className="mt-4 font-poppins text-xl font-semibold text-emeraldgreen-500">
                {flavor.name}
              </h3>
              <p className="mt-2 text-base text-gray-700">{flavor.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
