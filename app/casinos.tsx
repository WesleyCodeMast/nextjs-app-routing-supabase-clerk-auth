import prisma from "@/client";
import Bonus from "@/components/Bonus";
import Bonus3 from "@/components/Bonus3";
import CasinoSingleCardA from "@/components/CasinoSIngleCardA";
import BonusFilter from "@/components/functions/bonusfilter";
import { headers } from "next/headers";
import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import TopCasinos from "./lib/TopCasinos";
async function getCasinos(visitorCountry: string) {
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      vercel_image_url: { not: null },
      vercel_casino_button: { not: null },
      bonuses: { some: { nodeposit: { gt: 0 }, freespins: { lt: 1 } } },
      OR: [
        {
          NOT: { casino_geo: { some: { country: visitorCountry, allow: 0 } } },
          casino_geo: { some: { allow: 0 } },
        },
        {
          casino_geo: { some: { allow: 1, country: visitorCountry } },
        },
      ],
    },
    distinct: ["id"],
    select: {
      id: true,
      clean_name: true,
      url: true,
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
    take: 12,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);

  return { bonus };
}

const bestCasinoLookup: Record<string, number> = {
  US: 1302,
  AU: 965,
  NZ: 965,
  CA: 881,
  GB: 912,
};

async function CasinosImpl() {
  const headersList = headers();
  const visitorCountry = headersList.get("x-vercel-ip-country") || "US";
  const visitorCountryName = new Intl.DisplayNames(["en"], {
    type: "region",
  }).of(visitorCountry);

  const geo_casinos = "geo_casino_" + visitorCountry;

  const { bonus } = await unstable_cache(
    async () => getCasinos(visitorCountry),
    [geo_casinos],
    { revalidate: 3000, tags: [geo_casinos] },
  )();

  const casinos = bonus;
  const cardData = {
    title: `Best ${visitorCountryName ?? visitorCountry} Casino`,
    casino_id: bestCasinoLookup[visitorCountry] ?? 1302,
  };

  return (
    <>
      <div className="px-2 py-4 text-center">
        <h2 className="px-8 py-4 text-2xl font-semibold md:py-14 md:text-5xl">
          Best Online Gambling Sites in {visitorCountryName ?? visitorCountry}
        </h2>
      </div>
      <CasinoSingleCardA data={cardData} />
      <Bonus3 data={casinos} />
    </>
  );
}

async function CasinosDefault() {
  const defaultCasino = await prisma.site_setting.findFirstOrThrow({
    where: { name: "top-hp-US" },
    select: { value: true },
  });

  const visitorCountry = "US";
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      vercel_image_url: { not: null },
      vercel_casino_button: { not: null },
      bonuses: { some: { nodeposit: { gt: 0 }, freespins: { lt: 1 } } },
      OR: [
        {
          NOT: { casino_geo: { some: { country: visitorCountry, allow: 0 } } },
          casino_geo: { some: { allow: 0 } },
        },
        {
          casino_geo: { some: { allow: 1, country: visitorCountry } },
        },
      ],
    },
    distinct: ["id"],
    select: {
      id: true,
      clean_name: true,
      url: true,
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
    take: 12,
  });
  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  const casinoId = Number(defaultCasino.value);
  if (isNaN(casinoId) || casinoId < 1) {
    throw new Error("invariant: missing default Canada casino");
  }

  const cardData = {
    title: `Best Casino`,
    casino_id: casinoId,
  };

  return (
    <>
      <div className="px-2 py-4 text-center">
        <h2 className="px-8 py-4 text-2xl font-semibold md:py-14 md:text-5xl">
          Best Online Gambling Sites
        </h2>
      </div>
      <CasinoSingleCardA data={cardData} />
      <Bonus data={bonus} />
    </>
  );
}

export default async function Casinos() {
  return (
    <Suspense fallback={<CasinosDefault />}>
      <CasinosImpl />
    </Suspense>
  );
}
