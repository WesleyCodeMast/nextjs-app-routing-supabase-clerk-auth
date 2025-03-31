import prisma from "@/client";
import Author from "@/components/AboutAuthor";
import Casino from "@/components/Casino";
import Bonus3 from "@/components/Bonus3";
import CasinoHint from "@/components/CasinoHint";
import FaqJsonLD from "@/components/FaqJsonLDX";
import ProSchema from "@/components/ProJsonLDX";
import ProsCons from "@/components/ProsCons";
import TimeForNewCasino from "@/components/TimeForNewCasino";
import Faq from "@/components/faq";
import BonusFilter from "@/components/functions/bonusfilter";
import monthYear from "@/components/functions/monthYear";
import { Metadata } from "next";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { FaDonate, FaArrowAltCircleUp } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { RiGameFill } from "react-icons/ri";
import MobileJump from "../components/MobileJump";
import { revalidatePath } from "next/cache";
import { LoadMoreButton } from "../components/loadMoreButton";
let casinoNum = 1;

async function loadMoreCasino(formData) {
  "use server";

  casinoNum = Number(formData.get("casinoNumber")) + 1;
  revalidatePath("CURRENT PAGE");
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Bonus Online Casino - Bonus Games Casino | Allfreechips";
  const description =
    "Unlock unbeatable thrills with our exclusive online casino bonuses. Elevate your gaming experience with enticing offers. Join now for a rewarding journey filled with excitement and lucrative bonuses at allfreechips.com";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}

async function getProps({ params }) {
  let casTake = casinoNum * 8;
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      vercel_image_url: { not: null },
      vercel_casino_button: { not: null },
      bonuses: { some: { deposit: { gt: 0 } } },
    },
    select: {
      id: true,
      clean_name: true,
      casino: true,
      hot: true,
      new: true,
      button: true,
      bonuses: {
        orderBy: [{ deposit: "desc" }],
      },
      casino_ratings: {
        select: {
          rating: true,
        },
      },
    },
    orderBy: [{ hot: "desc" }, { new: "desc" }, { id: "desc" }],
    take: casTake,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { bonus };
}

export default async function PageOut({ params }) {
  const props = await getProps({ params });
  const hint_text =
    "Online casino that offer bonuses are fun and can lead to playing with large amounts of money you don't actually deposit. Be sure to note how many times you need to bet this amount before your allowed to cash out, do not be surprised by the casino terms!";
  const hint_title = "Casino Bonus Quick Info";
  const prosCons = {
    pros: [
      {
        title: "Best Casino Bonuses",
        content: "This is the Allfreechips selected online casino bonuses.",
      },
      {
        title: "Our Favorites together",
        content:
          "We love online casino bonuses so these are not all, but what we believe are the best for reliability, playability, game selection and of course payouts.",
      },
    ],
    cons: [
      {
        title: "Strings Attached",
        content:
          "Nothing is really free in life, casino bonuses are no different. YOU can play with the bonus amounts but unless there is a specific promotion these usually require you to play only certain games like slots, or have to wager the bonus as well as your deposit in some cases up to 40 times.",
      },
    ],
  };

  const faq = [
    {
      question: "What makes these casino bonuses stand out?",
      answer:
        "Allfreechips deals with both players and casino operators to insure there are only what we believe are reliable casinos, this starting page of casino bonuses is the select list.",
    },
    {
      question: "Will I win with these casino bonuses?",
      answer:
        "To be honest casino bonuses are a bit rigged, yes it adds a ton of play time and extra cash but its really hard to beat the odds of meeting the play-though to cash out.  It has been done hundreds of times and I personally cashed out over 200K on a bonus.",
    },
    {
      question: "I took a bonus and was really surprised when ...",
      answer:
        "With all contracts you should always read the terms. Taking a bonus is indeed a contract of sorts and you should know what is expected of you as in the amount of play through or restrictions, as well as what you expect from the casino.  For instance a lot of no deposit bonuses limit your maximum cash out.",
    },
  ];

  const bdata = props.bonus;
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many  frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const links = [
    { link: "#topbonuses", text: `Top Casino Bonuses` },
    { link: "#ProsCons", text: `Casino Bonus Pros and Cons` },
    { link: "#faq", text: `Casino Bonus FAQs` },
  ];
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema
        prosCons={prosCons}
        name="Casino Bonuses"
        product="Different Casino Bonuses"
      />
      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            Keep tabs on the most amazing casino bonuses
          </h1>
          <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
            If you’re choosing a gambling site based on the rewards it provides,
            keep an eye out for the top-paying picks at AllFreeChips. Learn
            about casino bonuses online and the benefits they carry for you as a
            new player. We’ll shed light on the most substantial bonuses
            available for all users without super-hard requirements. With them,
            you are bound to start your gambling journey on a high note.
          </p>
          <div className="grid grid-cols-2 md:grid md:grid-cols-3">
            <Link href="/no-deposit-casinos">
              <Casino
                icon={<RiGameFill className="text-4xl" />}
                title={"No Deposit Casinos"}
              />
            </Link>
            <Link href="/free-spin-casinos">
              <Casino
                icon={<FaDonate className="text-4xl" />}
                title={"Free Spins Casinos"}
              />
            </Link>
            <Link href="/large-casino-bonuses">
              <Casino
                icon={<FaArrowAltCircleUp className="text-4xl" />}
                title={"Largest Casino Bonuses"}
              />
            </Link>
          </div>
          {/* <div className="mt-3 rounded-xl bg-slate-100 dark:bg-gray-200 dark:text-black">
            <div className="card p-4">
              <div className="heading flex items-center gap-7 border-b pb-4">
                <span className="h-7 w-10 rounded bg-sky-700 dark:bg-zinc-800"></span>
                <h2 className="text-lg">
                  Quick history on{" "}
                  <span className="font-bold">casinos bonuses</span>
                </h2>
              </div>
              <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
                Casino bonuses are found in both online and land based casinos
                but really made a giant impact with the Online ones. The ability
                to offer free casino credits to the masses allowed the online
                casino industry to draw a massive following, and by not having
                to pay overhead costs like land based casinos this was a great
                way to allow users to try the casino at relatively low costs.
                Over the years many types of casino bonuses or promotions have
                come up, No deposit, Free Spin, Match your deposit as well as
                cash back bonuses to only name the most popular. Allfreechips
                tries to deliver top bonuses to our players by leveraging our
                long terms partnerships with hundreds on casinos.
              </p>
            </div>
          </div> */}
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
        <div className="lg: hidden lg:flex lg:w-1/4 lg:flex-col">
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
        <div className="text-lg  font-medium lg:w-3/4 lg:text-xl">
          <h2 className="text-2xl font-semibold md:my-6 md:text-5xl">
            A quick look at casino bonuses
          </h2>
          <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
            Are you about to take the first steps in the gambling world? Bonuses
            and promotions can be your win-win option to engage in real-money
            activities while depositing little or no money to dip your toes in
            the casino’s signature games. AllFreeChips is your guide to the most
            lucrative bonuses, including:
          </p>
          <ul className="list-disc pl-4 pr-4 font-normal md:pl-14 md:text-xl">
            <li>
              <b>No-deposit bonuses</b> are the best way to test the waters
              without betting real money. Typically, a{" "}
              <Link
                className="font-semibold text-blue-600 hover:underline dark:text-orange-300"
                href="/no-deposit-casinos"
              >
                casino bonus without a deposit
              </Link>{" "}
              can be claimed with a promo code. We will help you keep abreast of
              the latest codes to put them to good use.
            </li>
            <li>
              <b>Deposit bonuses</b> require at least a minimum top-up. They are
              fan favorites and classic rewarding options. A casino deposit
              bonus can be anything from a nice 100% match for the money you put
              into your account to an impressive boost of up to 300%.
            </li>{" "}
            <li>
              <b>Free spins</b> are either an addition to other promotions or a
              stand-alone bonus, depending on the platform. You can use them to
              spin the reels and hit the jackpot in select slot machines.
            </li>
          </ul>
          <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
            Whether you’re hunting for complimentary spins, a top-up match, or a
            casino no-deposit bonus online, discover the best promos at
            AllFreeChips. These can take your winning odds to the next level.
          </p>
          <h2 className="text-2xl font-semibold md:my-6 md:text-5xl">
            Nothing but dependable casinos
          </h2>
          <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
            The opportunity to play slots at low or zero cost lets you extend
            your stay in the virtual lobby and helps casinos attract new
            visitors. It’s a mutually beneficial offer that is worth taking full
            advantage of. While hand-picking the best welcome bonuses, we vouch
            for every casino listed in our guides. If it’s covered, it means
            it’s licensed and has a track record of reliability in the USA or
            other countries, coupled with loads of positive user reviews. No
            casino can make it into our listings if it hasn’t yet gained real
            players’ appreciation. Because all bonuses for games at casinos come
            with specific terms and conditions, we evaluate them by the value
            they carry. The best rewards are those without strict deadlines and
            high wagering requirements. Remember, they should serve as a free
            ticket to an unforgettable gambling journey in your favor.
          </p>
          <div id="topbonuses" className="flex flex-col rounded-lg">
            <h3 className="text-2xl font-semibold md:my-6 md:text-5xl">
              Top Online Casino Bonuses {monthYear()}
            </h3>
            <Bonus3 data={bdata} />

            <form action={loadMoreCasino} className="text-center">
              <input type="hidden" name="casinoNumber" value={casinoNum + 1} />
              <LoadMoreButton text="Show More Casino Bonuses" />
            </form>
          </div>
          <h3 className="text-2xl font-semibold md:my-6 md:text-5xl">
            Claim, play, enjoy
          </h3>
          <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
            Stay in the loop about the most generous sign-up rewards to make the
            most of the title you click to play. AllFreeChips is here to make it
            easy to compare your options and receive that perfect bonus offer at
            casino sites. You can also contribute to a casino’s rating after
            completing the registration. Enjoy every second you spend in the
            virtual lobby and tell others about the bonuses you’ve claimed!
          </p>
          <CasinoHint text={hint_text} title={hint_title} />

          <TimeForNewCasino />

          <div>
            <h4 className="text-2xl font-semibold md:my-6 md:text-5xl">
              Great casino bonus information
            </h4>
            <ProsCons data={prosCons} />
            <Faq data={faq} />
            <Author data={authorData} />
          </div>
        </div>
      </section>
    </div>
  );
}
