# 02 — Customer Account API: Auth + Portal (Cancel/Skip/Pause)

> **🚫 RETIRED (Appstle).** This was the native portal's customer auth. **Appstle's hosted
> portal authenticates customers itself** (passwordless magic link in subscription emails, or
> Shopify customer accounts) and runs cancel/skip/pause/swap — so we do **not** adopt the
> Customer Account API for subscriptions. The localStorage-token cleanup it would have brought
> is now an *independent* security item. See `sunfruit-fit-and-decisions.md` §C. Content below
> kept for reference only (e.g. if we ever build a DIY portal).

**Purpose:** Authenticate the customer (OAuth 2.0 + PKCE) and power the self-service portal actions that are customer-scoped: cancel, skip, pause/resume.

**API:** Customer Account API (GraphQL only). Customer-authenticated. Releases quarterly like other Shopify APIs.

## Canonical docs
- **Building with the Customer Account API** (index)
  https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api
- **Getting started** (enable customer accounts, configure client type, endpoints)
  https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/getting-started
- **API reference** (auth flow: discovery, authorize, token, refresh, logout)
  https://shopify.dev/docs/api/customer/latest
- **SubscriptionContract object** (Customer API)
  https://shopify.dev/docs/api/customer/latest/objects/subscriptioncontract
- **Market-aware auth URLs** (locale / region_country)
  https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/market-aware-auth-urls
- **Checkout authentication** (stay authed storefront → checkout)
  https://shopify.dev/docs/storefronts/headless/building-with-the-customer-account-api/checkout-authentication

## Client type — pick CONFIDENTIAL for Sunfruit
The docs offer Public / Web / Mobile / Confidential. Since you have a Next.js backend with a server-side session to hold the refresh token safely, use **Confidential**. This keeps `client_secret` server-side and is the more secure choice than the public/PKCE-only SPA path.

## Auth flow (from the reference)
1. **Discovery** — `GET /.well-known/openid-configuration` and `GET /.well-known/customer-account-api`. Do NOT hardcode endpoints; discover them. Returns authorization/token/logout endpoints and the GraphQL API URL (version already included).
2. **Authorization request** — redirect to `authorization_endpoint` with `scope=openid email customer-account-api:full`, `client_id`, `response_type=code`, `redirect_uri`, `state` (CSRF), `nonce` (replay protection). Public clients also send `code_challenge` + `code_challenge_method=S256`.
3. **Token exchange** — POST to `token_endpoint` with `grant_type=authorization_code`. Confidential clients send the Basic auth header (base64 `client_id:client_secret`). Returns `access_token`, `refresh_token`, `id_token`, `expires_in`.
4. **Refresh** — POST `grant_type=refresh_token` before `expires_in` lapses.
5. **Logout** — redirect to `end_session_endpoint` with `id_token_hint` + `post_logout_redirect_uri`.

## Setup in Shopify admin
- Sales channels → Headless (or Hydrogen) → select storefront → Customer Account API settings.
- Record Authorization / Token / Logout endpoints.
- Set Callback URLs (HTTPS for web), JavaScript origins, optional Logout URL.
- Customer accounts must be enabled (required for the API). Enables passwordless login + single sign-on across storefront and checkout.

## Portal actions (customer-authenticated)
- **Cancel** — subscription contract cancel
- **Skip / unskip** — `subscriptionBillingCycleSkip` / unskip
- **Pause / resume** — `subscriptionContractPause`

## Practical notes
- Rate limits: 7500 cost points per store+customer; most fields 1 pt, most mutations 10 pts. Replenishes 100–200 pts/sec by plan.
- Pagination is cursor-based (same pattern as Storefront API).
- Store tokens in an httpOnly server session — NEVER localStorage.
- **Swap is NOT here** — swapping a product is an Admin API operation (see `03`). The Customer Account API handles cancel/skip/pause; the swap route lives server-side.
