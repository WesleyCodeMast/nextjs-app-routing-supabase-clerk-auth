import { _avg } from "@/app/lib/Aggregation";
import Image from "next/legacy/image";
import Link from "next/link";
import { BsFillStarFill } from "react-icons/bs";
import {
  FaArrowCircleRight,
  FaChevronCircleDown,
  FaChevronCircleUp,
  FaCopyright,
} from "react-icons/fa";
import { VscStarEmpty } from "react-icons/vsc";
import { BonusItemTermsDisplay } from "./details";
import { BonusItemTerms } from "./selector";
import { PlayCasinoLink } from "../PlayCasinoLink";

export function CasinoDisplayListContent({ data }) {
  const bonusTerms: string = ""; // TODO: details
  const ratings = data.map((d) => {
    return _avg(d.casino_ratings);
  });
  return data.map((d, index) => (
    <div
      key={d.id}
      className="relative my-4 items-center rounded border border-gray-300 p-6"
    >
      <div className="md:flex md:justify-between">
        <div className="flex items-center md:flex-col">
          <Image
            unoptimized
            alt={d.casino + " logo"}
            width={100}
            height={80}
            src={`/image/casinoiconscut/${encodeURIComponent(d.button)}`}
          />
        </div>
        <hr className="border-sky-700 dark:border-white" />
        <div className="flex items-center justify-between py-4 md:flex-col">
          <p className="">Deposit Bonus</p>
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="flex-col pr-3 text-lg font-medium md:flex md:text-4xl">
                {d.depositPercent}%{" "}
                <span className="md:text-lg">
                  up to {d.currency}
                  {d.depositBonus}
                </span>
              </p>
            </div>
          </div>
        </div>
        <hr className="border-sky-700 md:h-14 md:border dark:border-white" />
        <div className="flex items-center justify-between py-4 md:flex-col">
          <p className="">{d.nodeposit_type} Bonus</p>
          <div className="flex flex-col">
            <div className="flex items-center">
              <p className="flex-col pr-3 text-lg font-medium md:flex md:text-4xl">
                {d.ndcurrency}
                {d.nodeposit}
                {d.fstext} <span className="md:text-lg">{d.ndCodeDisp}</span>
              </p>
            </div>
          </div>
        </div>
        <hr className="border-sky-700 dark:border-white" />
        <div className="flex flex-col">
          <PlayCasinoLink
            casinoId={d.clean_name}
            className="my-4 flex items-center justify-center rounded bg-sky-700 py-3 font-bold text-white md:px-8 dark:bg-white dark:text-black"
          >
            Play Now
            <FaArrowCircleRight className="mx-2" />
          </PlayCasinoLink>
          <p className="text-sm font-normal">
            On {d.casino}’s {d.casinoSiteText}
          </p>
        </div>
      </div>

      <div className="md:flex md:justify-between">
        <div className="flex flex-row sm:items-center sm:space-x-3 md:flex-row md:items-center md:space-x-6">
          <p className="text-sm font-medium">{d.casino} user&apos;s ratings</p>
          <div className="flex items-center sm:space-x-0 md:space-x-2">
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value}>
                {ratings[index] >= value && <BsFillStarFill />}
                {ratings[index] < value && <VscStarEmpty />}
              </div>
            ))}

            <p className="pl-3 font-medium">{ratings[index]?.toFixed(2)}</p>
          </div>
        </div>
        {bonusTerms ? (
          <BonusItemTerms
            selectorId={d.id}
            open={<FaChevronCircleDown />}
            close={<FaChevronCircleUp />}
          />
        ) : null}
        <div className="w-[178px]">
          <b className="text-normal font-medium">
            <Link href={`/casinos/${encodeURIComponent(d.clean_name)}`}>
              {d.casinoRevText}
            </Link>
          </b>
        </div>
      </div>
      {bonusTerms ? (
        <BonusItemTermsDisplay selectorId={d.id}>
          <div className="absolute left-4 right-4 z-10 inline-block rounded-lg border border-gray-200 bg-white px-3 py-2 text-base font-medium text-current shadow-xl md:left-1/2">
            {bonusTerms.startsWith("http") ? (
              <p>
                <a
                  rel="noreferrer"
                  href={bonusTerms}
                  target="_blank"
                  className="text-lg font-bold italic underline underline-offset-2 antialiased hover:font-bold hover:not-italic"
                >
                  Click here to read on {d.casino}
                </a>
              </p>
            ) : (
              <p>{bonusTerms}</p>
            )}
          </div>
        </BonusItemTermsDisplay>
      ) : null}
    </div>
  ));
}
