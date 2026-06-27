# 06 — Headless Channel Setup (Tokens, Scopes, Client Types)

> **🚫 MOSTLY RETIRED (Appstle).** The only part that still applies: the **Storefront API
> public token with `unauthenticated_read_selling_plans`** (so the PDP can read native selling
> plans) — which the storefront **already has**. The Admin offline token and Customer Account
> API client described below are **not needed** (Appstle owns contracts + the portal). See
> `sunfruit-fit-and-decisions.md` §C/§D. Content below kept for reference only.

**Purpose:** The plumbing. Install the Headless channel, get your tokens, set the right scopes, and configure the Customer Account API client. Do this before wiring any API calls.

## Canonical docs
- **Bring your own headless stack** (install channel, tokens, storefront mgmt)
  https://shopify.dev/docs/storefronts/headless/bring-your-own-stack
- **Building with the Storefront API** (Headless channel, token rotation)
  https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/index
- **Customer Account API getting started** (client type config, endpoints)
  https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/getting-started

## Setup steps
1. **Install the Headless channel** from the Shopify App Store. Single place to manage API access for all client apps. (Alternatively Hydrogen channel if using Hydrogen — you're on Next.js, so Headless channel.)
2. **Storefronts** — each storefront in the channel gets its own Storefront API tokens (public + private). All storefronts in the channel share the same API permissions.
3. **Storefront API tokens:**
   - Public token (`X-Shopify-Storefront-Access-Token`) — client-safe, for product/cart reads.
   - Private token — server-side, rotatable in the channel.
   - Scope needed for subs: `unauthenticated_read_selling_plans`.
4. **Customer Account API config** — Headless → your storefront → Customer Account API settings:
   - Client type: **Confidential** (you have a Next.js backend — see `02`).
   - Record Authorization / Token / Logout endpoints.
   - Callback URL(s): HTTPS for web.
   - JavaScript origins (for web public clients).
   - Client ID + Client Secret (confidential).
5. **Admin API** (separate) — offline access token for the server-side contract action layer (`03`). Scopes for managing subscriptions. Keep server-side only.

## Token hygiene (handoff guardrail)
- All tokens in env / gitignored. Never commit or log.
- Admin offline token + Customer Account client_secret = server-side only.
- Storefront public token is the only client-exposed credential.
- Deleting a storefront in the channel revokes its tokens — update clients first.

## Three tokens, three jobs (quick map)
| Token | Where | Powers |
|---|---|---|
| Storefront public | client | PDP, cart, selling plan reads |
| Customer Account (OAuth) | server session | portal auth + cancel/skip/pause |
| Admin offline | server only | swap, contract edits, cancel-the-monthly |
