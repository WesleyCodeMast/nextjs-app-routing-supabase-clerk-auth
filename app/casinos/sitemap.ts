import prisma from "@/client";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fullList = await prisma.casino_p_casinos.findMany({
    select: {
      clean_name: true,
    },
    where: {
      approved: 1,
      rogue: 0,
    },
  });
  const slugs = fullList.map((row) => row.clean_name);

  return slugs.map((slug) => ({
    url: new URL(`/casinos/${slug}`, process.env.BASE_URL).toString(),
  }));
}
