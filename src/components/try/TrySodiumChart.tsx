const rows = [
  { label: 'Liquid I.V. (1 stick)', mg: 510, color: 'bg-rose-400' },
  { label: 'Gatorade (12 oz)', mg: 270, color: 'bg-orange-400' },
  { label: 'AHA daily limit', mg: 2300, color: 'bg-gray-400', isLimit: true },
  { label: 'Sunfruit', mg: 0, color: 'bg-emeraldgreen-500', isUs: true },
];

const MAX = 2300;

export default function TrySodiumChart() {
  return (
    <figure className="mt-6 rounded-2xl border border-emeraldgreen-500/15 bg-white p-5 sm:p-6">
      <figcaption className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Sodium per serving
        </span>
        <span className="text-xs text-gray-400">milligrams</span>
      </figcaption>
      <ul className="mt-4 space-y-4">
        {rows.map((row) => {
          const pct = Math.max((row.mg / MAX) * 100, row.mg === 0 ? 1.5 : 0);
          return (
            <li key={row.label}>
              <div className="flex items-baseline justify-between gap-2">
                <span
                  className={`text-sm font-medium ${
                    row.isUs ? 'text-emeraldgreen-500' : 'text-gray-700'
                  }`}
                >
                  {row.label}
                </span>
                <span
                  className={`text-sm font-bold tabular-nums ${
                    row.isUs ? 'text-emeraldgreen-500' : 'text-gray-900'
                  }`}
                >
                  {row.mg.toLocaleString()}mg
                </span>
              </div>
              <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={`h-full ${row.color} ${row.isLimit ? 'opacity-60' : ''}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              {row.isLimit && (
                <p className="mt-1 text-[11px] text-gray-400">
                  American Heart Association maximum; ideal limit is 1,500mg.
                </p>
              )}
            </li>
          );
        })}
      </ul>
      <p className="mt-4 text-[11px] leading-relaxed text-gray-500">
        Sources: American Heart Association sodium guidelines; brand nutrition facts as
        published on manufacturer websites. Verify before publication.
      </p>
    </figure>
  );
}
