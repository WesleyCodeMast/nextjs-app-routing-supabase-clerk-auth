import prisma from "../../client";
import BonusFilter from "../../components/functions/bonusfilter";

export default async function handler(req, res) {
  try {
    const data = await prisma.casino_p_casinos.findMany({
      where: {
        approved: 1,
        rogue: 0,
        bonuses: {
          some: {
            nodeposit: { gt: 0 },
            freespins: { lt: 1 },
          },
        },
      },
      distinct: ["id"],
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
      take: 5,
      skip: (req.query.pageNumber - 1) * 5,
    });

    const bdata = data.filter((p) => p.bonuses.length > 0);
    const bonus = BonusFilter(bdata);

    res.status(200).json({ bonus: bonus });
  } catch (err) {
    console.log("This is deposit area.." + err);
  } finally {
    //await prisma.$disconnect(); We now use one connections
  }
}
