import Link from "next/link";
// import { BsFillStarFill, BsArrowRightCircleFill } from "react-icons/bs";
// import { VscStarEmpty } from "react-icons/vsc";
import { _avg } from "@/app/lib/Aggregation";
import Image from "next/image";
import { PlayCasinoLink } from "./PlayCasinoLink";

function LikeCasinos({
  data,
  VscStarEmpty,
  BsFillStarFill,
  BsArrowRightCircleFill,
}) {
  const ratings = data.map((d) => {
    return _avg(d.casino_ratings);
  });

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0">
      {data.map((d, index) => (
        <div
          key={d.index}
          className="flex w-full flex-col items-center space-y-4 rounded-xl border border-gray-200 py-6 shadow-md md:w-1/3"
        >
          {/* <LikeCasinoImage
            clean_name={d.clean_name}
            casinoname={d.casinoname}
          /> */}
          <div className="w-full px-8">
            <Image
              unoptimized
              src={`/image/casino/homescreen/${encodeURIComponent(
                d.clean_name,
              )}-homescreen.jpg`}
              width={384}
              height={240}
              className="aspect-[16/10] w-full object-cover"
              alt={d.casino + "home screen"}
            />
          </div>

          <span>{d.casino}</span>
          <span className="flex items-center">
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value}>
                {ratings[index] >= value && VscStarEmpty}
                {ratings[index] < value && BsFillStarFill}
              </div>
            ))}
            <span className="px-2">{ratings[index]?.toFixed(2)}</span>
          </span>
          <PlayCasinoLink
            casinoId={d.clean_name}
            className="my-6 flex items-center justify-center rounded-lg bg-sky-700 px-10 py-3 text-white dark:bg-white dark:text-black"
          >
            Play Now
            {BsArrowRightCircleFill}
          </PlayCasinoLink>
          <hr className="h-0.5 w-full border-sky-700 dark:border-white" />
          <span>Deposit Bonus</span>
          <span>
            {d.depositPercent}% up to {d.currency} {d.depositBonus}
          </span>
          <hr className="h-0.5 w-full border-sky-700 dark:border-white" />
          <span>No Deposit Bonus</span>
          <span>
            {d.ndcurrency}
            {d.nodeposit} {d.nodeposit_type}
          </span>
        </div>
      ))}
    </div>
  );
}

export default LikeCasinos;
