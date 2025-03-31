import { headers } from "next/headers";
import { unstable_cache } from "next/cache";
import { revalidateTag } from "next/cache";
import prisma from "@/client";
export default async function GeoTarget(params) {
  //revalidateTag("top-list");
  const headersList = headers();
  const type = params.type;
  let visitorCountry = headersList.get("x-vercel-ip-country") || "US";
  const name = new Intl.DisplayNames(["en"], {
    type: "region",
  }).of(visitorCountry);
  if (params.countryCode == "") {
    params.countryCode = null;
  }

  const code = params.countryCode ?? visitorCountry ?? "US";

  const top_geo_casinos = "geo_casino_" + visitorCountry + type;
  const topCasinos = await unstable_cache(
    async () => topList(code, type),
    [top_geo_casinos],
    { revalidate: 80000, tags: [top_geo_casinos, "global_cache", "top-list"] },
  )();
  return { code, name, topCasinos };
}

async function topList(country, type = 1) {
  let top = await prisma.casino_p_toplist.findFirst({
    where: { code: country, list_id: type },
    select: { casino: true },
  });
  if (!top) {
    top = await prisma.casino_p_toplist.findFirst({
      where: { code: "CA", list_id: type },
      select: { casino: true },
    });
  }
  if (!top) {
    return null;
  }
  return top.casino;
}
