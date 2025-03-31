import prisma from "@/client";
import Author from "@/components/AboutAuthor";
import BonusSlider from "@/components/BonusSlider";
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
import { FaArrowCircleRight } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import MobileJump from "../components/MobileJump";

//added to synch
async function getProps({ params }) {
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      vercel_image_url: { not: null },
      vercel_casino_button: { not: null },
      bonuses: {
        some: { percent: { gt: 399 } },
      },
    },
    select: {
      id: true,
      clean_name: true,
      casino: true,
      hot: true,
      new: true,
      button: true,
      bonuses: {
        orderBy: { percent: "desc" },
      },
      casino_ratings: {
        select: {
          rating: true,
        },
      },
    },
    take: 45,
  });
  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { bonus };
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = monthYear() + " current casinos with 400% or greater bonuses";
  const description =
    "Our list of online casino bonuses over or equal to 400% on deposit for " +
    monthYear() +
    ".";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}

export default async function PageOut(params) {
  const props = await getProps({ params });
  const prosCons = {
    pros: [
      {
        title: "Lots of cash",
        content:
          "You get a giant bang for your buck, at least 4X the buck! Note though with the larger bonus your odds of cashing out the play though is hard..",
      },
      {
        title: "Enjoyable for a long time",
        content:
          "If you love gambling this will give you a lot of time to do it, using smaller (allowed) wagers will extend play time quite a bit, and give you more chances at hitting a large enough win to beat the wagering requirements.",
      },
    ],
    cons: [
      {
        title: "Odds on Wagering Requirements",
        content:
          "I have to say I never sat down to see if this is true but I assume the larger the bonus included into the play through the less odds you have of making that requirement.",
      },
    ],
  };

  const faq = [
    {
      question: "How much bonus cash can I really get?",
      answer:
        "This depends on the bonus itself but many will allow you to get tens of thousands in casino bonus cash.",
    },
    {
      question: "how can casinos give away so much free money?",
      answer:
        "They lend you this bonus in reality, you need to earn it like any other gambling bonus.  The play through is your enemy when taking on a large casino bonus.",
    },
    {
      question: "Do people ever cash out on giant casino bonus match offers?",
      answer:
        "Yes! this is done a lot but not near as much as not making it, if you enjoy to play this gives you the longest possible play time with little actual deposited money.",
    },
  ];
  const bdata = props.bonus;
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const links = [
    { link: "#ProsCons", text: `Big Bonus Pros and Cons` },
    { link: "#faq", text: `Big Bonus FAQs` },
  ];

  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema
        prosCons={prosCons}
        name="Big Bonuses"
        product="Casinos with Large Bonuses"
      />
      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            TOP 400% and greater casino bonuses for {monthYear()}
          </h1>
          <div className="flex flex-col py-4">
            <span className="">Author: </span>
            <span className="text-sky-600 dark:text-white">{reviewDate}</span>
          </div>
          <div className="mt-3 rounded-xl bg-slate-100 dark:bg-gray-200 dark:text-black">
            <div className="card p-4">
              <div className="heading flex items-center gap-7 border-b pb-4">
                <span className="h-7 w-10 rounded bg-sky-700 dark:bg-zinc-800"></span>
                <h2 className="text-lg">
                  Why you should play{" "}
                  <span className="font-bold">Giant Bonus Casinos</span>
                </h2>
              </div>
              <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
                The large casino bonus promotions like the 400% and greater
                casino bonuses found here are great fun if you enjoy play time.
                Take careful not of any requirements such as allowed games to
                play maximum bet sizes as you work your way towards beating the
                wager requirements
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
              Our top 400% and greater casino bonus offers
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
            <p className="my-4 py-4 font-bold md:my-8">Hot Bonuses Right Now</p>
            <BonusSlider
              FaArrowCircleRight={<FaArrowCircleRight className="mx-2" />}
              casinos={bdata}
            />
            <p className="mdmy-8 my-4 py-4 font-bold">
              Complete Large Casino Bonus List
            </p>
            <Bonus3 data={bdata} />
          </div>

          <div>
            <h3 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
              Details about casino with 400% or larger bonuses
            </h3>
            <ProsCons data={prosCons} />
            <Faq data={faq} />
          </div>
        </div>
      </section>
      <div className="mt-2 p-4 text-left md:mx-24 md:text-2xl">
        <h4 className="text-2xl font-semibold md:text-5xl">
          Use this casino guide to get huge bonuses
        </h4>
        <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
          These big gigantic 400% plus online casino bonuses are great fun and a
          challenge. Allfreechips delivers a comprehensive casino guide to help
          navigate all you need to know about playing these bonus casinos
          including:
        </p>
        <ul className="list-disc pl-4 font-normal">
          <li>bonus value;</li>
          <li>playthrough requirements;</li>
          <li>type of software used;</li>
          <li>comprehensive reviews and rates.</li>
        </ul>
        <Author data={authorData} />
      </div>
    </div>
  );
}
