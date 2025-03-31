import prisma from "@/client";
import LatestFeed from "@/components/LatestFeed";
import { categoriesFilter } from "@/components/functions/latestFilter";
import monthYear from "@/components/functions/monthYear";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
let pageNum = 1;
async function loadMoreData(formData) {
  "use server";

  pageNum = Number(formData.get("pageNumber")) + 1;
  revalidatePath("CURRENT PAGE");
}
async function getProps({ params }) {
  const slug = params.slug;

  const cdata = await prisma.casino_p_publish_categories.findMany({
    where: {
      slug: slug,
    },
    select: {
      c_id: true,
      name: true,
    },
  });

  // grab latest bonuses matching category
  const cat = cdata[0]?.c_id;
  const useCat = cat ?? 1;
  const takeNum = pageNum * 5;
  const data = await prisma.casino_p_publish_articles.findMany({
    where: {
      groups: { has: useCat },
      casino: {
        AND: [
          {
            approved: 1,
          },
          {
            rogue: 0,
          },
        ],
      },
    },
    select: {
      a_id: true,
      title: true,
      code: true,
      url: true,
      article: true,
      bonuscode: true,
      bonuspercent: true,
      bonusamount: true,
      maxcashout: true,
      freespins: true,
      bonusplaythrough: true,
      exclusive: true,
      nodeposit: true,
      freetime: true,
      playertype: true,
      tournament: true,
      startdate: true,
      enddate: true,
      date: true,
      game_id: true,
      casino: {
        select: {
          id: true,
          currency_val: true,
          casino: true,
          vercel_image_url: true,
          vercel_casino_button: true,
          clean_name: true,
          button: true,
        },
      },
      game: {
        select: {
          game_name: true,
          game_clean_name: true,
          vercel_image_url: true,
        },
      },
    },
    orderBy: { a_id: "desc" },
    take: takeNum,
  });

  const categories = await prisma.casino_p_publish_categories.findMany({
    select: {
      c_id: true,
      name: true,
      slug: true,
    },
    where: {
      active: 1,
    },
    orderBy: {
      name: "asc",
    },
  });
  let filterCategories = categoriesFilter(categories);
  return { data, filterCategories, cdata };
}
export async function generateMetadata({ params }): Promise<Metadata> {
  const props = await getProps({ params });
  const { cdata } = props;
  const Title =
    "Latest " + cdata[0]?.name + " " + monthYear() + " Casino Bonuses";
  const description =
    cdata[0]?.name +
    " || Latest " +
    cdata[0]?.name +
    " from all over the internet.";
  const kw =
    cdata[0]?.name +
    "casinos, bonus codes, online casino bonuses," +
    cdata[0]?.name +
    " online casino bonuses";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
    keywords: kw,
  };
}
export const revalidate = 7200;

export default async function Latest({ params }) {
  const props = await getProps({ params });
  const { data, filterCategories, cdata } = props;
  return (
    <div className="container mx-auto">
      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white  dark:bg-zinc-800">
            Latest {cdata[0]?.name} for {monthYear()}
          </h1>
        </div>
      </section>

      <div className="flex w-full flex-col gap-5 bg-white  px-3 md:flex-row md:px-16 lg:px-28 dark:bg-zinc-800 ">
        <main className="min-h-screen w-full py-1 md:w-2/3 lg:w-3/4">
          <LatestFeed
            data={data}
            loadMoreData={loadMoreData}
            pageNum={pageNum}
          />
        </main>
        <aside className="hidden py-4 md:block md:w-1/3 lg:w-1/4">
          <div className="sticky top-12 flex h-screen flex-col gap-2 overflow-y-auto rounded-xl border p-2">
            {filterCategories &&
              filterCategories.length > 0 &&
              filterCategories.map((c, i) => (
                <a
                  href={`/latest-casino-bonuses/${c?.slug}`}
                  className="rounded-md px-3 py-1 font-semibold hover:bg-indigo-50 dark:hover:text-zinc-900"
                  key={i}
                >
                  {c?.name}
                </a>
              ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
