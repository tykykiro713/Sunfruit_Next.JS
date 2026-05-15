# Sunfruit Storefront

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

Sunfruit storefront — live DTC store with real customers and real subscription revenue.

- **Frontend:** Next.js 16 (App Router)
- **Commerce backend:** Shopify Storefront API (hosted — not editable from this repo)
- **Subscriptions:** Recharge
- **Hosting/deploy:** Vercel (preview deploy per branch, production on main)

## Guardrails

This is production with paid traffic. Treat every change as revenue-affecting.

- Always work on a branch. Never commit directly to main, never auto-merge a PR.
- A human reviews and merges every PR. Agents open PRs; they do not land them.
- Never edit Recharge selling-plan IDs without explicitly flagging it first — these are load-bearing and tied to live subscriptions.
- Do not attempt to modify Shopify configuration; it is not in this repo. Only the Next.js integration layer is in scope.
- Cart, checkout, and subscription flows are the highest-risk paths — extra review and QA on any change touching them.

## QA

- `/qa` and `/qa-only` run against the branch's Vercel preview URL, not localhost.
- Always exercise cart and subscription (Recharge) flows when QAing changes near them.

## Known landmines

Pre-existing debt in this repo — be aware, flag if a change touches them:

- Hardcoded Recharge selling-plan IDs go stale; a refactor is on the TODO.
- `fetchPolicy: 'no-cache'` on product detail pages — performance debt.
- Product recirculation filters are fragile.
