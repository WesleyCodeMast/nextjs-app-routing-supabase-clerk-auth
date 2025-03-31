import Guides from "@/components/Guides";

import monthYear from "@/components/functions/monthYear";
import { Metadata } from "next";
export const revalidate = 7200;

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = monthYear() + " Free Slots :: Play your favorite slot for free";
  const description =
    "Allfreechips library of free slots to play online, try your favorite slot machine for free here.";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}
export default async function Page() {
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <div className="mt-2 p-2 py-8 text-center md:px-24">
        <div className="mt-2 p-2 py-8 text-center md:px-24">
          <h1 className="md: px-8 text-3xl font-semibold md:text-6xl">
            Latest Free Online Slots
          </h1>
          <p className="py-6 font-medium md:my-10 md:text-xl">
            Coming very soon Allfreechips will offer thousands of free slot
            machines to test drive. While we currently do have a very large list
            of fre ones we are re-designing the complete set to offer a hassle
            free free game interface.
          </p>
          <h2 className="md: px-8 text-3xl font-semibold md:text-6xl">
            Current free games to play
          </h2>
          <iframe
            src="https://slotslaunch.com/iframe/5148?token=sIN62NlvbNR7R3q0Jykx8bmwYbMPERGH7G2YZ5DGUhER8BshpT"
            width="100%"
            height="600px"
          ></iframe>
          <p className="p-8">Try Another!</p>
          <iframe
            src="https://slotslaunch.com/iframe/5147?token=sIN62NlvbNR7R3q0Jykx8bmwYbMPERGH7G2YZ5DGUhER8BshpT"
            width="100%"
            height="600px"
          ></iframe>
          <p className="pt-10">
            We will be adding a full suite of free to play slots, also linked to
            out exclusive online slot reviews very soon.
          </p>
        </div>
      </div>
    </div>
  );
}
