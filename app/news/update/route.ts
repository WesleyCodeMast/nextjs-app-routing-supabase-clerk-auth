import { addNews } from "@/app/lib/NewsFetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json({ status: 405 });
  }
  const { payload } = (await req.json()) as any;

  const result = await addNews(payload);

  if (result) return NextResponse.json(result);

  return NextResponse.json(false);
}
