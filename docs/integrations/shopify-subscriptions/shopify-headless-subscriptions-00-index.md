# Shopify Headless Subscriptions — Reference Index

Companion reference set for `sunfruit-subscription-portal-handoff.md`. These are the canonical Shopify dev docs for everything in the handoff, organized by build phase. All links verified against shopify.dev as of June 2026.

**The three-API model (memorize this — it's the whole architecture):**
- **Storefront API** — public token. Reads products + selling plans, builds the cart, hands off to checkout. Powers the PDP subscribe toggle.
- **Customer Account API** — customer-authenticated (OAuth/PKCE). Powers the portal: cancel / skip / pause. Customer-scoped actions only.
- **Admin API** — offline token, server-side ONLY. Powers swap + contract edits (`subscriptionContractProductChange`, draft flow, cancel). Never client-side.

The split that trips people up: a customer-initiated **swap** is an *Admin API* operation. The customer calls your Next.js backend route; the route holds the offline token and runs the Admin mutation. That is the correct pattern, not a workaround.

## Files in this set
- `01-storefront-pdp-cart.md` — selling plans on PDP, cart with subscription line (the toggle you've built)
- `02-customer-account-api-auth-portal.md` — OAuth/PKCE auth + portal actions (cancel/skip/pause)
- `03-admin-api-contracts.md` — contract create/edit/swap/cancel, billing cycles (swap + quarterly)
- `04-post-purchase-upsell.md` — post-purchase quarterly upgrade extension (v1.5)
- `05-selling-plans-config.md` — selling plan groups: monthly + quarterly-prepaid-ship-monthly
- `06-headless-channel-setup.md` — Headless channel, tokens, scopes, client types

## Build order (maps to handoff)
1. Selling plan config (`05`) — prerequisite for everything
2. Headless channel + tokens (`06`)
3. Storefront PDP/cart (`01`) — mostly done
4. Customer Account API auth + portal (`02`)
5. Admin API contract routes (`03`) — the shared action layer
6. Post-purchase upsell (`04`) — submit beta access request NOW, build on dev

## A note on "OpenClaw"
Earlier in our planning the term "OpenClaw" came up for the v2 SMS/AI agent. I could not verify an established product/framework by that name in Shopify's docs — it appears only in third-party blog content, not Shopify's own developer documentation. Before the handoff's v2 leans on it, confirm what it actually is and whether it's the right orchestrator. The v2 agent pattern in the handoff holds regardless of which tool runs it — the agent consumes the same Admin API action-layer routes built in `03`.
