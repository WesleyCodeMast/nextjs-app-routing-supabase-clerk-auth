import { LoadImage } from "@/app/lib/images/LoadImage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { slug: string } },
) {
  const blob = await LoadImage(params.slug, 5);
  const headers = new Headers();

  //   const result = await RemoveBankLargeImages(params.slug);
  return NextResponse.json({
    result: true,
  });
}
