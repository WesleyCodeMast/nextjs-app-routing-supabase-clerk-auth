"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HeaderSearchForm() {
  const [searchKey, setSearchKey] = useState("");

  const router = useRouter();

  const changeVal = (e) => {
    e.preventDefault();
    setSearchKey(e.target.value);
  };

  const search = () => {
    if (searchKey != undefined && searchKey != "") {
      showSearchModal();
    }
  };

  const showSearchModal = () => {
    router.push(`?showSearchModal=true&searchKey=${searchKey}`);
  };

  return (
    <div className="relative hidden text-current lg:block">
      <form action={search}>
        <input
          type="search"
          name="serch"
          id="search"
          value={searchKey}
          onChange={(e) => changeVal(e)}
          placeholder="Search"
          className="bg-gray text-md h-10 rounded-full border-2 border-gray-500 px-5 pr-10 hover:border-current focus:outline-none sm:w-40 md:w-48 dark:text-zinc-900"
        />
        <button
          type="submit"
          aria-label="Search"
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
  );
}
