import { Metadata } from "next";
export const revalidate = 7200;

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Free online dice roll game for real money prizes";
  const description =
    "Try your luck at the Allfreechips dice roll contest, roll a bunch of dice and high scores win real cash each month.";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}
export default async function Page() {
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      Dice game coming soon!
    </div>
  );
}
