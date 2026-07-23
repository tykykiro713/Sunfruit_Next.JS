"use client";

import { useEffect } from "react";
import { initPostHog } from "@/lib/posthog";

/**
 * Loads + initializes PostHog after hydration, off the critical path.
 *
 * Unlike Zendesk/Klaviyo (interaction-gated in ClientProviders), this
 * fires on mount via requestIdleCallback: product analytics is far less useful
 * if it only starts after the user clicks something — we'd miss pageviews,
 * bounces, and the top of every funnel. Idle scheduling keeps it off the
 * initial render while still catching the first navigation.
 *
 * Renders nothing. Pageviews are captured automatically by the SDK
 * (capture_pageview: "history_change"), so there's no pageview component here.
 */
export default function PostHogProvider() {
  useEffect(() => {
    const start = () => {
      initPostHog();
    };

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start);
      return () => window.cancelIdleCallback(id);
    }

    const t = setTimeout(start, 1);
    return () => clearTimeout(t);
  }, []);

  return null;
}
