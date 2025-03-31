import { getCasinoUrl } from "@/app/lib/FetchCasino";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const searchParams = req.nextUrl.searchParams;
  const r = searchParams.get("r");
  if (r) {
    return NextResponse.redirect(
      new URL(
        `/play-casino/landing/${encodeURIComponent(params.slug)}`,
        req.url,
      ),
      302,
    );
  }

  let [casino_url] = await getCasinoUrl(params.slug);
  // record this action
  if (casino_url) {
    return NextResponse.redirect(new URL(casino_url), 302);
  }

  return NextResponse.redirect(new URL("/casinos", req.url), 302);
}
