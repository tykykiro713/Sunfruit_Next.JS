const features = [
    {
      name: 'Organic',
      description:
        'Sunfruit is the only organic flavored drink mix on the market. Hard to believe right?',
      imageSrc: '/images/lemon_mint.png',
      imageAlt: 'White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.',
    },
    {
      name: 'Sugar-Free',
      description:
        'Great for managing your blood sugar, losing weight or reducing inflamation. Our flavors are subtly sweetend with organic monk fruit. Monk fruit has been used in Chinese medicine for thousands of years for its health benefits',
      imageSrc: '/images/monk_fruit.jpg',
      imageAlt: 'Detail of zipper pull with tan leather and silver rivet.',
    },
    {
      name: 'Sodium-Free',
      description:
        'We\'re not another hydration mix. Sunfruit is a heart healthy option for those managing sodium intake. Studies show too much sodium is linked to heart, kidney and liver disease.',
      imageSrc: '/images/salt_shaker.png',
      imageAlt: 'White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.',
    },
    {
      name: 'Only 4 Ingredients',
      description:
        'Organic fruit, organic botanicals, organic inulin, and organic monk fruit.',
      imageSrc: '/images/lemon_mint.png',
      imageAlt: 'Detail of zipper pull with tan leather and silver rivet.',
    },
    {
      name: 'Probiotic',
      description:
        'Each flavor is made with organic inulin fiber from agave. Agave inulin is a mild sweetener and acts a prebiotic that supports gut health.',
      imageSrc: '/images/agave_plant.png',
      imageAlt: 'White canvas laptop sleeve with gray felt interior, silver zipper, and tan leather zipper pull.',
    },
    {
      name: 'No Preservatives',
      description:
        'Sunfruit is made by freeze drying fruits and botanicals, locking in flavors without preservatives.',
      imageSrc: '/images/freeze_dried_fruit.png',
      imageAlt: 'Detail of zipper pull with tan leather and silver rivet.',
    },
  ]
  
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }
  
  const ProductSpecs2 = () => {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-20 lg:max-w-7xl lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-emeraldgreen-500 sm:text-4xl">Why Sunfruit?</h2>
            <p className="mt-4 text-gray-500">
            Sunfruit is made with 100% organic fruits and botanicals that are freeze dried to maintain flavor and nutrients. This results in delicious beverages that are perfect for your health and wellness goals.
            </p>
          </div>
  
          <div className="mt-16 space-y-16">
            {features.map((feature, featureIdx) => (
              <div
                key={`${feature.name}-${featureIdx}`}
                className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
              >
                <div
                  className={classNames(
                    featureIdx % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-8 xl:col-start-9',
                    'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4'
                  )}
                >
                  <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-sm text-gray-500">{feature.description}</p>
                </div>
                <div
                  className={classNames(
                    featureIdx % 2 === 0 ? 'lg:col-start-6 xl:col-start-5' : 'lg:col-start-1',
                    'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8'
                  )}
                >
                  <img
                    alt={feature.imageAlt}
                    src={feature.imageSrc}
                    className="aspect-[5/2] w-full rounded-lg bg-gray-100 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  export default ProductSpecs2