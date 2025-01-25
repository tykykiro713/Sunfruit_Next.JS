"use client";

import { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface MyContextType {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context
const MyContext = createContext<MyContextType | null>(null);

// Provider Component
export const MyProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState("Default value");

  if (!MyContext) {
    throw new Error("MyContext must be initialized");
  }

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
