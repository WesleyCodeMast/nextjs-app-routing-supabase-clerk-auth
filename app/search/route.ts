import { getCount, searchData } from "@/app/lib/SearchFetch";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = Number(searchParams.get("type") ?? "");
  const searchkey = searchParams.get("searchkey") ?? "";
  const firstPageIndex = Number(searchParams.get("firstPageIndex"));
  return NextResponse.json({
    count: await getCount(type, searchkey),
    data: await searchData(type, searchkey, firstPageIndex),
  });
}
