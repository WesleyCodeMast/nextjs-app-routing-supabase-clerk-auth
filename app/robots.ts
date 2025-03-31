import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admincp/*",
    },
    sitemap: [
      new URL("/sitemap.xml", process.env.BASE_URL).toString(),
      new URL("/casino-banks/sitemap.xml", process.env.BASE_URL).toString(),
      new URL("/software/sitemap.xml", process.env.BASE_URL).toString(),
      new URL("/slots/sitemap.xml", process.env.BASE_URL).toString(),
      new URL("/casinos/sitemap.xml", process.env.BASE_URL).toString(),
    ],
  };
}
