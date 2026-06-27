# 01 — Storefront API: PDP Selling Plans + Subscription Cart

> **✅ KEEP (Appstle) — PDP behavior UNCHANGED in v1.** The PDP stays exactly as today:
> monthly-only subscribe toggle. **Quarterly is NOT added to the PDP** (decided 2026-06-27 —
> it's a v2 thank-you-page upsell, see §B5). The only v1 change is invisible: the **monthly**
> selling plan the PDP resolves moves from Recharge-managed → Appstle-managed (Appstle
> repopulates the native `sellingPlanGroups`), so `subscription-options.ts` must point at
> Appstle's monthly plan. No UX/layout change. See `sunfruit-fit-and-decisions.md` §B5/§D.

**Purpose:** Read selling plans on the product page, render the subscribe toggle (monthly / quarterly), and create a cart with the chosen subscription line. This is the PDP work — mostly already built.

**API:** Storefront API (public token `X-Shopify-Storefront-Access-Token`). Separate cost bucket from Admin API.

## Canonical docs
- **Manage subscription products on storefronts** (the core guide)
  https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/products-collections/subscriptions
- **Building with the Storefront API** (index)
  https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/index
- **Storefront API reference**
  https://shopify.dev/docs/api/storefront/latest

## Key facts (from the docs)
- Required scope: `unauthenticated_read_selling_plans` on the Headless channel / custom app.
- You **must use the cart workflow** to retrieve subscription products — there's no standalone subscription-purchase path.
- Query a product by `handle`; the `sellingPlanGroups` object holds the individual selling plans (delivery frequencies, price adjustments).
- Each selling plan exposes a **selling plan ID** — this is what identifies which plan the customer picked. Pass it on the cart line.
- `recurringDeliveries` tells you whether the plan produces multiple deliveries.
- `options` on the selling plan group = the dropdown options shown on the storefront (e.g. "Delivery every: 1 week / 2 weeks").
- `requiresSellingPlan: true` means the variant can ONLY be bought as a subscription.
- Price adjustments: a variant at 60.00 with a 20% selling-plan discount shows 48.00; `perDeliveryPrice` = total / number of deliveries.

## The cart mutation
- Use `cartCreate` (or `cartLinesAdd`) with line input containing: `quantity`, variant ID (`merchandiseId`), and `sellingPlanId`.
- The cart line response returns the variant, quantity, and the associated selling plan with resulting prices.
- Hand off via the cart's `checkoutUrl`.

## For Sunfruit specifically
- **v1 PDP = monthly only, unchanged.** The toggle resolves the monthly `sellingPlanId` (now
  from Appstle's plan group) and passes it on the cart line — same as today.
- The 90-day plan exists in Appstle but is **not** shown on the PDP; it's the target of the v2
  thank-you-page upgrade (`04`), not a PDP choice.
