import { uploadGameImages } from "@/app/lib/UploadImages";
import { NextResponse } from "next/server";

export const revalidate = 0;
export async function GET(req: Request) {
  const result = await uploadGameImages();
  return NextResponse.json({
    result: result,
  });
}
