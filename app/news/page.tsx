/* eslint-disable @next/next/no-img-element */
import prisma from "@/client";
import { Metadata } from "next";
import Image from "next/image";
export const revalidate = 7200;

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Casino, Slot News";
  const description = "Online casino, slot, games news.";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}

export default async function Page() {
  const count = 20;

  const news = await prisma.news.findMany({
    select: {
      id: true,
      title: true,
      category: true,
      description: true,
      image: true,
      author: { select: { name: true, email: true, image: true } },
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: count,
  });

  const recentNews = await prisma.news.findMany({
    select: {
      id: true,
      image: true,
      title: true,
      createdAt: true,
      description: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <div className="max-w-screen-lg mx-auto px-3 py-6">
        <h1 className="mb-6 flex text-3xl font-bold">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              fillRule="evenodd"
              d="M15.75 4.5a3 3 0 11.825 2.066l-8.421 4.679a3.002 3.002 0 010 1.51l8.421 4.679a3 3 0 11-.729 1.31l-8.421-4.678a3 3 0 110-4.132l8.421-4.679a3 3 0 01-.096-.755z"
              clipRule="evenodd"
            />
          </svg>
          &nbsp;&nbsp;News
        </h1>
        <div className="flex flex-col gap-6 pb-6">
          {news &&
            news.length > 0 &&
            news.map((item: any, index: number) => (
              <div
                key={index}
                className="flex flex-col items-center gap-x-8 rounded-xl border bg-white p-3 md:flex-row"
              >
                <div className="shrink-0">
                  <a href={`/news/${item.id}/${item.title}`}>
                    <Image
                      unoptimized
                      className="h-36 w-48 duration-300 hover:translate-y-1"
                      src={`/image/news/${item?.image}`}
                      alt={item.title}
                      width={"100"}
                      height={"100"}
                    />
                  </a>
                </div>
                <div className="w-full">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <a
                        className="hover:text-cyan-400"
                        href={`/news/${item?.id}`}
                      >
                        <h1
                          className="mb-6 line-clamp-1 text-2xl font-bold"
                          style={{ overflowWrap: "anywhere" }}
                        >
                          {item?.title}
                        </h1>
                      </a>
                    </div>
                  </div>
                  <p
                    className="text-semibold mt-3 line-clamp-2"
                    style={{ overflowWrap: "anywhere" }}
                  >
                    {item?.description}
                  </p>
                </div>
              </div>
            ))}
          {!news ||
            (news.length === 0 && (
              <div className="px-3 pb-6 pt-2 text-center">
                <h2 className="text-xl font-semibold">There are no News!!!</h2>
              </div>
            ))}
        </div>
      </div>

      <aside
        aria-label="Related articles"
        className="bg-white dark:bg-gray-800"
      >
        <h1 className="mb-6 flex text-3xl font-bold">
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
          &nbsp;&nbsp;Recent
          <span className="bg-gradient-to-br from-sky-500 to-cyan-400 bg-clip-text text-transparent">
            &nbsp;News
          </span>
        </h1>
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {recentNews &&
              recentNews.length > 0 &&
              recentNews.map((item: any) => (
                <article
                  key={item.id}
                  className="max-w-xs overflow-hidden rounded-xl border bg-white"
                >
                  <a href={`/news/${item.id}/${item.title}`}>
                    <div className="relative mr-2  sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-16 lg:w-16">
                      <Image
                        unoptimized
                        className="object-contain"
                        src={`/image/news/${item?.image}`}
                        alt={item.title}
                        sizes="25vw"
                        fill
                      />
                    </div>

                    <div className="px-3 pb-6 pt-2 text-center">
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <div className="mt-1 text-xs text-gray-400">
                        {item.createdAt?.toLocaleString()}
                      </div>
                      <div className="mt-2 line-clamp-2 text-sm">
                        {item.description}
                      </div>
                    </div>
                  </a>
                </article>
              ))}
          </div>
          {!recentNews ||
            (recentNews.length === 0 && (
              <div className="flex flex-col gap-6 pb-6">
                <div className="px-3 pb-6 pt-2 text-center">
                  <h2 className="text-xl font-semibold">
                    There are no Recent News!!!
                  </h2>
                </div>
              </div>
            ))}
        </div>
      </aside>
    </div>
  );
}
