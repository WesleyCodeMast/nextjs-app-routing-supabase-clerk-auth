import buildInterlinks from "../lib/buildInterlinks";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(req: Request) {
  const result = await buildInterlinks();
  return NextResponse.json({
    result: result,
  });
}
