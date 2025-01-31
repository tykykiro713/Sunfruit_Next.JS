"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { usePathname } from "next/navigation";

// Define gtag function type
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "set",
      targetId: string,
      config?: {
        page_path?: string;
        [key: string]: any;
      }
    ) => void;
  }
}

interface MyContextType {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const MyContext = createContext<MyContextType | null>(null);

// GA4 Pageview Tracking Function
const trackPageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string, {
      page_path: url,
    });
  }
};

// Provider Component
export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState("Default value");
  const pathname = usePathname(); // Get current route

  useEffect(() => {
    if (pathname) {
      trackPageview(pathname);
    }
  }, [pathname]);

  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom Hook for Context
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyProvider");
  }
  return context;
};