import prisma from "@/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import PayItem from "./_components/PayItem";
import { ScratcherButton } from "./button";
import { playScratch } from "./play";
import { activePrizeChipStyle, isReadyForPlay } from "./shared";
import { ScratcherSymbol } from "./symbol";

export async function Scratcher() {
  const session = await getServerSession(authOptions);
  let userEmail = session?.user?.email;
  if (!userEmail) {
    userEmail = null; //  stop prisma from returning a val on undefined
  }

  const user = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });

  if (user == null) {
    return <main />;
  }

  // TODO: handle unknown user
  const {
    isReady: canPlay,
    isFreePlay,
    humanWhen,
    lastOutcome,
    points,
  } = await isReadyForPlay(user);

  async function play(data: FormData) {
    "use server";
    // TODO: error handling
    const response = await playScratch(data);
    revalidatePath("/scratch-cards");
  }

  return (
    <main>
      <form action={play}>
        <div className="m-2 flex max-w-[400px] flex-wrap">
          <div className="w-full p-0 text-center">
            <Image
              unoptimized
              className="mx-auto"
              src="https://www.allfreechips.com/image/i/schead.png"
              width={400}
              height={40}
              alt="AFC Scratch Card"
            />
          </div>
          <div
            className="w-full p-2 text-center"
            style={{ backgroundImage: 'url("/background/scratch_bg.png")' }}
          >
            <section
              className="mx-auto mb-4 mt-4 grid w-fit grid-cols-1 items-center justify-items-center gap-x-10 gap-y-8 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3"
              style={{ height: "310px" }}
            >
              {Array(9)
                .fill(null)
                .map((_, idx) => (
                  <ScratcherSymbol
                    key={idx}
                    isScratchMode={Boolean(canPlay && isFreePlay)}
                    className={`h-16 rounded-md object-cover
                          ${
                            lastOutcome != null &&
                            lastOutcome.table[idx] === lastOutcome.prize
                              ? "bg-slate-300"
                              : ""
                          }`}
                    src={
                      lastOutcome != null
                        ? lastOutcome.table[idx]
                        : `data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7`
                    }
                    alt="Icon"
                  />
                ))}
            </section>
            <section className="mx-auto mb-4 mt-4 grid w-fit grid-cols-2 items-center justify-items-center gap-y-2">
              <PayItem
                text="$25 Cash"
                avatar={activePrizeChipStyle.VALUE_25_USD}
                isFreePlay={isFreePlay}
                lastOutcome={lastOutcome}
              />
              <PayItem
                text="25 AFC Rewards"
                avatar={activePrizeChipStyle.VALUE_25_PTS}
                isFreePlay={isFreePlay}
                lastOutcome={lastOutcome}
              />
              <PayItem
                text="15 AFC Rewards"
                avatar={activePrizeChipStyle.VALUE_15_PTS}
                isFreePlay={isFreePlay}
                lastOutcome={lastOutcome}
              />
              <PayItem
                text="10 AFC Rewards"
                avatar={activePrizeChipStyle.VALUE_10_PTS}
                isFreePlay={isFreePlay}
                lastOutcome={lastOutcome}
              />
            </section>
          </div>
        </div>
        <div className="w-full p-2 text-center">
          <section className="mx-auto mb-4 mt-4 grid w-fit grid-cols-2 gap-x-14 gap-y-20 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            <ScratcherButton
              disabled={!(canPlay && isFreePlay)}
              type="submit"
              className="rounded-full border border-neutral-800 bg-white px-4 py-2 font-bold text-sky-700 disabled:opacity-25 dark:bg-zinc-600 dark:text-white"
            >
              Free Play
            </ScratcherButton>
            <ScratcherButton
              disabled={!(canPlay && !isFreePlay)}
              type="submit"
              className="ml-2 rounded-full border border-neutral-800 bg-white px-4 py-2 font-bold text-sky-700 disabled:opacity-25 dark:bg-zinc-600 dark:text-white"
            >
              Point Play ({points})
            </ScratcherButton>
          </section>
        </div>

        <div className="p-4 text-center">
          {canPlay ? (
            isFreePlay ? (
              <h1 className="text-3xl font-bold">
                Click Free Play now to claim your prize!
              </h1>
            ) : (
              <h1 className="text-3xl font-bold">
                Play now using 1 AFC Reward Point, or wait {humanWhen} to play
                again for free!
              </h1>
            )
          ) : (
            <h1 className="text-3xl font-bold">
              Free play available again in {humanWhen}.
            </h1>
          )}
        </div>
      </form>
    </main>
  );
}
