"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function FullModal({ children }) {
  // const searchParams = useSearchParams();

  const [showSearchModal, setShowSearchModal] = useState(false);
  const [key, setKey] = useState("");
  const refTool = useRef<HTMLDivElement>(null);

  const router = useRouter();
  useEffect(() => {
    // Check if window is defined (to ensure code runs only in the browser)
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      // Use searchParams as needed
      let searchKey = searchParams?.get("searchKey");
      if (searchKey) {
        setKey(searchKey);
      }
      let showSearchModal1 = searchParams?.get("showSearchModal")
        ? true
        : false;
      if (showSearchModal1) {
        setShowSearchModal(showSearchModal1);
      }
    }
  }, [router]);

  const toggle = (e) => {
    e.preventDefault();
    router.push(window.location.pathname);
  };

  const search = () => {
    router.push("?showSearchModal=true&searchKey=" + key);
  };

  const changeVal = (e) => {
    e.preventDefault();
    setKey(e.target.value);
  };

  return (
    <>
      {showSearchModal && (
        <div
          className="modal fixed inset-0 z-50 h-full w-full overflow-y-auto bg-gray-900 bg-opacity-60 px-4"
          ref={refTool}
        >
          <div className="max-w-md relative mx-auto rounded-md bg-white  shadow-xl dark:bg-zinc-800">
            <div className="flex items-start justify-between rounded-t p-5">
              <div className="ml-2 mt-2 flex items-center justify-start space-x-4 md:basis-1/4">
                <div className="relative text-current">
                  <form action={search}>
                    <input
                      type="search"
                      name="serch"
                      id="search"
                      value={key}
                      onChange={(e) => changeVal(e)}
                      placeholder="Search"
                      className="bg-gray text-md h-10 rounded-full border-2 border-gray-500 px-5 pr-10 hover:border-current focus:outline-none sm:w-40 md:w-48 dark:text-zinc-900"
                    />

                    <button
                      type="submit"
                      className="absolute right-0 top-0 mr-4 mt-3 dark:text-zinc-900"
                    >
                      <svg
                        className="h-4 w-4 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        version="1.1"
                        id="Capa_1"
                        x="0px"
                        y="0px"
                        viewBox="0 0 56.966 56.966"
                        style={{ background: "new 0 0 56.966 56.966" }}
                        xmlSpace="preserve"
                        width="512px"
                        height="512px"
                      >
                        <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                      </svg>
                    </button>
                  </form>
                </div>
              </div>
              <button onClick={(e) => toggle(e)}>x</button>
            </div>

            <div className="max-h-3/4 overflow-y-scroll px-4">{children}</div>
            <div className="flex items-center justify-end space-x-4 px-4 py-4">
              <button
                className="rounded-md bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-700"
                onClick={(e) => toggle(e)}
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
