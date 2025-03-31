import GridGuide from "@/components/GridGuide";
import Homework from "@/components/Homework";
import monthYear from "@/components/functions/monthYear";
import { Metadata } from "next";
import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";
import { GiTrophy } from "react-icons/gi";
import RecentNewsServer from "./components/news/RecentNewsServer";
import OrgSchema from "@/components/OrgSchema";
import { PlayCasinoLink } from "@/components/PlayCasinoLink";
import Settings from "@/components/functions/settings";
import { Suspense } from "react";
import GeoCountryName from "./lib/GeoCountryName";
import CasinoSingleCardA from "@/components/CasinoSIngleCardA";
import TopCasinos from "./lib/TopCasinos";
import DefaultCasinos from "./lib/DefaultCasinos";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "Allfreechips | best US casino bonus codes and no deposit casinos";
  const description =
    "Dive into the premier online casino destination. Enjoy a vast array of games, exclusive bonuses, and live dealer excitement. Join now for a thrilling gaming experience at its finest.";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
    openGraph: { type: "website" },
  };
}
export const revalidate = 7200;
export default async function Page() {
  const settings = await Settings();
  const cardData = {
    title: `Best Casino`,
    // @ts-expect-error
    casino_id: settings.US,
  };

  const geoData = {
    title: "Best COUNTRY Casino",
    casino_id: 0,
  };
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <GridGuide />
      <OrgSchema />
      <h2 className="pb-12 text-center text-xl font-semibold md:text-5xl">
        <Suspense fallback={"AFC's top Casino for US"}>
          AFC&apos;s Top Casino Pick For <GeoCountryName />
        </Suspense>
      </h2>
      <Suspense fallback={<CasinoSingleCardA data={cardData} />}>
        <CasinoSingleCardA data={geoData} />
      </Suspense>
      <h2 className="pb-12 text-xl font-semibold md:text-3xl">
        <Suspense fallback={"AFC's top casino picks for United States"}>
          AFC&apos;s top casino picks for <GeoCountryName />
        </Suspense>
      </h2>
      <Suspense fallback={<DefaultCasinos count={10} />}>
        <TopCasinos type={3} />
      </Suspense>
      <div className="m-4 md:mx-32 md:mt-28">
        <h2 className="py-2 text-left text-2xl font-medium md:my-4 md:text-5xl">
          {"Exclusive online casino bonuses in " + monthYear()}
        </h2>
        <p className="text-justify font-medium md:my-10 md:text-2xl">
          We bring you the top rated online casino bonuses targeted to your
          location. Allfreechips also has the{" "}
          <Link href="/casino-match">Casinomatch</Link> system where you can
          further filter your very own casino top list and see updates daily.
        </p>
        <div className="px-2 md:py-2">
          <div className="flex space-x-2 text-xl font-medium md:space-x-6 md:text-3xl">
            <GiTrophy className="m-1" />
            <p className="text-left">
              BitStarz Casino: 50 Free spin no deposit casino bonus code 50 FS,
              you must use code when you register for this bonus!
            </p>
          </div>
          <p className="py-4 text-left text-base font-medium md:text-2xl md:font-normal">
            Bitstarz casino has almost every casino software including
            Microgaming where USA and all international players can play as long
            as they use crypto currencies such as Bitcoin. This great new casino
            offers so much and requires no KYC documents if you go straight
            crypto to play. All players should not that using a Canadian VPN
            that is NOT Ontario will give you access to all the great slots from
            all the software providers on BitStarz casino.
          </p>
          <PlayCasinoLink casinoId="bitstarz">
            <button className="flex items-center justify-center rounded bg-sky-700 px-10 py-3 text-base font-medium text-white md:my-6 dark:bg-white dark:text-black">
              Play at BitStarz Casino{" "}
              <FaArrowCircleRight className="mx-4 md:mx-6 md:my-2" />
            </button>
          </PlayCasinoLink>
        </div>
        <div className="px-2 md:py-2">
          <div className="flex space-x-2 text-xl font-medium md:my-8 md:space-x-6 md:text-3xl">
            <GiTrophy className="m-1" />
            <p className="text-left">
              Las Vegas USA Exclusive No Deposit Casino
            </p>
          </div>
          <p className="py-4 text-left text-base font-medium md:text-2xl md:font-normal">
            Allfreechips has a new fantastic exclusive promotion for Las Vegas
            USA Casino. Take advantage of this huge value with a FREE $25 chip +
            a 200% deposit bonus up to $5,000. Play the hottest RealTimeGaming
            slots and games with this free chip offer. Las Vegas USA Casino also
            has incredible daily, weekly and monthly promotions for all players.
            Use promo code LVUSA200 to unlock this great bonus from Las Vegas
            USA Casino.
          </p>
          <PlayCasinoLink casinoId="las-vegas-usa">
            <button className="flex items-center justify-center rounded bg-sky-700 px-10 py-3 text-base font-medium text-white md:my-6 md:px-20 dark:bg-white dark:text-black">
              Claim Now
              <FaArrowCircleRight className="mx-4 md:mx-6 md:my-2" />
            </button>
          </PlayCasinoLink>
        </div>
      </div>
      <div className="mx-auto p-4 text-left md:container">
        <h3 className="text-2xl font-semibold md:my-12 md:text-5xl">
          Allfreechips - Your source of casino codes and exclusive offers
        </h3>
        <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
          How about trying your hand at Microgaming, playing some slot machine,
          or completing a Royal Flush without making any casino deposits? If any
          of these activities appeal to you, Allfreechips is the place you need.
          We are the source of unlimited bonuses and casino codes for cash, free
          spins, deposit related offers, and more. With our promotional
          opportunities, all gambling enthusiasts can make use of a myriad of
          extra perks while bringing their gaming experience to the next level.
          It is our website that combines tons of bonuses and a useful casino
          guide to the most reliable online gambling platforms in the USA.
        </p>
        <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
          With all that hype around online gambling, it is now clear that the
          era of brick and mortar casinos is coming to a dramatic end. You no
          longer need to travel thousands of miles to immerse yourself in the
          excitement of the Mirage, Bellagio or any other luxurious resort Las
          Vegas has to offer. Today all of that is available to you in the
          comfort of your own home.
        </p>
        <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
          Online casinos have everything it takes to become more popular than
          land based ones, especially among those who are only starting their
          journey in the gambling world. That said, it may be too difficult to
          choose between hundreds of platforms to play with. If it is your case,
          it s time to leave all those worries to Allfreechips! We will provide
          you with the online casino guide and help you turn their promotional
          offers to your advantage.
        </p>
      </div>
      <div className="mt-2 p-4 text-left md:text-2xl">
        <h3 className="text-2xl font-semibold md:text-5xl">
          Use our casino guide to get huge bonuses
        </h3>
        <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
          At Allfreechips, you will find everything from lists of no deposit
          bonuses to free spin casino codes and money contests in one place. The
          bonus value may range from $5 to hundreds of dollars, depending on the
          casino you choose. For your convenience, we analyze the offers of all
          online gambling sites and provide you with the following:
        </p>
        <ul className="list-disc pl-4 font-normal">
          <li>bonus value;</li>
          <li>playthrough requirements;</li>
          <li>type of software used;</li>
          <li>comprehensive reviews and rates.</li>
        </ul>
        <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
          Whether you re a fan of slot machines or feel passionate about joining
          RTG casinos, you will be able to get the most out of your gambling
          activity with casino bonus codes provided by Allfreechips. Using our
          online casino guide is the best way of trying out a site risk free.
          You do not have to make any deposits to test the gambling services and
          find out whether the casino is the one you want to deal with.
        </p>
      </div>
      <Homework />
      <div className="p-4 text-left md:mx-5">
        <h3 className="text-2xl font-semibold md:my-6 md:text-5xl">
          Registration is the only step towards successful gambling
        </h3>
        <div className="flex flex-col md:flex-row">
          <div className="pr-10">
            <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
              If you are eager to never miss a trick and stay abreast of
              everything that is happening in the gambling world, its time to
              register with Allfreechips. We will keep you informed on the
              latest online casino offers and news so that you are always in the
              right place at the right time. What is more, our chat section will
              provide you with the useful information like upcoming contests and
              freeroll passwords.
            </p>
            <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
              Count on Allfreechips and take advantage of every promotional
              opportunity! We will enable you to gamble in the way you want to.
            </p>
            <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
              Currently we are pushing to find the best online casino for the
              USA! is the best casino going to be from RTG or{" "}
              <Link
                className="font-semibold text-blue-600 hover:underline dark:text-orange-300"
                href="/software/saucify"
              >
                Saucify
              </Link>{" "}
              we do not know but you can help us. Simple find your best casino
              and submit a review, in going so you can help others decide where
              to play and get some AFC reward points to boot!
            </p>
            <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
              Out extensive coverage of USA online casinos allows you to take
              advantage multiple{" "}
              <Link
                className="font-semibold text-blue-600 hover:underline dark:text-orange-300"
                href="/usa-casinos"
              >
                exclusive USA bonuses
              </Link>{" "}
              as well. Daily we have new casino bonuses added including many
              that have{" "}
              <Link
                className="font-semibold text-blue-600 hover:underline dark:text-gray-200"
                href="/no-deposit-casinos"
              >
                no deposit USA casino bonus codes
              </Link>{" "}
              . These codes are great as they allow you play instantly after
              registration. All that is required is to complete your online
              registration then venture into the casinos cashier section to
              validate the casino codes you can find right her on AllFreeChips.
            </p>
          </div>
          <div className="shadow-gray-10 rounded-lg border border-gray-400 shadow-2xl md:w-11/12">
            <div className="p-4">
              <p className="font-semibold md:py-4 md:text-xl">
                INTRODUCING CASINOMATCH
              </p>
              <h4 className="my-2 text-2xl font-bold md:py-2 md:text-3xl md:font-medium">
                The perfect casino is one click away
              </h4>
              <Link href="/casino-match">
                <button className="md: my-4 flex items-center rounded-lg bg-sky-700 px-8 font-medium text-white md:my-6 md:px-6 md:text-2xl dark:bg-white dark:text-black">
                  Find your Match
                  <FaArrowCircleRight className="m-4" />
                </button>
              </Link>{" "}
            </div>
            <div className="rounded-b-lg bg-sky-700 p-4 text-white dark:bg-white dark:text-black">
              <h5 className="font-semibold md:py-4">Why CasinoMatch?</h5>
              <div className="flex-flex-col">
                <div className="my-6 flex">
                  <div className="flex flex-col">
                    <button className="mx-2 my-10 h-7 w-7 rounded-full bg-white font-bold text-sky-700 md:my-14 dark:bg-zinc-800 dark:text-white">
                      1
                    </button>
                    <button className="mx-2 my-10 h-7 w-7 rounded-full bg-white font-bold text-sky-700 md:my-14 dark:bg-zinc-800 dark:text-white">
                      2
                    </button>
                    <button className="mx-2 mr-4 mt-2 h-7 w-7 rounded-full bg-white font-bold text-sky-700 md:mt-0 dark:bg-zinc-800 dark:text-white">
                      3
                    </button>
                  </div>
                  <div className="flex flex-col">
                    <span className="mb-6 leading-6 md:text-lg">
                      Find Casinos that allow players from your actual location.
                    </span>
                    <span className="mb-6 leading-6 md:text-lg">
                      Identify new promotions from casinos you already play.
                    </span>
                    <span className="mb-6 leading-6 md:text-lg">
                      Locate the best Bonuses you enjoy along with games you
                      love.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RecentNewsServer />
      <hr className="my-8 md:mx-24 md:border" />
    </div>
  );
}
