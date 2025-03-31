import Image from "next/image";
import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";
import { PlayCasinoLink } from "./PlayCasinoLink";
const Bonus = (data) => {
  const casinos = data.data;
  return (
    <>
      {casinos.map((casino, id) => (
        <div key={id} className=" relative  mb-4 rounded-xl border-2  p-4 ">
          <div
            style={
              data.loading
                ? {
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }
                : { display: "none" }
            }
            className={data.loading ? "bg-white dark:bg-zinc-800" : ""}
          ></div>

          <div className="sm:grid-row grid divide-x-0 divide-y-2 divide-current md:grid-cols-12 md:divide-x-2 md:divide-y-0">
            <div className="md:col-span-1">
              <div className="flex items-center pr-4 md:flex-col">
                <Image
                  unoptimized
                  alt={casino.casino + " logo"}
                  width={100}
                  height={80}
                  src={`/image/casinoiconscut/${encodeURIComponent(
                    casino.button,
                  )}`}
                />
              </div>
            </div>
            <div className="flex items-center justify-between px-1  md:col-span-2 md:flex-col">
              <div className="flex flex-row items-center text-base font-medium md:px-1 md:text-3xl">
                {casino.ndcurrency}
                <span className="flex flex-col text-lg font-medium md:px-1 md:text-4xl">
                  {casino.genericValue}
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="flex-col pr-3 text-lg font-medium md:flex md:text-4xl">
                    <span className="md:text-lg">{casino.genericText}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* <hr className="md:border md:h-20 border-sky-700 dark:border-white" /> */}

            <div className="flex items-center justify-between px-1 md:col-span-2 md:flex-col">
              <div className="flex flex-row items-center text-base font-medium md:px-1 md:text-3xl">
                {casino.currency}
                <span className="flex flex-col text-lg font-medium md:px-1 md:text-4xl">
                  {casino.depositBonus}
                </span>
              </div>

              <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="flex-col pr-3 text-lg font-medium md:flex md:text-4xl">
                    <span className="md:text-lg">Bonus</span>
                  </p>
                </div>
              </div>
            </div>
            {/* <hr className="md:border md:h-20 border-sky-700 dark:border-white" /> */}
            <div className="flex items-center justify-between px-1 md:col-span-2 md:flex-col">
              <span className="flex flex-col text-lg font-medium md:px-1 md:text-4xl">
                {casino.depositPlaythough}X
              </span>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="flex-col pr-3 text-lg font-medium md:flex md:text-4xl">
                    <span className="md:text-lg">Playthrough</span>
                  </p>
                </div>
              </div>
            </div>
            {/* <hr className="md:border md:h-20 border-sky-700 dark:border-white" /> */}
            <div className="flex items-center justify-between px-1 md:col-span-3 md:flex-col">
              <span className="flex flex-col text-lg font-medium md:px-1 md:text-xl">
                {casino.code}
              </span>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <p className="flex-col pr-3 text-lg font-medium md:flex md:text-4xl">
                    <span className="md:text-lg">Code</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-between md:col-span-2 md:flex-col">
              <Link
                href={`/casinos/${encodeURIComponent(casino.clean_name)}`}
                style={{ background: "#f4b504" }}
                className="mb-2 mt-2 flex cursor-pointer items-center justify-center  rounded-xl py-1 text-lg font-medium text-black sm:px-8 md:col-span-2 md:mt-0 md:px-4 lg:px-8 dark:bg-white dark:text-black"
              >
                <div>Review</div>
                <FaArrowCircleRight className="ml-4" />
              </Link>
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

export default Bonus;
