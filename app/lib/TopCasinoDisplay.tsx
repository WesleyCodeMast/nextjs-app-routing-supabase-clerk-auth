import prisma from "@/client";
import { unstable_cache } from "next/cache";
import Bonus3 from "@/components/Bonus3";
import BonusFilter from "@/components/functions/bonusfilter";
import { revalidateTag } from "next/cache";

export default async function TopCasinoDisplay(casinoList, code, type) {
  //revalidateTag("top-list");
  const top_geo_casinos = "geo_casino_" + code + type;
  const topCasinos = await unstable_cache(
    async () => topList(casinoList),
    [top_geo_casinos],
    { revalidate: 80000, tags: [top_geo_casinos, "global_cache", "top-list"] },
  )();
  if (topCasinos == null) {
    return null;
  }
  return (
    <>
      <Bonus3 data={topCasinos} />
    </>
  );
}

async function topList({ casinoList }) {
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
