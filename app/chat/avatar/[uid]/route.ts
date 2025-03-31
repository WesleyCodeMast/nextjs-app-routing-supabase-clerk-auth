import prisma from "@/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { uid: string } },
) {
  const author = await prisma.user.findFirst({
    select: { image: true },
    where: { id: params.uid },
  });

  if (author?.image?.startsWith("data:")) {
    const [, type, encoding, rest] = author.image.split(/:|;|,/g);
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
