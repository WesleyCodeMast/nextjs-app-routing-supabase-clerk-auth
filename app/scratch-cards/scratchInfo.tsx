import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/client";
import {
  format,
  formatDistanceToNow,
  startOfMonth,
  subSeconds,
} from "date-fns";
import { RiH3 } from "react-icons/ri";
export async function ScratchInfo() {
  const session = await getServerSession(authOptions);
  let user: any = session?.user;

  const userId: string | null = user?.id ?? null;
  const now = new Date();
  const thisMonthWinners = await prisma.scratchCardAward.findMany({
    select: {
      id: true,
      usdAmount: true,
      createdAt: true,
      user: { select: { name: true } },
    },
    where: { createdAt: { gte: startOfMonth(now) } },
    orderBy: { createdAt: "asc" },
  });
  const lastMonthWinners = await prisma.scratchCardAward.findMany({
    select: {
      id: true,
      usdAmount: true,
      createdAt: true,
      user: { select: { name: true } },
    },
    where: {
      createdAt: {
        gte: startOfMonth(subSeconds(startOfMonth(now), 1)),
        lt: startOfMonth(now),
      },
    },
    orderBy: { createdAt: "asc" },
  });
  return (
    <>
      {userId ? null : (
        <>
          <h2 className="border-b border-blue-800 pb-12 pt-12 text-4xl font-semibold md:text-5xl dark:border-white">
            Welcome to the Free Scratch Card for real money game
          </h2>
          <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
            You have read that right, Allfreechips offers a free scratch card
            game you can play each hour for free, not only is it always free,
            you can win $25 cash. Because we hate waiting as much as anyone else
            we also award AFC Reward points as prizes. These reward points can
            also be used to play the scratch card game for free of course giving
            you many more chances to win. Another way to get the AFC Reward
            points is by opening our emails, each email will have a link to the
            Secret Chest that delivers 5 to 100 rewards for just opening the
            email.
          </p>
          <h3 className="border-b border-blue-800 pb-12 pt-12 text-4xl font-semibold md:text-5xl dark:border-white">
            Log in to play!
          </h3>
          <ul className="list-disc pl-4 font-normal">
            <li>
              <b>Always Free:</b> These scratch cards are always free, really!
            </li>
            <li>
              <b>Real money prizes:</b> The standard prize for a cash win is $25
              USD payable via Pay Pal to your email used to register here at
              Allfreechips
            </li>
            <li>
              <b>Seriously Fun:</b> Give it a try, it free and you can win cash,
              log in and go!
            </li>
          </ul>
          <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
            All contest wins on out free contests here are subject to the sole
            discretion of AFC MEDIA LLC, If we feel there is any reason at all
            not to pay we reserve that right. Reasons include cheating in some
            way, multiple accounts and any possibility I don&apos;t see coming!
          </p>
        </>
      )}
      <div className="flex-1">
        <h2 className="text-md font-bold">This Month&apos;s Winners</h2>
        {thisMonthWinners.length < 1 ? (
          <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
            No winners this month!
          </p>
        ) : (
          <ul className="list-decimal pl-12 font-normal">
            {thisMonthWinners.map((w) => (
              <li key={`award-${w.id}`}>
                {w.user.name || "Anonymous"} won ${w.usdAmount.toFixed(2)}{" "}
                {formatDistanceToNow(w.createdAt, { addSuffix: true })}!
              </li>
            ))}
          </ul>
        )}
        <hr />
        <h2 className="text-md font-bold">Last Month&apos;s Winners</h2>
        {lastMonthWinners.length < 1 ? (
          <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
            No winners last month!
          </p>
        ) : (
          <ul className="list-decimal pl-12 font-normal">
            {lastMonthWinners.map((w) => (
              <li key={`award-${w.id}`}>
                {w.user.name || "Anonymous"} won ${w.usdAmount.toFixed(2)} on{" "}
                {format(w.createdAt, "LLLL do")}!
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h4 className="border-b border-blue-800 pb-5 pt-5 text-3xl font-semibold md:text-3xl dark:border-white">
          Official Rules
        </h4>
        <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
          Payments for reward points are made during the actual game play, so
          they are instantly added to your balance. Cash awards are paid
          manually to you paypal account within the first week of the following
          month. The payments are only made to your paypal account that matches
          the email address of your user account here.
        </p>
        <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
          {" "}
          Please insure your email address used for your account is in fact
          added to your paypal account. Rules are quite simple, if you register
          a win here you have won, although Allfreechips has full rights to
          remove any cash winnings if we feel there is any fraud involved by
          using multiple accounts or any manipulation of the games. Also any
          winnings from errors on Allfreechips can also be voided as well. And
          as a last notification all cash winnings are verified by Allfreechips
          and can be voided for any reason we see fit.
        </p>
      </div>
    </>
  );
}
