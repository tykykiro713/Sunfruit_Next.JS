// Server-only module: imported solely by the /quickorder Server Component. It pulls
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
        // Strict SKU match only — no variants[0] fallback. A stale SKU must
        // surface as "unavailable", never silently sell a different variant.
        const node = variants.find((edge) => edge.node.sku === config.sku)?.node;
        if (!node && variants.length > 0) {
          console.error(
            `[quickorder] SKU ${config.sku} not found on ${config.handle}; ` +
              `store has [${variants.map((e) => e.node.sku).join(", ")}] — flavor disabled`,
          );
        }
        const image = product?.images?.edges?.[0]?.node;
        const casePrice = node?.priceV2 ? parseFloat(node.priceV2.amount) : 0;

        return {
          ...config,
          variantGid: node?.id ?? "",
          casePrice: Number.isFinite(casePrice) ? casePrice : 0,
          imageUrl: image?.url ?? null,
          imageAlt: image?.altText ?? config.name,
          // Purchasable only with a resolved variant + real price — otherwise the
          // form enables a stepper whose line is silently dropped at checkout.
          availableForSale: Boolean(
            node?.id &&
              casePrice > 0 &&
              (node.availableForSale ?? product?.availableForSale),
          ),
        };
      } catch (error) {
        console.error(`[quickorder] failed to resolve ${config.handle}:`, error);
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
