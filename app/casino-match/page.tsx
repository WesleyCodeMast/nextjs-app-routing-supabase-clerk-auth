import CasinoFilter from "@/components/CasinoFilter";
import { Metadata } from "next";
import {
  getCasinosWithLocation,
  getFilterCondition,
  saveFilterCondition,
} from "../lib/FilterCasino";
export const maxDuration = 25;
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "Allfreechips Casino Match :: Find your next best online casino in seconds";
  const description =
    "Allfreechips Casino Match allows you to fine tune your likes about online casinos and delivers that news directly to you on one page.";

  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };
}

export default async function Match() {
  let defaultCond = await getFilterCondition();
  return (
    <div>
      <div className="p-6">
        <CasinoFilter
          defaultCondition={defaultCond}
          getCasinosWithLocation={getCasinosWithLocation}
          saveFilterCondition={saveFilterCondition}
          // locationList={locationList}
        />
      </div>
      <div className="content" id="afc-main">
        <div className="mx-auto text-sky-700 md:container dark:text-white">
          {/* <CasinoFilter /> */}
        </div>
      </div>
      <div className="mx-auto text-sky-700 md:container dark:text-white">
        <p className="py-6 font-medium md:my-10 md:text-xl">
          Casinomatch allows you to specify all the aspects you look for in
          choosing an online casino, save them and refer at any time. This
          system allows for very fine tuning of bonus sizes, no deposit amounts
          plus much more! These settings are available to save once you are
          logged in, so if you do not yet have an account, please do so you
          allow saving of these filters.
        </p>

        <h2 className="md: px-8 text-3xl font-semibold md:text-6xl">
          Casinomatch offers the following settings :
        </h2>
        <ul className="m-12 font-medium text-sky-700 md:container md:my-10 md:text-xl dark:text-white">
          <li>Geo Location : Only show casinos you can actually play</li>
          <li>
            <b>No deposit Bonuses</b> : Turn on and off both free spins and no
            deposit free chips.
          </li>
          <li>
            <b>Bonus Size:</b> A simple slider allows to fine tune the
            percentage of bonus sizes.
          </li>
          <li>
            <b>Mobile Casinos:</b> Ability to hide casino that do not support
            mobile use.
          </li>
          <li>
            <b>Live Dealers :</b> Ability to hide casinos not having a live
            dealer section.
          </li>
          <li>
            <b>Casino Software:</b> Add the software(s) you like to play with
            and see all options possible.
          </li>
          <li>
            <b>Casino Jurisdictions:</b> Fine tune further by selecting the
            license(s) you trust.
          </li>
          <li>
            <b>Banking Operators:</b> Only show casinos support you deposit
            methods.
          </li>
        </ul>

        <h2 className="md: px-8 text-3xl font-semibold md:text-6xl">
          Easy to see the benefits of Casinomatch
        </h2>
        <p className="py-6 font-medium md:my-10 md:text-xl">
          It is very easy to see the benefit of using the new Casinomatch
          system, you can revisit this single page to see all the casinos that
          have exactly what you are looking for. Soon there will be sorting
          based on latest updated so you can see instantly if there are new
          bonuses available saving you time on not missing your free chips.
        </p>
      </div>
    </div>
  );
}
