import Image from 'next/image';

interface Ingredient {
  name: string;
  latin?: string;
  function: string;
  dose?: string;
  image: string;
  tag: 'fruit' | 'botanical' | 'sweetener' | 'fiber' | 'vitamin';
}

const ingredients: Ingredient[] = [
  {
    name: 'Organic Lemon',
    latin: 'Citrus limon',
    function:
      'Real freeze-dried lemon — bright, clean citrus flavor. Naturally rich in vitamin C.',
    dose: 'Real fruit',
    image: '/images/Lemon_3.jpg',
    tag: 'fruit',
  },
  {
    name: 'Organic Mint',
    latin: 'Mentha spicata',
    function:
      'Cooling herbaceous note that balances the citrus. Traditionally used to support digestion.',
    dose: 'Real botanical',
    image: '/images/lemon_mint.png',
    tag: 'botanical',
  },
  {
    name: 'Organic Grapefruit',
    latin: 'Citrus × paradisi',
    function:
      'Tart, slightly bitter — the only citrus with naturally pink pigment. No need for added color.',
    dose: 'Real fruit',
    image: '/images/Grapefruit_4.png',
    tag: 'fruit',
  },
  {
    name: 'Organic Ginger Root',
    latin: 'Zingiber officinale',
    function:
      'Warm, spicy finish. Long used for digestive support and a clean, energizing lift.',
    dose: 'Real botanical',
    image: '/images/GrapefruitTree.png',
    tag: 'botanical',
  },
  {
    name: 'Organic Raspberry',
    latin: 'Rubus idaeus',
    function:
      'Tart, jammy fruit with naturally deep color and a touch of natural sweetness.',
    dose: 'Real fruit',
    image: '/images/Blueberry.png',
    tag: 'fruit',
  },
  {
    name: 'Organic Hibiscus',
    latin: 'Hibiscus sabdariffa',
    function:
      'Floral, tart, and the source of the natural pink color. Traditionally used as a refreshing tea.',
    dose: 'Real botanical',
    image: '/images/Sunfruit_Repeat.png',
    tag: 'botanical',
  },
  {
    name: 'Organic Monk Fruit',
    latin: 'Siraitia grosvenorii',
    function:
      'A small green melon native to southern China. Naturally sweet, zero-calorie, zero glycemic impact.',
    dose: 'Natural sweetener',
    image: '/images/keto.png',
    tag: 'sweetener',
  },
  {
    name: 'Organic Stevia Leaf',
    latin: 'Stevia rebaudiana',
    function:
      'Leaf extract used for thousands of years. Sweet without added sugar or artificial sweeteners.',
    dose: 'Natural sweetener',
    image: '/images/organic_lemons.avif',
    tag: 'sweetener',
  },
  {
    name: 'Prebiotic Fiber',
    function:
      'Plant-based soluble fiber that feeds the beneficial bacteria in your gut. Small daily dose with every drink.',
    dose: 'Gut support',
    image: '/images/green_drink.png',
    tag: 'fiber',
  },
];

const tagColors: Record<Ingredient['tag'], string> = {
  fruit: 'bg-rose-50 text-rose-700 border-rose-200',
  botanical: 'bg-emeraldgreen-50 text-emeraldgreen-700 border-emeraldgreen-200',
  sweetener: 'bg-customYellow-50 text-customYellow-900 border-customYellow-300',
  fiber: 'bg-orange-50 text-orange-800 border-orange-200',
  vitamin: 'bg-pink-50 text-pink-800 border-pink-200',
};

export default function TryIngredientCards() {
  return (
    <section className="bg-custombeige-500">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emeraldgreen-500">
            Every ingredient. Photographed.
          </p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl md:text-5xl">
            We have nothing to hide.
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Here&apos;s what you&apos;ll find inside a Sunfruit stick pack — and why each
            one is there. About five per flavor. All organic. All real.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ingredients.map((ing) => (
            <article
              key={ing.name}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-[5/3] w-full overflow-hidden bg-chewsyskin-500">
                <Image
                  src={ing.image}
                  alt={ing.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-poppins text-xl font-semibold leading-tight text-emeraldgreen-500">
                      {ing.name}
                    </h3>
                    {ing.latin && (
                      <p className="mt-0.5 text-xs italic text-gray-500">
                        {ing.latin}
                      </p>
                    )}
                  </div>
                  <span
                    className={`flex-shrink-0 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${tagColors[ing.tag]}`}
                  >
                    {ing.tag}
                  </span>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                  {ing.function}
                </p>
                {ing.dose && (
                  <p className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-emeraldgreen-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-emeraldgreen-500" />
                    {ing.dose}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-gray-500">
          Sourcing details and per-serving doses available on each product page once
          you find your favorite flavor.
        </p>
      </div>
    </section>
  );
}
