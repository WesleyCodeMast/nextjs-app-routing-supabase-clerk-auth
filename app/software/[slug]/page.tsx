import MobileJump from "@/app/components/MobileJump";
import prisma from "@/client";
import Author from "@/components/AboutAuthor";
import Bonus3 from "@/components/Bonus3";
import LikeSlots from "@/components/LikeSlots";
import BonusFilter from "@/components/functions/bonusfilter";
import monthYear from "@/components/functions/monthYear";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import RecentNewsServer from "@/app/components/news/RecentNewsServer";
import { getLikeSlots } from "@/app/lib/Slots";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { LoadMoreButton } from "@/app/components/loadMoreButton";
import StringRehype from "@/app/components/StringRehype";
import cssFormat from "@/components/functions/cssFormat";
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const fullList = await prisma.casino_p_software.findMany({
    select: {
      link: true,
    },
  });
  return fullList.map((row) => ({
    slug: row.link,
  }));
}

let pageNum = 1;
let casinoNum = 1;

async function loadMoreCasino(formData) {
  "use server";

  casinoNum = Number(formData.get("casinoNumber")) + 1;
  revalidatePath("CURRENT PAGE");
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const props = await getProps({ params });
  const Title =
    props.data[0]?.software_name +
    " Slots and casinos along with detailed reviews";
  const description =
    "Full list of casinos that use " +
    props.data[0]?.software_name +
    " as well as all " +
    props.data[0]?.software_name +
    " Slot Machines";

  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}

async function getProps({ params }) {
  let casTake = casinoNum * 8;
  const slug = params.slug;

  const data = await prisma.casino_p_software.findMany({
    where: {
      link: slug,
    },
    select: {
      id: true,
      software_name: true,
      image: true,
      subcontent: {
        orderBy: { type: "asc" },
      },
    },
  });

  const swId = data[0]?.id;

  const gamedata = await prisma.casino_p_games.findMany({
    select: {
      game_id: true,
      game_name: true,
      game_clean_name: true,
      game_reels: true,
      game_lines: true,
      game_image: true,
      software: { select: { software_name: true } },
      // game_ratings: {select: {rating: true}}
    },
    where: {
      game_software: {
        equals: swId,
      },
      review: {
        every: {
          description: {
            not: "",
          },
        },
      },
    },
    orderBy: { game_id: "desc" },
    take: 5,
  });

  const gameTotalCount = await prisma.casino_p_games.count({
    where: {
      game_software: {
        equals: swId,
      },
      review: {
        every: {
          description: {
            not: "",
          },
        },
      },
    },
  });

  const LikeCasinoData = await prisma.casino_p_casinos.findMany({
    where: {
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
      bonuses: {
        orderBy: {
          position: "desc",
        },
      },
    },
    orderBy: { id: "desc" },
    take: casTake,
  });
  const bdatav: any[] = LikeCasinoData.filter((p) => p.bonuses.length > 0);
  const bdata = BonusFilter(bdatav);
  return { data, bdata, gamedata, swId, gameTotalCount };
}
export const revalidate = 7200;

export default async function Software({ params }) {
  const props = await getProps({ params });
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const data: any = props.data[0];

  const subcontent = data?.subcontent?.map(
    ({ content, content_linked, title }) => ({
      content,
      content_linked,
      title,
    }),
  );

  //  see if we have linked content, then unlinked, then null if none.
  const topSlot =
    cssFormat(subcontent[0]?.content_linked) ??
    cssFormat(subcontent[0]?.content) ??
    null;
  const bottomSlot =
    cssFormat(subcontent[1]?.content_linked) ??
    cssFormat(subcontent[1]?.content) ??
    null;
  const topCasino =
    cssFormat(subcontent[2]?.content_linked, "h5") ??
    cssFormat(subcontent[2]?.content, "h5") ??
    null;
  const bottomCasino =
    cssFormat(subcontent[3]?.content_linked, "h6") ??
    cssFormat(subcontent[3]?.content, "h6") ??
    null;

  const topSlotTitle =
    subcontent[0]?.title ?? "Pick a casino from " + data.software_name;
  const bottomSlotTitle =
    subcontent[1]?.title ?? "New Online Slots By " + data.software_name;
  const topCasinoTitle =
    subcontent[2]?.title ?? "Pick a casino from " + data.software_name;
  const bottomCasinoTitle =
    subcontent[3]?.title ?? "More on the " + data.software_name + "Casinos";

  const links = [
    { link: "#casino", text: `Casinos on ${data?.software_name}` },
    { link: "#slots", text: `Slots by ${data?.software_name}` },
  ];
  const likeCasinoData = props.bdata;
  const gameList = props.gamedata;
  const casinoname = likeCasinoData[0]?.casino;
  const casinoid = likeCasinoData[0]?.id;
  const clean_name = likeCasinoData[0]?.clean_name;
  const casinoData = { casinoid, casinoname, clean_name };
  const swId = props.swId;
  const gameTotalCount = props.gameTotalCount;

  async function loadMoreData(formData) {
    "use server";

    pageNum = Number(formData.get("pageNumber")) + 1;
    revalidatePath("CURRENT PAGE");
  }

  const games: any = await getLikeSlots([swId], pageNum);
  const gameListData = { games, casinoData, gameTotalCount, pageNum };

  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <section className="px-6 py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            Best {data?.software_name} Casinos and Slots For {monthYear()}
          </h1>
          <div className="mt-3 rounded-xl bg-slate-100 dark:bg-gray-200 dark:text-black">
            <div className="card p-4">
              <div className="heading flex items-center gap-7 border-b pb-4">
                <span className="h-7 w-10 rounded bg-sky-700 dark:bg-zinc-800"></span>
                <h2 className="text-lg">{topSlotTitle}</h2>
              </div>
              {topCasino ? (
                <div>
                  <StringRehype html={{ __html: topCasino }} />
                </div>
              ) : (
                <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
                  Finding your favorite casino or even a new casino for a fresh
                  approach is easier when you know the software you like. These
                  pages sort the casinos and games by software like the current{" "}
                  {data?.software_name} pages.
                </p>
              )}
            </div>
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
              {links.map((l) => (
                <span key={l.link}>
                  <Link href={l.link}>{l.text}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div id="casino" className="text-lg  font-medium md:w-3/4 md:text-xl">
          <div className="flex flex-col rounded-lg">
            <h3 id="slots" className="my-4 text-3xl font-semibold">
              {topCasinoTitle}
            </h3>
            <Bonus3 data={props.bdata} />
            <form action={loadMoreCasino} className="text-center">
              <input type="hidden" name="casinoNumber" value={casinoNum} />
              <LoadMoreButton text="Show More Casinos" />
            </form>
            {bottomCasino ? (
              <>
                <h3 className="my-4 text-3xl font-semibold">
                  {bottomCasinoTitle}
                </h3>
                <div>
                  <StringRehype html={{ __html: bottomCasino }} />
                </div>
              </>
            ) : null}
          </div>

          <div>
            {topSlot ? (
              <>
                <h3 className="my-4 text-3xl font-semibold">
                  {data?.software_name} Online Slot Machines
                </h3>
                <div>
                  <StringRehype html={{ __html: topSlot }} />
                </div>
              </>
            ) : null}
            <h4 id="slots" className="my-4 text-3xl font-semibold">
              {bottomSlotTitle}
            </h4>
            <LikeSlots
              loadMoreData={loadMoreData}
              // getLikeSlots={getLikeSlots}
              data={gameListData}
            />
            {bottomSlot ? (
              <>
                <h3 className="my-4 text-3xl font-semibold">
                  Game Provider {data?.software_name} Slots
                </h3>
                <div>
                  <StringRehype html={{ __html: bottomSlot }} />
                </div>
              </>
            ) : null}
            <Author data={authorData} />
          </div>
        </div>
      </section>
      <div className="mt-6 pt-6"></div>
      <RecentNewsServer
        count={4}
        named={data?.software_name}
        softwareCatCat={params.slug}
      />
    </div>
  );
}
