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

interface Window {
  requestIdleCallback(callback: (deadline: IdleDeadline) => void, options?: IdleRequestOptions): number;
  cancelIdleCallback(id: number): void;
}

// You can add other global type declarations here as needed in the future
// For example:
// - Third-party library types that don't have proper declarations
// - Global variables injected by scripts
// - Custom window properties