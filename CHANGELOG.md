# Changelog

All notable changes to the Sunfruit storefront are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
