import prisma from "@/client";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fullList = await prisma.casino_p_games.findMany({
    select: {
      game_clean_name: true,
    },
    where: {
      game_image: { not: "" },
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
  });
  const slugs = fullList.map((row) => row.game_clean_name);

  return slugs.map((slug) => ({
    url: new URL(`/slots/${slug}`, process.env.BASE_URL).toString(),
  }));
}
