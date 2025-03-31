"use client";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination/Pagination";
import ResultItem from "./ResultItem";

export default function ResultItems({ type, searchkey, category }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    async function fetchDatas() {
      const firstPageIndex = (currentPage - 1) * 5;
      const { count: countResult, data: result } = await fetch(
        `/search?${new URLSearchParams({
          type,
          searchkey,
          firstPageIndex: String(firstPageIndex),
        })}`,
        { method: "GET" },
      ).then((res) => res.json() as any);
      setCount(countResult);
      setData(result);
    }
    fetchDatas();
  }, [currentPage, searchkey, type]);

  return (
    <main className="h-full overflow-y-auto bg-gray-100 dark:bg-zinc-900">
      <div className="container  mx-auto grid">
        <div className="shadow-xs my-2 flex flex-wrap rounded-lg bg-white p-4 dark:bg-gray-800">
          <div className="mr-4 rounded-full bg-orange-100 p-3 text-orange-500 dark:bg-orange-500 dark:text-orange-100">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
            </svg>
          </div>
          <p className="my-2 text-xl font-medium text-current dark:text-gray-400">
            {category} Result
            <label className="text-md font-small ml-4">{count}</label>
          </p>
          <div className="md:ml-auto">
            {data?.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalCount={count}
                pageSize={5}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </div>
        </div>

        <div className="mb-2 grid gap-6 md:grid-cols-5 xl:grid-cols-5">
          {data?.map((item) => (
            <div
              key={item?.id || item?.game_id}
              className="shadow-xs flex flex-col rounded-lg bg-white p-4 dark:bg-gray-800"
            >
              <ResultItem type={type} item={item} />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
