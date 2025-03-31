/* eslint-disable @next/next/no-img-element */
import NewComment from "@/app/components/NewComment/veiw";

import { addComment } from "@/app/lib/CommentFetch";
import prisma from "@/client";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Image from "next/image";
import RecentNewsServer from "@/app/components/news/RecentNewsServer";
export const revalidate = 7200;

export async function generateMetadata({ params }): Promise<Metadata> {
  const props = await getProps({ params });
  const data = props.data;

  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: data?.title ?? data?.title + " Online Casino News",
    description:
      data?.description ??
      data?.title +
        " News : Casino bonus and online slots information from " +
        data?.title,
  };
}

const getProps = async ({ params }) => {
  const slug = parseInt(params.slug);
  if (!slug) redirect("/news");
  const data = await prisma.news.findFirst({
    select: {
      id: true,
      title: true,
      author: { select: { id: true, email: true, name: true, image: true } },
      description: true,
      createdAt: true,
      image: true,
      comments: {
        select: {
          id: true,
          createdAt: true,
          type: true,
          content: true,
          author: { select: { email: true, name: true, image: true } },
        },
      },
    },
    where: {
      id: {
        equals: slug,
      },
    },
  });

  const recentNews = await prisma.news.findMany({
    select: {
      id: true,
      image: true,
      title: true,
      description: true,
    },
    take: 4,
    orderBy: {
      createdAt: "desc",
    },
  });
  return { data, recentNews };
};

export default async function News({ params }) {
  const props = await getProps({ params });
  const data = props.data;

  const recentNews = props.recentNews;
  const comments = data?.comments;
  const totalCommentCount = comments?.length;
  const user = data?.author;
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <main className="bg-white pb-16 pt-8 lg:pb-24 lg:pt-16 dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto flex justify-between px-4 ">
          <article className="max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert mx-auto w-full">
            <header className="not-format mb-4 lg:mb-6">
              <address className="mb-6 flex items-center not-italic">
                <div className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
                  <div className="flex items-center">
                    <div className="relative mr-2  sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-16 lg:w-16">
                      <Image
                        unoptimized
                        fill
                        sizes="8em"
                        src={userImage(user?.image)}
                        alt={user?.name ?? "Community Member"}
                        className="rounded-full object-cover"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                      {user?.name}
                    </div>
                    <p className="text-base font-light text-gray-500 dark:text-gray-400">
                      <time dateTime="2022-02-08" title="February 8th, 2022">
                        {data?.createdAt.toLocaleString()}
                      </time>
                    </p>
                  </div>
                </div>
              </address>
              <h1 className="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
                {data?.title}
              </h1>
            </header>
            <div className="flex w-64 justify-center">
              {data?.image && (
                <div className="relative mb-6 h-48 w-full rounded-lg duration-300 hover:scale-105">
                  <Image
                    unoptimized
                    className="object-contain"
                    src={`/image/news/${data?.image}`}
                    alt={data.title}
                    sizes="25vw"
                    fill
                  />
                </div>
              )}
            </div>

            <p style={{ wordWrap: "break-word" }}>{data?.description}</p>
            {data && (
              <NewComment
                type={3}
                addComment={addComment}
                parent={data.id}
                comments={comments}
                totalCount={totalCommentCount}
              />
            )}
          </article>
        </div>
      </main>
      <RecentNewsServer />
    </div>
  );
}
function userImage(image) {
  let img = image ?? "/images/emptyuser.png";
  if (img.indexOf("http") == 0) {
    return img;
  }
  img = "/image/users/" + img; // if we store in blob then we use the image/users route

  return img;
}
