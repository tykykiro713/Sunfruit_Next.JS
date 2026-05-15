import Image from 'next/image';

const tiles = [
  { src: '/images/Closeup_Smile.png', alt: 'Customer photo' },
  { src: '/images/Fit_Woman.jpeg', alt: 'Customer photo' },
  { src: '/images/family.png', alt: 'Customer photo' },
  { src: '/images/Couple.png', alt: 'Customer photo' },
  { src: '/images/Track.png', alt: 'Customer photo' },
  { src: '/images/AustynHarper.jpg', alt: 'Customer photo' },
];

export default function TryUGCStrip() {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-gray-500">
          #SunfruitMoments — real customers, real glasses
        </p>
        {/* PLACEHOLDER: swap these tiles for real customer UGC under /public/images/try/ugc-*.jpg */}
        <div className="mt-6 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-3">
          {tiles.map((tile, i) => (
            <div
              key={i}
              className="relative aspect-square w-full overflow-hidden rounded-lg bg-chewsyskin-500"
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                sizes="(max-width: 640px) 33vw, 16vw"
                className="object-cover transition hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
