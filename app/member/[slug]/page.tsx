import { getServerSession } from "next-auth";
import "../../chat2/css/customrichtext.css";
import prisma from "@/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { Metadata } from "next";
import Image from "next/image";

export const revalidate = 7200;

export async function generateMetadata({ params }): Promise<Metadata> {
  const props = await getProps({ params });
  const data = props.data;

  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: data?.name ?? data?.name + " bio information in AllFreechips",
    description: " Bio information of " + data?.name,
  };
}

const getProps = async ({ params }) => {
  const slug = params.slug;
  const data = await prisma.user.findFirst({
    select: {
      id: true,
      bio: true,
      name: true,
      email: true,
      paypal_email: true,
      image: true,
      vercel_image_store: true,
      createdAt: true,
      afcRewards: true,
      updatedAt: true,
      role: true,
      chest: true,
    },
    where: {
      id: {
        equals: slug,
      },
    },
  });
  const reviewCount = await prisma.comments.count({
    where: {
      author: {
        id: data?.id,
      },
    },
  });
  const now = new Date();
  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const reviewCount1 = await prisma.comments.count({
    where: {
      createdAt: {
        gte: thisMonth,
      },
      author: {
        id: data?.id,
      },
    },
  });

  const shoutMessageCount = await prisma.shoutMessage.count({
    where: {
      authorId: {
        equals: data?.id,
      },
    },
  });
  const shoutMessageCount1 = await prisma.shoutMessage.count({
    where: {
      createdAt: {
        gte: thisMonth,
      },
      authorId: {
        equals: data?.id,
      },
    },
  });
  const _ratingAggregation = await prisma.rating.aggregate({
    _avg: {
      rating: true,
    },
    where: {
      authorId: data?.id,
    },
  });

  const avgRating = Number(_ratingAggregation?._avg?.rating);

  const ratingCount = await prisma.rating.count({
    where: {
      authorId: data?.id,
    },
  });

  const ratingCount0 = await prisma.rating.count({
    where: {
      createdAt: {
        gte: thisMonth,
      },
      authorId: data?.id,
    },
  });

  const ratingCount1 = await prisma.rating.count({
    where: {
      authorId: data?.id,
      rating: 1,
    },
  });
  const ratingCount2 = await prisma.rating.count({
    where: {
      authorId: data?.id,
      rating: 2,
    },
  });
  const ratingCount3 = await prisma.rating.count({
    where: {
      authorId: data?.id,
      rating: 3,
    },
  });
  const ratingCount4 = await prisma.rating.count({
    where: {
      authorId: data?.id,
      rating: 4,
    },
  });
  const ratingCount5 = await prisma.rating.count({
    where: {
      authorId: data?.id,
      rating: 5,
    },
  });

  return {
    data,
    shoutMessageCount,
    shoutMessageCount1,
    ratingCount,
    ratingCount0,
    ratingCount1,
    ratingCount2,
    ratingCount3,
    ratingCount4,
    ratingCount5,
    reviewCount,
    reviewCount1,
    avgRating,
  };
};

export default async function PageOut({ params }) {
  const session = await getServerSession(authOptions);
  const props = await getProps({ params });
  const data = props.data;
  console.log(data);
  const shoutMessageCount = props.shoutMessageCount;
  const shoutMessageCount1 = props.shoutMessageCount1;
  const ratingCount = props?.ratingCount;
  const ratingCount0 = props?.ratingCount0;
  const ratingCount1 = props?.ratingCount1;
  const ratingCount2 = props?.ratingCount2;
  const ratingCount3 = props?.ratingCount3;
  const ratingCount4 = props?.ratingCount4;
  const ratingCount5 = props?.ratingCount5;
  let p1, p2, p3, p4, p5;
  if (ratingCount != 0) {
    p1 = (ratingCount1 * 100) / ratingCount;
    p2 = (ratingCount2 * 100) / ratingCount;
    p3 = (ratingCount3 * 100) / ratingCount;
    p4 = (ratingCount4 * 100) / ratingCount;
    p5 = (ratingCount5 * 100) / ratingCount;
  } else {
    p1 = 0;
    p2 = 0;
    p3 = 0;
    p4 = 0;
    p5 = 0;
  }
  const reviewCount = props?.reviewCount;
  const reviewCount1 = props?.reviewCount1;
  const avgRating = props?.avgRating;

  const bioInfo = data?.bio ? data.bio : "<h2>No bio Info</h2>";
  return (
    <div className="bg-gray-100 dark:bg-zinc-700">
      <div className="container mx-auto py-8">
        {data?.id ? (
          <div className="grid grid-cols-4 gap-6 px-4 md:grid-cols-12">
            <div className="col-span-4 md:col-span-4">
              <div className="rounded-lg bg-white p-12 shadow dark:bg-zinc-900">
                <div className="flex flex-col items-center">
                  <div className="relative h-60 w-60">
                    {/* {data?.image?.includes("undefined") ? (
                    <img
                      src="data:image/png;base64,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"
                      className="mb-4 h-32 w-32 shrink-0 rounded-full bg-gray-300 dark:bg-zinc-700"
                    />

                  ) : (
                    <img
                      src={`/image/users/${data?.image ? data.image : ""}`}
                      className="mb-4 h-32 w-32 shrink-0 rounded-full bg-gray-300 dark:bg-zinc-700"
                    />
                  )} */}
                    <Image
                      unoptimized
                      fill
                      src={userImage(data?.image)}
                      alt={data.name ?? "Community Member"}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h1 className="text-xl font-bold">{data?.name}</h1>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <div className="col-md-4 border-end">
                    <div className="py-md-4 p-4 py-3">
                      <div className="mb-0 text-rose-500 ">
                        <div className="badge badge-success gap-2">
                          Recent Activity
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-blueGray-600 block text-2xl font-bold uppercase tracking-wide">
                        {ratingCount0}
                      </span>
                      <span className="text-blueGray-400 text-sm">Ratings</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-blueGray-600 block text-2xl font-bold uppercase tracking-wide">
                        {reviewCount1}
                      </span>
                      <span className="text-blueGray-400 text-sm">Reviews</span>
                    </div>
                    <div className="p-3 text-center lg:mr-4">
                      <span className="text-blueGray-600 block text-2xl font-bold uppercase tracking-wide">
                        {shoutMessageCount1}
                      </span>
                      <span className="text-blueGray-400 text-sm">
                        Form Posts
                      </span>
                    </div>
                  </div>
                  <div className="col-md-4 border-end">
                    <div className="py-md-4 p-4 py-3">
                      <div className="fs-4 mb-0 text-rose-500">
                        <div className="badge badge-success gap-2">
                          Total Activity
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center py-4 pt-8 lg:pt-4">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-blueGray-600 block text-2xl font-bold uppercase tracking-wide">
                        {ratingCount}
                      </span>
                      <span className="text-blueGray-400 text-sm">Ratings</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-blueGray-600 block text-2xl font-bold uppercase tracking-wide">
                        {reviewCount}
                      </span>
                      <span className="text-blueGray-400 text-sm">Reviews</span>
                    </div>
                    <div className="p-3 text-center lg:mr-4">
                      <span className="text-blueGray-600 block text-2xl font-bold uppercase tracking-wide">
                        {shoutMessageCount}
                      </span>
                      <span className="text-blueGray-400 text-sm">
                        Form Posts
                      </span>
                    </div>
                  </div>
                  <hr className="my-6 border-t border-gray-300" />
                  <div className="p-3 text-center lg:mr-4">
                    <span className="text-blueGray-600 block text-2xl font-bold uppercase tracking-wide">
                      {avgRating ? avgRating : 0} / 5
                    </span>
                    <span className="text-blueGray-400 text-sm">
                      Average Rating
                    </span>
                  </div>
                  <div className="mb-3 md:flex md:items-center">
                    <div className="md:w-1/4">
                      <label
                        className="font-sm mb-1 block pr-4 text-gray-500 md:mb-0 md:text-right"
                        htmlFor="inline-full-name"
                      >
                        1 Stars
                      </label>
                    </div>
                    <div className="md:w-1/2">
                      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-1.5 rounded-full bg-blue-500"
                          style={{ width: p1 + "%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="md:w-1/4">
                      <label
                        className="font-sm mb-1 block pr-4 text-gray-500 md:mb-0 md:text-right"
                        htmlFor="inline-full-name"
                      >
                        {`( ${ratingCount1} )`}
                      </label>
                    </div>
                  </div>
                  <div className="mb-3 md:flex md:items-center">
                    <div className="md:w-1/4">
                      <label
                        className="font-sm mb-1 block pr-4 text-gray-500 md:mb-0 md:text-right"
                        htmlFor="inline-full-name"
                      >
                        2 Stars
                      </label>
                    </div>
                    <div className="md:w-1/2">
                      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-1.5 rounded-full bg-blue-500"
                          style={{ width: p2 + "%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="md:w-1/4">
                      <label
                        className="font-sm mb-1 block pr-4 text-gray-500 md:mb-0 md:text-right"
                        htmlFor="inline-full-name"
                      >
                        {`( ${ratingCount2} )`}
                      </label>
                    </div>
                  </div>
                  <div className="mb-3 md:flex md:items-center">
                    <div className="md:w-1/4">
                      <label
                        className="font-sm mb-1 block pr-4 text-gray-500 md:mb-0 md:text-right"
                        htmlFor="inline-full-name"
                      >
                        3 Stars
                      </label>
                    </div>
                    <div className="md:w-1/2">
                      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-1.5 rounded-full bg-blue-500"
                          style={{ width: p3 + "%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="md:w-1/4">
                      <label
                        className="font-sm mb-1 block pr-4 text-gray-500 md:mb-0 md:text-right"
                        htmlFor="inline-full-name"
                      >
                        {`( ${ratingCount3} )`}
                      </label>
                    </div>
                  </div>
                  <div className="mb-3 md:flex md:items-center">
                    <div className="md:w-1/4">
                      <label
                        className="font-sm mb-1 block pr-4 text-gray-500 md:mb-0 md:text-right"
                        htmlFor="inline-full-name"
                      >
                        4 Stars
                      </label>
                    </div>
                    <div className="md:w-1/2">
                      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-1.5 rounded-full bg-blue-500"
                          style={{ width: p4 + "%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="md:w-1/4">
                      <label
                        className="font-sm mb-1 block pr-4 text-gray-500 md:mb-0 md:text-right"
                        htmlFor="inline-full-name"
                      >
                        {`( ${ratingCount4} )`}
                      </label>
                    </div>
                  </div>
                  <div className="mb-6 md:flex md:items-center">
                    <div className="md:w-1/4">
                      <label
                        className="font-sm mb-1 block pr-4 text-gray-500 md:mb-0 md:text-right"
                        htmlFor="inline-full-name"
                      >
                        5 Stars
                      </label>
                    </div>
                    <div className="md:w-1/2">
                      <div className="h-1.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                        <div
                          className="h-1.5 rounded-full bg-blue-500"
                          style={{ width: p5 + "%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="md:w-1/4">
                      <label
                        className="font-sm mb-1 block pr-4 text-gray-500 md:mb-0 md:text-right"
                        htmlFor="inline-full-name"
                      >
                        {`( ${ratingCount5} )`}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 md:col-span-8 ">
              <div className="rounded-lg bg-white p-12 shadow dark:bg-zinc-900">
                <div className="edit-summary">
                  <div className="ql-editor pt-8">
                    {bioInfo != "" ? (
                      <div dangerouslySetInnerHTML={{ __html: bioInfo }} />
                    ) : (
                      <p>
                        <br />
                        There is no your bio information...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-24 pt-24"> There is no member...</div>
        )}
      </div>
    </div>
  );
}
function userImage(image) {
  let img = image?.includes("undefined") ? "/images/emptyuser.png" : image;
  if (img.indexOf("http") == 0) {
    return img;
  }
  img = "/image/users/" + img; // if we store in blob then we use the image/users route
  return img;
}
