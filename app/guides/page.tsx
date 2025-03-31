import Guides from "@/components/Guides";

import monthYear from "@/components/functions/monthYear";
import { Metadata } from "next";
export const revalidate = 7200;

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = monthYear() + " Current online gambling guide list";
  const description =
    "Online casino guides with detailed information on slots, games and bonus types along with how to instructions.";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}
export default async function Page() {
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <Guides />
      <div className="mt-2 p-2 py-8 text-center md:px-24">
        <div className="mt-2 p-2 py-8 text-center md:px-24">
          <h2 className="md: px-8 text-3xl font-semibold md:text-6xl">
            New Online Gaming Guides
          </h2>
          <p className="py-6 font-medium md:my-10 md:text-xl">
            We will offer multiple new guides including blackjack, poker and
            many more soon! Thi section is a work in progress and we hope to
            bring a few neat additions like automated systems to test your
            betting strategies.
          </p>
        </div>
      </div>
    </div>
  );
}
