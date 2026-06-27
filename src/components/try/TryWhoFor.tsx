import Image from 'next/image';

interface Persona {
  title: string;
  body: string;
  image: string;
  tag: string;
}

const personas: Persona[] = [
  {
    title: 'The label-reader.',
    body: 'You flip the package over before it goes in the cart. Sunfruit passes the test — five organic ingredients you can actually pronounce.',
    image: '/images/Closeup_Smile.png',
    tag: 'Clean ingredients',
  },
  {
    title: 'The keto & paleo crowd.',
    body: 'Zero net carbs. No grains, no dairy, no sneaky sweeteners. Fits the diet without breaking the macros.',
    image: '/images/keto.png',
    tag: 'Diet-friendly',
  },
  {
    title: 'The parent on the go.',
    body: 'A clean drink the whole family can pour. No food dyes, no artificial sweeteners — finally something the kids can have too.',
    image: '/images/family.png',
    tag: 'Family',
  },
  {
    title: 'The hydration optimizer.',
    body: 'For athletes, hikers, and anyone tired of choking down salty electrolyte mixes. Real fruit, real refreshment, zero salt bomb.',
    image: '/images/Fit_Woman.jpeg',
    tag: 'Athletes',
  },
];

export default function TryWhoFor() {
  return (
    <section className="bg-chewsyskin-500">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emeraldgreen-500">
            Who Sunfruit is for
          </p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl md:text-5xl">
            Made for people who actually read the back of the pack.
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Sunfruit isn&apos;t for everyone. It is for these four people.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {personas.map((p) => (
            <article
              key={p.title}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute left-4 top-4 inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emeraldgreen-700 shadow-sm">
                  {p.tag}
                </span>
              </div>
              <div className="flex-1 p-6">
                <h3 className="font-poppins text-xl font-semibold leading-tight text-emeraldgreen-500">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700 sm:text-base">
                  {p.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
