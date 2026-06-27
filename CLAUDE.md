# Sunfruit Storefront

## Communication style (override default verbosity)

Talk to Tyson like an ER doctor briefing a colleague. Lead with the answer.

- **Bottom line first.** Headline + your recommendation, then supporting detail only if needed.
- **Bullets, not paragraphs.** No throat-clearing, no recaps of what was asked, no closing summaries.
- **Cut commentary.** State facts and the call. Don't explain your reasoning unless asked or it changes the decision.
- **Flag uncertainty in a word** ("unverified," "assume"), don't write a paragraph hedging.
- Keep mission-critical info; drop everything else. Shorter is better.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore

## Stack context

Sunfruit storefront — live DTC store with real customers and paid traffic (one-time
purchase revenue). **No subscribers yet — subscriptions are prelaunch**, so the
Recharge → Appstle migration has no live subscriber base to migrate.

- **Frontend:** Next.js 16 (App Router)
- **Commerce backend:** Shopify Storefront API (hosted — not editable from this repo)
- **Subscriptions:** Recharge (live) — **migrating to Appstle Subscriptions.** Native Shopify subscriptions were scoped then abandoned (would have required building our own billing engine). Scope/decisions: `docs/integrations/appstle-subscriptions/` (start with `sunfruit-fit-and-decisions.md`).
- **Hosting/deploy:** Vercel (preview deploy per branch, production on main)

## Guardrails

This is production with paid traffic. Treat every change as revenue-affecting.

- Always work on a branch. Never commit directly to main, never auto-merge a PR.
- A human reviews and merges every PR. Agents open PRs; they do not land them.
- Never edit Recharge selling-plan IDs without explicitly flagging it first — they are load-bearing in the live subscribe/checkout flow (no subscribers yet, but the purchase path is live).
- Do not attempt to modify Shopify configuration; it is not in this repo. Only the Next.js integration layer is in scope.
- Cart, checkout, and subscription flows are the highest-risk paths — extra review and QA on any change touching them.

## QA

- `/qa` and `/qa-only` run against the branch's Vercel preview URL, not localhost.
- Always exercise cart and subscription (Recharge) flows when QAing changes near them.

## Conventions

Performance, image/video/script-loading strategy, design tokens, and Next.js conventions are in [`docs/architecture.md`](docs/architecture.md). Backlog lives in `TODO.md`; shipped changes in `CHANGELOG.md`.

## Known landmines

Pre-existing debt in this repo — be aware, flag if a change touches them:

- **Stale Recharge selling-plan IDs.** `SELLING_PLAN_IDS` in `src/lib/recharge/types.ts` holds hardcoded IDs that are going stale (e.g. LEMON_MINT `7288389839` no longer exists on the live store). Pomegranate Rose and the new 48-pack products have no entries and hit the fallback path. A refactor of `src/lib/recharge/subscription-options.ts` to resolve plans from the product's actual `sellingPlanGroups` is on the TODO. Touch this area carefully.
- **No-cache on PDPs.** `fetchProductByHandle` in `src/lib/shopify.ts` uses `fetchPolicy: 'no-cache'` — bypasses the Apollo cache on every product page load. Performance risk under paid traffic.
- **Fragile recirculation filter.** `ProductRecirculation` filters by `handle.includes('24')` — brittle. A SKU-suffix or tag-based filter is the intended fix.
- **Orphaned V2 form path.** `EnhancedProductFormV2`, `SizeSelector2Cards`, `SubscriptionMonthly3MonthCards` are retained for A/B testing but nothing wires `useNewLayout=true`. Decide to wire up or delete — don't assume it's dead code.
- **Auth tokens in localStorage.** Authentication tokens are stored in `localStorage` rather than httpOnly cookies — a known security item on the TODO.
- **Console.log noise.** Debug logs remain across auth flows (`LoginForm.tsx`, `RegisterForm.tsx`, `CustomerContext.tsx`), Recharge SDK init, and misc components — despite the TODO claiming Phase 1 cleanup was done. It wasn't.
