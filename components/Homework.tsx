import Link from "next/link";
import { FaBalanceScale, FaGift, FaGifts, FaHandsWash } from "react-icons/fa";
import { TbBeach } from "react-icons/tb";
const Homework = () => {
  return (
    <div className="m-4 flex flex-col rounded-xl bg-sky-100 px-8 pb-10 pt-4 text-center dark:bg-gray-300 dark:text-black">
      <p className="font-medium md:text-2xl">WE VE DONE THE HOMEWORK</p>
      <p className="py-4 text-2xl font-medium leading-8 md:my-4 md:text-4xl">
        See our top player guides for online casinos
      </p>
      <ul className="items-center py-2 text-lg font-normal lg:flex lg:justify-around lg:text-2xl">
        <li className="flex items-center justify-center">
          <FaBalanceScale className="m-2" />
          <Link href="/casino-banks">Online Casino Banking</Link>
        </li>
        <li className="flex items-center justify-center">
          <FaHandsWash className="m-2" />
          <Link href="/slots">New Online Slots</Link>
        </li>
        <li className="flex items-center justify-center">
          <TbBeach className="m-2" />
          <Link href="/software/rtg">RTG Slots Machines</Link>
        </li>
        <li className="flex items-center justify-center">
          <FaGifts className="m-2" />
          <Link href="/software/microgaming">Microgaming Slots Machines</Link>
        </li>
        <li className="flex items-center justify-center">
          <FaGift className="m-2" />
          <Link href="/software/bet-soft">Betsoft Slot Machines</Link>
        </li>
      </ul>
    </div>
  );
};

export default Homework;
