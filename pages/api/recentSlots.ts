import prisma from "../../client";

export default async function handler(req, res) {
  try {
    if (req.query.swId) {
      const data = await prisma.casino_p_games.findMany({
        select: {
          game_id: true,
          game_name: true,
          game_clean_name: true,
          game_reels: true,
          game_lines: true,
          game_image: true,
          software: { select: { software_name: true } },
          game_ratings: { select: { rating: true } },
        },
        where: {
          game_software: {
            in: req.query.swId,
          },
          review: {
            every: {
              description: {
                not: "",
              },
            },
          },
        },
        take: 5,

        skip: (req.query.pageNumber - 1) * 5,
      });

      res.status(200).json({ data: data });
    } else {
      const data = await prisma.casino_p_games.findMany({
        select: {
          game_id: true,
          game_name: true,
          game_clean_name: true,
          game_reels: true,
          game_lines: true,
          game_image: true,
          software: { select: { software_name: true } },
          game_ratings: { select: { rating: true } },
        },
        where: {
          review: {
            every: {
              description: {
                not: "",
              },
            },
          },
        },
        take: 5,
        skip: (req.query.pageNumber - 1) * 5,
      });
      res.status(200).json({ data: data });
    }
  } catch (err) {
    console.log("This is deposit area.." + err);
  } finally {
    //await prisma.$disconnect(); We now use one connections
  }
}
