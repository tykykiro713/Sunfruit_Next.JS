# Sunfruit E-commerce TODO List

## 🔴 Major Migration: Recharge → Native Shopify Subscriptions

**Decision (2026-06-24):** Recharge removed from the tech stack. Replace with native Shopify subscriptions (selling plans managed in Shopify).

- [ ] Integrate native Shopify subscriptions to replace Recharge
- [ ] Reference: seven Shopify integration docs in `docs/integrations/shopify-subscriptions/`
- [ ] ⚠️ Live subscription revenue runs through Recharge today — highest-risk path (cart/checkout/subscription). Plan migration of existing subscribers before flipping anything.
- [ ] This **supersedes** the Recharge selling-plan refactor below — the hardcoded selling-plan-ID work is moot if migrating off Recharge entirely. Confirm direction before investing in it.
- [ ] Retire `src/lib/recharge/`, `RechargeSDKProvider.tsx`, and the selling-plan IDs in `src/lib/recharge/types.ts` (load-bearing — tied to live subs).
- [ ] Remove the `@rechargeapps/storefront-client` dependency once migrated.
- [ ] Archive/remove legacy Recharge docs at repo root (`RECHARGE_IMPLEMENTATION_PLAN.md`, `RECHARGE_TECHNICAL_INTEGRATION.md`, `Recharge_complete_integration_guide.md`) once the migration lands.
- [ ] Update CLAUDE.md stack context + landmines once the cutover is complete (currently still documents Recharge as live, which is accurate until then).

## Post-Deploy Follow-Ups (feature/new-product-layout)

### Recharge subscription plan robustness
- [ ] Refactor `src/lib/recharge/subscription-options.ts` to find the monthly plan from the product's actual `sellingPlanGroups` by attribute (cadence + discount) instead of looking up hardcoded IDs in `src/lib/recharge/types.ts`
- [ ] Reason: hardcoded IDs in `SELLING_PLAN_IDS` are stale (e.g. LEMON_MINT `7288389839` doesn't exist on the live store anymore — current ID is `7394689231`). Fallback path works but emits warnings on every PDP load
- [ ] Pomegranate Rose has no entry in `SELLING_PLAN_IDS` — falls through to the LEMON_MINT default
- [ ] New 48-pack products (LM/RH/PR) have no entries either — will hit the fallback for every subscription on the new 3-card layout

### Performance / robustness debts from new-layout branch
- [ ] `fetchProductByHandle` uses `fetchPolicy: 'no-cache'` (`src/lib/shopify.ts`) — bypasses Apollo cache on every PDP load. Reconsider `cache-and-network` or short TTL to protect Core Web Vitals under paid traffic
- [ ] `ProductRecirculation` filters by `handle.includes('24')` — fragile. Switch to SKU suffix `-24PK` or tag-based filter
- [ ] V2 form path orphaned: `EnhancedProductFormV2`, `SizeSelector2Cards`, `SubscriptionMonthly3MonthCards` retained for A/B but no caller wires `useNewLayout=true` on `ProductInfoWithSubscription`. Decide whether to wire up or delete

### Pre-existing console.log noise (pre-dates this branch)
- [x] `LoginForm.tsx`, `RegisterForm.tsx` — 8 + 8 debug logs in auth flow → gated behind `debugLog` (`src/lib/debugLog.ts`), silent in prod
- [x] `CustomerContext.tsx` — 30 debug logs across login/register/reset/update flows → gated behind `debugLog`, `console.error` calls preserved
- [x] `ClientProviders.tsx`, `ZendeskLauncher.tsx`, `ZendeskButton.tsx` — third-party script load logs → removed; `console.error`/`console.warn` calls preserved as real failure signals
- [ ] `RechargeSDKProvider.tsx`, `src/lib/recharge/config.ts` — SDK init logs (DEFERRED — will go with the Recharge refactor above)
- [ ] `src/lib/recharge/subscription-options.ts` — selling plan debug logs (DEFERRED — will go with the Recharge refactor above)
- [x] `UnsplashImage.tsx`, `VideoCTA.tsx`, `HeroVideoV2.tsx` — misc logs → removed
- [x] Updated stale "Phase 1 complete" claim in the Completed section

## High Priority Features

### 1. Full Order Details Implementation
- [ ] Add `getCustomerOrder(accessToken, orderId)` function to `src/lib/shopify.ts`
- [ ] Create proper GraphQL query for single order with full details
- [ ] Implement order detail page with:
  - [ ] Order timeline (placed, processing, shipped, delivered)
  - [ ] Shipping address and tracking information
  - [ ] Detailed line items with images
  - [ ] Payment and billing information
  - [ ] Reorder functionality
- [ ] Add proper error handling for orders not found
- [ ] Test with various order statuses

### 2. Performance Optimizations (Phase 3)
- [ ] Add React.memo to ProductList items
- [ ] Implement useCallback in CartContext for all functions
- [ ] Implement useCallback in CustomerContext for all functions
- [ ] Add debouncing to window resize handlers in VideoCTA.tsx and OptimizedImage.tsx
- [ ] Implement product caching in Navigation.tsx using sessionStorage
- [ ] Add useMemo for expensive calculations in ProductList.tsx

### 3. TypeScript Improvements
- [ ] Replace all `any` types with proper interfaces
- [ ] Create CustomerAddressInput interface
- [ ] Create CustomerInfoInput interface
- [ ] Create proper ErrorWithMessage interface
- [ ] Add proper typing for third-party services (Klaviyo, Zendesk, etc.)
- [ ] Remove remaining @ts-expect-error comments

### 4. Error Handling & UX
- [ ] Add error boundaries around context providers
- [ ] Implement proper loading states for all async operations
- [ ] Add user-friendly error messages instead of console.error
- [ ] Implement retry mechanisms for failed API calls
- [ ] Add offline detection and handling

### 5. Security Improvements
- [ ] Move authentication tokens from localStorage to httpOnly cookies
- [ ] Implement proper token refresh mechanism
- [ ] Add rate limiting for API calls
- [ ] Remove any remaining sensitive data logging

## Medium Priority Features

### 6. Enhanced Customer Experience
- [ ] Add order search functionality
- [ ] Implement order filtering (by status, date range)
- [ ] Add customer reviews and ratings
- [ ] Implement wishlist functionality
- [ ] Add recently viewed products

### 7. Mobile Optimization
- [ ] Optimize mobile checkout flow
- [ ] Add mobile-specific video optimization
- [ ] Implement touch gestures for product galleries
- [ ] Add mobile app installation prompts

### 8. Analytics & Tracking
- [ ] Implement enhanced e-commerce tracking
- [ ] Add conversion funnel analysis
- [ ] Implement A/B testing framework
- [ ] Add performance monitoring

## Low Priority Features

### 9. Admin Features
- [ ] Add inventory management notifications
- [ ] Implement customer service chat integration
- [ ] Add product recommendation engine
- [ ] Implement automated email campaigns

### 10. Code Quality
- [ ] Add comprehensive unit tests
- [ ] Implement integration tests
- [ ] Add component documentation
- [ ] Set up automated accessibility testing

## Completed ✅
- [x] Remove all console.log statements (Phase 1) — partial; finished in chore/console-log-cleanup branch (auth flow gated behind `debugLog`, third-party + misc removed, Recharge SDK logs deferred to Recharge refactor)
- [x] Fix tsconfig.json includes path (Phase 1)
- [x] Add typecheck script to package.json (Phase 1)
- [x] Remove unused critters dependency (Phase 1)
- [x] Fix client component dynamic routes in reset password page (Phase 2)
- [x] Fix duplicate order page with immediate placeholder (Phase 2)

---

## Notes
- This TODO list is stored in your project and tracked in Git
- Items can be moved to GitHub Issues for better project management
- Priority levels can be adjusted based on business needs
- Consider creating epic stories for larger features like Order Details Implementation