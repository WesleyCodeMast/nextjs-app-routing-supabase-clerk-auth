import Image from "next/image";
import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";
import { PlayCasinoLink } from "./PlayCasinoLink";
import { BsFillStarFill } from "react-icons/bs";
import { VscStarEmpty } from "react-icons/vsc";
import { _avg } from "@/app/lib/Aggregation";

const Bonus3 = (data) => {
  const ratings = data.data.map((d) => {
    return _avg(d.casino_ratings);
  });
  const casinos = data.data;

  return (
    <>
      {casinos.map((casino, id) => (
        <div
          key={id}
          className="relative  mb-4 rounded-xl border  bg-slate-100 p-4 dark:bg-zinc-700 "
        >
          <div className="grid grid-cols-1 grid-rows-6 md:grid-cols-7 md:grid-rows-3 md:gap-2">
            <div className="row-span-2 flex  gap-4">
              <span>
                <Image
                  unoptimized
                  alt={casino.casino + " logo"}
                  width={100}
                  height={80}
                  src={`/image/casinoiconscut/${encodeURIComponent(
                    casino.button,
                  )}`}
                />
              </span>
              <span className="text-2xl md:hidden">{casino.casino}</span>
            </div>

            <div className="  bg-white md:col-span-2 md:row-span-2 md:mr-4 md:rounded-xl md:border-x-2 md:p-3 dark:bg-zinc-700 dark:md:border-zinc-900">
              <span className="md:flex-inline text-3xl font-medium md:flex md:px-1 md:text-4xl">
                <span className="text-2xl">{casino.ndcurrency} </span>
                {casino.genericValue}{" "}
              </span>
              <span className="md:flex-inline md:flex md:text-lg">
                {casino.genericText}
                {" Bonus"}
              </span>
              <hr className="md:hidden" />
            </div>
            <div className="bg-white md:col-span-2 md:col-start-4 md:row-span-2 md:rounded-xl md:border-x-2 md:p-3 dark:bg-zinc-700 dark:md:border-zinc-900">
              {" "}
              <span className=" md:flex-inline text-3xl font-medium md:flex  md:text-4xl">
                <span className="text-2xl">{casino.currency} </span>
                {casino.depositBonus}{" "}
                <span className="pl-2 pr-4 text-2xl md:pl-3">
                  {casino.depositPercent}%
                </span>
              </span>
              <span className="md:flex-inline md:flex md:text-lg">
                Casino Deposit Bonus
              </span>
              <hr className="md:hidden" />
            </div>
            <div className="hidden md:col-span-2 md:col-start-6 md:row-span-2 md:block ">
              <div className="text-center text-lg">
                {casino.casino} Bonus Codes
              </div>
              <div>
                <span>No Deposit: </span>{" "}
                <span className="float-right">{casino.ndCodeDisp}</span>
              </div>
              <div>
                <span>Bonus:</span>
                <span className="float-right">{casino.depCodeDisp}</span>
              </div>
              <hr className="md:hidden" />
            </div>
            <div className="hidden md:col-span-2 md:row-start-3 md:block">
              <div className="flex items-center sm:space-x-0 md:space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value}>
                    {ratings[id] >= value && <BsFillStarFill />}
                    {ratings[id] < value && <VscStarEmpty />}
                  </div>
                ))}

                <p className="pl-3 font-medium">{ratings[id]?.toFixed(2)}</p>
              </div>
              <hr className="md:hidden" />
            </div>
            <div className="md:col-span-3 md:col-start-3 md:row-start-3 md:pr-8 ">
              <Link
                href={`/casinos/${encodeURIComponent(casino.clean_name)}`}
                style={{ background: "#f4b504" }}
                className="mb-2 mt-2 flex cursor-pointer items-center justify-center  rounded-xl py-1 text-lg font-medium text-black sm:px-8 md:col-span-2 md:mt-0 md:px-4 lg:px-8 dark:bg-white dark:text-black"
              >
                <div>{casino.casino} Review</div>
                <FaArrowCircleRight className="ml-4" />
              </Link>
            </div>
            <div className="md:col-span-2 md:col-start-6 md:row-start-3">
              <PlayCasinoLink
                casinoId={casino.clean_name}
                className="my-0 flex  cursor-pointer items-center justify-center rounded-xl bg-sky-700 px-4 py-1 text-lg font-medium text-white md:col-span-2 md:mx-0 md:px-1 lg:px-4 dark:bg-white dark:text-black"
              >
                <div className="whitespace-nowrap">Claim Now </div>
                <FaArrowCircleRight className="ml-4" />
              </PlayCasinoLink>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Bonus3;
