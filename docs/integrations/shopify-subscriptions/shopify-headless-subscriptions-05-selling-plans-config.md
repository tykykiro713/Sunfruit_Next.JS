# 05 — Selling Plans Config (Monthly + Quarterly-Prepaid)

> **⚠️ Sunfruit override:** Sunfruit ships **quarterly** — billing interval = delivery
> interval = 3 months, one box of 3×24-pack. We do **NOT** use the ship-monthly / decoupled
> billing-and-delivery model described below; it is a Shopify capability we are not using.
> Our quarterly plan is a standard plan. See `sunfruit-fit-and-decisions.md` (§B2).

**Purpose:** The prerequisite for EVERYTHING. Selling plan groups define how each flat SKU can be sold as a subscription. Both the PDP toggle and the post-purchase upgrade depend on these existing and rendering correctly in the Storefront API.

**This is config, not code** — but it must be verified in the Storefront API response before any UI is wired.

## Canonical docs
- **Purchase options / subscriptions overview**
  https://shopify.dev/docs/apps/build/purchase-options/subscriptions
- **Selling plans** (groups, policies, billing vs delivery)
  https://shopify.dev/docs/apps/build/purchase-options/subscriptions/selling-plans
- **Storefront-side selling plan retrieval** (how the PDP reads them)
  https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/products-collections/subscriptions

## The two plans per SKU

### Monthly sub-and-save
- Billing interval: every 1 month
- Delivery interval: every 1 month
- Discount: your sub-and-save % (e.g. vs one-time price)

### Quarterly prepaid, ship monthly (the cash-flow lever)
- **Billing interval: every 3 months** (collect 3 months upfront)
- **Delivery interval: every 1 month** (still ships monthly)
- This DECOUPLING of billing and delivery intervals is natively supported — it's the key config trick.
- Discount: the prepaid incentive % (the "save X%" in the offer)

## Why decoupled intervals matter
Prepaid = bill quarterly, fulfill monthly. The customer pays for 3 boxes at once (cash upfront, lower churn for that period) but still receives one box per month. Shopify selling plans support different billing and delivery frequencies on the same plan — this is what makes prepaid possible without a third-party app.

## Verify BEFORE building UI
- Confirm both plans are creatable on your Shopify plan tier.
- Confirm both render in the Storefront API `sellingPlanGroups` response your PDP reads (query the product by handle, inspect the plans + price adjustments).
- Confirm the quarterly plan's prepaid total displays correctly (3× monthly minus discount) so the post-purchase `calculateChangeset` shows an unambiguous number.

## Note
`requiresSellingPlan` — leave FALSE if you also sell one-time (you sell samples + want flexibility). Set TRUE only if a SKU is subscription-only.
