"use client";
import { useState } from "react";
import { CasinoDetailsContext } from "./display-context";

export function CasinoDisplayListWrapper({ children }) {
  const [showTerms, setShowTerms] = useState<string>("");

  return (
    <CasinoDetailsContext.Provider
      value={{ id: showTerms, setId: setShowTerms }}
    >
      {children}
    </CasinoDetailsContext.Provider>
  );
}
