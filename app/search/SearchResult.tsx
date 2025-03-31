"use client";

import { useSearchParams } from "next/navigation";
import ResultItems from "./ResultItems";

export default function SearchResult() {
  const searchParams = useSearchParams();
  const searchkey = searchParams?.get("searchKey");
  return (
    <>
      <ResultItems type={1} searchkey={searchkey} category="Casino" />
      <ResultItems type={2} searchkey={searchkey} category="Game" />
    </>
  );
}
