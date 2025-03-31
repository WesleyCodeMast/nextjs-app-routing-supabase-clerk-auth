"use client";
import React, { useState } from "react";

export default function Collapse({
  data,
  down,
}: {
  data: any;
  down: React.JSX.Element;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div key={data.id} className="flex flex-col">
      <div className="flex p-4 font-medium text-lg items-center justify-between md:text-2xl">
        {data.question}

        <div onClick={() => setOpen(!open)}>{down}</div>
      </div>
      <div
        className={`w-full p-4 text-base font-medium my-6 text-justify md:text-2xl ${
          open ? "flex" : "hidden"
        }`}
      >
        {data.answer}
      </div>
    </div>
  );
}
