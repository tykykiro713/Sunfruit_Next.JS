'use client';

import { useSamplePack } from './SamplePackProvider';

type Variant = 'primary' | 'inverse';

interface TryCheckoutButtonProps {
  label?: string;
  variant?: Variant;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-emeraldgreen-500 text-white hover:bg-brightgreen-500 focus:ring-green-500',
  inverse:
    'bg-brightgreen-500 text-emeraldgreen-500 hover:bg-white focus:ring-white',
};

export default function TryCheckoutButton({
  label = 'Get my free samples',
  variant = 'primary',
  className = '',
  id,
  fullWidth = false,
}: TryCheckoutButtonProps) {
  const { handleCheckout, isLoading } = useSamplePack();

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={isLoading}
      id={id}
      data-product-handle="sunfruit-sample-pack"
      className={`inline-flex items-center justify-center rounded-3xl px-8 py-3 text-base font-semibold transition focus:outline-none focus:ring sm:px-12 md:text-lg disabled:opacity-70 ${VARIANT_CLASSES[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {isLoading ? (
        <>
          <span className="mr-2 inline-block animate-spin" aria-hidden="true">
            ↻
          </span>
          Processing...
        </>
      ) : (
        label
      )}
    </button>
  );
}
