import { removeItemfromNotificationlist } from "@/app/lib/NotificationFetch";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json({ status: 405 });
  }

  const { id } = (await req.json()) as any;

  const result = await removeItemfromNotificationlist(id);
  if (result) {
    return NextResponse.json({ status: 200 });
  }

  return NextResponse.json({ status: 500 });
}
