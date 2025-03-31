import prisma from "@/client";
import BonusFilter from "@/components/functions/bonusfilter";
import Bonus3 from "@/components/Bonus3";
import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";
import GeoTarget from "./GeoTarget";

//added to synch
//export const rem = revalidateTag("global_cache");

// Type :  1 : JUst best casino bonuses may include ND
//         2 : No Deposit bonuses
//         3 : Homepage pics
export default async function TopCasinos(params) {
  //revalidateTag("global_cache");

  if (params.type == "") {
    params.type = null;
  }
  if (params.country == "") {
    params.country = null;
  }
  const type: Number = params.type ?? 1;
  let geo;
  let defVal = "";
  let countryCode = params.country ?? "";
  if (countryCode == "") {
    geo = await GeoTarget({ type: type, countryCode: countryCode });
    countryCode = null;
    defVal = "def";
  }

  const topCasinos =
    geo?.topCasinos ?? new Array(1301, 1262, 881, 1183, 1129, 1244, 836, 951);
  const code = countryCode ?? geo?.code ?? "US";
  const top_geo_casinos = "top_hp_casinos_" + code + type + defVal;

  const casinoData = await unstable_cache(
    async () => topList(topCasinos),
    [top_geo_casinos],
    {
      revalidate: 80000,
      tags: [top_geo_casinos, "global_cache", "top-hp-list-casinos"],
    },
  )();

  return (
    <>
      <Bonus3 data={casinoData} />
    </>
  );
}

async function topList(casinoList) {
  const casino = await prisma.casino_p_casinos.findMany({
    where: {
      id: { in: casinoList },
      bonuses: {
        some: {
          deposit_amount: { gt: 0 },
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
  });
  if (casino) {
    const topResult = casinoList.map((n) => casino.find((i) => i.id === n));
    const tdata: any[] = topResult?.filter((p) => p?.bonuses?.length > 0);
    const topCasinos = BonusFilter(tdata);
    return topCasinos;
  }
  return null;
}
