// Server-only module: imported solely by the /offices Server Component. It pulls
// in Apollo via @/lib/shopify, so it must never be imported by a Client Component.
import { fetchProductByHandle } from "@/lib/shopify";
import {
  officeFlavors,
  type ResolvedOfficeFlavor,
} from "@/lib/offices/subscription";

/**
 * Resolve each office case flavor against its live Shopify product (by handle):
 * pull the case variant GID, price, and thumbnail image. Runs server-side only
 * (the page is a Server Component). Fetches run in parallel.
 *
 * If a product can't be resolved (not found / unpublished), the flavor is
 * returned with empty variant + unavailable, so the page can render it disabled
 * rather than crash.
 */
export async function resolveOfficeFlavors(): Promise<ResolvedOfficeFlavor[]> {
  return Promise.all(
    officeFlavors.map(async (config): Promise<ResolvedOfficeFlavor> => {
      try {
        const product = await fetchProductByHandle(config.handle);
        const variants = product?.variants?.edges ?? [];
        const node =
          variants.find((edge) => edge.node.sku === config.sku)?.node ??
          variants[0]?.node;
        const image = product?.images?.edges?.[0]?.node;

        return {
          ...config,
          variantGid: node?.id ?? "",
          casePrice: node?.priceV2 ? parseFloat(node.priceV2.amount) : 0,
          imageUrl: image?.url ?? null,
          imageAlt: image?.altText ?? config.name,
          availableForSale: Boolean(
            node?.availableForSale ?? product?.availableForSale,
          ),
        };
      } catch (error) {
        console.error(`[offices] failed to resolve ${config.handle}:`, error);
        return {
          ...config,
          variantGid: "",
          casePrice: 0,
          imageUrl: null,
          imageAlt: config.name,
          availableForSale: false,
        };
      }
    }),
  );
}
