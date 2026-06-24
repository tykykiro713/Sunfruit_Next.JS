# Shopify Subscriptions — Integration Docs

Reference docs for migrating subscriptions from **Recharge → native Shopify subscriptions**.

Decision recorded 2026-06-24: Recharge is being removed from the tech stack. See the
migration section in [`TODO.md`](../../../TODO.md) for status and risks.

## Docs in this folder

**Start with `sunfruit-fit-and-decisions.md`** — Sunfruit-specific reality, decisions, and
where they override the generic reference docs below. Then `...-00-index.md` for the
three-API model and build order.

| Doc | Purpose |
| --- | --- |
| `sunfruit-fit-and-decisions.md` | **Sunfruit decisions + corrections to the reference docs — read first** |
| `sunfruit-subscription-portal-handoff.md` | Project handoff — the build plan these references support |
| `shopify-headless-subscriptions-00-index.md` | Reference index + the three-API architecture model |
| `shopify-headless-subscriptions-01-storefront-pdp-cart.md` | Selling plans on PDP, cart with subscription line |
| `shopify-headless-subscriptions-02-customer-account-api-auth-portal.md` | OAuth/PKCE auth + portal actions (cancel/skip/pause) |
| `shopify-headless-subscriptions-03-admin-api-contracts.md` | Contract create/edit/swap/cancel, billing cycles (server-side) |
| `shopify-headless-subscriptions-04-post-purchase-upsell.md` | Post-purchase quarterly upgrade extension |
| `shopify-headless-subscriptions-05-selling-plans-config.md` | Selling plan groups: monthly + quarterly-prepaid |
| `shopify-headless-subscriptions-06-headless-channel-setup.md` | Headless channel, tokens, scopes, client types |

**Build order** (per the index): `05` selling plans → `06` channel/tokens → `01` PDP/cart →
`02` portal auth → `03` Admin contract routes → `04` post-purchase upsell.

## Related

- Current (Recharge) integration, now legacy: `RECHARGE_*.md` and
  `Recharge_complete_integration_guide.md` at the repo root — to be archived/removed
  once the migration lands.
- Live code still on Recharge: `src/lib/recharge/`, `RechargeSDKProvider.tsx`,
  `@rechargeapps/storefront-client`.
