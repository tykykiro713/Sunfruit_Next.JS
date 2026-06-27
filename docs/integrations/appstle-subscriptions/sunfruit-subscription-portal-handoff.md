# Build Plan — Sunfruit Subscriptions on Appstle

**Goal:** Migrate Sunfruit's subscriptions from Recharge → **Appstle Subscriptions** on the
headless Next.js storefront, with the smallest correct footprint. Appstle owns contracts,
recurring billing, dunning, and the customer portal; the storefront keeps its native Shopify
selling-plan plumbing.

**Read `sunfruit-fit-and-decisions.md` first** — it holds the decisions this plan executes and
wins any conflict.

**Stack:** headless Next.js storefront (sunfruit.com) · Shopify Storefront API + hosted
checkout (Shopify Payments) · Klaviyo already integrated · **Appstle Subscriptions** (new).

**Why Appstle (not native):** going fully native meant building and operating our own
recurring-billing engine (`subscriptionBillingAttemptCreate` cron + dunning). Appstle runs
that for us — that risk removal is the whole reason for the pivot.

---

## Architecture in one picture

```
PDP / cart      →  Shopify Storefront API (native sellingPlanGroups + sellingPlanId)   [OURS]
Checkout        →  Shopify hosted checkout, Shopify Payments (card vaulted)            [SHOPIFY]
Selling plans   →  created & managed in Appstle admin (native plan groups under hood)  [APPSTLE config]
Contracts       →  Appstle (created at checkout)                                       [APPSTLE]
Recurring bill  →  Appstle billing orchestration + retries/dunning                     [APPSTLE]
Manage sub      →  Appstle hosted customer portal (magic link / Shopify account)       [APPSTLE]
Dunning email   →  Appstle native Klaviyo integration → existing Klaviyo flows         [APPSTLE + Klaviyo]
```

We build/change only the **OURS** row. Everything else is Appstle/Shopify config.

---

## Scope (v1 — build now)

### 1. Appstle install + selling-plan config (config, not repo code)
- Install Appstle; on each variant's plan group configure **two standard plans**: monthly
  (bill = ship 1mo, qty 1) and **90-day** (bill = ship 3mo, qty 3, larger discount). **Not
  prepaid** — one charge + one shipment every 90 days. See `05`.
- SKU shape: **same 24-pack variant at quantity 3** for the 90-day plan (see fit-and-decisions §B3).
- **Verify the plans render in the Storefront API** `sellingPlanGroups` response for each
  product handle before touching UI — this is the contract between Appstle and our PDP.
- Size the Appstle tier against actual subscription MRR (fit-and-decisions §B1/§E).

### 2. PDP / cart — repoint monthly to Appstle, NO UX change
- **PDP behavior is unchanged** (monthly-only; no quarterly on the PDP — that's v2). The only
  change: point `src/lib/recharge/subscription-options.ts` at **Appstle's** monthly selling
  plan instead of Recharge's (Appstle repopulates the native `sellingPlanGroups`). See `01`.
- Cleanest to do this as the planned attribute-based resolution (kills the stale-`SELLING_PLAN_IDS`
  landmine too) — but scope is the monthly repoint, not a PDP redesign.
- **Optional bundle:** the `fetchProductByHandle` `no-cache` fix (`src/lib/shopify.ts`) — same
  file area, known perf landmine. Only if it doesn't expand the change surface.

### 3. Customer portal — link to / embed Appstle's hosted portal
- Replace the `RechargePortalAccess` widget with an entry point on `/account` ("Manage
  subscription") that opens Appstle's hosted portal (skip / swap / pause / cancel / update
  payment).
- Customer auth into the portal is **Appstle's** (passwordless magic link in subscription
  emails, or Shopify customer account) — **no Customer Account API migration needed.**
- **Decision needed (diligence):** embed-and-theme vs. deep-link-out. Default v1 =
  link-out/embed the hosted portal; a fully-native DIY portal is deferred (needs the Appstle
  REST API add-on — see fit-and-decisions §E).

### 4. Dunning — Appstle native Klaviyo integration
- Configure Appstle → Klaviyo (paste Klaviyo private API key). Map the **billing-failure**
  event to a Klaviyo dunning flow that links to Appstle's/Shopify's hosted payment-update page.
- **Verify this path end-to-end BEFORE removing the Recharge webhook**, or failed payments go
  silent.

### 5. Retire Recharge (after 1–4 verified)
- Remove `src/lib/recharge/*`, `RechargePortalAccess`, `@rechargeapps/storefront-client`, and
  the `NEXT_PUBLIC_RECHARGE_*` / `RECHARGE_API_KEY` / `RECHARGE_WEBHOOK_SECRET` env.
- Replace/delete `src/app/api/recharge/webhooks/route.ts` (Appstle handles billing; no custom
  webhook route in v1).
- **Rotate `RECHARGE_API_KEY`** on decommission.
- Update `CLAUDE.md` stack context + landmines.

---

## Deferred (NOT v1)

- **Monthly → quarterly upgrade (V2 — thank-you-page swap, the ONLY quarterly path).** PDP stays
  monthly-only in v1. After a monthly checkout, a one-click "upgrade to quarterly" on the Shopify
  thank-you page → backend calls Appstle's API to change the live contract in place (plan
  1mo→3mo, qty 1→3) against the vaulted card. NOT the Shopify post-purchase extension (blocked
  for sub-on-sub). In-place change confirmed in Appstle's API; confirm next-charge re-anchor +
  thank-you-page trigger surface, re-derive economics. Needs the API add-on. See fit-and-decisions §B5.
- **DIY headless portal on Appstle's REST API** — needs the contact-sales API add-on; only if
  the hosted portal can't be themed acceptably.
- **v2 SMS/AI agent ("OpenClaw")** — would consume Appstle's REST API; out of scope (§B4).
- **Customer Account API auth migration** — decoupled from subscriptions; pursue separately as
  the localStorage-token security cleanup (§C).

---

## Diligence to run with Appstle (before/while building)

1. **In-place upgrade (v2):** confirmed in Appstle's API; still confirm (a) the plan change
   re-anchors the next charge to +90 days (else call `update-billing-date`), and (b) the exact
   thank-you-page trigger surface (hosted page sandboxes JS → use a backend call / webhook).
2. **API + Webhook add-on price** (contact-sales) — needed for the v2 upgrade, DIY portal,
   backend events, or v2 agent. Not needed for v1.
3. **Hosted portal embed**: themed iframe vs. redirect-out; magic-link vs. `/account` login
   coexistence.
4. **Dunning** retry schedule + failed-payment email configurability.
5. **Klaviyo** tier gating + exact event/metric names for the flows.

---

## Guardrails for this build
- Production repo, paid traffic. Always branch; a human reviews and merges every PR. **Do not
  edit live Recharge selling-plan IDs without flagging.** Cart/checkout/subscription are the
  highest-risk paths.
- Match existing headless Next.js conventions in the repo.
- No new dependency without flagging first.
- Never commit or log secrets (Recharge key today; Appstle `apst_` key if v2).
- Stop at `git push` — Tyson reviews on the Vercel preview first. No deploy, no auto-merge.

## Verification expected (evidence, not assertions)
- Selling plans: Storefront API `sellingPlanGroups` response showing monthly + quarterly per
  product handle (Appstle-created).
- PDP/cart: cart line carrying the correct `sellingPlanId` for each toggle state; checkout
  creating an Appstle contract.
- Portal: customer reaches Appstle portal and completes skip/cancel (screenshot/log).
- Dunning: simulated failed charge → Appstle billing-failure event → Klaviyo flow triggered.
- Recharge removal: build green with `src/lib/recharge/*` and the dep gone.
</content>
