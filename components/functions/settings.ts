import prisma from "@/client";
import { unstable_cache } from "next/cache";

export default async function Settings() {
  const settings = await unstable_cache(
    async () => getSettings(),
    ["settings"],
    {
      tags: ["settings"],
    },
  )();

  return settings;
}

async function getSettings() {
  const settings = await prisma.site_setting.findMany({
    select: { name: true, value: true },
  });

  const obj = settings.reduce((prev, curr) => {
    prev[curr.name] = curr.value;
    return prev;
  }, {});

  return obj;
}
