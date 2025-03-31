import prisma from "@/client";
import { User } from "@prisma/client";
import {
  addHours,
  formatDistanceToNowStrict,
  isAfter,
  startOfMonth,
} from "date-fns";
import crypto from "node:crypto";

export interface PrizeChipImages {
  VALUE_25_USD: string;
  VALUE_25_PTS: string;
  VALUE_15_PTS: string;
  VALUE_10_PTS: string;
  VALUE_0: string;
  VALUE_00: string;
}
interface PrizeChips {
  [style: string]: PrizeChipImages;
}

const prizeChips: PrizeChips = {
  style1: {
    VALUE_25_USD: "https://www.allfreechips.com/image/svg/pink.svg",
    VALUE_25_PTS: "https://www.allfreechips.com/image/svg/lucky-charm.svg",
    VALUE_15_PTS: "https://www.allfreechips.com/image/svg/box.svg",
    VALUE_10_PTS: "https://www.allfreechips.com/image/svg/money.svg",
    VALUE_0: "https://www.allfreechips.com/image/svg/gaming.svg",
    VALUE_00: "https://www.allfreechips.com/image/svg/2gaming.svg",
  },
  style2: {
    VALUE_25_USD: "https://www.allfreechips.com/image/svg/pink.svg",
    VALUE_25_PTS: "https://www.allfreechips.com/image/svg/lucky-charm.svg",
    VALUE_15_PTS: "https://www.allfreechips.com/image/svg/box.svg",
    VALUE_10_PTS: "https://www.allfreechips.com/image/svg/money.svg",
    VALUE_0: "https://www.allfreechips.com/image/svg/gaming.svg",
    VALUE_00: "https://www.allfreechips.com/image/svg/2gaming.svg",
  },
} satisfies PrizeChips;

export const activePrizeChipStyle = prizeChips.style1;

export async function isReadyForPlay(user: User): Promise<{
  isReady: boolean;
  humanWhen: string;
  isFreePlay: boolean;
  lastOutcome: { prize: string | null; table: string[] } | null;
  points: number;
  canWinCash: boolean;
}> {
  const latestPlay = await prisma.scratchCardGame.findFirst({
    where: {
      user_id: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const limit = await prisma.site_setting.findFirst({
    where: {
      name: "scratch_limit",
    },
  });

  let hardLimit = Number(limit?.value) ?? 5;
  if (isNaN(hardLimit)) {
    hardLimit = 5;
  }

  const lastFreePlay = await prisma.scratchCardGame.findFirst({
    where: {
      user_id: user.id,
      freePlay: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const usdWinCount = await prisma.scratchCardAward.count({
    where: { createdAt: { gte: startOfMonth(new Date()) } },
  });
  const canWinCash = usdWinCount < hardLimit;

  const freePlayAt =
    lastFreePlay == null ? new Date() : addHours(lastFreePlay.createdAt, 1);
  const isFreePlay = lastFreePlay == null || isAfter(new Date(), freePlayAt);
  return {
    isReady: isFreePlay || user?.afcRewards >= 1,
    humanWhen: formatDistanceToNowStrict(freePlayAt),
    isFreePlay,
    lastOutcome:
      latestPlay != null
        ? { table: latestPlay.outcome, prize: latestPlay.prize }
        : null,
    points: user?.afcRewards,
    canWinCash,
  };
}

export function shuffle<T>(array: T[]): T[] {
  const randomNumbers: number[] = [];
  for (let i = array.length - 1; i > 0; i--) {
    randomNumbers.push(crypto.randomInt(i));
  }

  for (let i = array.length - 1; i > 0; i--) {
    const j = randomNumbers[array.length - i - 1];
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}
