# 04 — Post-Purchase Quarterly Upgrade (Checkout Extension)

> **⏸️ RE-SCOPED → v2 (Appstle).** The Shopify `Checkout::PostPurchase` extension described
> below is **structurally dead** for our case — Shopify forbids adding/modifying a subscription
> via the post-purchase changeset on an order that already contains a subscription (verified
> 2026-06-26; same wall on Recharge/AfterSell/Zipify). **The replacement:** a one-click upgrade
> on the Shopify **thank-you page** that calls **Appstle's API to change the live monthly
> contract in place** (selling plan 1mo→3mo, qty 1→3) against the vaulted card — confirmed
> viable. NOT prepaid; standard 90-day model. **v1 stays monthly-only (PDP unchanged); quarterly
> exists only via this v2 thank-you-page upgrade.** See `sunfruit-fit-and-decisions.md` §B5.
> Content below kept for reference on the (dead) post-purchase-extension mechanics only.

**Purpose:** The PRIMARY quarterly-upgrade mechanism. After the customer completes a monthly subscription checkout, before the Thank You page, offer a one-tap upgrade to quarterly-prepaid. Then cancel the monthly contract.

**API:** `Checkout::PostPurchase` extension. **NOT versioned** — does not follow the quarterly release schedule.

## Canonical docs
- **About product offers** (pre/post-purchase overview, render flow, fulfillment hold)
  https://shopify.dev/docs/apps/build/checkout/product-offers
- **Create a post-purchase subscription** (the add_subscription tutorial)
  https://shopify.dev/docs/apps/build/checkout/product-offers/post-purchase/create-a-subscription
- **Build a post-purchase product offer extension** (ShouldRender / Render, app server)
  https://shopify.dev/docs/apps/build/checkout/product-offers/build-a-post-purchase-offer
- **UX for post-purchase subscriptions** (Select component for plans, TextBlock for terms)
  https://shopify.dev/docs/apps/build/checkout/product-offers/ux-for-post-purchase-subscriptions
- **Post-purchase extension points API** (changeset, CalculatedPurchase, errors)
  https://shopify.dev/docs/api/checkout-extensions/post-purchase/api

## Why this beats the portal upgrade
The `add_subscription` changeset creates the quarterly contract FRESH against the already-vaulted card — no mid-contract editing, no proration mess. The portal path (`03`) edits a live contract; this doesn't.

## Flow
1. `Checkout::PostPurchase::ShouldRender` — decide whether to show. Pre-fetch offer data from your app server (pass `inputData.token` in Authorization header; POST `referenceId`). Render only when the just-placed order is an eligible monthly subscription.
2. `Checkout::PostPurchase::Render` — present the quarterly offer. Use `Select` for the plan choice, `TextBlock` for subscription terms + a confirmation summary (builds trust).
3. `calculateChangeset` — compute and SHOW the prepaid total to the buyer before they consent. (Verify the "$Y charged today for 3 months" framing is unambiguous.)
4. `applyChangeset` with the **buyer-consent checkbox value** — REQUIRED. Without it the changeset is rejected and errors. The changeset charges the price difference and returns a `CalculatedPurchase`.
5. `done()` — redirect to Order Status page.

## Cancel-the-monthly logic (REQUIRED)
- On accept: confirm quarterly contract created successfully → THEN cancel the monthly contract (`subscriptionContractCancel` via the `03` action layer).
- ORDER MATTERS: never cancel monthly before quarterly is confirmed (a failure would leave the customer with no subscription).
- If quarterly succeeds but monthly-cancel fails: log loudly, flag for manual cleanup. Do NOT fail silent. Do NOT leave two live contracts.

## Constraints (verified)
- **Beta + gated.** Free on a dev store; LIVE store requires requesting access from Shopify. → Submit the access request EARLY — it's the long pole.
- **Shopify Payments + vaulted card required.** No external/offsite payment redirect (e.g. Mollie unsupported). Customers on unsupported methods just won't see the offer.
- **Fulfillment hold.** Order goes on-hold during the offer; hold auto-lifts 1 hour after initial checkout if abandoned.
- **Unversioned API** — less predictable change management; monitor.

## Dependency
Eligible SKU must have the quarterly selling-plan group attached (see `05`). A product can only be offered as a subscription if it has an associated selling plan group.
