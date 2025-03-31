"use client";
import { useContext } from "react";
import { CasinoDetailsContext } from "./display-context";

export function BonusItemTermsDisplay({ selectorId, children }) {
  const controller = useContext(CasinoDetailsContext);
  return selectorId === controller.id ? children : null;
}
