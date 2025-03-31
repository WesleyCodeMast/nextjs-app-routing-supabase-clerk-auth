import prisma from "@/client";
import Bonus3 from "@/components/Bonus3";
import BonusFilter from "@/components/functions/bonusfilter";
export default async function DefaultCasinos({ count = 10 }) {
  const amount = count ?? 10;
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
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
    orderBy: { new: "desc" },
    take: amount,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);

  return (
    <>
      <Bonus3 data={bonus} />
    </>
  );
}
