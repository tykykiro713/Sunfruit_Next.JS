# Appstle Subscriptions — Architecture & Reference Index

> **Repurposed 2026-06-26.** This file originally described the *native* three-API build. That
> build was abandoned for **Appstle** (we did not want to own a recurring-billing engine). The
> Appstle architecture is below; the original native "three-API model" is preserved at the
> bottom for reference only.

Read `sunfruit-fit-and-decisions.md` first — it holds the decisions; this file is the model.

## The Appstle model (memorize this)

Appstle is the **management layer** for subscriptions, on top of **native Shopify selling
plans** and **Shopify's hosted checkout**. It plays the role Recharge played, minus our
operating any billing infrastructure.

- **Shopify Storefront API** (public token, OURS) — reads products + native `sellingPlanGroups`,
  builds the cart with a `sellingPlanId` line, hands off to checkout. Powers the PDP subscribe
  toggle. *Appstle populates the selling plan groups; we read them.* Unchanged from today.
- **Shopify hosted checkout + Shopify Payments** — vaults the card, creates the subscription
  contract. We don't touch it (SAQ A stays intact).
- **Appstle** — owns the subscription **contracts**, runs **recurring billing + retries/
  dunning**, hosts the **customer portal** (skip/swap/pause/cancel/update-payment), and pushes
  events to **Klaviyo** via its native integration.
- **Appstle REST API + webhooks** (optional, paid "API Usage Enterprise" add-on) — only needed
  for a DIY in-storefront portal, backend event consumption, or the v2 SMS/AI agent. **Not
  used in v1.**

**The key reframe vs. native:** the thing that made native heavy — *we* call
`subscriptionBillingAttemptCreate` on every cycle and run dunning — is **Appstle's job** now.
That is the whole reason for the pivot.

## What we build vs. configure

| Layer | Owner |
| --- | --- |
| PDP (monthly only, unchanged) — repoint `subscription-options.ts` to Appstle's monthly plan | **Ours** (storefront; no UX change) |
| Selling plan groups (monthly + 90-day, standard) | **Appstle config** (admin) |
| Contracts, recurring billing, dunning | **Appstle** |
| Customer portal | **Appstle hosted** (we add a branded `/account` entry point) |
| Dunning email | **Appstle → Klaviyo** (native integration) |

## Files in this set
- `01-storefront-pdp-cart.md` — **KEEP.** Native selling plans on PDP, cart with subscription line.
- `02-customer-account-api-auth-portal.md` — **RETIRED.** Appstle's portal handles its own auth.
- `03-admin-api-contracts.md` — **RETIRED.** Appstle owns contracts + actions.
- `04-post-purchase-upsell.md` — **RE-SCOPED → v2.** Post-purchase extension dead; replaced by thank-you-page in-place contract swap via Appstle API.
- `05-selling-plans-config.md` — **KEEP.** Standard 90-day plan (qty 3), not prepaid; created in Appstle's admin.
- `06-headless-channel-setup.md` — **MOSTLY RETIRED.** Only the Storefront `unauthenticated_read_selling_plans` scope still applies.

## Build order (Appstle v1)
1. Appstle install + selling-plan config (`05`) — verify they render in the Storefront API.
2. Repoint the PDP's monthly plan to Appstle (`01`) — no UX change; quarterly NOT on the PDP.
3. `/account` entry point to Appstle's hosted portal.
4. Appstle → Klaviyo dunning; verify before removing the Recharge webhook.
5. Remove the Recharge layer.

---

<details>
<summary>Original native "three-API model" (reference only — superseded by Appstle)</summary>

The abandoned native build split work across three Shopify APIs:
- **Storefront API** — public token; reads products + selling plans, builds the cart. *(This
  part survived — it's how the PDP still works.)*
- **Customer Account API** — customer-authenticated (OAuth/PKCE); powered the portal
  (cancel/skip/pause). *Superseded by Appstle's hosted portal.*
- **Admin API** — offline token, server-side only; powered swap + contract edits and would have
  driven the self-built billing engine. *Superseded by Appstle.*

The native model also required us to run `subscriptionBillingAttemptCreate` on a cron with our
own dunning — the cost/risk that killed it. Kept here only so the reasoning trail is legible.

</details>
</content>
