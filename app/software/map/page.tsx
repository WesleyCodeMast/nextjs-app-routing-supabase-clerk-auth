import prisma from "@/client";
import Link from "next/link";
import { Metadata } from "next";
async function getProps({ params }) {
  const data = await prisma.casino_p_banks.findMany({
    select: {
      id: true,
      name: true,
      display: true,
      link: true,
    },
    where: {
      status: { equals: 1 },
      w: { gt: 0 },
    },
    orderBy: { name: "asc" },
  });
  return data;
}
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Online Casino Complete Software list on text";
  const description =
    "This is an index page containing all Software Makers located on Allfreechips. ";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}
export default async function PageOut({ params }) {
  const banks = await getProps({ params });

  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
        List of all casino Banking options
      </h1>
      <div className="m-5 p-10">
        {banks.map((d, index) => (
          <div key={index}>
            <Link href={`/casino-banks/${encodeURIComponent(d.name)}`}>
              {d.display ? d.display : d.name}
            </Link>
          </div>
        ))}
        ;
      </div>
    </div>
  );
}
