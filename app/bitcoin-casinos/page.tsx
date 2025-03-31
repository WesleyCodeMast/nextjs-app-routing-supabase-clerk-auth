import CasinoSingleCardA from "@/components/CasinoSIngleCardA";
import ProSchema from "@/components/ProJsonLDX";
import Link from "next/link";
import { CgMenuLeft } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import Author from "../../components/AboutAuthor";
import FaqJsonLD from "../../components/FaqJsonLDX";
import ProsCons from "../../components/ProsCons";
import Faq from "../../components/faq";
import monthYear from "../../components/functions/monthYear";
import MobileJump from "../components/MobileJump";
import { revalidatePath } from "next/cache";
import { LoadMoreButton } from "../components/loadMoreButton";
import { Suspense } from "react";
import GeoCountryName from "../lib/GeoCountryName";
import TopCasinos from "../lib/TopCasinos";
import DefaultCasinos from "../lib/DefaultCasinos";
import CasinoDisp from "./CasinoDIsp";
let casinoNum = 1;

async function loadMoreCasino(formData) {
  "use server";

  casinoNum = Number(formData.get("casinoNumber")) + 1;
  revalidatePath("CURRENT PAGE");
}

import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "Bitcoin Casinos :: Complete guide to playing online casinos that offer Bitcoin or other Crypto Currencies";
  const description =
    "The new preferred way to play online casinos is with the use of Bitcoin or other mainstream crypto currencies.  Allfreechips has reviewed may Bitcoin casinos here.";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}
//currencies: { contains: "BTC" },

export default async function PageOut({ params }) {
  const links = [
    {
      link: "#best",
      text: "Best Bitcoin Casinos",
    },
    {
      link: "#ProsCons",
      text: "USA Bitcoin Pros and Cons",
    },
    { link: "#faq", text: "Bitcoin Casino FAQ" },
  ];

  const jumpTo = { links };

  const cardData = {
    title: `Best Bitcoin Casino`,
    casino_id: 1307,
  };
  const author = "AFC Chris";

  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };

  const prosCons = {
    pros: [
      {
        title: "Bitcoin is decentralized",
        content:
          "The great thing about playing with Bitcoin is that its nearly instant, and secure if your using it from your own wallet, see the Bitcoin guide if you do not understand that part.",
      },
      {
        title: "Avoid any banking concerns",
        content:
          "We have seen issue with US casinos processing Visa and Mastercard charges, as well as transferring large winnings through bank wires. Bitcoin eliminates the central banking system putting the power to spend your funds as you wish.",
      },
      {
        title: "Bitcoin appears to be a great investment",
        content:
          "So far since inception Bitcoin has outperformed the Dollar and stock markets by far, some diversity in this currency can be of great benefit in the future.",
      },
    ],
    cons: [
      {
        title: "Unstable values",
        content:
          "Although Bitcoin has outperformed most other investments it is volatile. If you are not confident in the future of Bitcoin and other crypto currencies this may be hard to stomach having funds in there.",
      },
      {
        title: "Scary when new to crypto",
        content:
          "If you have not used crypto currencies yet it may seem very difficult, yet it really is not. See out guide to using bitcoin and crypto currencies. We believe this is the future, but we also realize it's scary at first.",
      },
    ],
  };

  const faq = [
    {
      question: "Are Bitcoin casinos legal in the USA?",
      answer:
        "There is nothing illegal about Bitcoin in the US, you can freely buy it, sell it, and gamble with it. The conversion of Bitcoin to fiat currency (US dollars) is somewhat of a grey area. In the worst-case scenario, capital gains tax would apply.",
    },
    {
      question: "Is Bitcoin safe to use?",
      answer:
        "Yes, cryptocurrencies are very safe as blockchain removes the need for a centralized entity. The only thing left to do is to pick a good online casino from the list above. Here on AllFreechips.com we're listing only reputable casinos, so you're safe if you pick one of those.",
    },
    {
      question: "What are the advantages to Bitcoin Gambling?",
      answer:
        "The main advantage of Bitcoin gambling in USA is that deposits and withdrawals can't be blocked by a bank, which is often the case with fiat deposits as US banks block deposits to known gambling sites. This is not the case in Bitcoin, it bypasses the banks and the central authority.",
    },
    {
      question: "What do I need to start gambling with Bitcoin?",
      answer:
        "To start gambling in Bitcoin, you first need to buy some Bitcoin via an exchange such as Coinbase. When you have BTC in your wallet, you can send it to any.",
    },
    {
      question: "Can I deposit with a debit card and cash out via Bitcoin?",
      answer:
        "Not directly, since almost all casinos require you to deposit and withdraw using the same method. However, you may deposit US dollars via credit or debit card to a crypto exchange such as Coinbase, buy Bitcoin there, send it to a casino, and then withdraw your BTC back to Coinbase.",
    },
  ];
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema
        prosCons={prosCons}
        name="Bitcoin Casinos"
        product="Casinos with Bitcoin"
      />

      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1
            id="best"
            className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white"
          >
            Best Bitcoin And Crypto Casinos For {monthYear()}
          </h1>

          <div className="mt-3 rounded-xl bg-slate-100 dark:bg-gray-200 dark:text-black">
            <div className="card p-4">
              <div className="heading flex items-center gap-7 border-b pb-4">
                <span className="h-7 w-10 rounded bg-sky-700 dark:bg-zinc-800"></span>

                <h2 className="text-lg">
                  <Suspense fallback={"All About Bitcoin and Crypto Casinos"}>
                    All about <GeoCountryName /> Bitcoin and crypto casinos
                  </Suspense>
                </h2>
                <i className="bi bi-info-circle"></i>
              </div>
              <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
                Bitcoin gambling is a fantastic way to gamble in the US as the
                deposits and withdrawals are easier and faster than with any
                other method available to US residents. Also, apart from winning
                in the casino you can benefit from the Bitcoin price rise and
                therefore grow your crypto portfolio! So, choose a bitcoin
                casino from the comprehensive list below. All of them have some
                welcome offer you&apos;ll want to take advantage of, and
                you&apos;ll double your Bitcoin in no time if you claim one of
                those offers. There are casinos that give out Bitcoin no deposit
                bonuses and Bitcoin free spins, so you can start gambling in
                Bitcoin even if you don&apos;t currently have any crypto. Of
                course, you&apos;ll get the most bang for your buck if you take
                advantage one of the Bitcoin welcome bonuses as they are the
                most rewarding.
              </p>
            </div>
          </div>
          <h3 className="my-6 scroll-mt-40 text-3xl font-semibold md:my-10 md:text-4xl">
            Featured Bitcoin Casino
          </h3>
          <CasinoSingleCardA data={cardData} />
        </div>
      </section>
      <MobileJump
        links={{ links }}
        left={
          <CgMenuLeft className="mx-2 text-xl text-white dark:text-black" />
        }
        close={<GrClose className="dark:bg-white" />}
      />

      <section className="mx-4 flex flex-col md:flex-row">
        <div className="lg: hidden lg:flex lg:w-1/4 lg:flex-col">
          <div
            className="md:flex md:flex-col"
            style={{ position: "sticky", top: "140px" }}
          >
            <span className="p-4 text-lg font-medium">ON THIS PAGE</span>
            <hr className="w-60 border-sky-700 dark:border-white" />
            <span className="my-4 border-l-4 border-sky-700 px-4 font-medium dark:border-white">
              Our top picks
            </span>
            <div className="my-4 flex flex-col space-y-4">
              {links.map((l) => (
                <span key={l.link}>
                  <Link href={l.link}>{l.text}</Link>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="text-lg  font-medium md:text-xl lg:w-3/4">
          <div className="text-lg font-normal">
            <h4 className="pb-12 text-xl font-semibold md:text-3xl">
              <Suspense fallback={"AFC's top casino picks for United States"}>
                AFC&apos;s top Bitcoin <GeoCountryName /> Casinos
              </Suspense>
            </h4>
            <Suspense fallback={<DefaultCasinos count={10} />}>
              <TopCasinos type={4} />
            </Suspense>

            <h4 className="pb-12 text-xl font-semibold md:text-3xl">
              <Suspense fallback={`Bitcoin casino list for ${monthYear()}`}>
                <GeoCountryName /> Bitcoin Casino List For {monthYear()}
              </Suspense>
            </h4>

            <Suspense
              fallback={
                <CasinoDisp type={4} casinoNum={casinoNum} countrycode={"US"} />
              }
            >
              <CasinoDisp type={4} casinoNum={casinoNum} countrycode={""} />
            </Suspense>

            <form action={loadMoreCasino} className="text-center">
              <input type="hidden" name="casinoNumber" value={casinoNum + 1} />
              <LoadMoreButton text="Show More Bitcoin Casinos" />
            </form>
          </div>
          <div>
            <h4
              id="SlotReview"
              className="my-4 scroll-mt-40 text-3xl font-semibold"
            >
              Playing Bitcoin USA Casinos Review
            </h4>
            <div className="text-lg font-normal">
              <p className="p-4">
                <b>Why gamble in Bitcoin?</b> When you&apos;re gambling in
                Bitcoin you never have to worry about your deposit or withdrawal
                being blocked. You&apos;re off the grid, the transactions are
                done on the decentralized blockchain, and that&apos;s the safest
                way to move funds. Most casinos will instantly convert your
                Bitcoin deposit to USD, therefore Bitcoin is only a vessel for
                transferring money, and you&apos;ll still be gambling in
                dollars. Some casinos allow gambling directly in Bitcoin.
              </p>{" "}
              <p className="p-4">
                <b>How to buy Bitcoin</b> The easiest way to buy Bitcoin is to
                head over to one of the crypto exchanges such as Coinbase,
                Crypto.com or Gemini. You deposit USD and buy any cryptocurrency
                you like, including Bitcoin. After you do that, Bitcoin will be
                in your wallet and you can freely send it to an online casino
                that accepts Bitcoin deposits, and then bring it back from the
                casino to your wallet when you want.{" "}
              </p>
              <p className="p-4">
                <b>Bitcoin casino payouts, deposits and fees. </b>
                Bitcoin deposits and withdrawals are faster than with any other
                payment method. The only waiting time is when the casino is
                verifying the transaction. Over the past year or so, Bitcoin
                transaction fees were steady at around $2. Most of the time the
                fee per transaction is between $1.50 and $2.50 so that&apos;s
                what you can expect to pay whenever you send Bitcoin somewhere.
                This is very affordable, especially if you transfer a lot of
                funds. With higher amounts, Bitcoin is absolutely the cheapest
                way to move money, as the transaction fee is fixed and
                doesn&apos;t depend on the amount you send. Some casinos even
                pay the fee on your behalf and therefore let you withdraw your
                Bitcoin absolutely free, though the usual $1.50-2.50 fee per
                transaction isn&apos;t much either. Pay attention to the
                exchange rate and any applicable fees when you&apos;re buying
                and selling Bitcoin at an exchange, though. Fees will also apply
                when you&apos;ve converted your Bitcoin to USD and are
                withdrawing USD to your bank account.
              </p>
            </div>
            <ProsCons data={prosCons} />
            <Faq data={faq} />
            <Author data={authorData} />
          </div>
        </div>
      </section>
    </div>
  );
}
