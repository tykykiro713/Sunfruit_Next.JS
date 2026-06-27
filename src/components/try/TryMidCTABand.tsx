import TryCheckoutButton from './TryCheckoutButton';

interface TryMidCTABandProps {
  id?: string;
  eyebrow?: string;
  headline?: string;
  buttonLabel?: string;
  microcopy?: string;
}

export default function TryMidCTABand({
  id,
  eyebrow = 'No commitment. No catch.',
  headline = 'Try all 3 flavors — on us.',
  buttonLabel = 'Get my free samples',
  microcopy = 'Just $5 shipping · Ships today!',
}: TryMidCTABandProps) {
  return (
    <section className="relative overflow-hidden bg-emeraldgreen-500 py-14 text-white sm:py-16">
      <div
        className="absolute inset-y-0 left-0 hidden w-1/3 -skew-x-12 bg-emeraldgreen-700/40 sm:block"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 text-center sm:px-6 lg:flex-row lg:justify-between lg:gap-12 lg:text-left">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-customYellow-500">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-poppins text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl">
            {headline}
          </h2>
        </div>
        <div className="flex flex-col items-center gap-2 lg:items-end">
          <TryCheckoutButton id={id} label={buttonLabel} variant="inverse" />
          <p className="text-xs text-white/80 sm:text-sm">{microcopy}</p>
        </div>
      </div>
    </section>
  );
}
