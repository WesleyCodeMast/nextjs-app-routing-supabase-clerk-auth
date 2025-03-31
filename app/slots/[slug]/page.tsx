/* eslint-disable @next/next/no-img-element */
import NewComment from "@/app/components/NewComment/veiw";
import MobileJump from "@/app/components/MobileJump";
import StringRehype from "@/app/components/StringRehype";
import RecentNewsServer from "@/app/components/news/RecentNewsServer";
import { RatingView } from "@/app/components/rating/view";
import { _avg } from "@/app/lib/Aggregation";
import { addComment } from "@/app/lib/CommentFetch";
import { setRating } from "@/app/lib/RatingFetch";
import { getLikeSlots } from "@/app/lib/Slots";
import prisma from "@/client";
import Author from "@/components/AboutAuthor";
import FaqJsonLD from "@/components/FaqJsonLDX";
import LikeCasinos from "@/components/LikeCasinos";
import LikeSlots from "@/components/LikeSlots";
import ProSchema from "@/components/ProJsonLDX";
import ProsCons from "@/components/ProsCons";
import SlotCard from "@/components/SlotCard";
import SlotSlider from "@/components/SlotSlider";
import Faq from "@/components/faq";
import BonusFilter from "@/components/functions/bonusfilter";
import cssFormat from "@/components/functions/cssFormat";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { BsArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import { VscStarEmpty } from "react-icons/vsc";

let pageNum = 2; // Slot page counter , we show 5 per page so this starts with 10 like slots

export async function generateMetadata({ params }): Promise<Metadata> {
  const props = await getProps({ params });
  if (!props) {
    notFound();
  }

  const Title =
    props.data?.meta[0]?.title ??
    props.data?.game_name + " Online slot machine review";
  const description =
    props.data?.meta[0]?.description ??
    props.data?.game_name + " Online slot machine review";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}

async function getProps({ params }) {
  const slug = params.slug;
  const data = await prisma.casino_p_games.findFirst({
    where: { game_clean_name: slug },
    select: {
      game_id: true,
      game_name: true,
      game_image: true,
      game_updated: true,
      game_faq: true,
      game_pros: true,
      game_cons: true,
      game_reels: true,
      game_lines: true,
      game_wild_slot: true,
      game_bonus_multipliers: true,
      game_bonus_bet: true,
      game_free_spins: true,
      game_random_jackpot: true,
      game_scatters: true,
      game_progressive: true,
      game_bonus_round: true,

      game_comments: {
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
      game_ratings: {
        select: {
          rating: true,
        },
      },
      meta: {
        select: {
          title: true,
          description: true,
        },
      },
      review: {
        select: {
          description_link: true,
          description: true,
        },
      },
      software: {
        select: {
          id: true,
          software_name: true,
        },
      },
      game_images: {
        select: {
          game_image_url: true,
          game_image_alt_text: true,
          w: true,
          h: true,
        },
        orderBy: {
          game_image_position: "asc",
        },
      },
      slot_theme: {
        select: {
          theme: true,
        },
      },
    },
  });

  if (!data) {
    return null;
  }

  const swId = data?.software?.id;

  const LikeCasinoData = await prisma.casino_p_casinos.findMany({
    where: {
      vercel_image_url: { not: null },
      vercel_casino_button: { not: null },
      softwares: {
        some: {
          software: {
            equals: swId,
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
    select: {
      id: true,
      clean_name: true,
      casino: true,
      button: true,
      homepageimage: true,
      casino_ratings: { select: { rating: true } },
      bonuses: {
        orderBy: {
          position: "desc",
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

  // data["review"] = data?.review?.map((entry) => {
  //   let desc = entry?.description ?? "";
  //   const $ = cheerio.load(desc);
  //   $("p").addClass("my-4");
  //   $("h1").addClass("text-3xl font-semibold my-6 md:text-4xl");
  //   $("h2").addClass("text-3xl font-semibold my-6 md:text-4xl");
  //   $("h3").addClass("text-3xl font-semibold my-6 md:text-4xl");
  //   $("h4").addClass("text-3xl font-semibold my-6 md:text-4xl");
  //   $("h5").addClass("text-3xl font-semibold my-6 md:text-4xl");
  //   $("h6").addClass("text-3xl font-semibold my-6 md:text-4xl");
  //   return { description: $.html() };
  // });

  const faq = data?.game_faq;

  const pros = data?.game_pros;
  const cons = data?.game_cons;
  const prosCons = { pros, cons };

  return {
    data,
    bdata,
    faq,
    prosCons,
    swId,
    review,
  };
}

export async function generateStaticParams() {
  const fullList = await prisma.casino_p_games.findMany({
    select: {
      game_clean_name: true,
    },
    where: {
      game_image: { not: "" },
      game_images: {
        some: {
          vercel_image_url: { not: "" },
        },
      },

      review: {
        some: {
          description: {
            not: null,
          },
        },
      },
    },
    orderBy: { game_id: "desc" },
    take: 100,
  });
  return fullList.map((row) => ({
    slug: row.game_clean_name,
  }));
}

export default async function Review({ params }) {
  const props = await getProps({ params });
  if (!props) {
    notFound();
  }
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const faq = props.faq;
  const prosCons = props.prosCons;
  const data = props.data;
  const likeCasinoData = props.bdata;
  const swId = props.swId;
  const commentsData = data?.game_comments;
  const totalCommentCount = commentsData?.length;
  const myRating = _avg(data?.game_ratings);
  const game_id = data?.game_id;
  const casinoname = likeCasinoData[0]?.casino;
  const casinoid = likeCasinoData[0]?.id;
  const clean_name = likeCasinoData[0]?.clean_name;
  const casinoData = { casinoid, casinoname, clean_name };
  const gameReview = {
    __html: props.review || "<p>There are no reviews...</p>",
  };
  const links = [
    { link: "#SlotReview", text: `${data?.game_name} Review` },
    { link: "#ProsCons", text: `${data?.game_name} Pros and Cons` },
    { link: "#LikeCasinos", text: `Casinos at ${data?.game_name}` },
    { link: "#LikeSlots", text: `Slots Like ${data?.game_name}` },
    { link: "#faq", text: `${data?.game_name} FAQs` },
  ];

  const product = data?.game_name + "slot";
  async function loadMoreData(formData) {
    "use server";

    pageNum = Number(formData?.get("pageNumber")) + 1;
    revalidatePath("CURRENT PAGE");
  }

  const games: any = await getLikeSlots([swId], pageNum);

  const gameTotalCount = 500;
  const gameListData = { games, casinoData, gameTotalCount, pageNum };
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema
        prosCons={prosCons}
        name={data?.game_name}
        review={myRating}
        product={product}
      />
      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            {data?.game_name} Slot Review 2024
          </h1>
          <div className="flex flex-col py-4">
            <span className="">
              Author:{" "}
              <a href="#author" className="font-medium ">
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
        <div className="lg: hidden lg:flex lg:w-1/4 lg:flex-col">
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
              {links.map((l) => (
                <span key={l.link}>
                  <Link href={l.link}>{l.text}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="text-lg  font-medium md:w-3/4 md:text-xl">
          <h2 id="SlotReview" className="my-4 text-3xl font-semibold">
            {data?.game_name} Slot Details
          </h2>
          <SlotCard data={data} />
          <SlotSlider imgs={data?.game_images} game_id={data?.game_id} />
          {/* <RecentSlotSlider slots={recentSlotList} FaArrowCircleRight = {<BiCaretRight className="mx-2" />} /> */}
          <div className="flex flex-col rounded-lg"></div>

          <div>
            <div className="text-lg font-normal">
              <StringRehype html={gameReview} />
            </div>

            <Suspense fallback={<></>}>
              <RatingView
                type={2}
                parent={game_id}
                myRating={myRating}
                addRating={setRating}
              />
            </Suspense>

            <NewComment
              type={2}
              addComment={addComment}
              parent={game_id}
              comments={commentsData}
              totalCount={totalCommentCount}
            />

            <ProsCons data={prosCons} />
            <div className="text-lg font-normal">
              <h3 className="my-6 text-3xl font-semibold md:my-10 md:text-4xl">
                Find Online Casinos To Play {data?.game_name}
              </h3>
              <p id="LikeCasinos" className="my-4">
                Casinos You Can Play The {data?.game_name} Slot Machine At
              </p>
              <LikeCasinos
                data={likeCasinoData}
                VscStarEmpty={<VscStarEmpty />}
                BsFillStarFill={<BsFillStarFill />}
                BsArrowRightCircleFill={
                  <BsArrowRightCircleFill className="mx-4" />
                }
              />
            </div>
            <Faq data={faq} />
            <div className="text-lg font-normal">
              <h3 className="my-6 text-3xl font-semibold md:my-10 md:text-4xl">
                Other slots you can play like {data?.game_name} slot
              </h3>
            </div>
            <div id="LikeSlots">
              <LikeSlots
                loadMoreData={loadMoreData}
                // getLikeSlots={getLikeSlots}
                data={gameListData}
              />
            </div>
            <Author data={authorData} />
          </div>
        </div>
      </section>
      <div className="mt-6 pt-6"></div>
      <RecentNewsServer
        count={4}
        named={data?.game_name}
        slotCat={params.slug}
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
