// src/types/global.d.ts
// Global type declarations for the Sunfruit e-commerce project

// RequestIdleCallback API types (not included in TypeScript by default)
interface IdleDeadline {
  readonly didTimeout: boolean;
  timeRemaining(): number;
}

interface IdleRequestOptions {
  timeout?: number;
}

// Zendesk types
declare global {
  interface Window {
    // RequestIdleCallback
    requestIdleCallback(callback: (deadline: IdleDeadline) => void, options?: IdleRequestOptions): number;
    cancelIdleCallback(id: number): void;
    
    // Zendesk
    openZendeskChat?: () => Promise<boolean> | void;
    loadZendeskNow?: () => Promise<boolean>;
    zE?: any;
    zESettings?: any;
    $zopim?: any;
    _zEACLoaded?: boolean;
    
    // Analytics
    gtag?: (
      command: "config" | "event" | "set",
      targetId: string,
      config?: Record<string, any>
    ) => void;
    dataLayer?: any[];
    
    // Klaviyo
    klaviyo?: any;
    _klOnsite?: any;
  }
}

export {};