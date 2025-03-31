import prisma from "@/client";
import { redirect } from "next/navigation";
export default async function Home({ params }) {
  const slug = Number(params.slug);
  if (isNaN(slug)) {
    redirect("/casinos");
  }
  const data: any = await prisma.casino_p_publish_articles.findFirst({
    where: { a_id: slug },
    select: { casino_id: true },
  });
  const casinoid = data?.casino_id;
  const casino: any = await prisma.casino_p_casinos.findFirst({
    where: { id: casinoid },
    select: { clean_name: true },
  });
  const clean_name = casino?.clean_name;
  if (!clean_name) {
    redirect("/casinos");
  }
  redirect("/casinos/" + clean_name);
  // ...
}
