import { _avg } from "@/app/lib/Aggregation";
import { textWrap } from "@/app/lib/TextWrap";
import Image from "next/image";
import Link from "next/link";
import { BsFillStarFill } from "react-icons/bs";
import { VscStarEmpty } from "react-icons/vsc";
import { LoadMoreButton } from "@/app/components/loadMoreButton";
import { PlayCasinoLink } from "./PlayCasinoLink";
const LikeSlots = ({ data, loadMoreData }) => {
  const games = data.games;
  let totalGames = games.length;
  let endOfGames = 0;
  if (data?.pageNum * 5 !== totalGames) {
    endOfGames = 1;
  }
  const casino = data.casinoData?.casinoname;
  const casinoId = data.casinoData?.casinoid;
  const casinoClean = data.casinoData?.clean_name;

  const ratings = games?.map((g, index) => {
    return _avg(g?.game_ratings);
  });

  return (
    <>
      {games?.length > 0 &&
        games?.map((g, index) => (
          <div
            key={index}
            className="my-6 flex flex-col items-center justify-between rounded-2xl border-2 p-6 md:flex-row md:px-20"
          >
            <span>
              <Image
                unoptimized
                alt={g.game_name + " logo"}
                width={240}
                height={160}
                src={`/image/sloticonssquare/${encodeURIComponent(
                  g.game_image,
                )}`}
              />
            </span>
            <div className="flex flex-col items-center">
              <b className="my-4">{g.software.software_name}</b>
              <b className="text-4xl">{textWrap(g.game_name, 15)}</b>
              <div className="flex items-center justify-between md:flex-col">
                <div className="my-4 flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((value, i) => (
                    <div key={i}>
                      {ratings[index] >= value && <BsFillStarFill />}
                      {ratings[index] < value &&
                        ratings[index] > value - 0.5 && <BsFillStarFill />}
                      {ratings[index] < value && <VscStarEmpty />}
                    </div>
                  ))}
                  <p className="">{ratings[index]?.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Link
                    href={`../slots/${encodeURIComponent(g.game_clean_name)}`}
                    type="button"
                    className="my-6 rounded-full bg-sky-700 px-4 py-2 text-white dark:bg-white dark:text-black"
                  >
                    Slot Review
                    {/* <span key={index} className="word" style={{color: "#21669e",
                  textShadow: "2px 2px #444444, 1px 1px 4px black, 0 0 4px black"}}>Slot Review</span> */}
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="my-4 flex items-center">
                <div className="flex flex-col items-center">
                  <span className="text-4xl">{g.game_lines}</span>
                  <span className="text-xs font-normal">Game lines</span>
                </div>
                <hr className="w-10 rotate-90 border-sky-700 dark:border-white" />
                <div className="flex flex-col items-center">
                  <span className="text-4xl">{g.game_reels}</span>
                  <span className="text-xs font-normal">Game reels</span>
                </div>
                <hr className="w-10 rotate-90 border-sky-700 dark:border-white" />
                <p className="text-base font-normal leading-5">
                  Game
                  <br />
                  details
                </p>
              </div>
              {casinoClean ? (
                <>
                  <PlayCasinoLink
                    casinoId={casinoClean}
                    className="my-6 bg-sky-700 px-20 py-2 text-white dark:bg-white dark:text-black"
                  >
                    Play Now
                  </PlayCasinoLink>
                  <p className="text-base font-normal">
                    On {casino}&#39;s secure site
                  </p>
                </>
              ) : null}
            </div>
          </div>
        ))}
      {endOfGames == 0 ? (
        <form action={loadMoreData} className="text-center">
          <input type="hidden" name="pageNumber" value={data?.pageNum} />
          <LoadMoreButton text="Show More Slots" />
        </form>
      ) : null}
    </>
  );
};

export default LikeSlots;
