const isDev = process.env.NODE_ENV !== "production";

export const debugLog = (...args: unknown[]): void => {
  if (isDev) {
    console.log(...args);
  }
};
