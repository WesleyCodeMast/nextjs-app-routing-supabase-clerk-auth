"use client";
import { useContext } from "react";
import { CasinoDetailsContext } from "./display-context";

export function BonusItemTerms({
  open,
  close,
  selectorId,
}: {
  open: React.JSX.Element;
  close: React.JSX.Element;
  selectorId: string;
}) {
  const controller = useContext(CasinoDetailsContext);
  return (
    <div
      className="flex items-center cursor-pointer"
      onClick={() =>
        controller.setId((current) => (current != selectorId ? selectorId : ""))
      }
    >
      <p className="mr-2 select-none">Bonus Details </p>
      {controller.id === selectorId ? close : open}
    </div>
  );
}
