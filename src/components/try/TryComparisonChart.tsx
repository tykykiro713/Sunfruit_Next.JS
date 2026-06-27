type Cell =
  | { state: 'yes'; label?: string }
  | { state: 'no'; label?: string }
  | { state: 'partial'; label?: string }
  | { state: 'value'; label: string };

interface Row {
  label: string;
  sunfruit: Cell;
  crystalLight: Cell;
  trueCitrus: Cell;
}

const rows: Row[] = [
  {
    label: 'USDA Certified Organic',
    sunfruit: { state: 'yes' },
    crystalLight: { state: 'no' },
    trueCitrus: { state: 'no' },
  },
  {
    label: 'Added sugar',
    sunfruit: { state: 'value', label: '0g' },
    crystalLight: { state: 'value', label: '0g*' },
    trueCitrus: { state: 'value', label: '0g' },
  },
  {
    label: 'Sodium per serving',
    sunfruit: { state: 'value', label: '0mg' },
    crystalLight: { state: 'value', label: '~35mg' },
    trueCitrus: { state: 'value', label: '0mg' },
  },
  {
    label: 'Artificial sweeteners',
    sunfruit: { state: 'no', label: 'None' },
    crystalLight: { state: 'yes', label: 'Aspartame, ace-K' },
    trueCitrus: { state: 'no', label: 'None' },
  },
  {
    label: 'Artificial colors',
    sunfruit: { state: 'no', label: 'None' },
    crystalLight: { state: 'yes', label: 'Yellow 5, etc.' },
    trueCitrus: { state: 'no', label: 'None' },
  },
  {
    label: 'Real fruit + botanicals',
    sunfruit: { state: 'yes', label: 'Fruit + herbs' },
    crystalLight: { state: 'no' },
    trueCitrus: { state: 'partial', label: 'Citrus only' },
  },
  {
    label: 'Prebiotic fiber',
    sunfruit: { state: 'yes' },
    crystalLight: { state: 'no' },
    trueCitrus: { state: 'no' },
  },
  {
    label: 'Ingredients per packet',
    sunfruit: { state: 'value', label: '~5' },
    crystalLight: { state: 'value', label: '10+' },
    trueCitrus: { state: 'value', label: '~3' },
  },
];

function CellMark({ cell }: { cell: Cell }) {
  if (cell.state === 'value') {
    return (
      <div className="flex flex-col items-center">
        <span className="text-base font-bold text-gray-900 tabular-nums sm:text-lg">
          {cell.label}
        </span>
      </div>
    );
  }
  if (cell.state === 'yes') {
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emeraldgreen-500 text-white shadow-sm">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 111.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </span>
        {cell.label && <span className="text-xs text-gray-600">{cell.label}</span>}
      </div>
    );
  }
  if (cell.state === 'no') {
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
        {cell.label && <span className="text-xs text-gray-600">{cell.label}</span>}
      </div>
    );
  }
  // partial
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-gray-500">
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      </span>
      {cell.label && <span className="text-xs text-gray-600">{cell.label}</span>}
    </div>
  );
}

export default function TryComparisonChart() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emeraldgreen-500">
            How we compare
          </p>
          <h2 className="mt-3 font-poppins text-3xl font-semibold tracking-tight text-emeraldgreen-500 sm:text-4xl md:text-5xl">
            Sunfruit vs. the rest of the aisle.
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            Apples to apples — flavored water mixes only. (Electrolyte mixes are a
            different category. We covered them above.)
          </p>
        </div>

        <div className="mx-auto mt-12 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          {/* Column headers */}
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] border-b border-gray-200 bg-gray-50 text-center sm:grid-cols-[1.6fr_1fr_1fr_1fr]">
            <div className="p-4 text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                What you&apos;re comparing
              </span>
            </div>
            <div className="border-l border-gray-200 bg-emeraldgreen-500 p-4 text-white">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-customYellow-500 sm:text-xs">
                Us
              </span>
              <span className="mt-1 block text-base font-bold sm:text-lg">Sunfruit</span>
            </div>
            <div className="border-l border-gray-200 p-4">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 sm:text-xs">
                Them
              </span>
              <span className="mt-1 block text-sm font-bold text-gray-900 sm:text-base">
                Crystal Light
              </span>
            </div>
            <div className="border-l border-gray-200 p-4">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400 sm:text-xs">
                Them
              </span>
              <span className="mt-1 block text-sm font-bold text-gray-900 sm:text-base">
                True Citrus
              </span>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.label}
              className={`grid grid-cols-[1.4fr_1fr_1fr_1fr] items-center text-center sm:grid-cols-[1.6fr_1fr_1fr_1fr] ${
                i % 2 === 1 ? 'bg-gray-50/50' : 'bg-white'
              } ${i < rows.length - 1 ? 'border-b border-gray-100' : ''}`}
            >
              <div className="p-4 text-left text-sm font-medium text-gray-900 sm:p-5 sm:text-base">
                {row.label}
              </div>
              <div className="border-l border-gray-100 bg-emeraldgreen-500/5 p-4 sm:p-5">
                <CellMark cell={row.sunfruit} />
              </div>
              <div className="border-l border-gray-100 p-4 sm:p-5">
                <CellMark cell={row.crystalLight} />
              </div>
              <div className="border-l border-gray-100 p-4 sm:p-5">
                <CellMark cell={row.trueCitrus} />
              </div>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-gray-500">
          * Crystal Light is marketed as &ldquo;sugar-free&rdquo; via aspartame and
          acesulfame potassium. Comparison based on publicly available nutrition facts
          and ingredient lists; verify before printing. Brand names belong to their
          respective owners.
        </p>
      </div>
    </section>
  );
}
