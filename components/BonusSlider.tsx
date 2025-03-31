/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import "react-multi-carousel/lib/styles.css";
import AFCCarousel from "./AFCCarousel";
import { PlayCasinoLink } from "./PlayCasinoLink";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const BonusSlider = ({ casinos, FaArrowCircleRight }) => {
  return (
    <div className="min-h-42 my-4 items-center rounded border border-gray-300 p-2">
      <AFCCarousel responsive={responsive}>
        {casinos?.map((c, index) => (
          // eslint-disable-next-line react/jsx-no-comment-textnodes
          <div
            className="m-1 my-4 rounded border border-gray-300 p-6"
            key={index}
          >
            <div className=" p-5">
              <Image
                unoptimized
                height="80"
                width="100"
                src={`/image/casinoiconscut/${encodeURIComponent(c.button)}`}
                alt={c.casino + "image"}
              />
            </div>
            <span className="text-lg">{c.casino}</span>
            <div>{c.depositPercent}% Deposit Bonus</div>
            <div>
              No Deposit: {c.ndcurrency}
              {c.nodeposit ? c.nodeposit : 0}
              {c.fstext}
            </div>
            <span>
              <PlayCasinoLink
                casinoId={c.clean_name}
                className="my-4 flex items-center justify-center rounded bg-sky-700 py-3 font-bold text-white md:px-8 dark:bg-white dark:text-black"
              >
                Play Now
                {FaArrowCircleRight}
              </PlayCasinoLink>
            </span>
          </div>
        ))}
      </AFCCarousel>
    </div>
  );
};
export default BonusSlider;
