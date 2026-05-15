const trustItems = [
  'USDA ORGANIC',
  'NO SUGAR ADDED',
  'NO ARTIFICIAL ANYTHING',
  'NON-GMO',
];

export default function TryTrustStrip() {
  return (
    <div className="bg-yellow-300 py-6 px-4">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:justify-between">
        {trustItems.map((item) => (
          <div
            key={item}
            className="flex items-center gap-2 whitespace-nowrap text-base font-semibold text-gray-900 sm:text-lg"
          >
            <span className="text-emeraldgreen-500" aria-hidden="true">
              &#10003;
            </span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
