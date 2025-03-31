/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
interface props {
  softwareCat?: string;
  slotCat?: string;
  casinoCat?: string;
  count?: number;
}

const RecentNews: React.FC<props> = ({
  count = 4,
  softwareCat,
  slotCat,
  casinoCat,
}) => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [cat, setCat] = useState("");

  useEffect(() => {
    async function fetchRecentNews() {
      const response = await fetch("/news/recent", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          softwareCat: softwareCat,
          slotCat: slotCat,
          casinoCat: casinoCat,
          count: count,
        }),
      });

      const result: any = await response.json();
      setNews(result?.news);
      setCat(result?.subCategory);
      setLoading(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [casinoCat, softwareCat, slotCat]);

  return (
    <aside aria-label="Related articles" className="bg-white dark:bg-gray-800">
      {!loading && (
        <h5 className="mb-6 flex text-3xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
            />
          </svg>
          &nbsp;&nbsp;Recent&nbsp;
          <span className="">{cat != "" ? `${cat}` : ""}</span>
          <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">
            &nbsp;News
          </span>
        </h5>
      )}
      <div className="max-w-screen-xl mx-auto px-4">
        <div
          className={`grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-${count}`}
        >
          {!loading &&
            news &&
            news.length > 0 &&
            news.map((item: any) => (
              <article
                key={item.id}
                className="max-w-xs overflow-hidden rounded-xl border bg-white dark:bg-gray-800"
              >
                <a href={`/news/${item.id}`}>
                  <Image
                    unoptimized
                    src={item.image}
                    className="mb-6 h-48 w-full rounded-lg duration-300 hover:scale-105"
                    alt={item.title}
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <div className="px-3 pb-6 pt-2 text-center">
                    <h2 className="text-xl font-semibold">{item.title}</h2>
                    <div className="mt-1 text-xs text-gray-800 dark:text-gray-200">
                      {item.createdAt?.toLocaleString()}
                    </div>
                    <div className="mt-2 line-clamp-2 text-sm dark:text-gray-100">
                      {item.description}
                    </div>
                  </div>
                </a>
              </article>
            ))}
        </div>
        {!loading && (!news || news.length === 0) && (
          <div className="flex flex-col gap-6 pb-6">
            <div className="px-3 pb-6 pt-2 text-center">
              <h6 className="text-xl font-semibold">No Current News..</h6>
            </div>
          </div>
        )}
        {loading && (
          <div className="flex flex-col gap-6 pb-6">
            <div className="px-3 pb-6 pt-2 text-center">
              <h6 className="text-xl font-semibold">Loading...</h6>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default RecentNews;
