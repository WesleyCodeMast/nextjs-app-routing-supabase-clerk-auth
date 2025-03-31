import CasinoDisp from "./CasinoDIsp";
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
let casinoNum = 1;

async function loadMoreCasino(formData) {
  "use server";
  casinoNum = Number(formData.get("casinoNumber")) + 1;
  revalidatePath("CURRENT PAGE");
}

//added to synch

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    monthYear() + " No Deposit Casinos and no deposit USA bonus codes";
  const description =
    "Latest list of current and new no deposit online casinos for " +
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
        title: "USA no deposit casinos",
        content:
          "By far the largest group of no deposit casinos revolves around the large quantity of USA no deposit casino bonus codes found here. We have many exclusive USA no deposit bonuses and are adding more each week.",
      },
      {
        title: "Test drive many casinos",
        content:
          "There are many casinos out there so why not test a few before finding the one you trust with real money deposits? You can play for fre with a real chance at cashing out with no deposit casinos.",
      },
      {
        title: "Risk free gambling",
        content:
          "The best part with no deposit bonuses is the fact you do not need to risk your own money to play yet can still win large sums to cash out.",
      },
      {
        title: "Fast bonuses using no deposit codes",
        content:
          "WHen online casinos added the use of bonus codes, they make it super easy and fast to access no deposit bonuses by easily adding in a code in the casino cashier.",
      },
    ],
    cons: [
      {
        title: "Hard to cash out",
        content:
          "The biggest and really only issue when playing a no deposit casino bonus is the fact you will need to wager the bonus amount between 20-60X. This is quite a bit and the odds are not in your favor to win a lot but it is possible.",
      },
    ],
  };

  const faq = [
    {
      question: "Do casinos really give away money for no deposit bonus play?",
      answer:
        "Yes they do, but you need to wager the bonus amount as many times as the bonus states before you can cash it out. This means if you get a $20 no deposit bonus with a 40X wager requirement you will need to wager $800 before you can cash out.",
    },
    {
      question: "What happens if I win 500,000 on a no deposit casino bonus?",
      answer:
        "Most casinos do not limit the maximum withdraw on all bonuses, a lot of RTG based ones do though. Always read the terms and conditions of any bonus you take on to be sure your not suprised.",
    },
  ];

  const links = [
    { link: "#ProsCons", text: `No Deposit Casino Pros and Cons` },
    { link: "#faq", text: `No Deposit Casino FAQs` },
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
            Best No Deposit Casinos For {monthYear()}
          </h1>

          <div className="mt-3 rounded-xl bg-slate-100 dark:bg-gray-200 dark:text-black">
            <div className="card p-4">
              <div className="heading flex items-center gap-7 border-b pb-4">
                <span className="h-7 w-10 rounded bg-sky-700 dark:bg-zinc-800"></span>
                <span className="text-lg">
                  Why you should play{" "}
                  <span className="font-bold">No Deposit Casinos</span>
                </span>
              </div>
              <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
                Allfreechips is a top tier provider of exclusive no deposit
                casino bonuses allowing you to get the largest no deposit play
                with no deposit required. Including a vast array of USA no
                deposit casino bonus codes along with exclusive bonuses from
                Canada, Australian and many other locations, the Allfreechips no
                deposit casino bonus list is legendary.
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
              <Suspense fallback={"AFC's top no deposit picks for USA"}>
                AFC&apos;s top no deposit picks for <GeoCountryName />
              </Suspense>
            </h2>
            <Suspense fallback={<DefaultCasinos count={10} />}>
              <TopCasinos type={1} />
            </Suspense>
            <h3 className="pb-12 text-xl font-semibold md:text-3xl">
              <Suspense
                fallback={" Complete Free No Deposit Casino Bonus List"}
              >
                Complete <GeoCountryName /> Free No Deposit Casino Bonus List
              </Suspense>
            </h3>
            <Suspense
              fallback={
                <CasinoDisp type={2} casinoNum={casinoNum} countrycode={"US"} />
              }
            >
              <CasinoDisp type={2} casinoNum={casinoNum} countrycode={""} />
            </Suspense>
          </div>
          {casinoNum == 1 ? (
            <form action={loadMoreCasino} className="text-center">
              <input
                type="hidden"
                name="casinoNumber"
                value={casinoNum + 1000}
              />
              <LoadMoreButton text="Show All No Deposit Casinos" />
            </form>
          ) : null}
          <div>
            <h3 className="pb-12 text-xl font-semibold md:text-3xl">
              All about our complete list of no deposit casino bonuses
            </h3>
            <ProsCons data={prosCons} />
            <Faq data={faq} />
          </div>
        </div>
      </section>
      <div className="mt-2 p-4 text-left md:mx-24 md:text-2xl">
        <h3 className="pb-12 text-xl font-semibold md:text-3xl">
          No Deposit Casino Bonus Codes
        </h3>
        <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
          You will find many thousands of dollars in no deposit and{" "}
          <Link
            className="font-semibold text-blue-600 hover:underline dark:text-orange-300"
            href="/free-spin-casinos"
          >
            free spin promotions
          </Link>{" "}
          on Allfreechips that are accessible by using no deposit casino bonus
          codes. On each casino listed here you see the main deposit bonus along
          with either a no deposit bonus, or free spin bonus if that casino
          offers one. ALong with this information we also provide the bonus code
          if one is required to access the bonuses. We feel that use of the no
          deposit codes by todays online casinos makes the process quick and
          easy, as well as allowing the gambler to control they types of bonuses
          and acceptable bonus terms that are tied to these.
        </p>
        <h4 className="text-2xl font-semibold md:text-5xl">
          Use our casino guide to get huge bonuses
        </h4>
        <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
          At Allfreechips, you will find everything from lists of no deposit
          bonuses to free spin casino codes and free money contests like our{" "}
          <Link
            className="font-semibold text-blue-600 hover:underline dark:text-orange-300"
            href="/scratch-cards"
          >
            free scratch cards
          </Link>{" "}
          in one place. With over 800 current online casinos at AllFreeChips we
          have the ability to delver daily free no deposit casino bonuses that
          require no deposits, casinos offering free spins both without a
          deposit required or as an add on to a deposit bonus and of course
          traditional casino promotions. With the AllFreeChips no deposit casino
          guide we deliver:
        </p>
        <ul className="list-disc pl-4 font-normal">
          <li>Fre No deposit bonus value;</li>
          <li>no deposit casino bonus codes;</li>
          <li>USA free no deposit casino bonuses;</li>
          <li>International fre spin and no deposit bonuses;</li>
          <li>comprehensive reviews and value;</li>
        </ul>
        <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
          When we launched AllFreeChips in 2004, it was out of love for playing
          the no deposit casinos back then. These early promoters of these free
          play promotions were mainly Microgaming and{" "}
          <Link
            className="font-semibold text-blue-600 hover:underline dark:text-orange-300"
            href="/software/rtg"
          >
            RTG
          </Link>{" "}
          casinos. Once I started playing and actively searching out for more
          free bonuses I created the AllFreeChips casino bonus guide and forums
          before I even knew how to make a website. If you want to laugh visit
          the Wayback Machine and have a look at our early days! Weather your
          looking for USA free no deposit casinos or just the latest in regular
          online casino news and bonuses, AllFreeChips tries to deliver the
          latest and most generous news, info and of course bonuses possible.
        </p>
      </div>
      <Homework />
    </div>
  );
}
