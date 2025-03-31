import GeoTarget from "../lib/GeoTarget";
import prisma from "@/client";
import Bonus3 from "@/components/Bonus3";
import { unstable_cache } from "next/cache";
import BonusFilter from "@/components/functions/bonusfilter";
import { revalidateTag } from "next/cache";

export default async function CasinoDisp({ type, countrycode, casinoNum }) {
  let geo;

  if (countrycode == "") {
    countrycode = null;
    geo = await GeoTarget({ type: type, countryCode: "" });
  }

  const exclude = geo?.topCasinos ?? new Array(2, 3); // if empty exclude casinos that don't exist.
  let casTake = casinoNum * 6;
  const code = countrycode ?? geo?.code ?? "US"; // Get hardcoded if set then Geolocation if not.

  const geo_casinos = "geo_nd_casinos_" + code + "_" + casinoNum;
  // revalidateTag(geo_casinos);

  const casinoDisp = await unstable_cache(
    async () =>
      GetCasinos({ casinoNum: casTake, exclude: exclude, code: code }),
    [geo_casinos],
    {
      revalidate: 7200,
      tags: [geo_casinos],
    },
  )();

  return (
    <>
      <Bonus3 data={casinoDisp} />
    </>
  );
}

async function GetCasinos(params) {
  const exclude = params.exclude;
  const casTake = params.casinoNum;
  const code = params.code;
  //console.log("CACHED : " + code);
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      id: { not: { in: exclude } },
      vercel_image_url: { not: null },
      vercel_casino_button: { not: null },
      OR: [
        {
          NOT: { casino_geo: { some: { country: code, allow: 0 } } },
          casino_geo: { some: { allow: 0 } },
        },
        {
          casino_geo: { some: { allow: 1, country: code } },
        },
      ],
      bonuses: {
        some: {
          nodeposit: { gt: 0 },
          freespins: { lt: 1 },
        },
      },
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
    orderBy: [{ hot: "desc" }, { new: "desc" }, { nodeposit: "desc" }],
    take: casTake,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return bonus;
}
