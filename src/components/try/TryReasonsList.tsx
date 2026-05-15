import Image from 'next/image';
import TrySodiumChart from './TrySodiumChart';

interface Reason {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  pull?: string;
  image: string;
  imageAlt: string;
  hasSodiumChart?: boolean;
}

const reasons: Reason[] = [
  {
    number: '01',
    eyebrow: 'A new category',
    title: 'The first daily organic beverage mix.',
    body: 'Most flavored waters and electrolyte mixes are loaded with artificial sweeteners and vague "natural flavors." Sunfruit is USDA Certified Organic — every ingredient, every batch. Real fruit, organic botanicals, nothing else.',
    pull: '"USDA Certified Organic — every ingredient, every batch."',
    image: '/images/GrapefruitTree.png',
    imageAlt: 'Organic grapefruit tree',
  },
  {
    number: '02',
    eyebrow: 'Your heart will thank you',
    title: 'No sodium. Zero milligrams.',
    body: 'The American Heart Association recommends no more than 2,300mg of sodium per day. The average American eats far more — and a single packet of Liquid I.V. adds another 510mg. Long-term excess sodium raises blood pressure and is linked to higher rates of stroke and heart disease.',
    image: '/images/Lemon_3.jpg',
    imageAlt: 'Fresh lemons',
    hasSodiumChart: true,
  },
  {
    number: '03',
    eyebrow: 'No sugar games',
    title: 'No added sugar. Ever.',
    body: 'About 1 gram of natural sugar from real fruit per serving — nothing added. Sweetened only with organic monk fruit and stevia leaf. No sucralose, no aspartame, no ace-K, no aspartame, no maltodextrin. Just real sweetness from real food.',
    pull: '"About 1g of natural fruit sugar. Nothing added."',
    image: '/images/Grapefruit_4.png',
    imageAlt: 'Real grapefruit',
  },
  {
    number: '04',
    eyebrow: 'Real fruit, real flavor',
    title: 'No artificial flavors.',
    body: 'Real lemon. Real grapefruit. Real raspberry. Real mint, ginger, and hibiscus. If a label just says "natural flavors," that\'s usually code for lab-extracted flavor compounds. Ours come from the actual plants — and we say so by name.',
    image: '/images/lemon_mint.png',
    imageAlt: 'Lemon and mint',
  },
  {
    number: '05',
    eyebrow: 'Only colors from real food',
    title: 'No artificial colors.',
    body: 'Pink from hibiscus. Yellow from organic turmeric. Red from raspberry. No Red 40, no Yellow 5, no titanium dioxide. The color in your glass came from a plant — not a petroleum byproduct.',
    pull: '"Pink from hibiscus. Red from raspberry. Yellow from turmeric."',
    image: '/images/Blueberry.png',
    imageAlt: 'Raspberries and hibiscus',
  },
  {
    number: '06',
    eyebrow: 'Hydration with a second job',
    title: 'Prebiotic, by design.',
    body: 'Every stick pack includes prebiotic fiber that feeds the good bacteria in your gut. About 95% of Americans don\'t get enough fiber. Sunfruit isn\'t a fiber supplement — but it gives you a small, consistent dose with every drink.',
    image: '/images/green_drink.png',
    imageAlt: 'Sunfruit drink in a glass',
  },
  {
    number: '07',
    eyebrow: 'Keto · paleo · kid',
    title: 'Friendly to the whole family.',
    body: 'Zero net carbs. No grains, no gluten, no dairy, no soy. Compatible with keto and paleo, safe for kids, and clean enough for the most discerning label-readers. One drink mix, everyone.',
    image: '/images/family.png',
    imageAlt: 'Family enjoying Sunfruit',
  },
  {
    number: '08',
    eyebrow: 'Made here, tested here',
    title: 'Made in the USA. Third-party tested.',
    body: 'Every batch is manufactured in the United States and verified by independent third-party labs. We don\'t outsource to a contract factory in another country, and we don\'t take "organic" on faith — we test for it.',
    pull: '"Every batch is third-party tested."',
    image: '/images/lemontree.png',
    imageAlt: 'Lemon tree',
  },
  {
    number: '09',
    eyebrow: 'A short list, on purpose',
    title: 'Five ingredients you can pronounce.',
    body: 'Try saying "sodium hexametaphosphate" three times fast. Now try "lemon, mint, monk fruit, acerola, prebiotic fiber." A clean ingredient list isn\'t a marketing claim — it\'s the actual back of our pack.',
    image: '/images/organic_lemons.avif',
    imageAlt: 'Sunfruit ingredients',
  },
];

export default function TryReasonsList() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emeraldgreen-500">
            Why people switch
          </p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl md:text-5xl">
            9 reasons Sunfruit is different.
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            We didn&apos;t want to make another flavored water. We wanted to make the
            cleanest daily drink on the shelf.
          </p>
        </div>

        <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
          {reasons.map((reason, i) => {
            const reverse = i % 2 === 1;
            return (
              <article
                key={reason.number}
                className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16 ${
                  reverse ? '' : ''
                }`}
              >
                {/* Image */}
                <div
                  className={`relative lg:col-span-5 ${
                    reverse ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-3xl bg-chewsyskin-500 shadow-[0_20px_40px_-20px_rgba(0,78,54,0.25)]">
                    <Image
                      src={reason.image}
                      alt={reason.imageAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -top-4 -left-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-emeraldgreen-500 text-white shadow-lg sm:h-24 sm:w-24">
                    <span className="font-poppins text-3xl font-bold sm:text-4xl">
                      {reason.number}
                    </span>
                  </div>
                </div>

                {/* Copy */}
                <div className={`lg:col-span-7 ${reverse ? 'lg:order-1' : 'lg:order-2'}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emeraldgreen-500">
                    {reason.eyebrow}
                  </p>
                  <h3 className="mt-3 font-poppins text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-[2.5rem]">
                    {reason.title}
                  </h3>
                  <p className="mt-5 text-lg leading-relaxed text-gray-700 sm:text-xl">
                    {reason.body}
                  </p>
                  {reason.pull && (
                    <p className="mt-6 border-l-4 border-customYellow-500 pl-5 text-base italic text-gray-900 sm:text-lg">
                      {reason.pull}
                    </p>
                  )}
                  {reason.hasSodiumChart && <TrySodiumChart />}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
