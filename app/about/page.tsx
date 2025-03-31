import { Metadata } from "next";
import OrgSchema from "@/components/OrgSchema";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Allfreechips About Us";
  const description = "Allfreechips About Us.";

  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}
export default async function page() {
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <div className="mt-2 p-2 py-8 text-center md:px-24">
        <h1 className="md: px-8 text-3xl font-semibold md:text-6xl">
          About Allfreechips.com of AFC MEDIA LLC
        </h1>
        <p className="py-6 font-medium md:my-10 md:text-xl">
          Allfreechips.com was established in July of 2004, we have come a long
          way by leveraging our footprint in the online gambling community to
          deliver the very best online casino bonuses for our users. Below we
          are proud to display a little walk through time showing revisions of
          who we are over time, finally landing on this super responsive Next.js
          powered site.
        </p>
      </div>
      <OrgSchema />
    </div>
  );
}
