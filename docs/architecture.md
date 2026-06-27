# Architecture & Conventions

Reference for performance, design, and Next.js conventions on the Sunfruit storefront.
Loaded on demand — the always-on agent context lives in [`CLAUDE.md`](../CLAUDE.md).

> Stack, guardrails, QA process, and known landmines are documented in `CLAUDE.md`,
> not here. Current work and backlog live in `TODO.md`; shipped changes in `CHANGELOG.md`.

## Performance & Core Web Vitals

Performance is priority #1 — the store runs on paid traffic, so loading speed is a
direct conversion lever.

Targets:
- **LCP** < 2.5s
- **CLS** < 0.1
- **INP** < 200ms

### Image loading strategy
- **Above the fold (LCP elements):** `priority={true}` — e.g. the `VideoCTA` poster image.
- **Below the fold:** `loading="lazy"`, with `placeholder="blur"` where a blur source exists.
- **Hero on mobile:** prefer a static image over video where it improves LCP.
- **Responsive:** serve separate mobile/desktop images when file sizes differ significantly
  (e.g. `SampleCTA`).
- Always set `width`, `height`, and `alt` on `next/image` to avoid layout shift.

### Video loading strategy
- **Above the fold:** Intersection Observer for controlled loading.
- **Below the fold:** simple lazy loading with `preload="none"`.
- **Mobile:** provide mobile-optimized video files.
- Always include a poster image as a fallback.

### Third-party script loading (orchestrated in `ClientProviders.tsx`)
Scripts load on interaction or a delay timer, not eagerly, to protect LCP:
- **Google Analytics / Ads:** load immediately (needed for pageview tracking).
- **Clarity:** on general interaction (mousemove/keydown) or after 5s.
- **Zendesk:** on interaction (click/scroll/touch) or after 10s.
- **Klaviyo:** on e-commerce actions (add to cart, out of stock) or after 15s.

Pattern: dynamic imports with interaction-based or delayed loading.

Also in place: preconnect headers for critical domains (Shopify CDN).

## Design

- Clean, minimal UI. Primary brand color is emerald green **`#004E36`**.
- Maintain WCAG 2.1 AA contrast.
- Responsive across all viewports; performance-first and conversion-focused.

## Next.js conventions (App Router, Next 16 / React 19)

### `params` and `searchParams` are async
They are Promises and must be awaited — getting this wrong breaks the build.

```tsx
// ✅ correct
export default async function Page({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  return <div>{handle}</div>;
}
```

### Don't redeclare global TypeScript interfaces in components
Globals (e.g. `Window._klOnsite`) are declared once in `src/types/global.d.ts`.
Use `window._klOnsite` directly in components — redeclaring the `Window` interface
locally causes type errors.

## Conventions

- camelCase component names, kebab-case file names (match the existing file you're editing).
- Escape apostrophes in JSX to avoid lint errors.
- Prefer complete components over snippets; preserve existing features when editing.
