import prisma from "@/client";
import Author from "@/components/AboutAuthor";
import Bonus3 from "@/components/Bonus3";
import FaqJsonLD from "@/components/FaqJsonLDX";
import Homework from "@/components/Homework";
import ProSchema from "@/components/ProJsonLDX";
import ProsCons from "@/components/ProsCons";
import TimeForNewCasino from "@/components/TimeForNewCasino";
import Faq from "@/components/faq";
import BonusFilter from "@/components/functions/bonusfilter";
import monthYear from "@/components/functions/monthYear";
import { Metadata } from "next";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
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
  const Title =
    "USA Casinos : " + monthYear() + " Free no deposit USA casino bonus codes";
  const description =
    "Full USA online casino list including no deposit and free spin USA casino codes for " +
    monthYear();
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
      OR: [
        {
          NOT: { casino_geo: { some: { country: "US", allow: 0 } } },
          casino_geo: { some: { allow: 0 } },
        },
        {
          casino_geo: { some: { allow: 1, country: "US" } },
        },
      ],
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
    orderBy: [{ hot: "desc" }, { new: "desc" }],
    take: casTake,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { bonus };
}

export default async function PageOut({ params }) {
  const hint_title = "Title";
  const hint_text = "Text for the hint";
  const props = await getProps({ params });
  const prosCons = {
    pros: [
      {
        title: "USA Online Casinos",
        content:
          "American should be free to play any casino they want, and online casinos allowing USA players may be the best route for Americans to gamble.",
      },
      {
        title: "Game whenver you like",
        content:
          "If you feel like playing slots at 4AM you can easily play at an online casino from your home in the US. Also if you like to gamble in your pajamas that cool as well.",
      },
    ],
    cons: [
      {
        title: "Banking",
        content:
          "The cons for USA casinos is the banking sytem, they are not allowed to transfer funds for illegal online gambling yet nobody knows what illegal online gaming is so its a strange law.",
      },
    ],
  };

  const faq = [
    {
      question: "Are Online Casinos legal to play in the USA?",
      answer:
        "Yes and no, each state may have their own laws regulating online gaming and UIGEA act of 2006 stuck on the port security bill in states that banks may not transfer money from illegal online casinos. Not licensed casinos are not illegal but take this as you see fit and check with your local laws on playing any casino while in the USA.",
    },
    {
      question: "Why should I play online when we have land based US Casinos?",
      answer:
        "Just like many brick and mortar business have discovered its much less overhead to have an online presence. This allows online casinos to offer better odds on slots, bigger bonuses than land based casinos can afford to offer.",
    },
    {
      question: "Do casinos collect taxes for US players?",
      answer:
        "For the most part online casinos will not hold a tax for US taxes, this like other income is your responsibility to report and pay.  Note that federal tax on gambling is taxed at a lower rate than income, and all states vary on gambling earnings.",
    },
  ];

  const bdata = props.bonus;
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustraiting years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const links = [
    { link: "#ProsCons", text: `USA Casino Pros and Cons` },
    { link: "#faq", text: `USA Casino FAQs` },
  ];
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema
        prosCons={prosCons}
        name="USA Casinos"
        product="Casinos for USA Play"
      />
      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            Best USA Online Casinos {monthYear()}
          </h1>
          <div className="mt-3 rounded-xl bg-slate-100 dark:bg-gray-200 dark:text-black">
            <div className="card p-4">
              <div className="heading flex items-center gap-7 border-b pb-4">
                <span className="h-7 w-10 rounded bg-sky-700 dark:bg-zinc-800"></span>
                <h2 className="text-lg">
                  Why you should play{" "}
                  <span className="font-bold">USA Casinos</span>
                </h2>
              </div>
              <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
                At Allfreechips.com, we provide access to various Online Casinos
                for American players who believe they have the right to spend
                their money the way they want. We offer a secure and safe
                environment to play, great casino promotions, excellent customer
                service, and a wide selection of online games. If you are
                looking for the best online casino in the USA, we are sure you
                will find it on our website. We thoroughly vet all casinos
                available on our site to make sure they have a good history,
                fast payouts, and quality customer support. Moreover, you can
                also check out their reviews to know what other players say
                about them. We regularly add new USA online casinos to our list.
                So, visit our website not to miss Exclusive bonuses and
                promotions.
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
          <div className="flex flex-col rounded-lg">
            <h3 className="text-2xl font-semibold md:my-6 md:text-5xl">
              Complete USA Casino guide
            </h3>
            <Bonus3 data={bdata} />
            <form action={loadMoreCasino} className="text-center">
              <input type="hidden" name="casinoNumber" value={casinoNum + 1} />
              <LoadMoreButton text="Load More USA Casinos" />
            </form>
            <h3 className="text-2xl font-semibold md:my-6 md:text-5xl">
              No Deposit USA Casino Bonuses
            </h3>
            <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
              AllFreeChips delivers one of the best resources for{" "}
              <Link
                className="font-semibold text-blue-600 hover:underline dark:text-orange-300"
                href="/no-deposit-casinos"
              >
                no deposit USA casinos
              </Link>{" "}
              . With exclusive USA bonuses from over 200 casinos, we are always
              delivering for our fantastic members here. The more interaction
              from our players with these casinos the better, as we like to have
              them compete for top positions here by offering even larger or
              better no deposit USA casino bonuses and codes! This method brings
              you the following benefits:
            </p>
            <ul className="list-disc pl-4 pr-4 font-normal md:pl-14 md:text-xl">
              <li>
                <b>Large USA no deposit bonuses</b>. We have so many large
                bonuses here you have to be somewhat impressed I hope. Along
                with the large bonus values we have many for both new and
                current players at most USA casinos.
              </li>
              <li>
                <b>USA no deposit bonus codes.</b> One of my favorite innovation
                in the online gambling industry in the last 10 years has been
                the introduction of the bonus codes. These USA casino bonus
                codes places the activation of the bonuses in your hands, no
                longer do you need to wait for a manual credit from the casino
                support staff.
              </li>
              <li>
                <b>Exclusive USA casino bonuses.</b> With our popularity we
                often get monthly, sometime weekly updates to out list of USA no
                deposit bonuses. Not only does updating the bonus help casinos
                move up on our lists, it also allows the players here to keep
                playing on the house during the month as many casinos from Rival
                allow for current players to keep using the no deposit bonuses
                but you have to make small deposits in between if you want to be
                able to cash these out.
              </li>
            </ul>
            <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
              To wrap up the discussion on USA no deposit casino play, please be
              sure to read the terms and conditions tied to these bonuses as
              many are very strict. The RTG casinos always require a deposit of
              some sort between using a no deposit one if you plan on cashing
              out. Many times players assume that if the casino credits your no
              deposit bonuses they must be allowed to use them, do not fall into
              this pitfall.
            </p>
          </div>

          <TimeForNewCasino />

          <div>
            <h4 className="text-2xl font-semibold md:my-6 md:text-5xl">
              More about playing at USA Casinos
            </h4>
            <ProsCons data={prosCons} />
            <Faq data={faq} />
            <Author data={authorData} />
          </div>
        </div>
      </section>

      <Homework />
    </div>
  );
}
