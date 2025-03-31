"use client";
import { useState } from "react";
export function BonusItemTerms({
  bonusTerms,
  open,
  close,
}: {
  bonusTerms: string;
  open: React.JSX.Element;
  close: React.JSX.Element;
}) {
  const [showTerms, setShowTerms] = useState<boolean>(false);
  return (
    <div>
      <div
        className="flex justify-center items-center select-none cursor-pointer"
        onClick={() => setShowTerms((current) => !current)}
      >
        <span className="pr-4">Bonus details</span>

        {showTerms ? close : open}
      </div>
      {showTerms ? (
        <div className="pt-3 text-sm">
          <h6>{bonusTerms}</h6>
        </div>
      ) : null}
    </div>
  );
}
