import Image from "next/image";
import React from "react";

interface Props {
  text: string;
  avatar: string;
  isFreePlay: boolean;
  lastOutcome: any;
}

const PayItem: React.FC<Props> = ({
  text,
  avatar,
  isFreePlay,
  lastOutcome,
}) => {
  return (
    <div
      className={`flex border-spacing-1 flex-col items-center justify-items-center rounded-lg p-1 ${
        !isFreePlay && lastOutcome?.prize === avatar ? "bg-slate-300" : ""
      }`}
    >
      <h1 className="text-md font-bold" style={{ color: "#ffeaea" }}>
        {text}
      </h1>
      <div className="flex">
        {[1, 2, 3].map((v) => (
          <Image
            unoptimized
            key={`25usd-${v}`}
            className="mx-1"
            height={40}
            width={40}
            src={avatar}
            alt="$25 USD"
          />
        ))}
      </div>
    </div>
  );
};

export default PayItem;
