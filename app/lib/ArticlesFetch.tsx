import prisma from "@/client";

export const articleFetch = async (pageNum) => {
  const data = await prisma.casino_p_publish_articles.findMany({
    select: {
      a_id: true,
      title: true,
      code: true,
      url: true,
      article: true,
      bonuscode: true,
      bonuspercent: true,
      bonusamount: true,
      maxcashout: true,
      freespins: true,
      bonusplaythrough: true,
      exclusive: true,
      nodeposit: true,
      freetime: true,
      playertype: true,
      tournament: true,
      startdate: true,
      enddate: true,
      game_id: true,
      date: true,
      casino: {
        select: {
          id: true,
          currency_val: true,
          casino: true,
          vercel_image_url: true,
          clean_name: true,
          button: true,
        },
      },
      game: {
        select: {
          game_name: true,
          game_clean_name: true,
          vercel_image_url: true,
        },
      },
    },
    where: {
      casino: {
        AND: [
          {
            approved: 1,
          },
          {
            rogue: 0,
          },
        ],
      },
    },
    orderBy: {
      a_id: "desc",
    },
    take: 10 * pageNum,
  });
  return data;
};
