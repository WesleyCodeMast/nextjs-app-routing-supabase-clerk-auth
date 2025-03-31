import { MetadataRoute } from "next";
import { globby } from "globby";
import { extractRoute } from "@/lib/extract-app-page";

const internalPages = new Set([
  "/news/admin",
  "/messages",
  "/myprofile",
  "/vercel-blob",
  "/admincp/play",
  "/admincp/image",
  "/admincp/email",
  "/admincp/interlinks",
  "/admincp/slotimg",
  "/admincp/interlinks",
  "/interlinks",
  "/no-deposit-casinos-dev",
  "/privacy",
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let pages = await globby(["app/**/page.{js,ts,jsx,tsx}"]);

  // Non-dynamic:
  pages = pages.filter((p) => !/\[.+\]/.test(p));

  // Turn into friendly names:
  pages = pages.map((p) => extractRoute(p)!);

  // Skip internal pages:
  pages = pages.filter((p) => !internalPages.has(p));

  return pages
    .map((p) => ({
      url: new URL(p, process.env.BASE_URL!).toString(),
    }))
    .filter(Boolean);
}
