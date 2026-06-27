const trustItems = [
  { label: 'USDA Organic', sub: 'Certified' },
  { label: '0g Sugar', sub: 'Added' },
  { label: '0mg Sodium', sub: 'Per serving' },
  { label: 'Non-GMO', sub: 'Verified' },
  { label: 'Keto + Paleo', sub: 'Friendly' },
  { label: 'Made in USA', sub: 'Always' },
];

export default function TryTrustStrip() {
  return (
    <section className="border-y border-emeraldgreen-500/10 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-3 divide-x divide-emeraldgreen-500/10 md:grid-cols-6">
          {trustItems.map((item) => (
            <li
              key={item.label}
              className="flex flex-col items-center justify-center px-2 py-5 text-center"
            >
              <span className="text-sm font-bold uppercase tracking-wider text-emeraldgreen-500 sm:text-base">
                {item.label}
              </span>
              <span className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-gray-500 sm:text-xs">
                {item.sub}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
