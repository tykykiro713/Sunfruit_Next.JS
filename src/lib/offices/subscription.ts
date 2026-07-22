/**
 * OFFICE PANTRY CHECKOUT SEAM
 * ------------------------------------------------------------------------------
 * The only module that knows how /quickorder turns a selection into a Shopify cart.
 *
 * Product data (variant GID, price, image) is live — resolved from the real
 * Shopify case-pack products by handle in `./products` (`resolveOfficeFlavors`).
 *
 * Checkout is wired as a ONE-TIME order for now: the case products don't have a
 * subscription selling plan yet (Appstle isn't set up on them). `buildOfficeCartLines`
 * only attaches a `sellingPlanId` when it's a real (non-placeholder) value — so the
 * day a shared monthly Appstle plan is added to the products and the `REPLACE_ME`
 * ids below are swapped for the real one, every order becomes a monthly
 * subscription with NO code change here.
 *
 * The company name is captured on the page and passed as a `company_name` cart
 * attribute so it lands on the Shopify order (custom attributes).
 *
 * ── TO TURN THESE INTO SUBSCRIPTIONS (once Appstle is live) ───────────────────
 *   1) Create the shared monthly Appstle plan on the 4 case products.
 *   2) Replace the `REPLACE_ME` `sellingPlanId` on each entry in `officeFlavors`
 *      with that plan id. (variantGid / price / image already come live from Shopify.)
 *   3) Confirm the Storefront token has `unauthenticated_read_selling_plans`.
 *   4) Verify all lines land in ONE monthly contract (shared `sellingPlanId`).
 * ------------------------------------------------------------------------------
 */

import { createCartWithLines, type CartLineInput } from "@/lib/cart";

/**
 * Retail (single-order) price per stick. The case offer is 25% off this.
 * TODO(appstle): confirm against the live retail price.
 */
export const OFFICE_RETAIL_PRICE_PER_STICK = 1.6;

/**
 * Sentinel for "no Appstle plan yet". Referenced by both officeFlavors and
 * buildOfficeCartLines so a typo can't silently attach a bogus plan id.
 */
export const PLACEHOLDER_SELLING_PLAN_ID = "REPLACE_ME";

/** Static config for an office case flavor. Live price/variant/image are resolved
 *  from Shopify at request time — see `resolveOfficeFlavors` in `./products`. */
export interface OfficeFlavorConfig {
  /** Stable key for selection state + React keys. */
  key: string;
  name: string;
  /** Shopify product handle for the case pack. */
  handle: string;
  /** Case-pack SKU — used to pick the right variant. */
  sku: string;
  /** Human-readable case size, e.g. "12 tins · 288 sticks / case". */
  caseDescriptor: string;
  /** Sticks (servings) per case. 12 tins × 24 sticks = 288. */
  sticksPerCase: number;
  /**
   * Shared monthly Appstle selling-plan ID — all flavors use the SAME plan so the
   * whole order lands in one monthly contract.
   * TODO(appstle): placeholder — the Appstle monthly plan doesn't exist yet.
   */
  sellingPlanId: string;
}

export const officeFlavors: OfficeFlavorConfig[] = [
  {
    key: "variety-pack",
    name: "Variety Pack — All Flavors",
    handle: "variety-pack-of-all-flavors-case-pack",
    sku: "VAR-CASEPK",
    caseDescriptor: "12 tins · 288 sticks / case",
    sticksPerCase: 288,
    sellingPlanId: PLACEHOLDER_SELLING_PLAN_ID, // TODO(appstle): shared monthly plan
  },
  {
    key: "raspberry-hibiscus",
    name: "Raspberry Hibiscus",
    handle: "raspberry-hibiscus-case-pack",
    sku: "RH-CASE",
    caseDescriptor: "12 tins · 288 sticks / case",
    sticksPerCase: 288,
    sellingPlanId: PLACEHOLDER_SELLING_PLAN_ID, // TODO(appstle): shared monthly plan
  },
  {
    key: "pomegranate-rose",
    name: "Pomegranate Rose",
    handle: "pomegranate-rose-case-pack",
    sku: "PR-CASE",
    caseDescriptor: "12 tins · 288 sticks / case",
    sticksPerCase: 288,
    sellingPlanId: PLACEHOLDER_SELLING_PLAN_ID, // TODO(appstle): shared monthly plan
  },
  {
    key: "blueberry-lavender",
    name: "Blueberry Lavender",
    handle: "blueberry-lavender-case-pack",
    sku: "BL-CASE",
    caseDescriptor: "12 tins · 288 sticks / case",
    sticksPerCase: 288,
    sellingPlanId: PLACEHOLDER_SELLING_PLAN_ID, // TODO(appstle): shared monthly plan
  },
  {
    key: "lemon-mint",
    name: "Lemon Mint",
    handle: "lemon-mint-case-pack",
    sku: "LM-CASE",
    caseDescriptor: "12 tins · 288 sticks / case",
    sticksPerCase: 288,
    sellingPlanId: PLACEHOLDER_SELLING_PLAN_ID, // TODO(appstle): shared monthly plan
  },
];

/** A flavor config merged with live Shopify product data. */
export interface ResolvedOfficeFlavor extends OfficeFlavorConfig {
  /** Real ProductVariant GID for the case SKU. Empty string if it failed to resolve. */
  variantGid: string;
  /** Case price (USD) from Shopify. */
  casePrice: number;
  imageUrl: string | null;
  imageAlt: string;
  availableForSale: boolean;
}

/** Map of flavor `key` → number of cases selected. */
export type OfficeSelections = Record<string, number>;

/**
 * Pure function: turn the resolved flavors + a selection map into the exact
 * cart-line array the real Storefront API `cartCreate`/`cartLinesAdd` needs.
 * Only flavors with quantity > 0 and a resolved variant are included. This is the
 * contract the future Appstle wiring reuses verbatim.
 */
export function buildOfficeCartLines(
  flavors: ResolvedOfficeFlavor[],
  selections: OfficeSelections,
): CartLineInput[] {
  return flavors
    .filter((flavor) => (selections[flavor.key] ?? 0) > 0 && flavor.variantGid)
    .map((flavor) => {
      const line: CartLineInput = {
        merchandiseId: flavor.variantGid,
        quantity: selections[flavor.key],
      };
      // One-time today (no plan on the products yet). The moment a real monthly
      // Appstle plan id replaces the placeholder, lines become subscriptions.
      if (
        flavor.sellingPlanId &&
        flavor.sellingPlanId !== PLACEHOLDER_SELLING_PLAN_ID
      ) {
        line.sellingPlanId = flavor.sellingPlanId;
      }
      return line;
    });
}

export interface OfficeCheckoutInput {
  flavors: ResolvedOfficeFlavor[];
  selections: OfficeSelections;
  /** Company name — captured on /quickorder, carried to the order as a cart attribute. */
  companyName: string;
}

export type OfficeCheckoutStatus = "redirecting" | "empty" | "error";

export interface OfficeCheckoutResult {
  status: OfficeCheckoutStatus;
  /** User-facing message for the current state. */
  message: string;
}

/**
 * Build the cart (case lines + the `company_name` attribute), create it via the
 * Storefront API, and redirect the browser to Shopify checkout. Runs client-side
 * (called from the order form's CTA). One-time today; becomes a subscription
 * automatically once the products carry a real selling plan (see file header).
 */
export async function startOfficeSubscriptionCheckout(
  input: OfficeCheckoutInput,
): Promise<OfficeCheckoutResult> {
  const lines = buildOfficeCartLines(input.flavors, input.selections);
  if (lines.length === 0) {
    return { status: "empty", message: "Add at least one case to continue." };
  }

  // Strip control chars and cap length — this value lands on the Shopify order
  // and gets rendered by staff-facing tools (packing slips, order printers)
  // that may not escape it. An oversized value also trips a cartCreate
  // userError whose detail never reaches the user.
  const companyName = input.companyName
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim()
    .slice(0, 255);
  const cartAttributes = companyName
    ? [{ key: "company_name", value: companyName }]
    : [];

  const checkoutUrl = await createCartWithLines(lines, cartAttributes);

  if (!checkoutUrl) {
    return {
      status: "error",
      message: "Sorry — we couldn’t start checkout. Please try again.",
    };
  }

  if (typeof window !== "undefined") {
    window.location.href = checkoutUrl;
  }
  return { status: "redirecting", message: "Taking you to checkout…" };
}
