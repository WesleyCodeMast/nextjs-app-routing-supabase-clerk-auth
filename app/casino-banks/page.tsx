import prisma from "@/client";
import BankDisplay from "@/components/BankDisplay";
import monthYear from "@/components/functions/monthYear";
import Link from "next/link";
import { Metadata } from "next";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Complete list of online casino by banking and deposit options";
  const description =
    "Allfreechips complete guide to online casinos by banking methods. Learn |bitcoin, visa and other deposit methods for casinos";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}

async function getProps() {
  const data = await prisma.casino_p_banks.findMany({
    select: {
      id: true,
      name: true,
      display: true,
      image: true,
      largeimage: true,
      link: true,
      w: true,
      h: true,
    },
    where: {
      status: { equals: 1 },

      // vercel_largeimage_url: { not: "" },

      w: { gt: 0 },
    },
  });
  // Get the number of Casinos for each software
  const numdata: any[] = await prisma.$queryRawUnsafe(
    `SELECT  m.id,CAST(sum(case when mp.parent is not null then 1 else 0 end) as INT) as coun FROM casino_p_banks m
    LEFT JOIN casino_p_bank_connect mp ON mp.bank = m.id
    WHERE m.w > 0 AND m. status = 1
    GROUP BY m.id`,
  );

  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  function mergeOnId(a1, a2) {
    let a3 = Array();
    a1.map(function (d) {
      let coun = d.coun;
      let id = d.id;
      let name = a2.find((x) => x.id === id).name;
      let display = a2.find((x) => x.id === id).display;
      let img = a2.find((x) => x.id === id).largeimage;
      let link = a2.find((x) => x.id === id).link;
      let w = a2.find((x) => x.id === id).w;
      let h = a2.find((x) => x.id === id).h;

      if (coun) {
        a3.push({
          id: id,
          name: name,
          display: display,
          img: img,
          count: coun,
          link: link,
          w: w,
          h: h,
        });
      }
    });

    return a3;
  }

  const newData = sortByKey(numdata, "coun");
  const casSoft = newData.reverse();
  const numGames = 1;
  const softFull = mergeOnId(casSoft, data);

  return { softFull };
}

export default async function PageOut({ params }) {
  const props = await getProps();
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const casSoft = props.softFull;

  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            Best {monthYear()} Casino Banking Providors
          </h1>

          <div className="mt-3 rounded-xl bg-slate-100 dark:bg-gray-200 dark:text-black">
            <div className="card p-4">
              <div className="heading flex items-center gap-7 border-b pb-4">
                <span className="h-7 w-10 rounded bg-sky-700 dark:bg-zinc-800"></span>
                <h2 className="text-lg">Online Casino Banking options</h2>
              </div>
              <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
                Banking is one of the largest issues facing online gambling
                lately. As you see Visa and Mastercard are the most accepted
                online casino banking options available currently but they have
                some downsides with processing fees and blocks from banks. Then
                we have the crypto scene that makes plating at most online
                casinos much easier, Bitcoin, DogeCoin and Ethereum are a few
                examples of the widely accepted crypto currency methods
                available today.
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="text-lg font-medium md:text-xl">
        <BankDisplay casSoft={casSoft} />
      </div>
      <Link href="/casino-banks/map">Full Banking List</Link>
    </div>
  );
}
