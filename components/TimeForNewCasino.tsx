import Link from "next/link";
import { FaArrowCircleRight } from "react-icons/fa";
const TimeForNewCasino = () => {
  return (
    <div className="flex font-normal  grid md:grid-cols-3   gap-4  border rounded-xl  py-6 px-6 shadow-md mb-8 bg-[#0369a1] ">
      <div className=" md:col-span-2 sm:col-span-2 flex flex-col">
        <div>
          <p className="text-3xl font-semibold text-white">
            Time for a new casino?
          </p>
        </div>
        <div>
          <span className=" text-white">
            Use CasinoMatch to find your best option in 3 easy steps
          </span>
        </div>
      </div>
      <Link href="./casino-match">
        <div className=" cursor-pointer w-full md:col-span-1  sm:col-span-1 xs-col-span-3 bg-white rounded-lg flex md:justify-evenly justify-center items-center px-8 font-bold">
          <span className=" text-[#0369a1] ">See my match</span>
          <FaArrowCircleRight className="mx-2" />
        </div>
      </Link>
    </div>
  );
};

export default TimeForNewCasino;
