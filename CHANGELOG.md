# Changelog

All notable changes to the Sunfruit storefront are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-05-15

### Added
- New `/try` landing page — single-CTA, long-form conversion funnel for the `sunfruit-sample-pack` product. Designed to be the entry point for paid traffic: minimal header (no nav, no sign-in), legal-only footer, sticky mobile CTA, and 5+ in-flow CTAs all wired to the existing direct-to-checkout flow. One-time purchase only — no Recharge selling plan attached.
- **17-section long-form scroll** modeled on best-in-class DTC landing pages (Grüns vs. AG1, Magic Spoon, AG1 welcome kit). In order: hero with stat-anchored headline, 6-metric trust strip, emerald category-claim band ("the first daily organic beverage mix"), "what's in / what's not" wedge, mid-page CTA, 9 numbered reasons (long alternating-image scroll with an inline sodium bar-chart in reason #2), color-band flavor showcase (one band per flavor, swapped background hue), per-ingredient deep-dive card grid, 3-state comparison chart vs. Crystal Light and True Citrus, "Who Sunfruit is for" 4-persona grid, second mid-page CTA, full-bleed lifestyle pacing break, 6-card video-shaped testimonial grid with click-to-modal, 3 long-form "switched from…" reviews, expanded 10-question FAQ, and emerald closer with 0g/0mg/5-ingredient stat anchors.
- **Sodium spotlight** in reason #2: inline bar chart comparing Sunfruit (0mg) to Liquid I.V. (510mg), Gatorade (270mg), and the AHA daily limit (2,300mg). Sourced from the American Heart Association's published guidelines.
- **Comparison chart disclaimer** notes that competitor data is sourced from publicly available nutrition facts and should be verified before paid traffic.

### Notes
- All non-product imagery on `/try` is placeholder (existing repo assets reused, every section with an inline swap-point comment). Pre-paid-traffic checklist: hero bundle shot, per-ingredient close-ups, real customer UGC for the video grid, lifestyle break image, and final-CTA hero.
- Review count (2,300) and 5.0 rating are placeholders — swap for real numbers once the page is live.
- Competitor nutrition facts in the comparison chart (Crystal Light, True Citrus) reflect publicly available data; verify against current packaging before publication.
- Marketing copy uses "Ships today!" — FAQ clarifies the 5pm EST same-day cutoff.

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
