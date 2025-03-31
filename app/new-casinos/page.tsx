import prisma from "@/client";
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
import { revalidatePath } from "next/cache";
import { LoadMoreButton } from "../components/loadMoreButton";
export const revalidate = 3000;
let casinoNum = 1;

async function loadMoreCasino(formData) {
  "use server";

  casinoNum = Number(formData.get("casinoNumber")) + 1;
  revalidatePath("CURRENT PAGE");
}

async function getProps({ params }) {
  let casTake = casinoNum * 15;
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      vercel_image_url: { not: null },
      vercel_casino_button: { not: null },

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
    orderBy: { id: "desc" },
    take: casTake,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { bonus };
}
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "New Online Casinos : " + monthYear() + " New Casinos on Allfreechips";
  const Description =
    "See the latest online casinos here as we add every new casino in order, new " +
    monthYear() +
    " online casinos";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: Description,
  };
}

export default async function PageOut({ params }) {
  const links = [
    { link: "#LikeCasinos", text: `New Casinos` },
    { link: "#ProsCons", text: `New Casino Pros and Cons` },
    { link: "#Review", text: `About New Casinos` },
    { link: "#faq", text: `New Casino FAQs` },
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
        title: "New Casinos for new accounts",
        content:
          "Although most players fine a favorite casino to stick with and establish trust with a certain online casino, playing at a new casino may be refreshing as well. When you sign up for a new casino you are of course given whatever welcome promotions they offer.",
      },
      {
        title: "New games",
        content:
          "You may notice older casinos stick with one or two gaming providers; most new online casinos offer a large suite of casino software operators.",
      },
    ],
    cons: [
      {
        title: "Fresh Start",
        content:
          "As with most things in life sometime a fresh start makes all the difference! It's always good to keep an eye on what new options you may have out there when looking for the best new casinos.",
      },
    ],
  };

  const faq = [
    {
      question: "Are new online casinos safe?",
      answer:
        "We review casinos added to Allfreechips and only allow brands we feel are legitimate gaming casinos. If we find any issue with playing, banking or hearing from users we move quick to ensure issues are resolved or they are moved to the rogue section, something we have not had to do in quite some time.",
    },
    {
      question: "Do I get new promos at a new casino?",
      answer:
        "Of course you do, that is the number one draw for players to try new casinos. Sign up and take advantage of whatever the casino if offering for your business.",
    },
  ];

  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema
        prosCons={prosCons}
        name="New Casinos"
        product="New Casino List"
      />
      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            {monthYear()} new online casinos
          </h1>

          <div className="mt-3 rounded-xl bg-slate-100 dark:bg-gray-200 dark:text-black">
            <div className="card p-4">
              <div className="heading flex items-center gap-7 border-b pb-4">
                <span className="h-7 w-10 rounded bg-sky-700 dark:bg-zinc-800"></span>
                <h2 className="text-lg">
                  See the latest <span className="font-bold">New Casinos</span>
                </h2>
              </div>
              <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
                Showing the latest new online casinos here is a great way to
                show you what is of course new! The list is always updated
                showing casinos we recently added to Allfreechips, we also try
                to only show you casinos that you can play based on your
                location.
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
              List Of Newest Casinos {monthYear()}
            </h3>

            <Bonus3 data={bdata} />
            <form action={loadMoreCasino} className="text-center">
              <input type="hidden" name="casinoNumber" value={casinoNum} />
              <LoadMoreButton text="Show More New Casinos" />
            </form>
          </div>
          <div>
            <h3
              id="Review"
              className="my-4 scroll-mt-40 text-3xl font-semibold"
            >
              About Playing New Online Casinos
            </h3>
            <div className="text-lg font-normal">
              <b>How to choose a new online casino wisely</b>{" "}
              <p>
                Keep your eyes open and never miss numerous opportunities
                offered by the casinos that have just been launched. Taking into
                account that this is a very competitive industry, you will never
                get bored. Your choices are incredibly vast, and they will only
                keep growing. You will always find new slot sites or casino
                games to try your luck. In order to stand out and become
                popular, new casino sites create various interesting promotional
                campaigns to attract players. Sign up bonuses, or grand opening
                contests can get them a lot of loyal players. At
                Allfreechips.com, we are constantly looking out for new casinos
                offering great bonuses because it’s important for us to provide
                you with as much information as possible. Be sure that with our
                service, you will always be the first one to know about them.
              </p>
              <p>
                However, being aware of all the opportunities is not enough for
                spotting a trustworthy casino. Make sure that a casino provides
                good customer support. A reliable casino usually offers 24/7
                support to players via online chat and other means of
                communication. The ability to get the necessary support allows
                an establishment to retain more players. Also, pay attention to
                the selection of games and the variety of game providers.
                Renowned software providers such as playtech, microgaming, and
                Rival regularly audit and update their software to ensure
                players are treated fairly. Thus, you can rest assured that you
                will always have a fair game. On the other hand, new casinos
                that use games from new software companies can let you
                experience new game styles.
              </p>{" "}
              <b>Why choose new online casinos</b>{" "}
              <p>
                Many online players value a big supply of games, fast
                withdrawals, and big bonuses. And that’s exactly what new
                casinos offer. Nowadays, to keep the players happy is like the
                main requirement. That’s why new casinos try to offer the most
                beneficial terms for playing games on their platforms and thus,
                make their players come back. The casinos we list on our website
                hold to high standards, and you can easily get access to them at
                any time you want. Just pick a casino and enjoy the games. If
                you are trying out a new, unrated casino, make sure you leave
                your review after your gaming experience so that other players
                could know what to expect. If you are a novice player, look
                through our Casino guides, join our forum or the community of
                players who love to gamble. It will help you quickly become an
                expert player.{" "}
              </p>
            </div>
            <ProsCons data={prosCons} />
            <Faq data={faq} />
          </div>
        </div>
      </section>
    </div>
  );
}
