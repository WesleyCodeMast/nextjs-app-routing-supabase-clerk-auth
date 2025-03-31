"use client";

import useOutsideClick from "@/hooks/useOutsideClick";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function MobileMenuBar() {
  const params = useSearchParams();
  const router = useRouter();
  const showMobileMenu = params?.get("mobileMenu");
  const [open, setOpen] = useState(showMobileMenu == "true" ? true : false);
  const [key, setKey] = useState("");
  const refTool = useRef<HTMLDivElement>(null);

  const changeVal = (e) => {
    e.preventDefault();
    setKey(e.target.value);
  };

  const search = () => {
    if (key != undefined && key != "") {
      router.push(`?showSearchModal=true&searchKey=${key}`);
    }
  };

  const closeMenu = () => {
    if (showMobileMenu == "true") {
      router.push(window.location.pathname);
    }
  };

  const ref = useOutsideClick(closeMenu);

  return (
    <>
      {showMobileMenu && (
        <div ref={ref}>
          <ul
            className={`absolute left-0 top-28 z-[5] w-full bg-white pb-12 pl-9 transition-all duration-100 ease-in lg:static lg:z-auto lg:flex lg:w-auto lg:grow lg:items-center lg:pb-0 lg:pl-0 lg:transition-none dark:bg-zinc-800`}
          >
            <li className="my-7 w-2/5 text-xl lg:my-0 lg:ml-8">
              <div className="relative text-current lg:hidden">
                <form action={search}>
                  <input
                    type="search"
                    name="serch"
                    id="search"
                    value={key}
                    onChange={(e) => changeVal(e)}
                    placeholder="Search"
                    className="bg-gray text-md h-10 rounded-full border-2 border-gray-500 px-5 pr-10 text-zinc-900 hover:border-current focus:outline-none sm:w-40 md:w-48"
                  />
                </form>
              </div>
            </li>

            <li className="my-7 text-xl lg:my-0 lg:ml-8">
              <Link
                href="/casinos"
                className="font-medium duration-500 hover:text-gray-400"
              >
                Casino Reviews
              </Link>
            </li>
            <li className="my-7 text-xl lg:my-0 lg:ml-8">
              <Link
                href="/casino-bonuses"
                className="font-medium duration-500 hover:text-gray-400"
              >
                Casino Bonuses
              </Link>
            </li>
            <li className="my-7 text-xl lg:my-0 lg:ml-8">
              <Link
                href="/software"
                className="font-medium duration-500 hover:text-gray-400"
              >
                Casino Softwares
              </Link>
            </li>
            <li className="my-7 text-xl lg:my-0 lg:ml-8">
              <Link
                href="/guides"
                className="font-medium duration-500 hover:text-gray-400"
              >
                Guides
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
