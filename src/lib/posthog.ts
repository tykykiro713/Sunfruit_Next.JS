// Client-only PostHog wrapper.
//
// posthog-js is dynamically imported so it stays OUT of the initial bundle
// (loaded after hydration, off the critical path — perf is priority #1 here).
// The rest of the app talks to PostHog through the tiny synchronous helpers
// below, which safely no-op until the SDK has finished loading. All entry
// points guard on `window`, so this module is safe to import from anywhere
// (including code that also runs on the server).

import type { PostHog } from "posthog-js";

let instance: PostHog | null = null;
let loading: Promise<PostHog | null> | null = null;

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

/**
 * Load + initialize PostHog once. Idempotent and safe to call repeatedly.
 * Resolves to the instance, or null if we're on the server / the key is unset /
 * the SDK failed to load.
 */
export async function initPostHog(): Promise<PostHog | null> {
  if (typeof window === "undefined") return null;
  if (instance) return instance;
  if (loading) return loading;

  if (!KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[posthog] NEXT_PUBLIC_POSTHOG_KEY not set — analytics disabled",
      );
    }
    return null;
  }

  loading = import("posthog-js")
    .then(({ default: posthog }) => {
      posthog.init(KEY, {
        // Same-origin reverse proxy (see rewrites in next.config.js) so
        // ad-blockers / ITP don't silently drop events on consumer traffic.
        api_host: "/ingest",
        // Where the toolbar / "view in PostHog" links point.
        ui_host: "https://us.posthog.com",
        // SPA-aware pageviews: the App Router navigates via the History API,
        // which this mode hooks — captures the initial load and every route
        // change without a manual useEffect.
        capture_pageview: "history_change",
        // Needed for bounce rate + session duration.
        capture_pageleave: true,
        // Clicks / inputs / form submits tracked with no code.
        autocapture: true,
        // Session replay ON. Must ALSO be enabled in PostHog project settings
        // (Settings → Replay → "Record user sessions") — the SDK stays silent
        // otherwise. Inputs are masked so customer PII (emails, names, and
        // addresses on /account) never lands in a recording. Checkout runs on
        // Shopify's hosted domain, off this origin, so card fields are never in
        // scope here regardless.
        disable_session_recording: false,
        session_recording: {
          maskAllInputs: true,
        },
        // Anonymous events are still captured for funnels; we just don't mint a
        // person profile until someone is identified (lower cost / less noise).
        person_profiles: "identified_only",
      });
      instance = posthog;
      return posthog;
    })
    .catch((err) => {
      console.error("[posthog] failed to load:", err);
      return null;
    });

  return loading;
}

/** The live instance, or null if PostHog hasn't loaded yet. */
export function getPostHog(): PostHog | null {
  return instance;
}

/** Fire-and-forget event capture. No-ops until the SDK is ready. */
export function posthogCapture(
  event: string,
  properties?: Record<string, unknown>,
) {
  instance?.capture(event, properties);
}

/** Tie subsequent events to a known customer. Call on login. */
export function posthogIdentify(
  distinctId: string,
  properties?: Record<string, unknown>,
) {
  instance?.identify(distinctId, properties);
}

/** Drop the current identity so the next session is a fresh anonymous user.
 *  Call on logout. */
export function posthogReset() {
  instance?.reset();
}
