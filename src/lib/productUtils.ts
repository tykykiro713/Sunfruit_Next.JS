import { UIProduct } from './shopify';

// Tags to exclude when determining flavor tags
const UTILITY_TAGS = ['new-layout'];

// Known flavor tags (used for matching related products)
const FLAVOR_TAGS = ['lemon-mint', 'raspberry-hibiscus', 'grapefruit-ginger', 'blueberry-lavender', 'pomegranate-rose'];

// Size type for the new product form.
// '72pack' has no tile of its own in the 2-card layout — it's reachable only
// via the 3-Month radio option inside SubscriptionMonthly3MonthCards.
// '48pack' is a real, user-facing tile in the 3-card layout.
export type ProductSize = 'sample' | '24pack' | '48pack' | '72pack';

// SKU suffix to size mapping
const SKU_SIZE_MAP: Record<string, ProductSize> = {
  '-SAM': 'sample',
  '-24PK': '24pack',
  '-48PK': '48pack',
  '-72PK': '72pack',
};

/**
 * Extract flavor tags from a product (excludes utility tags like "new-layout")
 * Looks for known flavor tags first, then falls back to non-utility tags
 */
export function getFlavorTags(product: UIProduct): string[] {
  if (!product.tags) return [];

  // First, look for known flavor tags
  const knownFlavorTags = product.tags.filter(tag =>
    FLAVOR_TAGS.includes(tag.toLowerCase())
  );

  if (knownFlavorTags.length > 0) {
    return knownFlavorTags;
  }

  // Fall back to any non-utility tags
  return product.tags.filter(tag => !UTILITY_TAGS.includes(tag.toLowerCase()));
}

/**
 * Check if a product has the new-layout tag
 */
export function hasNewLayoutTag(product: UIProduct): boolean {
  if (!product.tags) return false;
  return product.tags.some(tag => tag.toLowerCase() === 'new-layout');
}

/**
 * Identify product size from SKU suffix (-SAM, -30PK, -60PK)
 * Returns null if SKU doesn't match any known pattern
 */
export function getProductSize(product: UIProduct): ProductSize | null {
  const variant = product.variants?.edges?.[0]?.node;
  if (!variant?.sku) return null;

  const sku = variant.sku.toUpperCase();

  for (const [suffix, size] of Object.entries(SKU_SIZE_MAP)) {
    if (sku.endsWith(suffix)) {
      return size;
    }
  }

  return null;
}

/**
 * Get flavor display name from tags
 * e.g., ["lemon-mint"] → "Lemon Mint"
 * e.g., ["lemon", "mint"] → "Lemon Mint"
 */
export function getFlavorDisplayName(tags: string[]): string {
  const flavorTags = tags.filter(tag => !UTILITY_TAGS.includes(tag.toLowerCase()));

  // Handle hyphenated tags like "lemon-mint" → "Lemon Mint"
  return flavorTags
    .map(tag => {
      // Split by hyphen and capitalize each word
      return tag.split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    })
    .join(' ');
}

/**
 * Get flavor display name directly from a product
 */
export function getProductFlavorName(product: UIProduct): string {
  const flavorTags = getFlavorTags(product);
  return getFlavorDisplayName(flavorTags);
}

/**
 * Find product by size from a list of related products
 */
export function findProductBySize(products: UIProduct[], size: ProductSize): UIProduct | undefined {
  return products.find(p => getProductSize(p) === size);
}

/**
 * Size display configuration
 */
export interface SizeOption {
  id: ProductSize;
  name: string;
  stickCount: number;
  description: string;
}

export const SIZE_OPTIONS: SizeOption[] = [
  { id: 'sample', name: 'Free Samples', stickCount: 3, description: '3 sticks' },
  { id: '24pack', name: '1 Tin', stickCount: 24, description: '24 sticks' },
  { id: '48pack', name: '2 Tins', stickCount: 48, description: '48 sticks' },
  // 72pack has no tile of its own in the 2-card layout. It lives here so
  // SizeSelector2Cards can swap the 1-Tin tile's label to "3 Tins / 72 sticks"
  // when the 3-Month radio is selected inside SubscriptionMonthly3MonthCards.
  { id: '72pack', name: '3 Tins', stickCount: 72, description: '72 sticks' },
];

/**
 * Get size option by ID
 */
export function getSizeOption(size: ProductSize): SizeOption | undefined {
  return SIZE_OPTIONS.find(opt => opt.id === size);
}

/**
 * Determine initial size from URL search params or product SKU
 */
export function determineInitialSize(
  searchParamSize: string | null | undefined,
  product: UIProduct
): ProductSize {
  // First, check URL param
  if (searchParamSize && ['sample', '24pack', '48pack', '72pack'].includes(searchParamSize)) {
    return searchParamSize as ProductSize;
  }

  // Fall back to product SKU
  const productSize = getProductSize(product);
  if (productSize) {
    return productSize;
  }

  // Default to 24pack
  return '24pack';
}
