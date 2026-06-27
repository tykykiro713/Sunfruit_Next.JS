import Image from 'next/image';
import StarRatingInline from './StarRatingInline';

interface Review {
  quote: string;
  author: string;
  location: string;
  badge: string;
  image: string;
}

const reviews: Review[] = [
  {
    badge: 'Switched from Crystal Light',
    quote:
      "I've been a Crystal Light person for twenty years. Then I read the back of the package and realized I was drinking Yellow 5 and aspartame three times a day. Sunfruit was the first replacement I tried where the flavor was actually better, not just cleaner. I switched and never looked back.",
    author: 'Sarah M.',
    location: 'Austin, TX',
    image: '/images/Woman.jpg',
  },
  {
    badge: 'Switched from Liquid I.V.',
    quote:
      "I used Liquid I.V. for hydration but the sodium load started giving me headaches. Sunfruit was a revelation — real hydration without 510mg of salt per stick pack. The Grapefruit Ginger is my new daily.",
    author: 'David K.',
    location: 'Brooklyn, NY',
    image: '/images/Kayak.jpg',
  },
  {
    badge: 'Parent of two',
    quote:
      "Finding a clean drink mix the whole family can have was honestly impossible until Sunfruit. No artificial colors means my kids can have it, no aspartame means I'm comfortable giving it to them, and the flavors are sophisticated enough that I actually want it too.",
    author: 'Maya R.',
    location: 'Portland, OR',
    image: '/images/family.png',
  },
];

export default function TryReviews() {
  return (
    <section className="bg-custombeige-500">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emeraldgreen-500">
            The long story
          </p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl md:text-5xl">
            What made them switch.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-10">
          {reviews.map((r) => (
            <figure
              key={r.author}
              className="flex flex-col rounded-3xl bg-white p-8 shadow-sm"
            >
              <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-emeraldgreen-50 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-emeraldgreen-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emeraldgreen-500" />
                {r.badge}
              </span>
              <StarRatingInline rating={5} showCount={false} className="mt-4" />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-gray-800 sm:text-lg">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-5">
                <div className="relative h-12 w-12 overflow-hidden rounded-full bg-chewsyskin-500">
                  <Image
                    src={r.image}
                    alt={r.author}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{r.author}</p>
                  <p className="text-xs text-gray-500">
                    {r.location}
                    <span className="mx-1.5 text-gray-300">·</span>
                    <span className="font-medium text-emeraldgreen-700">
                      Verified Buyer
                    </span>
                  </p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
