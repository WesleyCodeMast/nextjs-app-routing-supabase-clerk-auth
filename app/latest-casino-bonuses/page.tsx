import prisma from "@/client";
import FaqJsonLD from "@/components/FaqJsonLDX";
import LatestFeed from "@/components/LatestFeed";
import Faq from "@/components/faq";
import { categoriesFilter } from "@/components/functions/latestFilter";
import monthYear from "@/components/functions/monthYear";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { articleFetch } from "../lib/ArticlesFetch";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "Latest Casino Bonuses " +
    monthYear() +
    ":: realtime casino bonuses to try";
  const description =
    "Realtime list of casino bonuses from around the internet compiled here for you to try. we do not support these so please vote if they work or not.";

  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}

const faq = [
  {
    question:
      "Do you test all of these daily bonuses from all these casinos, it seems impossible?",
    answer:
      "No we do not, we collect them from other public bonus sites out there and compile a list of bonuses for out gamers to try, then we rely on user input to show if they are still working or not..",
  },
  {
    question:
      "If a casino does not honor the bonus should we complain to them about it?",
    answer:
      "Please do not, like we explain here these casino bonuses and bonus codes are not verified, but most should be working.  Contacting the casino will not do any good and may cause them to ask to be removed all together from this list of daily casino bonuses.",
  },
];

let pageNum = 1;
async function getProps({ params }) {
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
  const filterCategories = categoriesFilter(categories);
  return { filterCategories };
}

export const revalidate = 7200;

export default async function Latest({ params }) {
  const props = await getProps({ params });
  async function loadMoreData(formData) {
    "use server";

    pageNum = Number(formData.get("pageNumber")) + 1;
    revalidatePath("CURRENT PAGE");
  }

  const data = await articleFetch(pageNum);
  const { filterCategories } = props;

  return (
    <div className="container mx-auto">
      <FaqJsonLD data={faq} />
      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            Latest Casino Bonuses for {monthYear()}
          </h1>
          <div className="mt-3 rounded-xl bg-slate-100 dark:bg-gray-200 dark:text-black">
            <div className="card p-4">
              <div className="heading flex items-center gap-7 border-b pb-4">
                <span className="h-7 w-10 rounded bg-sky-700 dark:bg-zinc-800"></span>
                <h2 className="text-lg">
                  More about{" "}
                  <span className="font-bold">latest casino bonuses</span>
                </h2>
              </div>
              <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
                These Bonuses are compiled from all over the internet and we are
                not sure the validity of them. This is why we rely on out users
                to report back if they are working or not.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex w-full flex-col gap-5 bg-white px-3 md:flex-row md:px-16 lg:px-28 dark:bg-zinc-800">
        <main className="min-h-screen w-full py-1 md:w-2/3 lg:w-3/4">
          <LatestFeed
            data={data}
            pageNum={pageNum}
            loadMoreData={loadMoreData}
          />
        </main>
        <aside className="hidden py-4 md:block md:w-1/3 lg:w-1/4">
          <div className="sticky top-12 flex h-screen flex-col gap-2 overflow-y-auto rounded-xl border p-2">
            {filterCategories &&
              filterCategories.length > 0 &&
              filterCategories.map((c, i) => (
                <a
                  href={`/latest-casino-bonuses/${c?.slug}`}
                  className="rounded-md px-3 py-1 font-semibold hover:bg-indigo-50"
                  key={i}
                >
                  {c?.name}
                </a>
              ))}
          </div>
        </aside>
      </div>
      <Faq data={faq} />
    </div>
  );
}
