/* eslint-disable @next/next/no-img-element */
import NewComment from "@/app/components/NewComment/veiw";
import MobileJump from "@/app/components/MobileJump";
import RecentNewsServer from "@/app/components/news/RecentNewsServer";
import { RatingView } from "@/app/components/rating/view";
import { addComment } from "@/app/lib/CommentFetch";
import { setRating } from "@/app/lib/RatingFetch";
import { getLikeSlots } from "@/app/lib/Slots";
import prisma from "@/client";
import Author from "@/components/AboutAuthor";
import BankOptions from "@/components/BankOptions";
import BonusItem from "@/components/BonusItem";
import Faq from "@/components/faq";
import FaqJsonLD from "@/components/FaqJsonLDX";
import BonusFilter from "@/components/functions/bonusfilter";
import LikeCasinos from "@/components/LikeCasinos";
import LikeSlots from "@/components/LikeSlots";
import ProSchema from "@/components/ProJsonLDX";
import ProsCons from "@/components/ProsCons";
import SoftwareProv from "@/components/SoftwareProv";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import Image from "next/legacy/image";
import Link from "next/link";
import { Suspense } from "react";
import { BsArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import { VscStarEmpty } from "react-icons/vsc";
import { _avg } from "../../lib/Aggregation";
import { notFound } from "next/navigation";
import StringRehype from "@/app/components/StringRehype";
import cssFormat from "@/components/functions/cssFormat";
import { PlayCasinoLink } from "@/components/PlayCasinoLink";

let pageNum = 3;

const getProps = async ({ params }) => {
  const slug = params.slug;

  const data = await prisma.casino_p_casinos.findFirst({
    where: {
      clean_name: slug,
      approved: 1,
      OR: [
        {
          //vercel_image_url: { not: null },
          vercel_casino_button: { not: null },
        },
        { rogue: 1 },
      ],
    },
    select: {
      id: true,
      rogue: true,
      casino_faq: true,
      casino_pros: true,
      casino_cons: true,
      clean_name: true,
      casino: true,
      updated: true,
      button: true,
      meta: true,
      homepageimage: true,
      bonuses: {
        orderBy: {
          position: "desc",
        },
      },
      banklist: {
        select: {
          bank_data: true,
        },
      },
      casino_comments: {
        select: {
          id: true,
          createdAt: true,
          content: true,
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      casino_ratings: {
        select: {
          rating: true,
        },
      },
      review: {
        select: {
          description_link: true,
          description: true,
        },
        orderBy: {
          ordered: "desc",
        },
      },
      softwares: {
        select: {
          softwarelist: true,
        },
      },
    },
  });

  if (!data) {
    return null;
  }

  const swId = data.softwares
    ?.filter((x) => x.softwarelist?.id ?? 0 > 0)
    .map((x) => x.softwarelist?.id)
    .filter(Boolean);

  const casinodata = await prisma.casino_p_casinos.findMany({
    select: {
      id: true,
      casino_ratings: { select: { rating: true } },
    },
    where: {
      softwares: {
        some: {
          software: {
            in: swId,
          },
        },
      },
      approved: {
        equals: 1,
      },
      rogue: {
        equals: 0,
      },
    },
    take: 5,
  });

  const likeCasinoIds = casinodata?.map((x) => x.id); // make a list of casinos that matched software

  const LikeCasinoData = await prisma.casino_p_casinos.findMany({
    where: {
      id: { in: likeCasinoIds },
    },
    select: {
      id: true,
      clean_name: true,
      casino: true,
      button: true,
      homepageimage: true,
      bonuses: {
        orderBy: {
          position: "desc",
        },
      },
      casino_ratings: {
        select: {
          rating: true,
        },
      },
    },
    take: 30,
  });

  const rand = knuthShuffle(LikeCasinoData);
  const rand3 = rand?.slice(0, 3);
  const bdatav: any[] = rand3?.filter((p) => p.bonuses.length > 0);
  const bdata = BonusFilter(bdatav);
  //format review
  let desctemp = "";
  data?.review?.map((entry) => {
    desctemp = desctemp + (entry.description_link ?? entry.description ?? "");
  });
  const review = cssFormat(desctemp);

  const faq = data?.casino_faq;
  const pros = data?.casino_pros;
  const cons = data?.casino_cons;
  const prosCons = { pros, cons };
  return {
    data,
    bdata,
    faq,
    prosCons,
    swId,
    review,
  };
};

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const fullList = await prisma.casino_p_casinos.findMany({
    select: {
      clean_name: true,
    },
    where: {
      approved: 1,
      rogue: 0,
      bonuses: { some: { deposit: { gt: 0 } } },
    },
  });
  return fullList.map((row) => ({
    slug: row.clean_name,
  }));
}

export const revalidate = 7200;

export async function generateMetadata({ params }): Promise<Metadata> {
  const props = await getProps({ params });
  if (!props) {
    // run checks to set to 404

    notFound();
  }
  const data = props.data;
  const Homepage =
    "/image/casino/homescreen/" + data?.clean_name + "-homescreen.jpg";
  if (data.rogue == 1) {
    const rtitle =
      data?.casino + " is a rogue or distrustful casino || 🚨DO NOT PLAY🚨";
    const rdecs =
      data?.casino +
      " is a rogue or distrustful casino || we recommend avoiding this online casino for one of many reasons";
    return {
      metadataBase: new URL("https://www.allfreechips.com"),
      title: rtitle,
      description: rdecs,
      openGraph: { images: Homepage },
    };
  }
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: data?.meta[0]?.title ?? data?.casino + " Online Casino Review",
    description:
      data?.meta[0]?.description ??
      data?.casino +
        " Review : Casino bonus and online slots information from " +
        data?.casino,
    openGraph: { images: Homepage },
  };
}

export default async function Review({ params }) {
  const props = await getProps({ params });
  if (!props) {
    notFound();
  }

  const firstBonus = props.data?.bonuses.find((v) => v.deposit ?? 0 > 0);
  const faq = props.faq;
  const prosCons = props.prosCons;
  const data = props.data;
  const likeCasinoData = props.bdata;
  const swId = props.swId;
  const commentsData = data?.casino_comments;

  const totalCommentCount = commentsData?.length;
  const myRating = _avg(data?.casino_ratings);
  const votes = data?.casino_ratings.length;
  const review = {
    __html: props.review || "<p>There is no review...</p>",
  };

  const buttondata = data?.button;
  const bonuslist = data?.bonuses;
  const casinoname = data?.casino;
  const clean_name = data?.clean_name;
  const casinoid = data?.id;
  const casinoData = { casinoid, casinoname, clean_name };

  const bankListItems = data?.banklist;
  const bankListData = { bankListItems, casinoData };
  const softwares = data?.softwares;
  const softwaredata = { casinoname, softwares };
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };

  const casinoSlug = data?.clean_name;
  const clean = data?.clean_name;
  const bonusdata = { buttondata, bonuslist, casinoname, clean };
  const Homepage =
    "/image/casino/homescreen/" + data?.clean_name + "-homescreen.jpg";

  const links = [
    { link: "#bonusList", text: `${data?.casino} Bonuses` },
    { link: "#CasinoReview", text: `${data?.casino} Review` },
    { link: "#ProsCons", text: `${data?.casino} Pros and Cons` },
    { link: "#LikeCasinos", text: `Casinos Like ${data?.casino}` },
    { link: "#LikeSlots", text: `Slots at ${data?.casino}` },
    { link: "#faq", text: `${data?.casino} FAQs` },
  ];

  const product = data?.casino + "online casino";
  async function loadMoreData(formData) {
    "use server";

    pageNum = Number(formData?.get("pageNumber")) + 1;
    revalidatePath("CURRENT PAGE");
  }
  const games: any = await getLikeSlots(swId, pageNum);
  const gameListData = { games, casinoData, pageNum };

  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      {!data.rogue ? (
        <>
          <FaqJsonLD data={faq} />
          <ProSchema
            prosCons={prosCons}
            name={data?.casino}
            review={myRating}
            product={product}
          />
        </>
      ) : null}

      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            {data?.casino} Casino Review 2023
          </h1>
          <div className="flex flex-col py-4">
            <span className="">
              Author:{" "}
              <a href="#author" className="font-medium">
                {author}
              </a>
            </span>
            <span className="text-sky-600 dark:text-white">{reviewDate}</span>
          </div>
        </div>
      </section>

      <MobileJump
        links={{ links }}
        close={<GrClose className="dark:bg-white" />}
        left={
          <CgMenuLeft className="mx-2 text-xl text-white dark:text-black" />
        }
      />

      <section className="mx-4 flex flex-col md:flex-row">
        <div className="md: hidden md:flex md:w-1/4 md:flex-col">
          <div
            className="md:flex md:flex-col"
            style={{ position: "sticky", top: "140px" }}
          >
            <span className="p-4 text-lg font-medium">ON THIS PAGE</span>
            <hr className="w-60 border-sky-700 dark:border-white" />
            <span className="my-4 border-l-4 border-sky-700 px-4 font-medium dark:border-white">
              Our top picks
            </span>
            <div className="my-4 flex flex-col space-y-4">
              {links.map((l, i) => (
                <span key={i}>
                  <Link href={l.link}>{l.text}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-lg  font-medium md:w-3/4 md:text-xl">
          <div className="flex flex-col items-center md:flex-row md:space-x-16">
            <Image
              unoptimized
              src={Homepage}
              width={640}
              height={400}
              alt={props.data?.homepageimage ?? ""}
            />

            <div className="flex w-full flex-col py-8">
              <div className="flex flex-col items-center md:flex-row">
                <div className="w-full items-center text-3xl font-medium">
                  {props.data?.casino}
                </div>
                <div className="my-4 flex w-full justify-between md:justify-start">
                  <div className="flex items-center space-x-2">
                    <span className="flex">
                      {[1, 2, 3, 4, 5].map((value, i) => (
                        <div key={i}>
                          {myRating >= value && <BsFillStarFill />}
                          {myRating < value && <VscStarEmpty />}
                        </div>
                      ))}
                    </span>
                    <span>{myRating}</span>
                  </div>
                </div>
                <div className="w-full items-center text-2xl font-medium">
                  ({votes} votes)
                </div>
              </div>
              <div className="mt-4 flex flex-row items-center md:items-center">
                <div>Top Offer</div>
                <hr className="h-1 w-10 rotate-90 border-sky-300 dark:border-white" />
                <div className="flex items-center">
                  <span className="text-5xl">{firstBonus?.deposit} </span>
                  <div className="flex flex-col space-y-0 text-base leading-4">
                    <span>
                      %
                      {(
                        ((firstBonus?.deposit ?? 0) /
                          (firstBonus?.deposit_amount || 1)) *
                        100
                      ).toFixed(0)}
                    </span>
                    <span>Bonus</span>
                  </div>
                </div>
                <hr className="h-1 w-10 rotate-90 border-sky-300 dark:border-white" />

                <div className="font-normal">
                  up to ${firstBonus?.deposit_amount}
                </div>
              </div>
              <div className="flex flex-col space-y-8 md:flex-row">
                <div className="mt-4 flex w-full items-center">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">$10</span>
                    <span className="text-sm font-light">Min. Deposit</span>
                  </div>
                  <hr className="h-1 w-10 rotate-90 border-sky-300" />
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">{firstBonus?.playthrough}</span>
                    <span className="text-sm font-light">Playthrough</span>
                  </div>
                  <hr className="h-1 w-10 rotate-90 border-sky-300" />
                  <div className="flex flex-col items-center">
                    <span className="text-sm">Bonus</span>
                    <span className="text-sm">details</span>
                  </div>
                </div>

                <PlayCasinoLink
                  casinoId={casinoSlug || ""}
                  className="m-4 flex h-10 w-full items-center justify-center rounded-lg bg-sky-700 text-white dark:bg-zinc-800 dark:text-white"
                >
                  Claim Now
                  <BsArrowRightCircleFill className="mx-4" />
                </PlayCasinoLink>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-lg">
            <p className="my-4 py-4 font-bold md:my-8">
              More Bonuses At {data?.casino} CASINO
            </p>

            <BonusItem data={bonusdata} />
          </div>

          <div>
            {!data.rogue ? (
              <h2 id="CasinoReview" className="my-4 text-3xl font-semibold">
                {data?.casino} Review
              </h2>
            ) : (
              <h2 id="CasinoReview" className="my-4 text-3xl font-semibold">
                {data?.casino} is a ROGUE casino :: Do Not Play!
              </h2>
            )}
            {!data.rogue ? (
              <div className="text-lg font-normal">
                <StringRehype html={review} />
              </div>
            ) : (
              <div className="text-lg font-normal">
                🚨🚨🚨 We have determined that {data.casino} is a distrustful
                online casino. This is either from player abuse, unresolved
                player issues or issues with the business side of dealing with
                an online casino. We suggest you avoid this casino as there are
                many more available that are not flagged as rogue.
              </div>
            )}

            <Suspense fallback={<></>}>
              <RatingView
                // userEmail={user?.email}
                type={1}
                parent={casinoid}
                myRating={myRating}
                addRating={setRating}
              />
            </Suspense>

            <NewComment
              type={1}
              addComment={addComment}
              parent={casinoid}
              comments={commentsData}
              totalCount={totalCommentCount}
            />

            {!data.rogue ? <ProsCons data={prosCons} /> : null}
            <div className="text-lg font-normal">
              <h3 className="my-6 text-3xl font-semibold md:my-10 md:text-4xl">
                How {data?.casino} Casino compares to other online casinos
              </h3>
              <p id="LikeCasinos" className="my-4">
                Casinos Like {data?.casino}
              </p>
              {!data.rogue ? (
                <LikeCasinos
                  data={likeCasinoData}
                  VscStarEmpty={<VscStarEmpty />}
                  BsFillStarFill={<BsFillStarFill />}
                  BsArrowRightCircleFill={
                    <BsArrowRightCircleFill className="mx-4" />
                  }
                />
              ) : null}
            </div>
            <div className=" bg-sky-100 dark:bg-gray-200 dark:text-black">
              <SoftwareProv data={softwaredata} />
              <BankOptions data={bankListData} />
            </div>
            <div>{!data.rogue ? <Faq data={faq} /> : null}</div>
            <div className="text-lg font-normal">
              <h4 className="my-6 text-3xl font-semibold md:my-10 md:text-4xl">
                Slots you can play at {data?.casino} Casino
              </h4>
            </div>
            <div id="LikeSlots">
              <LikeSlots loadMoreData={loadMoreData} data={gameListData} />
            </div>
            <Author data={authorData} />
          </div>
        </div>
      </section>
      <div className="mt-6 pt-6"></div>
      <RecentNewsServer
        count={4}
        named={data?.casino}
        casinoCat={params.slug}
      />
    </div>
  );
}

function knuthShuffle(arr) {
  var rand, temp, i;

  for (i = arr.length - 1; i > 0; i -= 1) {
    rand = Math.floor((i + 1) * Math.random()); //get random between zero and i (inclusive)
    temp = arr[rand]; //swap i and the zero-indexed number
    arr[rand] = arr[i];
    arr[i] = temp;
  }
  return arr;
}
