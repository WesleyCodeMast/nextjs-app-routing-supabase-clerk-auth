import prisma from "@/client";
import Link from "next/link";
import { Metadata } from "next";
async function getProps({ params }) {
  const data = await prisma.casino_p_games.findMany({
    select: {
      game_name: true,
      game_clean_name: true,
    },
    where: {
      game_clean_name: { not: null },
      review: {
        some: {
          description: {
            not: null,
          },
        },
      },
    },
    orderBy: { game_name: "asc" },
  });
  return data;
}
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Online Casino Slot Machine list on text";
  const description =
    "This is an index page containing all Slots located on Allfreechips. ";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}
export default async function PageOut({ params }) {
  const casinos = await getProps({ params });
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
        List of all active slot machines
      </h1>
      <div id="container" className="grid grid-cols-4 gap-4">
        {casinos.map((d, index) => (
          <div key={index}>
            <Link
              href={`/slots/${encodeURIComponent(
                d.game_clean_name ?? "inetbet",
              )}`}
            >
              {d.game_name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
