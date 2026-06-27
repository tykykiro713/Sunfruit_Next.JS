# 03 — Admin API: Subscription Contracts (Swap, Edit, Cancel, Billing Cycles)

> **🚫 RETIRED (Appstle).** This was the self-built server-side action layer for the native
> build — including the recurring-billing engine (`subscriptionBillingAttemptCreate` on a cron)
> whose risk/cost killed the native plan. **Appstle owns the contracts, the billing, and the
> skip/swap/pause/cancel actions.** We build none of this in v1. If a v2 SMS/AI agent or DIY
> portal ever needs programmatic contract control, it would use **Appstle's REST API** (paid
> add-on), not Shopify's Admin API. See `sunfruit-fit-and-decisions.md` §0/§B4. Content below
> kept for reference only.

**Purpose:** The server-side action layer. Powers flavor swap, the portal-based quarterly upgrade (fallback), the cancel-the-monthly step in the post-purchase flow, and any contract editing.

**API:** Admin GraphQL API. **Offline token, server-side ONLY.** Never expose to the client.

## Canonical docs
- **About subscription contracts** (revision_id, contract lifecycle)
  https://shopify.dev/docs/apps/build/purchase-options/subscriptions/contracts
- **Build a subscription contract** (create, draft, billing attempts)
  https://shopify.dev/docs/apps/build/purchase-options/subscriptions/contracts/build-a-subscription-contract
- **Update a subscription contract** (the swap guide)
  https://shopify.dev/docs/apps/build/purchase-options/subscriptions/contracts/update-a-subscription-contract
- **Manage billing cycle contracts** (per-cycle edits)
  https://shopify.dev/docs/apps/build/purchase-options/subscriptions/billing-cycles/manage-billing-cycle-contracts
- **Migrate subscription contracts** (atomic create, contracts without payment method)
  https://shopify.dev/docs/apps/build/purchase-options/subscriptions/migrate-to-subscriptions-api/migrate-subscription-contracts
- **Admin API Mutation reference** (full mutation list)
  https://shopify.dev/docs/api/admin-graphql/latest/objects/mutation

## The swap — flat SKUs are fully supported
- **Preferred:** `subscriptionContractProductChange` — swaps a specific product variant on a contract. Point the contract line at the target flavor's variant ID. Every flat SKU has a default variant ID, so swapping Raspberry Hibiscus → Pomegranate Rose is just changing the variant the line references.
- **Fallback (draft flow):**
  1. `subscriptionContractUpdate` (or `subscriptionBillingCycleContractEdit` for a specific cycle) → returns a draft with current state
  2. `subscriptionDraftLineRemove` (old line) + `subscriptionDraftLineAdd` (new variant)
  3. `subscriptionDraftCommit` (or `subscriptionBillingCycleContractDraftCommit`) → changes go live

## Key mutations (from the reference)
- `subscriptionContractCreate` / `subscriptionContractAtomicCreate` (one-call create)
- `subscriptionContractProductChange` — variant swap
- `subscriptionContractUpdate` — incremental edits via draft
- `subscriptionContractCancel` — **used for the cancel-the-monthly step** in post-purchase upgrade
- `subscriptionContractPause` / `subscriptionContractActivate`
- `subscriptionBillingCycleSkip` / `subscriptionBillingCycleUnskip`
- `subscriptionBillingCycleContractEdit` / `...DraftCommit` — per-cycle edits
- `subscriptionBillingCycleCharge` — charge a specific cycle (single successful charge per cycle; only past or within next 24h)
- `subscriptionBillingAttemptCreate` — billing attempt (requires `idempotencyKey`)

## Critical distinctions
- **Contract edit vs. order edit:** `subscriptionContract*` edits the recurring contract (future orders). To edit an ALREADY-PLACED order you'd use `orderEditBegin` — a separate surface that does NOT cover subscriptions. The Order Edits limitation does not block swap; swap is a contract operation.
- `subscriptionContractCreate` does not affect fulfillments already paid for.
- `revision_id` (incremental, not continuous) tells you whether your record of a contract is current — use it to dedupe webhook ordering.

## The portal-based quarterly upgrade (FALLBACK only — see 04 for primary)
Moving a LIVE monthly contract to quarterly-prepaid is a mid-contract billing-policy change + prepaid collection. This is the fiddly path. **VERIFY before exposing:** proration behavior, whether it fires an immediate charge, when the prepaid cycle starts. Test against a sandbox contract. The post-purchase path (`04`) avoids all of this by creating the quarterly contract fresh.

## Action-layer interface (so v2 agent reuses)
- Input shape: `{ customerId, contractId, action, params }`
- Idempotency key on every mutation (prevents duplicate charges on retry)
- Authorization check: confirm the authenticated customer owns the contract
- Structured result (success/failure + reason)
- Confirm-then-act on cancel and anything money-moving
