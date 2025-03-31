import prisma from "@/client";
import Author from "@/components/AboutAuthor";

import Bonus3 from "@/components/Bonus3";
import FaqJsonLD from "@/components/FaqJsonLDX";
import ProSchema from "@/components/ProJsonLDX";
import ProsCons from "@/components/ProsCons";
import Faq from "@/components/faq";
import BonusFilter from "@/components/functions/bonusfilter";
import monthYear from "@/components/functions/monthYear";
import { Metadata } from "next";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import MobileJump from "../components/MobileJump";
async function getProps({ params }) {
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      vercel_image_url: { not: null },
      vercel_casino_button: { not: null },
      rogue: { not: 1 },
      OR: [{ hot: 1 }, { new: 1 }],

      // bonuses: { some: {  multi_currency: { contains:  '4' }, } },  // BTC IS #4
    },
    select: {
      id: true,
      clean_name: true,
      casino: true,
      hot: true,
      new: true,
      button: true,
      bonuses: {
        orderBy: [{ nodeposit: "desc" }, { deposit: "desc" }],
      },
      casino_ratings: {
        select: {
          rating: true,
        },
      },
    },
    orderBy: [{ id: "desc" }],
    take: 30,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { bonus };
}

export const revalidate = 72000;

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "Best Online Casinos : The best online casinos for " +
    monthYear() +
    " at Allfreechips";
  const Description =
    "The latest list of the best " +
    monthYear() +
    " online casinos and casino bonuses on Allfreechips.";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: Description,
  };
}

export default async function PageOut({ params }) {
  const links = [
    { link: "#LikeCasinos", text: `Best Current Casinos` },
    { link: "#ProsCons", text: `Best Casino Pros and Cons` },
    { link: "#Review", text: `About the best casinos` },
    { link: "#faq", text: `Best casino FAQs` },
  ];
  const props = await getProps({ params });
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const bdata = props.bonus;

  const prosCons = {
    pros: [
      {
        title: "Better than good",
        content:
          "Seriously the very best casino voted mainly by the ALlfreechips users, real players letting you know what are the very best casino online today.",
      },
      {
        title: "Best bonuses",
        content:
          "We think the users of the Allfreechips casino site are smart enough to both what they think are the very best online casinos and casino bonuses.",
      },
    ],
    cons: [
      {
        title: "None",
        content:
          "These are the very best of the best casinos so I can't think of a con!",
      },
    ],
  };

  const faq = [
    {
      question:
        "How do you decide these are the best casinos for the Allfreechips site?",
      answer:
        "We look at a lot of variables including software used, user feedback and overall quality of each casino.",
    },
    {
      question:
        "Can I cast my vote for what I think is the best online casino as well?",
      answer:
        "Yes of course and that is what we love about the Allfreechips casino community.  Once you have you log on to Allfreechips you can cast your rankings and leave detailed comments to assist other gamers.",
    },
  ];

  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema
        prosCons={prosCons}
        name="Best Casinos"
        product="BestCasino List"
      />
      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            {monthYear()} best ranked online casinos
          </h1>
          <div className="flex flex-col py-4">
            <span className="">
              Author:{" "}
              <a href="#author" className="font-medium ">
                {author}
              </a>
            </span>
            <span className="text-sky-600 dark:text-white">{reviewDate}</span>
          </div>
          <div className="mt-3 rounded-xl bg-slate-100 dark:bg-gray-200 dark:text-black">
            <div className="card p-4">
              <div className="heading flex items-center gap-7 border-b pb-4">
                <span className="h-7 w-10 rounded bg-sky-700 dark:bg-zinc-800"></span>
                <h2 className="text-lg">
                  See the latest{" "}
                  <span className="font-bold">best Casino list</span>
                </h2>

                <i className="bi bi-info-circle"></i>
              </div>
              <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
                We take great pride in presenting what we think is the very best
                in online casinos. We geo target the major pages to filter
                casino you can not play at making your search for the best
                casino eve easier. A lot goes into managing a large catalog of
                online casinos like we have here at Allfreechips so we rely a
                lot on our users. Votes and comment from you, the real people
                that play online casinos is our best way to decide what is of
                course the very best.
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
          <div className="text-lg font-normal">
            <h3
              id="LikeCasinos"
              className="my-6 scroll-mt-40 text-3xl font-semibold md:my-10 md:text-4xl"
            >
              List Of The {monthYear()} Best Casinos
            </h3>

            <Bonus3 data={bdata} />
          </div>
          <div>
            <h4
              id="Review"
              className="my-4 scroll-mt-40 text-3xl font-semibold"
            >
              About Experiencing the best online casinos
            </h4>
            <div className="text-lg font-normal">
              <b>How to choose the best casino wisely</b>{" "}
              <p>
                I think the main goal we all need to be aware of when choosing
                the best casino is making sure the casino is both safe and fair.
                Over the passage of humanity there are people trying to take
                from you whatever they can, there is no place for these people
                in online gaming and we try hard to remove any bad players.
                Beyond that its al about having fun when gambling online,
                leaving your gaming session with a smile on your face knowing
                this is the right casino for you. Weather its the games offered
                or the great customer support, most players seem to agree on
                what makes a casino the best casino.
              </p>
              <p>
                Casino bonuses and loyalty also play deeply for many players
                while making their decision on what is the best. I personally do
                not like any bonuses attached to my deposits as nearly all of
                them place restrictions on what I can cash out if I win a large
                sum, and I have won sums over $200,000 while playing online and
                would feel sick if they told me I could only cash out a small
                portion of that.
              </p>{" "}
              <b>Why choose only the best?</b>{" "}
              <p>
                I think its fun to try many casinos, so picking the best is
                great if they offer everything your looking for but sometimes it
                seems like trying a new casino is new start and seems to
                sometimes pay out better even with the same games. I see players
                from 2004 that stick with the same casino over this entire
                period so that speaks well to those casinos but its like playing
                at brick and mortar casinos, sometimes its fun to try another.{" "}
              </p>
            </div>
            <ProsCons data={prosCons} />
            <Faq data={faq} />
            <Author data={authorData} />
          </div>
        </div>
      </section>
    </div>
  );
}
