# Appstle Subscriptions — Integration Docs

Reference docs for migrating subscriptions from **Recharge → Appstle Subscriptions** on the
headless Next.js storefront.

**Decision recorded 2026-06-24:** Recharge is being removed. **Pivot recorded 2026-06-26:** the
replacement is **Appstle**, not native Shopify subscriptions. Native was scoped first and
abandoned — going native meant building and operating our own recurring-billing engine, and
Appstle runs billing + dunning for us. See the migration section in [`TODO.md`](../../../TODO.md).

## Read in this order

1. **`sunfruit-fit-and-decisions.md`** — the decisions of record (platform pivot, quarterly
   model, SKU, auth decoupling, security, removal plan). **Wins any conflict with the docs below.**
2. **`sunfruit-subscription-portal-handoff.md`** — the Appstle v1 build plan.
3. **`shopify-headless-subscriptions-00-index.md`** — the Appstle architecture model + what
   each numbered reference doc is now worth.

## Numbered reference docs (originally written for the native build)

| Doc | Status under Appstle |
| --- | --- |
| `...-00-index.md` | **Architecture overview** — repurposed for Appstle |
| `...-01-storefront-pdp-cart.md` | **KEEP** — native PDP/cart plumbing; app-agnostic, carries over |
| `...-02-customer-account-api-auth-portal.md` | **RETIRED** — Appstle's portal handles its own auth |
| `...-03-admin-api-contracts.md` | **RETIRED** — Appstle owns contracts + actions |
| `...-04-post-purchase-upsell.md` | **RE-SCOPED → v2** — post-purchase extension dead; thank-you-page in-place contract swap via Appstle API |
| `...-05-selling-plans-config.md` | **KEEP** — but plans are created in Appstle's admin |
| `...-06-headless-channel-setup.md` | **MOSTLY RETIRED** — only the Storefront selling-plan read scope still applies |

The RETIRED/DEFERRED docs are kept (not deleted) for the reasoning trail and in case we later
build a DIY portal on Appstle's REST API. Each carries a banner explaining its status.

## What Appstle owns vs. what we build

- **Appstle (config + hosted):** native selling plan groups, subscription contracts, recurring
  billing + retries/dunning, the customer portal, the native Klaviyo integration.
- **We build (storefront):** the PDP subscribe selector reading native `sellingPlanGroups`
  (refactor `subscription-options.ts`), the cart line `sellingPlanId` (already done), and a
  branded `/account` entry point to Appstle's portal.

## Related (legacy)

- Current (Recharge) integration, now legacy: `RECHARGE_*.md` and
  `Recharge_complete_integration_guide.md` at the repo root — to be archived/removed once the
  migration lands.
- Live code still on Recharge: `src/lib/recharge/`, `RechargeSDKProvider.tsx`,
  `@rechargeapps/storefront-client`.
</content>
