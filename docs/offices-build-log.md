# /offices — Office Pantry Landing Page (build log)

Date: 2026-06-27 · Branch: `feat/office-pantry-landing` (off `main`)

Public-but-unlinked office-pantry subscription order page at `/offices`, built against a
**stubbed Appstle seam** (the live subscription/checkout wiring follows later).

## Files added
- `src/lib/offices/subscription.ts` — the **only** subscription-aware module (the seam).
  - `officeFlavors` — 4 flavors (Raspberry Hibiscus, Pomegranate Rose, Blueberry Lavender,
    Lemon Mint). `variantGid`, `sellingPlanId`, `casePrice` are **placeholders**, each marked
    `TODO(appstle)`.
  - `buildOfficeCartLines(selections)` — pure; emits `{ merchandiseId, quantity, sellingPlanId }[]`
    for only flavors with qty > 0. Matches `CartLineInput` in `src/lib/cart.ts` exactly.
  - `startOfficeSubscriptionCheckout({ selections, companyName })` — **stub**; logs + returns the
    payload it WOULD send (cart lines + `company_name` cart attribute + shared monthly plan),
    surfaces a "coming soon" state. Real `cartCreate`+redirect marked `TODO(appstle)`.
  - File header carries the post-Appstle handoff checklist (1–4).
- `src/components/offices/OfficeOrderForm.tsx` — client form (selections, required company name,
  summary, CTA, coming-soon state, GA events).
- `src/components/offices/OfficeQuantityStepper.tsx` — minimal −/value/+ integer stepper (min 0),
  built from existing Tailwind tokens (no new dep).
- `src/app/offices/page.tsx` — server page; `robots: { index: false, follow: false }`; minimal
  logo header + legal-only footer (Privacy/Terms). Not added to `sitemap.ts` (explicit allowlist).

## Decisions / conventions matched
- Subscription-only, **monthly** cadence. No one-time option. No reviews/upsells/urgency.
- **Case SKUs:** one case variant per flavor (24 sticks/case), case pricing — to be created in
  Shopify; placeholders for now. Stepper = number of cases.
- **Company name is mandatory.** Collected on-page (can't inject fields into Shopify's hosted
  checkout from headless) and carried to the order as a `company_name` cart attribute.
- CTA "Start monthly restock" gates on **total ≥ 1 case AND company name** (clear hint below).
- Flexibility messaged ("skip, pause, or adjust… in the account portal") — message only, no controls.
- GA via existing `src/lib/analytics.ts` `trackEvent` (gtag-guarded): `view_offices`,
  `add_to_cart`, `begin_checkout`. No new analytics dep.
- No Recharge, no native Shopify subscription-contract code. No new dependencies.

## Verification (evidence)
- `npx tsc --noEmit` — clean (after clearing a stale `.next` artifact left from an earlier
  dev run on the `/try` branch).
- Dev server (`npm run dev`): `GET /offices` → **200**; renders heading, required company field,
  4 flavor rows, summary ("Total cases", "Price per delivery", "Delivered monthly"), CTA.
- `<meta name="robots" content="noindex, nofollow">` present; `/offices` **absent** from
  `/sitemap.xml` (0 occurrences).
- Seam unit check (sample: 2× Raspberry Hibiscus, 1× Lemon Mint, company "Acme Inc."):
  - `buildOfficeCartLines` → 2 lines, correct `{ merchandiseId, quantity, sellingPlanId }` shape,
    0-qty flavors omitted.
  - `startOfficeSubscriptionCheckout` → `status: "coming-soon"`, lines + `company_name` attribute +
    `sharedMonthlyPlan: true`.
  - Empty selection → `status: "empty"` with the add-a-case hint.

## Update 2026-06-27 — real case products connected
The 4 case-pack products now exist in Shopify and are published to the headless channel
(verified live via the Storefront API). Wired in:
- `officeFlavors` now carries the product `handle` + `sku` per flavor; case pricing (12 tins ·
  288 sticks · $345/case, $1.20/stick = 25% off $1.60 retail) shown with a strikethrough offer note.
- New `src/lib/offices/products.ts` → `resolveOfficeFlavors()` (server-only): fetches each case
  product by handle in parallel via the existing `fetchProductByHandle`, returning the real
  **variant GID + price + thumbnail image**. No GIDs hardcoded (avoids the stale-ID landmine).
- `src/app/offices/page.tsx` is now an async Server Component that resolves flavors and passes
  them to the form; the form renders a Shopify product **thumbnail** left of each flavor name.
- CTA restyled to match `AddToCartButton`; company-name field marked "(required)" at
  checkout-sized height; logo links to `/`.
- Verified live: `/offices` 200; 4 flavors, `$345.00`/case, all 4 `cdn.shopify.com` thumbnails;
  `tsc` clean. `buildOfficeCartLines` now emits real `merchandiseId` (variant GID).

## Update 2026-06-27 (b) — live one-time checkout + UX polish
- **Checkout wired (one-time).** CTA "Continue to Checkout" → `startOfficeSubscriptionCheckout`
  builds the cart and redirects to Shopify checkout via a new one-shot
  `createCartWithLines(lines, attributes)` in `src/lib/cart.ts` (`cartCreate(input:{lines,attributes})`).
  `buildOfficeCartLines` attaches a `sellingPlanId` ONLY when it's a real (non-`REPLACE_ME`)
  value — so it's one-time today and becomes a subscription automatically once the products get
  a real monthly plan. No subscription plan exists on the case products yet (verified:
  `requiresSellingPlan:false`, empty `sellingPlanGroups`).
- **Company name → order.** Passed as a `company_name` cart attribute → lands on the Shopify
  order's custom attributes (so you know which company ordered).
- **Validation.** Clicking with an empty company name shows a red inline error + red field; also
  a red "add at least one case" message when none selected.
- **Stepper.** Native number spinners removed (text input, numeric inputmode); restyled as one
  clean bordered −/value/+ group.
- **Design polish.** Calmer typography, pill "25% off retail" badge, refined thumbnails
  (ring + consistent rounding), lighter dividers, refreshed summary card.
- Verified: `tsc` clean; `/offices` 200; CTA + pricing render. **NOT yet click-tested live**
  (the cart-create round-trip needs a browser click — test on the dev server).

> ⚠️ **Copy vs. mechanics:** the page says "delivered monthly / skip-pause-adjust," but checkout
> currently creates a **one-time** order (no plan on the products). Reconcile before paid
> traffic — either add the Appstle monthly plan (flip to real subscription) or soften the copy.

## Post-Appstle TODO (see seam file header) — ONE thing left
1. Replace the placeholder `sellingPlanId` in `officeFlavors` with the shared monthly Appstle
   plan ID. (variantGid + price + image already come live from Shopify.)
2. Implement `startOfficeSubscriptionCheckout` with the real `cartCreate` (existing checkout
   util) + `company_name` cart attribute + redirect to `checkoutUrl`.
3. Confirm Storefront token has `unauthenticated_read_selling_plans`.
4. Verify all lines land in ONE monthly contract (shared `sellingPlanId`).

## Update 2026-07-22 — route is /quickorder + pre-landing review hardening
Corrections to this log: the route shipped as **`/quickorder`** (`src/app/quickorder/page.tsx`),
not `/offices`, and there are **5 flavors** (Variety Pack — All Flavors added, SKU `VAR-CASEPK`).
Internal dirs remain `src/lib/offices/` + `src/components/offices/`.

Review fixes applied before landing (PR #15):
- **Strict SKU match** in `resolveOfficeFlavors` — removed the silent `variants[0]` fallback;
  a stale SKU now disables the flavor + logs, instead of selling the wrong variant.
  `availableForSale` now requires a resolved variant and price > 0. All 5 SKUs verified
  against the live store ($345/case, available).
- **ISR (`revalidate = 3600`)** — the route was prerendering statically at build time,
  freezing prices/availability until the next deploy.
- **Background image** — 1.94 MB PNG → 62 KB WebP; dropped `background-attachment: fixed`
  (iOS jank); added preload. Old PNG deleted.
- **Form**: catch on checkout (thrown errors now show a message); "empty" result rendered;
  GA `add_to_cart`/`begin_checkout` fire only after cart creation succeeds; button stays
  disabled during the redirect (double-submit → duplicate carts); company name capped at
  255 chars + control chars stripped before the cart attribute.
- **`next.config.js`**: `removeConsole` now excludes `console.error` in production —
  checkout failure paths were being stripped to zero telemetry.
- `PLACEHOLDER_SELLING_PLAN_ID` constant replaces the 6 scattered `"REPLACE_ME"` literals.
