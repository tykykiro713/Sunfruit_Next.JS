# Sunfruit Fit & Decisions — Appstle Subscriptions

**Read this first.** This file records (a) the actual current state of the repo, (b)
Sunfruit-specific decisions, and (c) the scope of the Appstle build. When this file and a
numbered reference doc disagree, **this file wins**.

Decisions dated **2026-06-24** unless noted. **Platform pivot to Appstle: 2026-06-26.**

---

## 0. Platform decision — Appstle (not native Shopify, not Recharge)

**We migrate Recharge → Appstle Subscriptions.** Native Shopify subscriptions were scoped
first and then **abandoned**: going fully native means *owning the recurring billing engine
ourselves* (a Vercel Cron calling `subscriptionBillingAttemptCreate` every cycle, plus
dunning, retries, and the `CONTRACT_UNDER_REVIEW` fraud path). That is money-moving
must-be-reliable infrastructure, and the risk/cost was not worth it for a small team.

**Appstle removes exactly that risk.** It is built on Shopify's official Subscription APIs
and Shopify's hosted checkout, but it **runs the billing orchestration and dunning itself**.
We do not build or operate a billing engine. (Confirmed against Appstle docs, 2026-06-26.)

**What this means architecturally:** Appstle plays the role Recharge played — it owns the
subscription contracts, the recurring billing, the failed-payment dunning, and a customer
portal — but on top of **native Shopify selling plan groups**. So the storefront's existing
native cart/PDP plumbing stays; we swap the *management layer* (Recharge → Appstle), not the
checkout rails.

The earlier native-build artifacts (own-billing-engine, server-side Admin API contract action
layer, Customer Account API auth migration, three-API model) are **retired** — see the
reference-doc dispositions in §D and the folder `README.md`.

---

## A. Current state (from a code audit, 2026-06-24)

The migration is smaller than a from-scratch build assumes — **the cart and PDP already run on
native Shopify selling plans**, not Recharge's own rails:

- `GET_PRODUCT_BY_HANDLE` already queries `sellingPlanGroups` — `src/lib/shopify.ts:363-386`.
- The cart already passes `sellingPlanId` on the line via Shopify's native `cartLinesAdd` —
  `src/lib/cart.ts:14-22`, `394-424`.
- `SELLING_PLAN_IDS` in `src/lib/recharge/types.ts` are **Shopify** GIDs
  (`gid://shopify/SellingPlan/...`), because Recharge-on-Shopify-Checkout creates
  Shopify-native selling plan groups under the hood.

**Appstle works the same way** — it creates and manages native Shopify selling plan groups,
and subscriptions add to cart via the standard native `selling_plan` line attribute. So the
native plumbing above carries over unchanged; only the *source* of the plans changes
(Recharge-managed → Appstle-managed).

So "Recharge" in this repo is only four touchpoints, all of which Appstle replaces:
1. The flavor → hardcoded-ID lookup in `src/lib/recharge/subscription-options.ts`.
2. The SMS-code account portal redirect (`RechargePortalAccess` widget).
3. The log-only webhook at `src/app/api/recharge/webhooks/route.ts`.
4. The SDK files: `client.ts`, `auth.ts`, `session.ts`, `config.ts`, `types.ts`.

---

## B. Decisions

### B1. Prelaunch — no subscriber migration
Sunfruit has **no live *subscribers* yet.** There is no cutover, dual-run, or data migration.
Stand up Appstle cleanly and remove the Recharge layer outright. The "highest-risk
live-revenue" framing does not apply to the subscription base pre-launch.

> The store has live paid traffic and one-time-purchase revenue, but **subscriptions are
> prelaunch** (confirmed; `CLAUDE.md` updated 2026-06-26 to match). So the Appstle plan tier
> can start low (Free/Starter — $0 subscription MRR today) and scale with the subscriber base.

### B2. The quarterly offer model — STANDARD 90-day subscription (REVISED 2026-06-26)
**Not prepaid.** Bill once for 3 packs, ship 3 packs at once, every 90 days. One charge, one
shipment, one cycle.

- **Mechanics:** a **standard** selling plan — billing interval = delivery interval = **3
  months (90 days)**, **quantity 3** of the same variant. No upfront multi-month collection,
  no decoupled billing/delivery, no prepaid pricing bucket. This is the cheap/safe Shopify +
  Appstle path (avoids all the prepaid-contract complexity).
- **Fulfillment:** one line, qty 3, shipped once per cycle — normal fulfillment. *(Note: this
  replaces the old "true prepaid, ship 3 boxes in box 1" model, which would have needed a
  shipping-profile trick — no longer relevant.)*
- **Why this model:** the customer discount is funded by **real freight + pick/pack savings**
  (one label, one shipment per 90 days vs. three), not out of margin. The consolidated shipment
  doubles as an **eco-friendly** upgrade — which our organic, eco-conscious ICP will value.
- **Presentation:** **NOT on the PDP.** The PDP stays monthly-only, unchanged (decided
  2026-06-27). Quarterly is reachable **only** via a post-checkout thank-you-page upgrade — a
  **v2** add-on, not v1. See §B5.

> **Flag (carried from eng-review):** re-derive the unit economics before committing the
> discount %. The savings story is real (one shipment per 90 days vs. three), but a prior
> costing of the consolidate-to-one-box scenario came out at ~−$1.40/quarter — confirm the
> 90-day-cadence math funds the discount. Not a v1-launch blocker.

### B3. SKU shape — same 24-pack variant, quantity 3 (DECIDED 2026-06-26)
Use the **existing 24-pack variant at quantity 3** on the 90-day plan — **not** a separate
3-pack SKU.

- **One SKU per flavor.** A separate 3-pack SKU would double variants per flavor for no benefit
  (it's 3 tins in one box either way; 24 sticks = 1 tin).
- **Makes the upgrade swap trivial:** monthly = qty 1 of variant X on the 1-month plan;
  quarterly = qty 3 of variant X on the 3-month plan. Same variant — upgrade = change plan +
  change qty, no product-line swap (see §B5).
- **Flavor-swap stays trivial** — change variant, qty stays 3.
- The variant carries **two selling plans** in its plan group: monthly (1mo, qty 1) and
  quarterly (3mo, qty 3, larger discount). Quantity is a line property, not part of the plan.

### B4. v2 SMS/AI agent ("OpenClaw") — out of scope for v1
A future SMS/AI agent that reads inbound customer texts, classifies intent (skip/swap/pause/
cancel), and executes the action. Under Appstle this would call **Appstle's REST API**
(the "API Usage Enterprise" add-on — contact-sales, see §E), not a self-built Admin action
layer. Not built in v1. Revisit when (a) take-rate justifies it and (b) the API add-on cost
is known.

### B5. The monthly → quarterly upgrade — V2, thank-you-page only (DECIDED 2026-06-27)

**Scope decision:** the PDP does **not** change and does **not** show quarterly. Quarterly is a
**v2** post-checkout upsell — the only path to it. v1 ships monthly-only on Appstle, like-for-like
with today.

**The mechanism (v2).** After a monthly checkout, surface a one-click "upgrade to quarterly —
save X%, one eco box every 90 days" on the **Shopify thank-you page**. On accept, our backend
calls **Appstle's API to change the existing monthly contract in place**: selling plan 1mo →
3mo, qty 1 → 3. Card is already vaulted, so it's one-click for the customer.

**Why this works where the "real" post-purchase upsell didn't:** Shopify forbids
*adding/modifying a subscription via the post-purchase changeset* on an order that already has
a subscription. We **don't use that changeset** — we modify the already-created contract via
the subscription API, which is a normal operation. Same customer experience, different plumbing.

**Dead ends (do not pursue):**
- Shopify `Checkout::PostPurchase` extension to add/swap the sub — structurally blocked
  (platform rule; same wall on Recharge, AfterSell, Zipify). Verified 2026-06-26.
- True prepaid — dropped (§B2); the 90-day standard model removes the need.

**In-place upgrade is CONFIRMED viable (Appstle API, verified 2026-06-26)** — the cleaner path,
no cancel/recreate needed. Server-side endpoints (`X-API-Key`, base `subscription-admin.appstle.com`,
`/api/external/v2/...`, called from **our backend**):
- `update-line-item-selling-plan` (or `update-frequency-by-selling-plan`) — 1mo → 3mo plan.
- `update-line-item-quantity` — 1 → 3. Auto-recalculates discount + shipping.
- combined `update-line-item` does plan + qty in one call — **but NOT atomic** (HTTP 207
  partial success); backend must handle plan-changed-but-qty-failed. Two sequential calls also fine.
- Repricing is automatic; no immediate mid-cycle charge (applies next cycle).

**Three things to nail down before/during build:**
1. **Next-charge re-anchor (the one doc gap):** confirm the plan change re-anchors the next
   charge to +90 days; if not, call `update-billing-date` explicitly. *(Support ticket / sandbox.)*
2. **Thank-you-page surface:** Shopify's hosted thank-you page is sandboxed for custom scripts
   in headless — trigger the upgrade via an authenticated call to our backend (or an
   order-created webhook), not inline page JS. Confirm the exact surface.
3. **Fallback** if in-place ever falls short: cancel monthly + `create-subscription-contract`
   on the vaulted card (supported) — but loses contract continuity, so prefer in-place.

**Build status:** **v1 = monthly-only, PDP unchanged.** The thank-you-page upgrade is **v2** —
build once items 1–2 are confirmed and take-rate/economics justify it. Needs the Appstle REST
API add-on (§E). The 90-day selling plan still gets created in v1 (cheap config) so v2 has a
target, but it is **not** surfaced on the PDP.

---

## C. Auth — DECOUPLED from subscriptions (changed by the Appstle pivot)

**Why the native plan called the Customer Account API "mandatory":** in a *fully-native*
build, a subscription contract is customer-scoped, and the **only** surface where a logged-in
customer can cancel / skip / pause their *own* contract is the Customer Account API (OAuth).
The driver was the **self-service portal**, not the post-purchase upsell (that ran on the
Checkout::PostPurchase extension + Admin API). With no other customer-auth path for
subscription management in native headless Shopify, adopting the Customer Account API was
"mandatory regardless." See `...-02-customer-account-api-auth-portal.md`.

**Appstle removes that requirement.** Appstle's customer portal authenticates customers
itself — via a **passwordless magic link** embedded in subscription emails (no login needed)
or standard **Shopify customer accounts**. We do not need the Customer Account API to manage
subscriptions.

**Decision:** the Customer Account API migration is **no longer part of the subscription
scope.** It reverts to an **independent security-hardening item** — retiring the
auth-tokens-in-`localStorage` landmine (`src/context/CustomerContext.tsx`, `src/lib/customer.ts`).
Do it on its own track, on its own merits, not as a subscription dependency.

For v1 subscriptions, the customer reaches the Appstle portal via the magic-link path (which
sidesteps our storefront auth entirely) and/or a "Manage subscription" link on the existing
`/account` page.

---

## D. Reference-doc dispositions (the numbered `0x` docs)

The numbered docs were written for the **native** build. Their status under Appstle:

| Doc | Status under Appstle |
| --- | --- |
| `01` PDP/cart | **KEEP.** App-agnostic — reads native `sellingPlanGroups`, passes `sellingPlanId` on the cart line. Appstle *populates* these. Real work = replace the Recharge-named lookup in `subscription-options.ts` with attribute-based resolution from `sellingPlanGroups`. |
| `02` Customer Account API auth | **RETIRED.** Appstle's portal handles its own auth (magic link / Shopify accounts). See §C. |
| `03` Admin API contract action layer | **RETIRED.** Appstle owns contracts + the skip/swap/pause/cancel actions. A self-built Admin action layer is not part of v1. |
| `04` Post-purchase upsell | **RE-SCOPED → v2.** Shopify post-purchase *extension* is dead (platform rule); replaced by a thank-you-page one-click upgrade that swaps the live contract via Appstle's API (§B5). |
| `05` Selling plans | **KEEP (edited).** Standard 90-day plan (bill = ship = 3 months, qty 3) — **not** prepaid. Plans are **created in Appstle's admin**, not under our own app. |
| `06` Headless channel/tokens | **MOSTLY RETIRED.** Still need the Storefront token with `unauthenticated_read_selling_plans` (already have it). No Admin offline token / Customer Account client needed for v1. |
| `00` Index (three-API model) | **REPURPOSED** into the Appstle architecture overview. |

### Dunning
Klaviyo is already integrated in the storefront. **Appstle has a native Klaviyo integration**
(paste a Klaviyo private API key into Appstle; it pushes subscription lifecycle + billing
success/failure events as Klaviyo metrics). Wire the failed-charge dunning flow to Appstle's
billing-failure event and **delete** the Recharge failed-charge webhook route. This is config,
not a self-built billing-failure webhook.

---

## E. Open questions / diligence before/while building

- **Appstle plan tier + the API add-on.** Tiers: Free (≤$500/mo sub revenue) · Starter $10
  (≤$5k) · Business $30 (≤$15k) · Business Premium $100 (≤$100k). **API + Webhooks is a
  separate "API Usage Enterprise" add-on (contact-sales, price not public).** v1 (hosted
  portal, native Klaviyo, PDP selling-plan reads) does **not** require the API add-on — those
  flows run on the Shopify Storefront API + Appstle's own hosted surfaces. The API/webhook
  add-on is only needed for a DIY in-storefront portal, backend event consumption, or the v2
  agent (§B4). Subscriptions are prelaunch ($0 sub MRR today, §B1), so start on a low tier and
  scale with the subscriber base; price the API add-on only if/when needed.
- **In-place upgrade — 2 residual confirms (B5, v2 gate).** In-place plan+qty change is
  confirmed in Appstle's API. Still confirm: (1) does the plan change re-anchor the next charge
  to +90 days, or must we call `update-billing-date`? (2) what's the exact thank-you-page trigger
  surface in our headless setup (backend call / webhook, since the hosted page sandboxes JS)?
- **Hosted portal embedding.** Confirm whether Appstle's portal embeds cleanly (themed) in our
  `/account` shell vs. deep-link/redirect-out, and how the magic-link auth coexists with the
  existing `/account` login. (Research confidence was medium here.) If we require a fully
  native-feeling portal *inside* the app, that is effectively the DIY route → needs the API
  add-on. v1 recommendation: link-out / embed the hosted portal first; defer DIY.
- **Dunning configurability.** Retries exist; confirm the retry schedule and failed-payment
  email settings in-app.
- **Klaviyo tier gating.** Native integration confirmed; confirm which Appstle tier unlocks it
  and the exact event/metric names we'll trigger flows on.

---

## F. Security & PCI notes (carry over — still true under Appstle)

- **PCI / cardholder data:** Shopify vaults the card (`CustomerPaymentMethod`) and holds PCI
  compliance (Level 1). Appstle bills against the vaulted token via the Shopify subscription
  contract; it never sees, transmits, or stores the PAN. We stay **SAQ A** (same posture
  Recharge gave us). Our risk is **access control**, not cardholder data. **Never build a
  custom card-entry/update form** — card updates go through Appstle's portal / Shopify's hosted
  payment-update flow. That is the one thing that would pull us out of SAQ A.
- `.env.local` holds a live `RECHARGE_API_KEY` (`sk_...`), gitignored. **Rotate it when
  Recharge is decommissioned.**
- If we later adopt the Appstle REST API (v2): the Appstle API key (`apst_...`) is a
  store-wide credential — **server-side only**, never logged, never client-exposed.

---

## G. Removal plan — retire the Recharge layer

Once Appstle is configured and the PDP/portal point at it:
- Remove `src/lib/recharge/` (client/auth/session/config/types/subscription-options), the
  `RechargePortalAccess` widget, the `@rechargeapps/storefront-client` dep, and
  `NEXT_PUBLIC_RECHARGE_*` / `RECHARGE_API_KEY` / `RECHARGE_WEBHOOK_SECRET` env.
- Replace `src/app/api/recharge/webhooks/route.ts` (Appstle handles billing; dunning via the
  native Klaviyo integration — no custom webhook route needed for v1).
- **Verify the Klaviyo dunning path works on Appstle BEFORE removing the Recharge webhook**,
  or failed payments go silent (lost revenue).
- Update `CLAUDE.md` stack context + landmines after cutover.

---

## H. Portal & login UX — mostly handled by Appstle's hosted portal

The native plan specced a fully custom `/account/subscriptions` page (cards, retention
off-ramp, inline swap) and a passwordless login flow. **With Appstle's hosted portal, most of
that is out of v1 scope** — Appstle provides the skip/swap/pause/cancel/update-payment UI.

What remains for us:
- A **branded entry point** on `/account` ("Manage subscription") that links to / embeds the
  Appstle portal.
- Reuse existing tokens (`emeraldgreen-500` / `brightgreen-500`, `rounded-md`/`rounded-lg
  border-2` cards, emerald focus rings) wherever we *can* theme Appstle's portal.

The detailed custom-UX spec below is **retained as aspirational** — it only applies if we
later choose to build a DIY headless portal on Appstle's REST API (§B4 / §E). It is **not v1
scope.**

<details>
<summary>Aspirational custom-portal UX spec (only if we go DIY on Appstle's API later)</summary>

### Information architecture — `/account/subscriptions`
One card per active contract:
```
┌─────────────────────────────────────────────┐
│ [tin]  Lemon Mint                  ● Active   │  ← flavor = anchor + status pill
│        1 tin · 24 sticks · monthly            │
│        Next charge: Jul 12 · $38.00           │  ← prominent, the thing they care about
│  ─────────────────────────────────────────    │
│  [ Skip next ]  [ Pause ]  [ Swap flavor ]    │  ← primary actions, equal weight
│                              Cancel subscription│  ← de-emphasized text link, separated
└─────────────────────────────────────────────┘
```

### Cancel flow (retention off-ramp)
```
Cancel subscription → step 1: "Before you go — too much on hand?"
                                [ Skip next delivery ]  [ Pause instead ]
                                "No thanks, cancel" (text link)
                      → step 2: "Cancel for good? You'll lose your <discount>%."
                                [ Keep subscription ]  [ Cancel subscription ]
```
Never one-tap destructive. The off-ramp is framed as helpful, not a guilt wall.

### Empty / first-time state
Warm, branded: "No active subscription yet — subscribe and save 15%, skip or cancel anytime."

### Responsive & a11y
- Mobile-first single column; actions stack full-width <480px; 44px min touch targets.
- Status pills carry text, not just color: "Active" / "Paused" / "Cancelled".
- Code input (if DIY login): `inputmode="numeric"`, `autocomplete="one-time-code"`.

</details>
</content>
