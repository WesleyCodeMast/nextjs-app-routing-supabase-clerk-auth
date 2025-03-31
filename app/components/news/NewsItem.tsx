/* eslint-disable @next/next/no-img-element */
import { DeleteIcon, EditIcon } from "@/app/chat/_lib/ChatData";
import React from "react";
import Image from "next/image";
interface Props {
  item: any;
  userRole: any;
  dModalShow: (news: any) => void;
  uModalShow: (news: any) => void;
}
const NewsItem: React.FC<Props> = ({
  item,
  userRole,
  dModalShow,
  uModalShow,
}) => {
  return (
    <div className="flex flex-col items-center gap-x-8 rounded-xl border bg-white p-3 md:flex-row">
      <div className="shrink-0">
        <a href={`/news/${item?.id}`}>
          <Image
            unoptimized
            className="h-36 w-48 duration-300 hover:translate-y-1"
            src={item?.image}
            alt="Allfreechips News item"
            loading="lazy"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "auto", height: "100%" }}
          />
        </a>
      </div>
      <div className="w-full">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <a className="hover:text-cyan-400" href={`/news/${item?.id}`}>
              <h1
                className="mb-6 line-clamp-1 text-2xl font-bold"
                style={{ overflowWrap: "anywhere" }}
              >
                {item?.title}
              </h1>
            </a>
          </div>
          {(userRole == 0 || userRole == 3) && (
            <div className="mb-2 flex items-center">
              <button
                onClick={() => uModalShow(item)}
                className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <EditIcon />
              </button>
              <button
                onClick={() => dModalShow(item)}
                className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>
        <p
          className="text-semibold mt-3 line-clamp-2"
          style={{ overflowWrap: "anywhere" }}
        >
          {item?.description}
        </p>
      </div>
    </div>
  );
};

export default NewsItem;
