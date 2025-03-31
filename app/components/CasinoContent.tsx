import Image from "next/legacy/image";
import Link from "next/link";
import { AiOutlineExclamation } from "react-icons/ai";
import { BsArrowRightCircleFill, BsFillStarFill } from "react-icons/bs";
import { VscStarEmpty } from "react-icons/vsc";
import { _avg } from "../lib/Aggregation";
import { PlayCasinoLink } from "@/components/PlayCasinoLink";

export default function CasinoContent({ casino }) {
  const firstBonus = casino.bonuses.find((v) => v.deposit > 0);
  const data = casino;

  const myRating = _avg(data.casino_ratings);
  const Homepage =
    "https://www.allfreechips.com/image/games/" + data.homepageimage;
  return (
    <div className="my-2 flex flex-col items-center rounded-xl border-2 px-6 py-2 hover:shadow-lg md:flex-row md:space-x-16">
      <PlayCasinoLink
        casinoId={data.clean_name}
        className="items-center rounded-lg"
      >
        <Image
          unoptimized
          src={Homepage}
          width={440}
          height={300}
          alt={data.homepageimage}
          className="rounded-xl duration-300 hover:scale-105"
        />
      </PlayCasinoLink>
      <div className="flex w-full flex-col py-8">
        <div className="flex flex-col items-center md:flex-row">
          <div className="w-full items-center text-3xl font-medium">
            {data.casino}
          </div>
          <div className="my-4 flex w-full justify-between md:justify-start">
            <div className="flex items-center space-x-2">
              <span className="flex">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value}>
                    {myRating >= value && <BsFillStarFill />}
                    {myRating < value && <VscStarEmpty />}
                  </div>
                ))}
              </span>
              <span>{myRating}</span>
            </div>
            <div className="flex space-x-4">
              <span className="flex items-center">Review</span>
              <span className="h-9 w-9 rounded-full bg-sky-700 text-white dark:bg-zinc-800 dark:text-white">
                <AiOutlineExclamation className="relative left-2 top-2" />
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center md:flex-row md:items-center">
          <div>Top Offer</div>
          <div className="flex items-center">
            <span className="text-5xl">{firstBonus?.deposit} </span>
            <div className="flex flex-col space-y-0 text-base leading-4">
              <span>
                %
                {(
                  (firstBonus?.deposit / (firstBonus?.deposit_amount || 1)) *
                  100
                ).toFixed(0)}
              </span>
              <span>Bonus</span>
            </div>
          </div>
          <div className="font-normal">up to ${firstBonus?.deposit_amount}</div>
        </div>
        <div className="flex flex-col space-y-8 md:flex-row">
          <div className="mt-4 flex w-full items-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl">$10</span>
              <span className="text-sm font-light">Min. Deposit</span>
            </div>
            <hr className="h-1 w-10 rotate-90 border-sky-200" />
            <div className="flex flex-col items-center">
              <span className="text-2xl">{firstBonus?.playthrough}</span>
              <span className="text-sm font-light">Playthrough</span>
            </div>
            <hr className="h-1 w-10 rotate-90 border-sky-200" />
            <div className="flex flex-col items-center">
              <span className="text-sm">Bonus</span>
              <span className="text-sm">details</span>
            </div>
          </div>

          <PlayCasinoLink
            casinoId={data.clean_name}
            className="flex h-14 w-full items-center justify-center rounded-lg bg-sky-700 text-white dark:bg-zinc-800 dark:text-white"
          >
            Claim Now
            <BsArrowRightCircleFill className="mx-4" />
          </PlayCasinoLink>
        </div>
      </div>
    </div>
  );
}
