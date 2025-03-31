import { _avg } from "@/app/lib/Aggregation";
import prisma from "@/client";
import Image from "next/image";

import { BsArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import { VscStarEmpty } from "react-icons/vsc";
import BonusFilter from "./functions/bonusfilter";
import { unstable_cache } from "next/cache";
import { PlayCasinoLink } from "./PlayCasinoLink";
import { revalidateTag } from "next/cache";
import GeoTarget from "@/app/lib/GeoTarget";
import Settings from "./functions/settings";
async function casinoData(cid) {
  const cdata = await prisma.casino_p_casinos.findMany({
    where: {
      id: Number(cid),
    },

    select: {
      id: true,
      clean_name: true,
      casino: true,
      hot: true,
      new: true,
      button: true,
      bonuses: {
        orderBy: [{ nodeposit: "desc" }, { deposit: "desc" }],
      },
      casino_ratings: {
        select: {
          rating: true,
        },
      },
    },
  });

  const bdata: any[] = cdata?.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { bonus };
}

export default async function CasinoSingleCardA(cardData) {
  //revalidateTag("global-cache");
  let settings;
  let geo;
  let geoTitle = "";
  if (!cardData) {
    return null;
  }

  if (cardData.data.casino_id == 0) {
    // Geo Lookup
    geo = await GeoTarget({ type: 1, countryCode: "" });
    settings = await Settings();
    geoTitle = cardData.data.title.replace("COUNTRY", geo.name);
  }

  if (cardData.data.casino_id == 0) {
    cardData.data.casino_id = null;
  }
  const cid = cardData.data.casino_id ?? settings?.[geo.code] ?? 573;
  const location = "NZ"; //geo?.code ?? "NA";
  const SingleCardA = "single_card_" + cid + location;

  const { bonus } = await unstable_cache(
    async () => casinoData(cid),
    [SingleCardA],
    { revalidate: 9000, tags: [SingleCardA, "global-cache"] },
  )();

  const data = bonus[0];
  if (!data) {
    return null;
  }
  const offer = geoTitle ?? cardData.data?.title ?? "Top Offer";
  const code = data?.nodepositCode ?? data?.depCodeDisp;
  let dsp = {
    bonus: (data?.ndcurrency ?? "") + data?.nodeposit,
    value: data?.nodeposit_type,
  };

  if (!data?.nodeposit) {
    dsp = {
      bonus: data?.currency + "10",
      value: "Min Deposit",
    };
  }
  const homescreen =
    "/image/casino/homescreen/" + bonus[0]?.clean_name + "-homescreen.jpg";
  const myRating = _avg(data?.casino_ratings);
  const votes = data?.casino_ratings?.length;

  return (
    <div className="m-4 md:mx-10 md:mt-10">
      <div className="flex flex-col items-center md:flex-row md:space-x-16">
        <div className="max-w-28">
          <Image
            unoptimized
            src={homescreen}
            style={{ objectFit: "cover" }}
            width={640}
            height={400}
            alt={data?.casino ?? ""}
          />
        </div>

        <div className="flex w-full flex-col py-8">
          <div className="flex flex-col items-center md:flex-row">
            <div className="w-full items-center text-3xl font-medium">
              {data?.casino}
            </div>
            <div className="my-4 flex w-full justify-between md:justify-start">
              <div className="flex items-center space-x-2">
                <span className="flex">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value}>
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
            <div>{offer}</div>
            <hr className="h-1 w-10 rotate-90 border-sky-300 dark:border-white" />
            <div className="flex items-center">
              <span className="text-5xl">{data?.deposit} </span>
              <div className="flex flex-col space-y-0 text-base leading-4">
                <span>
                  %
                  {(
                    ((data?.deposit || 0) / (data?.depositBonus || 1)) *
                    100
                  ).toFixed(0)}
                </span>
                <span>Bonus</span>
              </div>
            </div>
            <hr className="h-1 w-10 rotate-90 border-sky-300 dark:border-white" />

            <div className="font-normal">
              <span>up to</span>{" "}
              <span className="text-5xl">{data?.depositBonus}</span>
            </div>
          </div>
          <div className="flex flex-col space-y-8 md:flex-row">
            <div className="mt-4 flex w-full items-center">
              <div className="flex flex-col items-center">
                <span className="text-2xl">{dsp.bonus}</span>
                <span className="text-sm font-light">{dsp.value}</span>
              </div>
              <hr className="h-1 w-10 rotate-90 border-sky-300" />
              <div className="flex flex-col items-center">
                <span className="text-2xl">{data?.depositPlaythough}x</span>
                <span className="text-sm font-light">Playthrough</span>
              </div>
              <hr className="h-1 w-10 rotate-90 border-sky-300" />
              <div className="flex flex-col items-center">
                <span className="text-xl">CODE</span>
                <span className="text-sm">{code}</span>
              </div>
            </div>

            {data.clean_name ? (
              <PlayCasinoLink
                casinoId={data.clean_name}
                className="flex h-14 w-full items-center justify-center rounded-lg bg-sky-700 text-white dark:bg-zinc-100 dark:text-zinc-900"
              >
                Claim Now
                <BsArrowRightCircleFill className="mx-4" />
              </PlayCasinoLink>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
