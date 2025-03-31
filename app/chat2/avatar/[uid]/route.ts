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

  /*
   <svg
      className="absolute w-14 h-14 text-gray-400 -left-1"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      ></path>
    </svg>
    */
  return new Response(null, {
    status: 204,
  });
}
