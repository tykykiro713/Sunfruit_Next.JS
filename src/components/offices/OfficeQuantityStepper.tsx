"use client";

interface OfficeQuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  /** Accessible label, e.g. the flavor name. */
  label: string;
  min?: number;
  max?: number;
}

/**
 * Minimal integer stepper (−/value/+) for number of cases. A single bordered
 * group; the value is a text input (no native number spinners). No new deps.
 */
export default function OfficeQuantityStepper({
  value,
  onChange,
  label,
  min = 0,
  max = 999,
}: OfficeQuantityStepperProps) {
  const set = (n: number) =>
    onChange(Math.max(min, Math.min(max, Number.isNaN(n) ? min : n)));
  const unavailable = max <= min;

  const side =
    "flex h-9 w-9 items-center justify-center text-lg leading-none text-emeraldgreen-600 transition hover:bg-emeraldgreen-50 focus:outline-none focus-visible:bg-emeraldgreen-50 disabled:text-gray-300 disabled:hover:bg-transparent";

  return (
    <div className="inline-flex items-center rounded-lg border border-gray-300 bg-white">
      <button
        type="button"
        className={`${side} rounded-l-lg`}
        onClick={() => set(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease ${label} cases`}
      >
        −
      </button>
      <input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={value}
        disabled={unavailable}
        aria-label={`${label} cases`}
        onChange={(e) => {
          const digits = e.target.value.replace(/[^0-9]/g, "");
          set(digits === "" ? min : parseInt(digits, 10));
        }}
        className="h-9 w-10 border-x border-gray-200 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none disabled:text-gray-300"
      />
      <button
        type="button"
        className={`${side} rounded-r-lg`}
        onClick={() => set(value + 1)}
        disabled={value >= max}
        aria-label={`Increase ${label} cases`}
      >
        +
      </button>
    </div>
  );
}
