"use server";
import prisma from "@/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth/next";
import crypto from "node:crypto";
import {
  isReadyForPlay,
  activePrizeChipStyle as prizeChips,
  shuffle,
} from "./shared";

export async function playScratch(formData: FormData) {
  const session = await getServerSession(authOptions);
  let userEmail = session?.user?.email;
  if (userEmail == undefined) {
    userEmail = null; //  stop prisma from returning a val on undefined
  }

  const user = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });
  const userId: string | null = user?.id ?? null;
  if (user == null || userId == null) {
    throw new Error("User not found");
  }

  const {
    isReady: canPlay,
    isFreePlay,
    canWinCash,
  } = await isReadyForPlay(user);

  if (!canPlay) {
    throw new Error("Most recent play was too soon");
  }

  const defaultBoard: string[] = shuffle([
    prizeChips.VALUE_0,
    prizeChips.VALUE_0,
    prizeChips.VALUE_00,
    prizeChips.VALUE_00,
    prizeChips.VALUE_10_PTS,
    prizeChips.VALUE_10_PTS,
    prizeChips.VALUE_15_PTS,
    prizeChips.VALUE_15_PTS,
    prizeChips.VALUE_25_PTS,
    prizeChips.VALUE_25_PTS,
    prizeChips.VALUE_25_USD,
    prizeChips.VALUE_25_USD,
  ]);
  const odds = await prisma.site_setting.findFirst({
    where: {
      name: "scratch_odds",
    },
  });

  const use_odds = Number(odds?.value) ?? 1200;

  let prize: string | null = null;
  const chance = crypto.randomInt(use_odds);
  switch (chance) {
    case 100: {
      // $25 USD reward
      prize = canWinCash ? prizeChips.VALUE_25_USD : prizeChips.VALUE_25_PTS;
      break;
    }
    case 700:
    case 710:
    case 79:
    case 72:
    case 200:
    case 210:
    case 50:
    case 78:
    case 220: {
      // 25 AFC reward points
      prize = prizeChips.VALUE_25_PTS;
      break;
    }
    case 301:
    case 311:
    case 312:
    case 322:
    case 322:
    case 332:
    case 332:
    case 342:
    case 342:
    case 352:
    case 362:
    case 372:
    case 300:
    case 310:
    case 315:
    case 325:
    case 320:
    case 330:
    case 335:
    case 340:
    case 345:
    case 350:
    case 360:
    case 370: {
      // 15 AFC reward points
      prize = prizeChips.VALUE_15_PTS;
      break;
    }
    case 500:
    case 510:
    case 515:
    case 518:
    case 525:
    case 520:
    case 530:
    case 540:
    case 545:
    case 400:
    case 410:
    case 415:
    case 418:
    case 425:
    case 420:
    case 430:
    case 440:
    case 445:
    case 450:
    case 460:
    case 470: {
      // 10 AFC reward points
      prize = prizeChips.VALUE_10_PTS;
      break;
    }
    default: {
      prize = null;
      break;
    }
  }

  const outcome =
    prize == null
      ? defaultBoard.slice(0, 9)
      : shuffle([
          ...Array(3).fill(prize),
          ...defaultBoard.filter((p) => p !== prize).slice(0, 6),
        ]);
  const prizeSet = [
    prizeChips.VALUE_25_USD,
    prizeChips.VALUE_25_PTS,
    prizeChips.VALUE_15_PTS,
    prizeChips.VALUE_10_PTS,
  ];
  const tx = await prisma.$transaction([
    ...(isFreePlay
      ? []
      : [
          prisma.user.update({
            where: { id: userId },
            data: { afcRewards: { decrement: 1 } },
          }),
        ]),
    prisma.scratchCardGame.create({
      data: {
        user: { connect: { id: userId } },
        outcome: outcome,
        prize: prize,
        chipset: prizeSet,
        freePlay: isFreePlay,
        ScratchCardAward:
          prize === prizeChips.VALUE_25_USD && user.role !== 2
            ? {
                create: {
                  awarded: false,
                  user: { connect: { id: userId } },
                  usdAmount: 25,
                },
              }
            : undefined,
      },
    }),
    ...(prize === prizeChips.VALUE_25_PTS
      ? [
          prisma.user.update({
            where: { id: userId },
            data: { afcRewards: { increment: 25 } },
          }),
        ]
      : []),
    ...(prize === prizeChips.VALUE_15_PTS
      ? [
          prisma.user.update({
            where: { id: userId },
            data: { afcRewards: { increment: 15 } },
          }),
        ]
      : []),
    ...(prize === prizeChips.VALUE_10_PTS
      ? [
          prisma.user.update({
            where: { id: userId },
            data: { afcRewards: { increment: 10 } },
          }),
        ]
      : []),
  ]);

  return {
    outcome,
    prize,
  };
}
