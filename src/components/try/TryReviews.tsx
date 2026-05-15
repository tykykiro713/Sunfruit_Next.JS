import Image from 'next/image';
import StarRatingInline from './StarRatingInline';
import TryCheckoutButton from './TryCheckoutButton';

const reviews = [
  {
    quote:
      "I read every label. Sunfruit actually passes the test. No bloating, no weird additives. My body just feels good with it.",
    author: 'Sarah M.',
    location: 'California',
    image: '/images/Woman.jpg',
  },
  {
    quote:
      "I finally found something organic that doesn't taste like a compromise. I drink way more water now. Sunfruit makes it easy.",
    author: 'David K.',
    location: 'New York',
    image: '/images/Kayak.jpg',
  },
  {
    quote:
      "Our family loves Sunfruit. Tastes great, real ingredients, and I feel good giving it to my kids.",
    author: 'Brad R.',
    location: 'Maine',
    image: '/images/Testimonial.jpg',
  },
];

export default function TryReviews() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-poppins text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl md:text-5xl">
            What people who got the pack said.
          </h2>
          <div className="mt-4 flex justify-center">
            <StarRatingInline rating={5} reviewCount={2300} />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {reviews.map((review) => (
            <figure
              key={review.author}
              className="flex flex-col items-center rounded-2xl bg-gray-50 p-8 text-center"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-full">
                <Image
                  src={review.image}
                  alt={review.author}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>
              <StarRatingInline rating={5} showCount={false} className="mt-4" />
              <blockquote className="mt-4 text-base text-gray-800 sm:text-lg">
                &ldquo;{review.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-gray-900">
                {review.author}
                <span className="font-normal text-gray-500"> · {review.location}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <TryCheckoutButton id="try-reviews-cta" label="Get my free samples" />
        </div>
      </div>
    </section>
  );
}
