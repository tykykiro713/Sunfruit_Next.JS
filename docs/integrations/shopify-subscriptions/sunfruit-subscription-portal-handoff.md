# Claude Code Handoff — Sunfruit Native Subscription Portal

**Goal:** Build a headless customer subscription portal on Shopify native subscriptions (no Appstle/Recharge), with a backend action layer designed so a future SMS/AI agent can reuse it without rework.

**Stack:** Existing headless Next.js storefront (sunfruit.com), Klaviyo already integrated.

**Architecture principle:** Build ONE shared action layer (server-side Next.js API routes). The portal UI calls it now; a v2 SMS/AI agent calls the same routes later. No duplicate logic.

---

## Scope (v1 — build now)

### 1. Auth — Customer Account API (OAuth 2.0 + PKCE)
- Discovery via `GET /.well-known/openid-configuration` and `GET /.well-known/customer-account-api` (do not hardcode endpoints).
- Authorization Code flow with PKCE (public client) OR confidential client server-side — pick confidential since we have a Next.js backend; keeps client_secret server-side.
- Implement: authorization request, code→token exchange, refresh-token handling, logout.
- Scope: `openid email customer-account-api:full`.
- Store tokens server-side (httpOnly session), never in localStorage.

### 2. Customer-facing actions — Customer Account API (customer-authenticated)
- **Cancel** subscription contract
- **Skip** next billing cycle (`subscriptionBillingCycleSkip`) / unskip
- **Pause** contract (`subscriptionContractPause`) / resume

### 3. Swap — Admin API backend route (offline token, server-side ONLY)
- **Swap flavor** via `subscriptionContractProductChange` (preferred) — point contract line at target variant ID.
- Fallback if needed: draft flow — `subscriptionBillingCycleContractEdit` → `subscriptionDraftLineRemove` + `subscriptionDraftLineAdd` → `subscriptionBillingCycleContractDraftCommit`.
- Also powers the **portal-based quarterly upgrade** path (fallback for customers who didn't take the post-purchase offer — see v1.5). This path edits a LIVE monthly contract onto the quarterly plan, which involves mid-contract billing-policy change + prepaid collection. Verify proration behavior before exposing (see test note below). This is the messy path; post-purchase (v1.5) is the primary upgrade mechanism.
- NOTE: This is Admin API, not Customer Account API. Customer hits a Next.js route; route validates the customer owns the contract, then calls Admin API with the offline token. This is standard server-side, NOT a workaround.

### 4. Dunning — Klaviyo webhook
- Subscribe to failed billing-attempt webhook.
- On failure → trigger Klaviyo flow → include Shopify payment-method-update secure link.
- Retry per Shopify billing schedule.

### 5. Selling plans (config, not code — confirm these exist before building portal)
- Monthly sub-and-save plan on each flat SKU.
- Quarterly prepaid plan: **bill every 3 months, fulfill every 1 month** (decoupled billing/delivery interval).

---

## Shared action layer — interface requirements (so v2 agent plugs in)

Build each action as a backend route with a clean, transport-agnostic interface:
- Input: `{ customerId, contractId, action, params }`
- Every mutation: **idempotency key** (prevents duplicate charges/changes on retry).
- **Money-moving or destructive actions (cancel, anything that charges) = confirm-then-act**, not act-then-notify. Expose a confirmation hook in the interface.
- Return structured result (success/failure + reason), not just 200.
- Authorization check on every route: confirm the authenticated customer owns the contract being modified.

## v1.5 — Post-purchase quarterly upgrade offer (PRIMARY upgrade mechanism)

**Strategy:** Customer selects MONTHLY at checkout (no pre-checkout friction). Immediately after order confirmation, before the Thank You page, present a one-tap "upgrade to quarterly prepaid, save X%" offer. High conversion: decision isolation + checkout dopamine + already-vaulted card + an easy yes/no for someone already onboard. Sample-first audience is already past the trial decision, so this is the right moment.

**Why this beats the portal path:** The post-purchase `add_subscription` changeset creates the quarterly contract fresh against the vaulted card — NO mid-contract editing, NO proration mess. The portal/Klaviyo upgrade (section 3) edits a live contract and is the fiddly path; this is clean.

**Mechanism:** `Checkout::PostPurchase` extension.
- `Checkout::PostPurchase::ShouldRender` — decide whether to show the offer (only when the just-placed order is a monthly subscription on an eligible SKU).
- `Checkout::PostPurchase::Render` — present the quarterly offer UI (use the `Select` component for the plan; `TextBlock` for subscription terms/summary to build trust).
- `add_subscription` changeset — adds the quarterly contract. **Buyer-consent checkbox value MUST be passed to `applyChangeset`** or the change is rejected and errors.
- `calculateChangeset` first to show the buyer the prepaid total, then `applyChangeset`, then `done()` to redirect to Order Status.

**Cancel-the-monthly logic (REQUIRED — do not ship two live contracts):**
- When the buyer accepts the quarterly upgrade, the monthly contract created at checkout MUST be cancelled/voided.
- Sequence: confirm quarterly contract created successfully → THEN cancel the monthly contract via the Admin API action-layer route (`subscriptionContractCancel`). Order matters: never cancel the monthly before the quarterly is confirmed, or a failure leaves the customer with no subscription.
- Make the two-step atomic in intent: if quarterly creation succeeds but monthly cancel fails, log loudly and flag for manual cleanup — do NOT leave it silent. (This is exactly the kind of two-call sequence that needs a bounded, logged outcome.)
- Note the on-hold status: the just-placed order sits in an on-hold/pending-upsell state during the post-purchase flow; the monthly contract exists from order creation, so the cancel targets that contract, not the order line.

**Constraints to plan around (verified against Shopify docs):**
- **Beta + gated on live stores.** Works freely on a dev store; using post-purchase extensions on a LIVE store requires requesting access from Shopify. → **DO THIS FIRST / IN PARALLEL — it's the long pole.** Submit the access request before/while building.
- **Shopify Payments + vaulted card required.** Card must be vaulted on Shopify Checkout (no external/offsite payment redirect). On Shopify Payments = fine. Customers on unsupported methods simply won't see the offer (coverage gap, not a blocker).
- **Fulfillment hold.** Order goes on-hold during the offer; hold auto-lifts 1 hour after initial checkout if the customer abandons. Harmless for our cadence.
- **Unversioned API.** Post-purchase extension APIs are NOT on the quarterly version schedule — less predictable change management. Log/monitor.

**Dependency:** Eligible SKU must have the quarterly selling-plan group attached (same config dependency as section 5).

---


- SMS/AI agent that reads inbound texts, classifies intent (skip/swap/pause/cancel), and calls the SAME action-layer routes.
- Agent guardrails (spec when built): fixed action allowlist, no charge/refund without explicit confirmation, bounded execution (a misread text cannot loop or fire repeated mutations).

---

## Guardrails for this build
- Match existing codebase conventions (headless Next.js patterns already in repo).
- No new dependency/library/framework without flagging first.
- Do NOT commit or log secrets; offline Admin token and client_secret stay in env/gitignored.
- Stop at `git push` — Tyson reviews on dev first. No deploy.
- Log each run to a file in the repo so results come back through the shared folder.

## Verification expected (show evidence, not assertions)
- Auth: screenshot/log of successful token exchange + refresh.
- Each action: the mutation call + the returned contract state showing the change.
- Swap: contract line variant ID before/after.
- Dunning: webhook received → Klaviyo flow triggered (log).
- Post-purchase upgrade (v1.5): test-order log showing — offer rendered → quarterly contract created → monthly contract cancelled, with both contract states confirmed. Show the cancel happened AFTER quarterly creation succeeded.

## Build dependency to verify FIRST
- Confirm `subscriptionContractProductChange` and the billing-cycle skip/pause mutations are present and behave as expected in the API version targeted. Run them against a test contract before wiring the UI.
- **Submit the post-purchase extension live-store access request to Shopify NOW** (gated beta — long pole; build/test on dev meanwhile).
- For the portal-based upgrade only (v1.5 fallback): test what happens when a live monthly contract is moved to prepaid-quarterly — proration, immediate-charge behavior, prepaid cycle start. The post-purchase path avoids this, but verify before exposing the portal fallback.
