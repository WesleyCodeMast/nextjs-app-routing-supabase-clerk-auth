import prisma from "@/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { nid: string } },
) {
  const news = await prisma.news.findFirst({
    select: { image: true },
    where: { id: Number(params.nid) },
  });

  if (news?.image?.startsWith("data:")) {
    const [, type, encoding, rest] = news.image.split(/:|;|,/g);
    if (encoding === "base64") {
      const b = Buffer.from(rest, "base64");
      return new Response(b, {
        status: 200,
        headers: new Headers({
          "content-type": type,
          "cache-control": "public, max-age=60, stale-while-revalidate=3600",
        }),
      });
    }
  }

  return new Response(null, {
    status: 204,
  });
}
