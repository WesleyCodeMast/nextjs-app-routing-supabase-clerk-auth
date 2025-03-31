"use client";

import { useInterval } from "@/hooks/use-interval";
import { useRouter } from "next/navigation";
import { hasNewerDigest } from "./action";

export function ShoutUpdater({ currentDigest }: { currentDigest: string }) {
  const router = useRouter();
  useInterval(async () => {
    const res = await hasNewerDigest(currentDigest);
    if (res.refresh) {
      router.refresh();
    }
  }, 3000);
  return null;
}
