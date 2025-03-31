import Link from "next/link";
import { BiNotepad } from "react-icons/bi";
import {
  FaBullseye,
  FaMedal,
  FaDonate,
  FaArrowAltCircleUp,
  FaBriefcase,
} from "react-icons/fa";
import { GiUsaFlag } from "react-icons/gi";
import { RiGameFill } from "react-icons/ri";
import { SiBitcoinsv } from "react-icons/si";
import Casino from "./Casino";

const Guides = () => {
  return (
    <div className="mt-2 p-2 py-8 text-center md:px-24">
      <h1 className="md: px-8 text-3xl font-semibold md:text-6xl">
        Allfreechips Online Gaming Guides
      </h1>
      <p className="py-6 font-medium md:my-10 md:text-xl">
        We are proud to offer detailed guides for online gaming covering most
        topics you hopefully are interested in. We have guides for games, Using
        crypto currency as well as many others.
      </p>
      <div className="grid grid-cols-2 md:grid md:grid-cols-3">
        <Link href="/casino-match">
          <Casino
            icon={<FaBullseye className="text-4xl" />}
            title={"Casino Match"}
          />
        </Link>
        <Link href="/crypto-currency-casinos">
          <Casino
            icon={<FaBriefcase className="text-4xl" />}
            title={"Crypto Casino Guide"}
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
        <Link href="/software">
          <Casino
            icon={<BiNotepad className="text-4xl" />}
            title={"Casinos by Software"}
          />
        </Link>
        <Link href="/large-casino-bonuses">
          <Casino
            icon={<FaArrowAltCircleUp className="text-4xl" />}
            title={"Largest Casino Bonuses"}
          />
        </Link>
      </div>
      <h3 className="md: px-8 text-3xl font-semibold md:text-6xl">
        Let us know what guide you would like
      </h3>
      <p className="py-6 font-medium md:my-10 md:text-xl">
        Feel free to drop us a line and ask for information on any gaming topic.
        Most Online casino questions are easy, but we like to get into
        lesser-known issues that can be helpful.
      </p>
    </div>
  );
};

export default Guides;
