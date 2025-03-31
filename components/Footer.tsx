import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="mx-auto flex flex-col p-4 md:container md:flex-row md:justify-between">
      <span className="text-4xl font-medium">
        <Link href="/">
          <Image
            unoptimized
            alt={"Allfreechips Casino Guide"}
            width={250}
            height={57}
            src={`/images/logo.png`}
          />
        </Link>
        <ul className="text-base font-medium">
          <li className="my-6">
            <Link
              href="https://www.begambleaware.org/"
              rel="nofollow"
              target="_blank"
            >
              <Image
                // unoptimized
                alt="Be Gamble Aware"
                height="38"
                width="250"
                src="https://radiumpowered.com/image/ga/begambleaware.png"
              />
            </Link>
          </li>
          <li className="my-6">
            <Link
              href="https://www.taketimetothink.co.uk/"
              rel="nofollow"
              target="_blank"
            >
              <Image
                // unoptimized
                alt="Take Time"
                height="38"
                width="250"
                src="https://radiumpowered.com/image/ga/taketime.png"
              />
            </Link>
          </li>
          <li>
            <ul>
              <li>AFC MEDIA LLC</li>
              <li>806 Ridgewood blvd.</li>
              <li>Hudson, OH 44236</li>
              <li>+1 (330) 310-2950</li>
            </ul>
          </li>
        </ul>
      </span>
      <div className="flex space-x-6 md:flex-row md:space-x-28">
        <div className="flex flex-col">
          <div className="my-2 text-xl font-medium">
            Online Casinos
            <hr className="w-84 text-gray-600" />
          </div>
          <ul className="text-base font-medium">
            <li className="my-6">
              <Link href="/best-online-casinos">Best Online Casinos</Link>
            </li>
            <li className="my-6">
              <Link href="/crypto-currency-casinos">Crypto Casino Guide</Link>
            </li>
            <li className="my-6">
              <Link href="/new-casinos">New Online Casinos</Link>
            </li>
            <li className="my-6">
              <Link href="/usa-casinos">US Casinos</Link>
            </li>
            <li className="my-6">
              <Link href="/software/rtg">RTG Casinos</Link>
            </li>
            <li className="my-6">
              <Link href="/bitcoin-casinos">Bitcoin USA Casinos</Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col">
          <div className="my-2 text-xl font-medium">
            About
            <hr className="w-84 text-gray-600" />
          </div>
          <ul className="text-base font-medium">
            <li className="my-6">
              <Link href="/about">About Us</Link>
            </li>
            <li className="my-6">
              <Link href="/chat">Discussions</Link>
            </li>
            <li className="my-6">
              <Link href="/contact-us">Contact Form</Link>
            </li>
            <li className="my-6">
              <Link href="/terms">Terms</Link> /{" "}
              <Link href="/privacy">Privacy</Link>
            </li>
            <li className="my-6">
              <Link href="/scratch-cards">Free Scratch Cards</Link>
            </li>
            <li className="my-6">
              <Link href="/free-dice-game">AFC Dice Game</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
