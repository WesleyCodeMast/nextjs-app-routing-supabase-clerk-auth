import prisma from "@/client";
import { unstable_cache } from "next/cache";
import GeoTarget from "@/app/lib/GeoTarget";
import BonusFilter from "./functions/bonusfilter";
import Bonus3 from "./Bonus3";
import { revalidateTag } from "next/cache";
export default async function RandomCasino({ count }) {
  count = count ?? 1;
  return <CasinoOut count={count} />;
}

export async function CasinoOut({ count }) {
  const geo = await GeoTarget({ type: 1 });
  const random_casinos = geo.code + "_random_casino_" + count;
  const data = await unstable_cache(
    async () => getCas(geo.code, count),
    [random_casinos],
    {
      revalidate: 1800,
      tags: [random_casinos],
    },
  )();
  return (
    <div>
      <p className="text-center text-xl md:text-3xl">
        Exciting {geo.name} Casinos
      </p>
      <Bonus3 data={data} />
    </div>
  );
}
export async function getCas(code, count) {
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      vercel_image_url: { not: null },
      vercel_casino_button: { not: null },
      bonuses: { some: { deposit: { gt: 0 } } },
      OR: [
        {
          NOT: { casino_geo: { some: { country: code, allow: 0 } } },
          casino_geo: { some: { allow: 0 } },
        },
        {
          casino_geo: { some: { allow: 1, country: code } },
        },
      ],
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
    orderBy: [{ hot: "desc" }, { new: "desc" }],
    take: 30,
  });

  const rand = knuthShuffle(data);
  const rand3 = rand?.slice(0, count);
  const bdatav: any[] = rand3?.filter((p) => p.bonuses.length > 0);
  const bdata = BonusFilter(bdatav);
  return bdata;
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
