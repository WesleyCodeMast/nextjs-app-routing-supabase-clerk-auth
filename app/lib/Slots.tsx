import prisma from "@/client";

export const getLikeSlots = async (swId, pageNum) => {
  if (swId) {
    const data = await prisma.casino_p_games.findMany({
      select: {
        game_id: true,
        game_name: true,
        game_clean_name: true,
        game_reels: true,
        game_lines: true,
        game_image: true,
        review: {
          select: {
            description: true,
          },
        },
        software: { select: { software_name: true } },
        game_ratings: { select: { rating: true } },
      },
      where: {
        game_software: { in: swId },
        vercel_image_url: { not: "" },
        game_images: {
          some: {
            vercel_image_url: { not: "" },
          },
        },

        review: {
          some: {
            description: {
              contains: "a",
            },
          },
        },
      },
      orderBy: { game_id: "desc" },
      take: pageNum * 5,
    });

    return data;
  } else {
    const data = await prisma.casino_p_games.findMany({
      select: {
        game_id: true,
        game_name: true,
        game_clean_name: true,
        game_reels: true,
        game_lines: true,
        game_image: true,
        review: {
          select: {
            description: true,
          },
        },
        software: { select: { software_name: true } },
        game_ratings: { select: { rating: true } },
      },
      where: {
        vercel_image_url: { not: "" },
        game_images: {
          some: {
            vercel_image_url: { not: "" },
          },
        },
        review: {
          some: {
            description: {
              contains: "a",
            },
          },
        },
      },
      orderBy: { game_id: "desc" },
      take: pageNum * 5,
    });

    return data;
  }
};
