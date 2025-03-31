import prisma from "@/client";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fullList = await prisma.casino_p_banks.findMany({
    select: {
      name: true,
    },
    where: {
      status: { equals: 1 },
      w: { gt: 0 },
    },
  });
  const slugs = fullList.map((row) => row.name);

  return slugs.map((slug) => ({
    url: new URL(`/casino-banks/${slug}`, process.env.BASE_URL).toString(),
  }));
}
