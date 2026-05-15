# Changelog

All notable changes to the Sunfruit storefront are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-05-15

### Added
- New `/try` landing page — single-CTA, long-format conversion funnel for the `sunfruit-sample-pack` product. Hero, how-it-works, flavor showcase, why-Sunfruit, reviews + UGC strip, FAQ, closer, and sticky mobile CTA. Logo-only header (no nav, no sign-in) and legal-links-only footer to remove leak points.
- 5 in-flow CTAs + 1 sticky mobile CTA, all wired to the existing direct-to-checkout flow (`createCart → addToCart → window.location.href = checkoutUrl`). One-time purchase only — no Recharge selling plan attached.
- Marketing copy is "Try samples for free. Just pay $5 shipping." with "Ships today!" microcopy; FAQ explains the 5pm EST same-day shipping cutoff.

### Notes
- All non-product imagery on `/try` is placeholder (existing repo assets reused with inline swap-point comments). Final hero bundle shot, sachet-only flavor photography, and customer UGC tiles should be swapped in before the page goes into paid traffic.
- Star rating shows 5.0 with a placeholder review count of 2,300 — replace with real numbers once the page is live.

## [0.1.2] - 2026-05-15

### Changed
- Product detail pages now show two purchase options instead of three: Sample and 1 Tin (24-pack). The 2 Tin (48-pack) tile was removed to simplify the discovery decision (Phase 1 of launch offer stack — Hick's Law cleanup).
- Buyers who want 48 sticks can add the 24-pack to cart and increase the quantity. The 48-pack product itself remains live in Shopify and stays accessible to existing subscribers via the account portal.

## [0.1.1] - 2026-05-14

### Added
- `src/lib/debugLog.ts` — small helper that logs in development and no-ops in production. Used to gate auth-flow debug logs.

### Changed
- Auth-flow debug logs (`LoginForm.tsx`, `RegisterForm.tsx`, `CustomerContext.tsx`) routed through `debugLog`. They still print in development; in production builds they tree-shake away. `console.error` calls preserved as real failure signals.

### Removed
- Cosmetic `console.log` calls in `ClientProviders.tsx`, `ZendeskLauncher.tsx`, `ZendeskButton.tsx`, `UnsplashImage.tsx`, `VideoCTA.tsx`, `HeroVideoV2.tsx`. `console.error` and `console.warn` calls preserved so real failures still surface.
- Dead `useEffect` in `UnsplashImage.tsx` whose only behavior was a placeholder log.

### Fixed
- Production console no longer leaks customer access tokens or email addresses through the auth-flow debug logs (previously printed to the browser console on every login, register, and password reset).
