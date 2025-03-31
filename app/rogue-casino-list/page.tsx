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
      rogue: { not: 0 },

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

export const revalidate = 7200;

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "List of Rogue casinos for " + monthYear() + " , avoid these bad casinos";
  const Description =
    "The latest list of the worst " +
    monthYear() +
    " online casinos and casinos we consider rogue and should not be played at.";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: Description,
  };
}

export default async function PageOut({ params }) {
  const links = [
    { link: "#LikeCasinos", text: `Worst rogue Casinos` },
    { link: "#ProsCons", text: `Rogue Casino Pros and Cons` },
    { link: "#Review", text: `About the rogue casinos` },
    { link: "#faq", text: `Rogue casino FAQs` },
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
        title: "Better to know now",
        content:
          "The online casino industry is pretty solid these days, but a ton of bad or rogue casinos in tha past leave their mark. We try to point out the casinos we have issues with so you will not.",
      },
      {
        title: "Not much here",
        content:
          "These are bad, don't play them!  If you already have an account with one we suggest you no longer play.",
      },
    ],
    cons: [
      {
        title: "No Payments",
        content:
          "The number one reason casino are marked rogue is from the casino not paying players on winnings, or not allowing cash outs outside of terms and conditions.",
      },
    ],
  };

  const faq = [
    {
      question: "How do you decide what make a casino rogue?",
      answer:
        "When we deal directly with casinos we are able to ask about our players that have issue with games, payments or any other issue. If the casino will not work to resolve we ad them here.",
    },
    {
      question: "I have not been paid from a casino can you help",
      answer:
        "If we have a casino listed on Allfreechips we can definitely give you a hand in getting a resolution",
    },
  ];

  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema
        prosCons={prosCons}
        name="Rogue Casinos"
        product="Bad Casino List"
      />
      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            {monthYear()} Bad or rogue online casinos
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
                  <span className="font-bold">rogue Casino list</span>
                </h2>

                <i className="bi bi-info-circle"></i>
              </div>
              <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
                We strongly suggest not playing at any of these rogue casinos
                found here, if you disagree with the label let us know but I
                doubt there will be enough to change our opinion!
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
              List Of The {monthYear()} Rogue Casinos
            </h3>

            <Bonus3 data={bdata} />
          </div>
          <div>
            <h4
              id="Review"
              className="my-4 scroll-mt-40 text-3xl font-semibold"
            >
              About avoiding rogue online casinos
            </h4>
            <div className="text-lg font-normal">
              <b>How to play online casinos safely</b>{" "}
              <p>
                Be sure to always research what casino you play at, and with the
                vast amount of{" "}
                <Link href="/best-online-casinos">good casinos</Link>, just
                avoid these. Hopefully you never run into an issue you can not
                resolve with a casino, and find that the license holder rarely
                will get involved. We find the best way to protect{" "}
                <Link href="/">online gamblers/</Link> is from community input
                and real player experiences.
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
