import FaqJsonLD from "@/components/FaqJsonLDX";
import Homework from "@/components/Homework";
import ProSchema from "@/components/ProJsonLDX";
import ProsCons from "@/components/ProsCons";
import Faq from "@/components/faq";
import monthYear from "@/components/functions/monthYear";
import { Metadata } from "next";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import MobileJump from "../components/MobileJump";
import { revalidatePath } from "next/cache";
import { LoadMoreButton } from "../components/loadMoreButton";
import { Suspense } from "react";
import GeoCountryName from "../lib/GeoCountryName";
import TopCasinos from "../lib/TopCasinos";
import DefaultCasinos from "../lib/DefaultCasinos";
import CasinoDisp from "./CasinoDIsp";
let casinoNum = 1;

async function loadMoreCasino(formData) {
  "use server";

  casinoNum = Number(formData.get("casinoNumber")) + 1;
  revalidatePath("CURRENT PAGE");
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = monthYear() + " Collection of Free Spin No Deposit Casinos";
  const description =
    "Free Spin Casinos with no deposit, we have all the no deposit free spins casino for " +
    monthYear() +
    ".";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}

export default async function PageOut(params) {
  const prosCons = {
    pros: [
      {
        title: "Legit?",
        content:
          "Yes the Free Spin bonus is legit but it's not 100% free as you need to complete wager requirements to cash out.",
      },
      {
        title: "No Risk",
        content:
          "The best part of Free Spins with no deposit bonuses is the fact you do not need to stake your own cash to play.",
      },
    ],
    cons: [
      {
        title: "High Wager Requirements",
        content:
          "Like regular no deposit casino bonuses, the free spin bonuses have usually high play-through requirements up to 50X the bonus in many cases.",
      },
    ],
  };

  const faq = [
    {
      question: "What is a free spin casino Bonus that requires no deposit?",
      answer:
        "A great promotion that allows players to experience a slot machine for free.  You are given X number of spins for free, and your winnings are placed into a bonus account. This bonus account is then subject to wager requirements before you can cash out.",
    },
    {
      question: "Are free spins without deposit legal in all areas?",
      answer:
        "NO, some locations like the UK feel players are too attracted to the word Free so they do not allow any language with the word free in them.",
    },
    {
      question: "Do people ever cash out on free spin bonuses without deposit?",
      answer:
        "Yes! although the high play-through odds are against you many people including the author have previously withdrawn funds from these free bonus offers.",
    },
  ];

  const author = "AFC Chris";

  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustraiting years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const links = [
    { link: "#ProsCons", text: `Free Spin Pros and Cons` },
    { link: "#faq", text: `Free Spin FAQs` },
  ];

  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema
        prosCons={prosCons}
        name="Free Spin Casinos"
        product="Casinos with Free Spins"
      />
      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            Best Free Spin No Deposit Casinos For {monthYear()}
          </h1>

          <div className="mt-3 rounded-xl bg-slate-100 dark:bg-gray-200 dark:text-black">
            <div className="card p-4">
              <div className="heading flex items-center gap-7 border-b pb-4">
                <span className="h-7 w-10 rounded bg-sky-700 dark:bg-zinc-800"></span>
                <h2 className="text-lg">
                  Why you should play{" "}
                  <span className="font-bold">Free Spin Casinos</span>
                </h2>
              </div>
              <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
                Many people know of the{" "}
                <Link
                  className="font-semibold text-blue-600 hover:underline dark:text-orange-300"
                  href="/no-deposit-casinos"
                >
                  no deposit casino bonuses
                </Link>{" "}
                offered by many Online Casinos but did you know about the Free
                Spin casino bonuses? Free Spin{" "}
                <Link
                  className="font-semibold text-blue-600 hover:underline dark:text-orange-300"
                  href="/"
                >
                  Casino bonuses
                </Link>{" "}
                are just what it sounds like. You get a number of free spins on
                a selected slot machine to try and win as much as you can at no
                risk to your deposited bankroll. You are actually spinning the
                reels for free, but all your winnings go into a casino bonus
                account. Some casinos will limit the amount of winnings that are
                put into this account but some allow you to keep whatever you
                are able to win with your free spins. The second part of the
                type of casino bonus is to then gamble with the free spin
                winnings at they regular{" "}
                <Link
                  className="font-semibold text-blue-600 hover:underline dark:text-orange-300"
                  href="/slots"
                >
                  casino games
                </Link>{" "}
                with an attached play through amount. So you see at this point
                the free spin promo simply turns into a no deposit bonus but you
                had the ability to win the amount of the no deposit casino
                Bonus.
              </p>
            </div>
          </div>
        </div>
      </section>
      <MobileJump
        links={{ links }}
        close={<GrClose className="dark:bg-white" />}
        left={
          <CgMenuLeft className="mx-2 text-xl text-white dark:text-black" />
        }
      />

      <section className="mx-4 flex flex-col md:flex-row">
        <div className="md: hidden md:flex md:w-1/4 md:flex-col">
          <div
            className="md:flex md:flex-col"
            style={{ position: "sticky", top: "140px" }}
          >
            <span className="p-4 text-lg font-medium">ON THIS PAGE</span>
            <hr className="w-60 border-sky-700 dark:border-white" />
            <span className="my-4 border-l-4 border-sky-700 px-4 font-medium dark:border-white">
              Our top picks
            </span>
            <div className="my-4 flex flex-col space-y-4">
              {links.map((l) => (
                <span key={l.link}>
                  <Link href={l.link}>{l.text}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-lg  font-medium md:text-xl lg:w-3/4">
          <div className="flex flex-col rounded-lg">
            <h2 className="pb-12 text-xl font-semibold md:text-3xl">
              <Suspense fallback={"AFC's top free spin picks for USA"}>
                AFC&apos;s top Free Spin picks for <GeoCountryName />
              </Suspense>
            </h2>
            <Suspense fallback={<DefaultCasinos count={10} />}>
              <TopCasinos type={1} />
            </Suspense>
            <h3 className="pb-12 text-xl font-semibold md:text-3xl">
              <Suspense fallback={" Complete Free Spin Casino Bonus List"}>
                Complete <GeoCountryName /> Free Spin Casino Bonus List
              </Suspense>
            </h3>
            <Suspense
              fallback={
                <CasinoDisp type={2} casinoNum={casinoNum} countrycode={"US"} />
              }
            >
              <CasinoDisp type={2} casinoNum={casinoNum} countrycode={""} />
            </Suspense>

            {casinoNum == 1 ? (
              <form action={loadMoreCasino} className="text-center">
                <input
                  type="hidden"
                  name="casinoNumber"
                  value={casinoNum + 1000}
                />
                <LoadMoreButton text="Show All Free Spin Casinos" />
              </form>
            ) : null}
          </div>

          <div>
            <h3 className="my-4 py-4 font-bold md:my-8">
              Details about free spins with no deposit
            </h3>
            <ProsCons data={prosCons} />
            <Faq data={faq} />
          </div>
        </div>
      </section>
      <div className="mt-2 p-4 text-left md:mx-24 md:text-2xl">
        <h4 className="text-2xl font-semibold md:text-5xl">
          Use our casino guide to get huge bonuses
        </h4>
        <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
          At Allfreechips, you will find everything from lists of{" "}
          <Link
            className="font-semibold text-blue-600 hover:underline dark:text-orange-300"
            href="/no-deposit-casinos"
          >
            no deposit bonus
          </Link>{" "}
          to free spin casino codes and money contests in one place. The bonus
          value may range from $5 to hundreds of dollars, depending on the
          casino you choose. For your convenience, we analyze the offers of all
          online gambling sites and provide you with the following:
        </p>
        <ul className="list-disc pl-4 font-normal">
          <li>bonus value;</li>
          <li>free no deposit bonus codes;</li>
          <li>playthrough requirements;</li>
          <li>type of software used;</li>
          <li>comprehensive reviews and rates.</li>
        </ul>
        <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
          With this valuable information you will have access to over $20,000 in
          free no deposit casino bonuses and thousands of free spins. With the
          use of{" "}
          <Link
            className="font-semibold text-blue-600 hover:underline dark:text-orange-300"
            href="/"
          >
            free casino bonus codes
          </Link>{" "}
          you can instantly start playing casino games for free with the chance
          of winning real money you can withdrawal. Please always enjoy online
          casino gaming with the fun in mind while not risking any funds you can
          not afford to lose.
        </p>
      </div>
      <Homework />
    </div>
  );
}
