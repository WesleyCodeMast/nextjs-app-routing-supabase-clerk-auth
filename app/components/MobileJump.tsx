"use client";
import Link from "next/link";
import { useState } from "react";

export default function MobileJump({
  links,
  left,
  close,
}: {
  links: { links: { link: string; text: string }[] };
  left: React.JSX.Element;
  close: React.JSX.Element;
}) {
  const [show, setShow] = useState(true);
  return (
    <>
      <div className="flex items-center justify-between bg-sky-700 px-4 py-2 text-white lg:hidden dark:bg-white dark:text-black">
        <span className="font-medium">ON THIS PAGE</span>
        <span
          onClick={() => setShow(!show)}
          className="flex items-center rounded border-2 border-white p-2 px-4 dark:border-black"
        >
          Jump to {left}
        </span>
      </div>
      <div
        className={`fixed z-20 flex w-full flex-col justify-between rounded-t-2xl bg-white p-4 text-2xl font-medium  lg:hidden dark:bg-zinc-800 ${
          show ? "bottom-[-490px]" : "bottom-0"
        }`}
      >
        <div className="flex w-full items-center justify-between">
          <div>ON THIS PAGE</div>
          <div onClick={() => setShow(!show)} className="">
            {close}
          </div>
        </div>
        <hr className="border-1 my-4 border-sky-700 dark:border-white" />
        <div className="flex flex-col space-x-2 space-y-4 text-lg font-normal">
          <span className="border-l-2 border-sky-700 px-4 font-medium dark:border-white">
            Our top picks
          </span>
          {links.links.map(function (link, id) {
            const data = { link, id };
            return (
              <span
                key={id}
                className="font-semibold text-blue-600 hover:underline dark:text-blue-500"
              >
                <Link href={link.link}>{link.text}</Link>
              </span>
            );
          })}
        </div>
      </div>
    </>
  );
}
