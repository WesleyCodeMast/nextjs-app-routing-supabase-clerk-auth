import Image from "next/image";
import Link from "next/link";
import latestFilter from "./functions/latestFilter";
import { LoadMoreButton } from "@/app/components/loadMoreButton";
import { PlayCasinoLink } from "./PlayCasinoLink";
const LatestFeed = ({ data, loadMoreData, pageNum }) => {
  const fdata = latestFilter(data);

  return (
    <div className="p-2 md:p-4">
      <div>
        <div className="flex flex-col gap-6 pb-6">
          {data &&
            data.length > 0 &&
            data.map((d: any, index: number) => (
              <div
                key={index}
                className="relative flex flex-col items-center gap-x-8 rounded-xl border bg-white p-3 md:flex-row dark:bg-zinc-800"
              >
                <div className="mt-12 shrink-0">
                  <div className="absolute top-8 ml-8">
                    <span className="me-2 rounded bg-sky-100 px-2.5 py-0.5 text-base font-medium text-blue-800 dark:bg-blue-900 dark:text-sky-300">
                      {d.dateDisp}
                    </span>
                  </div>
                  <Image
                    unoptimized
                    className="justify-center duration-300 hover:translate-y-1"
                    width={100}
                    height={80}
                    src={"/image/casinoiconscut/" + d?.casino?.button}
                    alt={d?.casino?.clean_name}
                    loading="lazy"
                  />
                  <div className="py-3">
                    <Link
                      href={`/casinos/${d?.casino?.clean_name}`}
                      className="bg-anim dark:text-white-900 flex h-12 w-28 items-center justify-center rounded-full border-4 border-sky-700 text-sky-700 hover:bg-sky-700 hover:text-white"
                    >
                      <span className="">Review</span>
                    </Link>
                  </div>
                  <div className="py-3">
                    <PlayCasinoLink
                      casinoId={d?.casino?.clean_name ?? ""}
                      className="bg-anim flex h-12 w-28 items-center justify-center rounded-full border-4 border-sky-700 text-sky-700 hover:bg-sky-700 hover:text-white"
                    >
                      <span className="">Play</span>
                    </PlayCasinoLink>
                  </div>
                  {/* <a
                          className="mt-2 border-2 border-sky-700 rounded-full text-sky-700 bg-anim hover:bg-sky-700 hover:text-white flex items-center justify-center">
                          <span className="">{d?.casino?.casino} Review</span>
                        </a> */}
                </div>
                <div className="w-full">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center">
                      <Link
                        className="hover:text-cyan-400"
                        href={`/casinos/${d?.casino?.clean_name}`}
                      >
                        <h2
                          className="mb-6 text-2xl font-bold"
                          style={{ overflowWrap: "anywhere" }}
                        >
                          {d?.title}
                        </h2>
                      </Link>
                    </div>
                  </div>
                  <div
                    className="text-semibold mt-3"
                    style={{ overflowWrap: "anywhere" }}
                  >
                    <div dangerouslySetInnerHTML={{ __html: d?.article }} />
                  </div>
                  <div className="mt-4 flex justify-between">
                    {/* <a
                          href={`/casinos/${d?.casino?.clean_name}`}
                          className="w-28 h-12 border-4 border-sky-700 rounded-full text-sky-700 bg-anim hover:bg-sky-700 hover:text-white flex items-center justify-center">
                          <span className="">Working</span>
                        </a>
                        <a
                          href={``}
                          className="w-28 h-12 border-4 border-red-500 rounded-full text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center">
                          <span className="">Not Valid</span>
                        </a> */}
                  </div>
                </div>
              </div>
            ))}
          {!data ||
            (data.length === 0 && (
              <div className="px-3 pb-6 pt-2 text-center">
                <h2 className="text-xl font-semibold">
                  There are no articles!!!
                </h2>
              </div>
            ))}
        </div>
      </div>
      <form action={loadMoreData} className="text-center">
        <input type="hidden" name="pageNumber" value={pageNum} />
        <LoadMoreButton text="Show More" />
      </form>
    </div>
  );
};
export default LatestFeed;
