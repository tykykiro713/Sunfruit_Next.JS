import { StarIcon } from "@heroicons/react/20/solid";
import type { UIProduct } from '@/lib/shopify';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ProductInfoProps {
  product: UIProduct;
  isSubscriptionSelected?: boolean;
  subscriptionDiscountPercentage?: number;
}

export default function ProductInfo({ 
  product, 
  isSubscriptionSelected = false, 
  subscriptionDiscountPercentage = 0 
}: ProductInfoProps) {
  // Format the price to remove cents and currency code (for original price)
  const formatPrice = (amount: string) => {
    // Parse amount and round to nearest integer
    const price = parseInt(amount, 10);
    return `$${price}`;
  };

  // Format discounted price with cents
  const formatDiscountedPrice = (amount: string, discountPercentage: number) => {
    const price = parseFloat(amount);
    const discountMultiplier = (100 - discountPercentage) / 100;
    const discountedPrice = price * discountMultiplier;
    return `$${discountedPrice.toFixed(2)}`;
  };

  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight text-emeraldgreen-500">
        {product.title}
      </h1>

      {/* Reviews - Moved before price */}
      <div className="mt-3">
        <h3 className="sr-only">Reviews</h3>
        <div className="flex items-center">
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                aria-hidden="true"
                className={classNames(
                  (product.rating || 0) > rating
                    ? "text-green-500"
                    : "text-gray-300",
                  "size-5 shrink-0"
                )}
              />
            ))}
          </div>
          <p className="sr-only">{product.rating || 0} out of 5 stars</p>
        </div>
      </div>


      <div className="mt-6">
        <h3 className="sr-only">Description</h3>
        <div
          className="space-y-6 text-base text-gray-700"
          dangerouslySetInnerHTML={{ __html: product.description }}
        />
      </div>
    </div>
  );
}