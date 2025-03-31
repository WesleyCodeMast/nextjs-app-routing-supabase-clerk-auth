import MobileJump from "@/app/components/MobileJump";
import prisma from "@/client";
import Bonus3 from "@/components/Bonus3";
import BonusFilter from "@/components/functions/bonusfilter";
import monthYear from "@/components/functions/monthYear";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import { LoadMoreButton } from "@/app/components/loadMoreButton";
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const fullList = await prisma.casino_p_banks.findMany({
    select: {
      name: true,
      display: true,
    },
  });
  return fullList.map((row) => ({
    slug: row.name,
  }));
}
// export async function generateStaticParams() {
//   return [{ slug: 'rtg' }, { slug: 'microgaming' }]
// }
let pageNum = 1;
let casinoNum = 1;

async function loadMoreCasino(formData) {
  "use server";

  casinoNum = Number(formData.get("casinoNumber")) + 1;
  revalidatePath("CURRENT PAGE");
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const props = await getProps({ params });
  const name = props.data[0]?.display ?? props.data[0]?.name;
  const Title =
    name + " online casinos :: Use " + name + " for casino deposits";
  const description =
    "Full list of casinos that use " +
    name +
    " for casino banking deposits or withdraws";

  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}

async function getProps({ params }) {
  const slug = params.slug;
  let casTake = casinoNum * 10;
  const data = await prisma.casino_p_banks.findMany({
    where: {
      name: slug,
      status: { equals: 1 },
    },
    select: {
      id: true,
      name: true,
      vercel_largeimage_url: true,
      display: true,
      image: true,
    },
  });

  const swId = data[0]?.id;

  const LikeCasinoData = await prisma.casino_p_casinos.findMany({
    where: {
      banklist: {
        some: {
          bank: {
            equals: swId,
          },
        },
      },
      approved: {
        equals: 1,
      },
      rogue: {
        equals: 0,
      },
    },
    select: {
      id: true,
      clean_name: true,
      casino: true,
      button: true,
      homepageimage: true,
      bonuses: {
        orderBy: {
          id: "desc",
        },
      },
    },
    orderBy: { id: "desc" },
    take: casTake,
  });
  const bdatav: any[] = LikeCasinoData.filter((p) => p.bonuses.length > 0);
  const bdata = BonusFilter(bdatav);

  return { data, bdata, swId };
}
export const revalidate = 7200;

export default async function Software({ params }) {
  const props = await getProps({ params });
  const BankName = props.data[0]?.display ?? props.data[0]?.name;
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const data: any = props.data[0];
  const links = [{ link: "#casino", text: `Casinos on ${BankName}` }];
  const likeCasinoData = props.bdata;
  const casinoname = likeCasinoData[0]?.casino;
  const casinoid = likeCasinoData[0]?.id;
  const casinoData = { casinoid, casinoname };
  const swId = props.swId;

  async function loadMoreData(formData) {
    "use server";

    pageNum = Number(formData.get("pageNumber")) + 1;
    revalidatePath("CURRENT PAGE");
  }

  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <section className="px-6 py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            Best {BankName} Casinos For {monthYear()}
          </h1>

          <div className="mt-3 rounded-xl bg-slate-100 dark:bg-gray-200 dark:text-black">
            <div className="card p-4">
              <div className="heading flex items-center gap-7 border-b pb-4">
                <span className="h-7 w-10 rounded bg-sky-700 dark:bg-zinc-800"></span>
                <h2 className="text-lg">
                  Pick a casino from{" "}
                  <span className="font-bold">{BankName}</span>
                </h2>

                <i className="bi bi-info-circle"></i>
              </div>
              <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
                Finding your favorite casino or even a new casino for a fresh
                approach is easier when you know the software you like. These
                pages sort the casinos and games by software like the current{" "}
                {BankName} pages.
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
        <div id="casino" className="text-lg  font-medium md:w-3/4 md:text-xl">
          <div className="flex flex-col rounded-lg">
            <p className="my-4 py-4 font-bold md:my-8">
              Casinos using {BankName} newest to oldest
            </p>
            <Bonus3 data={props.bdata} />
            <form action={loadMoreCasino} className="text-center">
              <input type="hidden" name="casinoNumber" value={casinoNum} />
              <LoadMoreButton text="Show More Casinos" />
            </form>
            <form action={loadMoreCasino} className="text-center">
              <input
                type="hidden"
                name="casinoNumber"
                value={casinoNum + 1000}
              />
              <LoadMoreButton text="Show All Casinos" />
            </form>
          </div>
        </div>
      </section>
      <div className="mt-6 pt-6"></div>
    </div>
  );
}
