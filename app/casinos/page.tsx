import Author from "@/components/AboutAuthor";
import Bonus3 from "@/components/Bonus3";
import CasinoHint from "@/components/CasinoHint";
import FaqJsonLD from "@/components/FaqJsonLDX";
import ProsCons from "@/components/ProsCons";
import ProSchema from "@/components/ProJsonLDX";
import TimeForNewCasino from "@/components/TimeForNewCasino";
import Faq from "@/components/faq";
import BonusFilter from "@/components/functions/bonusfilter";
import monthYear from "@/components/functions/monthYear";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import { LoadMoreButton } from "../components/loadMoreButton";
import prisma from "@/client";
import { Metadata } from "next";
import MobileJump from "../components/MobileJump";
import { revalidatePath } from "next/cache";
let casinoNum = 1;

async function loadMoreCasino(formData) {
  "use server";

  casinoNum = Number(formData.get("casinoNumber")) + 1;
  revalidatePath("CURRENT PAGE");
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "Casino Reviews : Allfreechips dives into the world of explaining online casino reviews";
  const description =
    "Learn all about the latest casino reviews from the ALlfreechips staff. ";
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
    orderBy: [{ updated: "desc" }],
    take: casTake,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { bonus };
}

export default async function PageOut({ params }) {
  const props = await getProps({ params });
  const hint_text =
    "We at Allfreechips take the online casino universe pretty seriously. We review all casinos by both ,looking at the casinos themselves as well as the software they use. User reviews, Banking options and availability all play roles as well when the final casino review is completed in hopes to only offer you casinos your looking for.";
  const hint_title = "Casino reviews can help pick a good one";
  const prosCons = {
    pros: [
      {
        title: "Reviewed Casinos",
        content:
          "Picking a new casino to play at is much easier if you can get a real review of it. We hope we have enough information in each casino review to deliver what you want.",
      },
      {
        title: "User Casino Reviews",
        content:
          "See what other real users think of these online casinos and well, then leave your feedback to make this a better place for everyone.",
      },
    ],
    cons: [
      {
        title: "Takes time to do this",
        content:
          "We cant just knock out an excellent review without knowing about each casino so we work hard to date.",
      },
    ],
  };

  const faq = [
    {
      question: "What makes these casino review great?",
      answer:
        "Allfreechips dives deep into each casino to give a meaningful casino review that you can rely on.",
    },
    {
      question: "Do you ever make a bad review?",
      answer:
        "We do, but those casinos are usually in the rogue casino list that we no longer support showing, we may bring back the name and shame group if we feel it helps the users.",
    },
    {
      question: "Can I write reviews for Allfreechips?",
      answer:
        "You sure can, each casino and slot machine allows logged in users to both rate on a 1-5 vote as well as write your review on the casino or slot as well.",
    },
  ];

  const bdata = props.bonus;
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many  frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const links = [
    { link: "#ProsCons", text: `Casino Review Pros and Cons` },
    { link: "#faq", text: `Casino Review FAQs` },
  ];
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema data={prosCons} />
      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            Independent online casino reviews to find your go-to venue
          </h1>
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
          <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
            Are you fed up with fake gambling platform reviews and distorted
            descriptions? See what the industry experts think about the best
            venues to flock to this year! To get an unbiased opinion about
            platforms, slots, and extras, check out casino game reviews by
            AllFreeChips. We’ve been rating popular gambling operators in the
            USA and other locations for over 20 years. Our reviewers have a keen
            eye for the features inexperienced users may not be aware of and are
            here to bring you up to speed on the most decent options in 2024.
          </p>
          <div className="flex flex-col rounded-lg">
            <p className="font-semibold md:text-5xl">
              Latest Online Casino Reviews for {monthYear()}
            </p>
            <Bonus3 data={bdata} />
            <form action={loadMoreCasino} className="text-center">
              <input type="hidden" name="casinoNumber" value={casinoNum + 1} />
              <LoadMoreButton text="Show More Casinos" />
            </form>
          </div>
          <h2 className="text-2xl font-semibold md:my-6 md:text-5xl">
            All-encompassing online casino reviews
          </h2>
          <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
            Whether you are into fast-paced slots or traditional card games, you
            want a safe place to head off to. But this may be tricky to
            distinguish from all those subpar casinos that pump millions into
            faking their ‘unrivaled’ reputation. AllFreeChips is a casino review
            site that is not affiliated with any gambling platforms. We only
            list user-recommended operators and unravel all the secrets you
            should know before registering. Just click on the casino’s name and
            learn everything about its:
          </p>
          <ul className="list-disc pl-4 pr-4 font-normal md:pl-14 md:text-xl">
            <li>
              <b>Gambling rewards.</b> The updated bonus information is the
              first thing you’ll see in our reviews. We understand the
              importance of free play like no one else and cover the latest
              promo offers for beginners and loyal players.
            </li>
            <li>
              <b>Safety measures.</b> Are you worried about the platform’s
              reliability? Dispel your doubts with our online casino reviews on
              USA websites, where we dive into the jurisdictions that have
              issued their licenses and the technologies they adopt for
              transparency.
            </li>
            <li>
              <b>Payment options.</b> You can find the perfect gambling venue
              based solely on your payment preferences. We thoroughly
              investigate deposit and withdrawal methods in our guides to ensure
              you know which credit cards, e-wallets, and banks you can use.
            </li>
          </ul>{" "}
          <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
            Some casinos lure gamblers with unique features like exclusive
            games, VIP programs, or mobile apps. If the venue stands out for a
            specialty like this, you’ll be the first to know about it.
          </p>
          <h2 className="text-2xl font-semibold md:my-6 md:text-5xl">
            Learn about gaming highlights
          </h2>
          <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
            The variety of slots and table games can be as defining for players
            as the payment methods and bonuses. We’ll give you a bigger picture
            if you prefer to select your operator based on its gaming
            collection. Our casino game reviews cover the ultimate list of
            software providers and their signature activities. Whether the site
            is admired for its slots, card games, or live tables, you’ll know
            what it is oriented at. Moreover, you can take a look at the
            top-rated gambling machines based on users’ feedback.
          </p>
          <h2 className="text-2xl font-semibold md:my-6 md:text-5xl">
            Brutally honest reviews
          </h2>
          <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
            As a US-oriented online casino review site, we primarily focus on
            platforms for American players. But venues based in other countries
            are also covered. We unwrap the strengths and weaknesses of the site
            you may sign up for. Whether it lacks live games or mobile support,
            we’ll fill you in. If you don’t have time for DIY research, weigh
            the pros and cons in an AllFreeChips casino review to instantly have
            a 360-degree view of the venue without going through long guides. We
            factor in real players’ experiences and don’t have to make anything
            up. When you become a logged-in user, you can also share your
            opinion.
          </p>
          <CasinoHint text={hint_text} title={hint_title} />
          <TimeForNewCasino />
          <div>
            <ProsCons data={prosCons} />
            <Faq data={faq} />
            <Author data={authorData} />
          </div>
        </div>
      </section>
      <Link href="/casinos/map">Full Casino List</Link>
    </div>
  );
}
