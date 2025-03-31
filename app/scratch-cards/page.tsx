import { Scratcher } from "./scratcher";
import { ScratchInfo } from "./scratchInfo";
import { Metadata } from "next";
import { Suspense } from "react";
import RandomCasino from "@/components/RandomCasino";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Free Play Scratch Cards for real money prizes";
  const description =
    "The legendary Allfreechips free scratch cards allow you play every hour for free win real cash prizes.";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}
export default function ScratcherPage() {
  return (
    <section className="px-6  py-8">
      <div className="container mx-auto">
        <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
          Allfreechips Free Scratch Card Game
        </h1>
        <div className="mx-auto text-sky-700 md:container dark:text-white">
          <Scratcher></Scratcher>
          <Suspense>
            <RandomCasino count={3} />
          </Suspense>

          <ScratchInfo />
        </div>
      </div>
    </section>
  );
}
