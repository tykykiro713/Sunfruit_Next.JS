import { StarIcon } from "@heroicons/react/20/solid";
import type { UIProduct } from '@/lib/shopify';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface ProductInfoProps {
  product: UIProduct;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 className="text-3xl font-bold tracking-tight text-emeraldgreen-500">
        {product.title}
      </h1>

      <div className="mt-3">
        <h2 className="sr-only">Product information</h2>
        <p className="text-3xl tracking-tight text-gray-900">
          {product.priceRange
            ? `${product.priceRange.minVariantPrice.amount} ${product.priceRange.minVariantPrice.currencyCode}`
            : "N/A"}
        </p>
      </div>

      {/* Reviews */}
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