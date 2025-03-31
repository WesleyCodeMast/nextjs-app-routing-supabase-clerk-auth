import { recentNewsFetch } from "@/app/lib/NewsFetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json({ status: 405 });
  }
  const { softwareCat, slotCat, casinoCat, count } = (await req.json()) as any;

  const result = await recentNewsFetch({
    softwareCat,
    slotCat,
    casinoCat,
    count,
  });

  if (result) return NextResponse.json(result);

  return NextResponse.json(false);
}
