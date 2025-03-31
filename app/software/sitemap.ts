import prisma from "@/client";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fullList = await prisma.casino_p_software.findMany({
    select: {
      link: true,
    },
  });

  const slugs = fullList.map((row) => row.link);

  return slugs.map((slug) => ({
    url: new URL(`/software/${slug}`, process.env.BASE_URL).toString(),
  }));
}
