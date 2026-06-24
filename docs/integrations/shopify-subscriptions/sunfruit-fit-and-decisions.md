# Sunfruit Fit & Decisions — Native Shopify Subscriptions

**Read this first.** The numbered docs (`00`–`06`) are generic Shopify reference material,
written without visibility into the current codebase. This file records (a) the actual
current state of the repo, (b) Sunfruit-specific decisions, and (c) where those decisions
**override** the reference docs. When this file and a numbered doc disagree, this file wins.

Decisions dated **2026-06-24** unless noted.

---

## A. Current state (from a code audit, 2026-06-24)

The migration is smaller than the reference docs assume — **the cart and PDP already run on
native Shopify selling plans**, not Recharge's own rails:

- `GET_PRODUCT_BY_HANDLE` already queries `sellingPlanGroups` — `src/lib/shopify.ts:363-386`.
- The cart already passes `sellingPlanId` on the line via Shopify's native `cartLinesAdd` —
  `src/lib/cart.ts:14-22`, `394-424`.
- `SELLING_PLAN_IDS` in `src/lib/recharge/types.ts` are **Shopify** GIDs
  (`gid://shopify/SellingPlan/...`), because Recharge-on-Shopify-Checkout creates
  Shopify-native selling plan groups under the hood.

So "Recharge" in this repo is only four touchpoints:
1. The flavor → hardcoded-ID lookup in `src/lib/recharge/subscription-options.ts`.
2. The SMS-code account portal redirect (`RechargePortalAccess` widget).
3. The log-only webhook at `src/app/api/recharge/webhooks/route.ts`.
4. The SDK files: `client.ts`, `auth.ts`, `session.ts`, `config.ts`, `types.ts`.

**The reframe that matters:** "native Shopify subscriptions, no Recharge" means *Sunfruit
becomes its own subscription app*. Our Admin API contract layer (doc 03) owns the selling
plans and creates/manages contracts. Today Recharge owns them — so the current selling plan
groups are Recharge-managed and will be orphaned when Recharge is removed.

---

## B. Decisions

### B1. Prelaunch — no subscriber migration
Sunfruit has **no live subscribers yet.** There is no cutover, dual-run, or data migration.
Build native subscriptions cleanly and remove the Recharge layer outright. The "highest-risk
live-revenue" framing does not apply pre-launch.

### B2. The quarterly offer model (CLARIFIED 2026-06-24 — overrides doc 05)
**Quarterly prepaid, ship quarterly:** collect 3 months upfront and ship all 3 months in a
**single box**, NOT monthly.

- **Mechanics:** billing interval = delivery interval = **3 months**. A *standard* selling
  plan — **no decoupled billing/delivery intervals.** This directly overrides doc 05's
  "ship-monthly / decoupling is the key trick" model.
- **Fulfillment:** ship **3 × 24-pack** every 3 months in one box (see B3 for SKU shape).
- **Why this model:** the customer discount is funded by **real freight + pick/pack savings**
  (one label, one shipment vs. three), not out of margin. The consolidated shipment doubles
  as an **eco-friendly** selling point for our organic, eco-conscious buyers.
- **Engagement:** the lost monthly-shipment touchpoint is replaced by a **monthly Klaviyo
  beat** (recipe / flavor spotlight) — engagement cadence decoupled from shipping cadence.
- **Presentation:** offered as a **post-purchase upgrade** to monthly subscribers (doc 04);
  on opt-in, the monthly contract is cancelled (order: confirm quarterly created → then
  cancel monthly).

### B3. SKU shape — 24-pack × quantity 3 (recommended; pending ops confirm)
Use the **existing 24-pack variant at quantity 3** on the quarterly plan. **Retire the
72-pack SKU.**

- Physically it's 3 tins in one box either way (24 sticks = 1 tin), so a 72-pack SKU is just
  a 3-tin bundle — not a distinct product.
- Keeps **one SKU per flavor** (matches the 48-pack removal direction, v0.1.2), makes
  **flavor-swap trivial** (same variant as monthly, just qty 3), and lets the post-purchase
  flow create a clean quarterly contract without introducing a new SKU.
- The freight/eco story (one box, one label) is fully preserved.
- **Only revisit if** there is genuine 72-count physical packaging or the 3PL meaningfully
  rewards single-line picks over a 3-unit line. → confirm with ops; default is 24×3.

### B4. OpenClaw = v2, out of scope for v1
OpenClaw is a future SMS/AI agent that reads inbound customer texts, classifies intent
(skip/swap/pause/cancel), and calls the **same** server-side Admin action layer (doc 03).
Not built in v1 — but build the action-layer routes transport-agnostic so it plugs in later
with no rework. (Resolves the "unverified term" note in doc 00.)

---

## C. Auth decision — MIGRATE (RESOLVED 2026-06-24, gated on a parity check that passed)

**Decision:** migrate the entire account area from Storefront `customerAccessTokenCreate`
(password, tokens in `localStorage` — `src/context/CustomerContext.tsx`, `src/lib/customer.ts`)
to the **Customer Account API** (OAuth, Confidential client, httpOnly session). One auth
system; also retires the localStorage-token landmine. Subscription contracts (cancel/skip/
pause) live **only** on the Customer Account API, so adopting it is mandatory regardless.

**Why it isn't close:** prelaunch (no authed users to disrupt), it's Shopify's recommended
direction, and — see below — the two auth systems **cannot interoperate**, so "coexist"
would mean running two parallel logins indefinitely. Migrate is the clean end state.

**Verification gate (run 2026-06-24 against shopify.dev) — PASSED for account-management parity:**
- Orders (list + detail) — ✅ covered by the Customer Account API.
- Addresses (create / update / delete) — ✅ `customerAddress*` mutations.
- Profile update (name) — ✅ `customerUpdate`.
- **Bonus:** new customer accounts provide **SSO with Shopify checkout** (customer stays
  authed storefront → checkout) — an upgrade over today.

**The one dependency to accept (a model change, NOT a feature regression):**
The Customer Account API requires **"new customer accounts" = passwordless.** Login is an
emailed **6-digit code / sign-in link**, not a password. So the current password-based pages
— `LoginForm`, `RegisterForm`, `recover`, `reset/[resetToken]` — are **replaced** by a
passwordless OAuth flow (no password fields; "register" becomes first sign-in / via checkout).
The systems can't share tokens: a `customerAccessTokenCreate` token can't call the Customer
Account API, and vice-versa — which is *why* coexist is the awkward path.

→ **Passwordless confirmed by Tyson (2026-06-24).** Migrate is final.
Residual verify (minor, during build): whether customers can change their account **email**,
since it's the login identity.

---

## D. Corrections to the reference docs

| Doc | Correction |
| --- | --- |
| `01` PDP/cart | More done than "mostly." Plumbing is already native. Real work = replace the Recharge-named lookup in `subscription-options.ts` with attribute-based resolution from `sellingPlanGroups`. |
| `02` Auth | Ignores the existing Storefront `customerAccessToken` auth. Decision: **migrate** to the Customer Account API (passwordless) — see §C. Adopt **Confidential** client + httpOnly session. |
| `03` Admin | No Admin API access exists today (only the Recharge webhook route). Net-new; greenfield. Enforce the per-route ownership check (a customer may only modify a contract they own). |
| `04` Post-purchase | Confirm checkout uses **Shopify Payments** (vaulted card required). Submit the gated-beta access request early — long pole. Quarterly contract created = 24-pack qty 3, standard quarterly plan. |
| `05` Selling plans | **No decoupled intervals** (see B2). Standard quarterly plan, bill = ship = 3 months. Recreate plan groups **under our own app** — current ones are Recharge-managed. |
| `06` Tokens | Add Admin offline token + Customer Account API client (id/secret/endpoints). Verify the Storefront token comes from a Headless channel with `unauthenticated_read_selling_plans`. |
| Dunning | Klaviyo already integrated. Replace the Recharge failed-charge webhook with the Shopify subscription-billing-attempt-failure webhook → existing Klaviyo flow. |

---

## E. Open questions for the eng-review

- **Recurring billing scheduler:** who triggers recurring billing attempts for native
  contracts — Shopify's billing engine, or do we cron `subscriptionBillingAttemptCreate`?
- **Shopify Payments** confirmed as the processor on `checkout.sunfruit.com`?
- Auth strategy (C1).

---

## F. Security notes

- The Admin offline token is a store-wide master key — **server-side only**, never logged,
  never client-exposed. Every customer-initiated Admin route must authenticate the customer
  and **verify they own the target contract** before acting (prevents one customer modifying
  another's subscription).
- `.env.local` holds a live `RECHARGE_API_KEY` (`sk_...`). It is gitignored (not committed).
  **Rotate it when Recharge is decommissioned.**
