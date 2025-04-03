const features = [
  { name: 'Organic', description: 'Sunfruit is the only organic flavored drink mix on the market. Hard to believe right?' },
  { name: 'Sugar-Free', description: 'Great for managing your blood sugar, losing weight or reducing inflamation.' },
  { name: 'Sodium-Free', description: 'We\'re not another hydration mix. Sunfruit is a heart healthy option for those managing sodium intake.' },
  { name: 'Only 4 Ingredients', description: 'Organic fruit, organic botanicals, organic inulin, and organic monk fruit.' },
  { name: 'Probiotic', description: 'Each flavor is made with organic inulin fiber from agave - a prebiotic that supports gut health.' },
  { name: 'No Preservatives', description: 'Sunfruit is made by freeze drying fruits and botanicals, locking in flavors without preservatives.' },
]

export default function ProductSpecs() {
  return (
    <div className="bg-white w-full">
      <div className="grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-emeraldgreen-500 sm:text-4xl">Why Sunfruit?</h2>
          <p className="mt-4 text-gray-500">
            Sunfruit is made with 100% organic fruits and botanicals that are freeze dried to maintain flavor and nutrients. This results in delicious beverages that are perfect for your health and wellness goals.
          </p> 

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            {features.map((feature) => (
              <div key={feature.name} className="border-t border-gray-200 pt-4">
                <dt className="font-medium text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
          <img
            alt="Lemon mint ingredients"
            src="/images/lemon_mint.png"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Salt shaker"
            src="/images/salt_shaker.png"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Agave plant"
            src="/images/agave_plant.png"
            className="rounded-lg bg-gray-100"
          />
          <img
            alt="Monk fruit"
            src="/images/monk_fruit.jpg"
            className="rounded-lg bg-gray-100"
          />
        </div>
      </div>
    </div>
  )
}
  