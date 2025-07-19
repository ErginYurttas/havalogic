"use client";

import React, { createContext, useState, ReactNode } from "react";

interface MyContextType {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export const MyContext = createContext<MyContextType | undefined>(undefined);

export default function MyContextProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState("Merhaba");

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
}
