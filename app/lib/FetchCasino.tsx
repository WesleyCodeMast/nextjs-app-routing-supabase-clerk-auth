import prisma from "@/client";
import BonusFilter from "@/components/functions/bonusfilter";

export async function casinoData(cid) {
  "use server";

  const cdata = await prisma.casino_p_casinos.findMany({
    where: {
      id: cid,
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

export const getCasinoUrl = async (cname) => {
  "use server";
  const cdata = await prisma.casino_p_casinos.findFirst({
    where: {
      clean_name: cname,
    },
    select: {
      id: true,
      clean_name: true,
      url: true,
    },
  });
  return [cdata?.url, cdata?.clean_name];
};
