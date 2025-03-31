import Link from "next/link";
import { BiNotepad } from "react-icons/bi";
import {
  FaMedal,
  FaComments,
  FaMoneyBillWave,
  FaDonate,
  FaStar,
} from "react-icons/fa";
import { GiUsaFlag } from "react-icons/gi";
import { RiGameFill } from "react-icons/ri";
import { SiBitcoinsv } from "react-icons/si";
import Casino from "./Casino";

const GridGuide = () => {
  return (
    <div className="mt-2 p-2 py-8 text-center md:px-24">
      <h1 className="md: px-8 text-3xl font-semibold md:text-6xl">
        Helping you find the right online casino
      </h1>
      <p className="py-6 font-medium md:my-10 md:text-xl">
        Welcome to the 2024 version of the Allfreechips online casino guide. We
        will deliver the fastest access to online casinos for both mobile and PC
        gamblers, not only very fast but the very best casinos of 2024.
      </p>
      <div className="grid grid-cols-2 md:grid md:grid-cols-3">
        <Link href="/forum">
          <Casino
            icon={<FaComments className="text-4xl" />}
            title={"AFC Chat Forum"}
          />
        </Link>
        <Link href="/scratch-cards">
          <Casino
            icon={<FaMoneyBillWave className="text-4xl" />}
            title={"Free Scratch Cards"}
          />
        </Link>
        <Link href="/best-online-casinos">
          <Casino
            icon={<FaMedal className="text-4xl" />}
            title={"Best Online Casinos"}
          />
        </Link>
        <Link href="/usa-casinos">
          <Casino
            icon={<GiUsaFlag className="text-4xl" />}
            title={"USA Online Casinos"}
          />
        </Link>
        <Link href="/bitcoin-casinos">
          <Casino
            icon={<SiBitcoinsv className="text-4xl" />}
            title={"Bitcoin USA Casinos"}
          />
        </Link>
        <Link href="/no-deposit-casinos">
          <Casino
            icon={<RiGameFill className="text-4xl" />}
            title={"No Deposit Casinos"}
          />
        </Link>
        <Link href="/free-spin-casinos">
          <Casino
            icon={<FaDonate className="text-4xl" />}
            title={"Free Spins Casinos"}
          />
        </Link>
        <Link href="/new-casinos">
          <Casino
            icon={<FaStar className="text-4xl" />}
            title={"New Online Casinos"}
          />
        </Link>
        <Link href="/latest-casino-bonuses">
          <Casino
            icon={<BiNotepad className="text-4xl" />}
            title={"Latest Casino Bonuses"}
          />
        </Link>
      </div>
    </div>
  );
};

export default GridGuide;
