import prisma from "@/client";
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
import BonusFilter from "../../components/functions/bonusfilter";
import { revalidatePath } from "next/cache";
import { LoadMoreButton } from "../components/loadMoreButton";
import Bonus3 from "@/components/Bonus3";
let casinoNum = 1;

async function loadMoreCasino(formData) {
  "use server";

  casinoNum = Number(formData.get("casinoNumber")) + 1;
  revalidatePath("CURRENT PAGE");
}

import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title =
    "Crypto currency casino playing guide : Learn how to play with crypto online";
  const description =
    "Today online casinos are moving towards crypto currencies mainly, learn all you need to know to be safe and secure while enjoying online gaming using crypto currencies.";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}
//currencies: { contains: "BTC" },

async function getProps({ params }) {
  let casTake = casinoNum * 5;
  const data = await prisma.casino_p_casinos.findMany({
    where: {
      approved: 1,
      rogue: 0,
      bonuses: { some: { deposit: { gt: 0 } } },
      currencies: { contains: "BTC" },
      vercel_image_url: { not: null },
      vercel_casino_button: { not: null },
    },
    select: {
      id: true,
      clean_name: true,
      casino: true,
      hot: true,
      new: true,
      button: true,
      bonuses: {
        orderBy: [{ deposit: "desc" }],
      },
      casino_ratings: {
        select: {
          rating: true,
        },
      },
    },
    orderBy: [{ updated: "desc" }],
    take: casTake,
  });

  const bdata: any[] = data.filter((p) => p.bonuses.length > 0);
  const bonus = BonusFilter(bdata);
  return { bonus };
}

export default async function PageOut({ params }) {
  const props = await getProps({ params });
  const jumpTo = {
    links: [
      {
        link: "#ProsCons",
        text: "Crypto Casino Pros and Cons",
      },
      { link: "#faq", text: "Crypto Casino FAQ" },
    ],
  };
  const cardData = {
    title: `Best Crypto Casino`,
    casino_id: 1304,
  };
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const bdata = props.bonus;

  const prosCons = {
    pros: [
      {
        title: "Crypto ease of use",
        content:
          "With all the exchanges and local wallets the use of crypto today is very simple and fast.",
      },
      {
        title: "No need to worry about credit card issues",
        content:
          "I have always been against using a credit card for gambling, or any method of gambling that is using funds you are borrowing as this will almost always turn out with debt.  The larger credit card issue though is the scrutiny and monitoring of what you spend on, this is avoided with crypto transactions.",
      },
      {
        title: "Holding different crypto currency for diversity",
        content:
          "World trends appear to moving more and more towards the use of crypto currencies to hedge against inflation and overreach from governments. With these trends the value of most mainstream currencies is on the rise and will continue to grow as more adoption is achieved. ",
      },
    ],
    cons: [
      {
        title: "Learning curve",
        content:
          "You will see with this guide that there are some things you need to learn to be safe and comfortable using and holding these new currencies.",
      },
      {
        title: "No recourse after funds sent",
        content:
          "A main feature of crypto transfers is that they are one way, there is no ability to reverse a transaction. This is great news if you are selling items and receiving funds as you know the funds are safe, but this is not great if you are concerned with a purchase knowing you will not have any insurance or ability to recover.",
      },
    ],
  };

  const faq = [
    {
      question: "Is holding crypto currencies safe?",
      answer:
        "If you keep your currencies held safely then yes, but there are many aspects and different methods of doing this each with a positive and negative aspect.",
    },
    {
      question: "Will coins like Bitcoin and Ethereum continue to grow?",
      answer:
        "I wish I knew for sure but like anything in life including the US Dollar its impossible to predict this.  Just know that the US dollar has lost 98% of its value since the 1930's. ",
    },
    {
      question: "What are the advantages to Crypto Currency Gambling?",
      answer:
        "The main advantage of gambling with crypto in USA is that deposits and withdrawals can't be blocked by a bank, which is often the case with fiat deposits as US banks block deposits to known gambling sites.",
    },
    {
      question: "What do I need to start gambling with Cryptos?",
      answer:
        "You first need to acquire some coins of your choice such as bitcoin, Ethereum or even a USDT coin to begin quick and easy transaction.",
    },
    {
      question: "What are my storage options for crypto currencies?",
      answer:
        "There are a few basic methods to store your crypto currency coins including online and offline wallet or trusted exchanges.  We will explain the benefits and issues with these on this guide.",
    },
  ];
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <FaqJsonLD data={faq} />
      <ProSchema
        prosCons={prosCons}
        name="Crypto Casinos"
        product="Crypto Casino Guide"
      />

      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            Crypto Currency and Casino Transaction Guide
          </h1>

          <div className="mt-3 rounded-xl bg-slate-100 dark:bg-gray-200 dark:text-black">
            <div className="card p-4">
              <div className="heading flex items-center gap-7 border-b pb-4">
                <span className="h-7 w-10 rounded bg-sky-700 dark:bg-zinc-800"></span>
                <h2 className="text-lg">
                  Learn to use{" "}
                  <span className="font-bold">Crypto Currencies</span>
                </h2>

                <i className="bi bi-info-circle"></i>
              </div>
              <p className="pb-2 pt-4 text-justify font-normal md:p-6 md:text-xl">
                This guide will be updated as things in the crypto currency
                market changes but currently should contain enough information
                for you to feel confident in obtaining, storing and doing
                transactions with cryptos. Feel free to ask nay questions and I
                can answer by adding to this guide.
              </p>
            </div>
          </div>
          <h3 className="my-6 scroll-mt-40 text-3xl font-semibold md:my-10 md:text-4xl">
            Featured Crypto Casino
          </h3>
          <CasinoSingleCardA data={cardData} />
        </div>
      </section>
      <MobileJump
        links={jumpTo}
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
              <span>
                <Link href="#SlotReview">Crypto Casino Guide</Link>
              </span>
              <span>
                <Link href="#quick">Quick Start Crypto</Link>
              </span>
              <span>
                <Link href="#ProsCons"> Crypto Pros and Cons</Link>
              </span>
              <span>
                <Link href="#faq"> Crypto Casino FAQ</Link>
              </span>
              <span>
                <Link href="#LikeCasinos">Top Crypto Casinos</Link>
              </span>
            </div>
          </div>
        </div>
        <div className="text-lg  font-medium md:text-xl lg:w-3/4">
          <div className="text-lg font-normal">
            <h4
              id="LikeCasinos"
              className="my-4 scroll-mt-40 text-3xl font-semibold"
            >
              Top Crypto Casinos {monthYear()}
            </h4>
            <Bonus3 data={bdata} />
            <form action={loadMoreCasino} className="text-center">
              <input type="hidden" name="casinoNumber" value={casinoNum + 1} />
              <LoadMoreButton text="Show More Crypto Casinos" />
            </form>
          </div>
          <div>
            <div className="text-lg font-normal">
              <h4
                id="quick"
                className="my-4 scroll-mt-40 text-3xl font-semibold"
              >
                Crypto Quick Start Guide:{" "}
              </h4>
              <p className="p-4">Create a local Hardware wallet :</p>
              <ul className="ml-8">
                <li>
                  <a
                    className="font-medium"
                    rel="nofollow"
                    target="_blank"
                    href="https://shop.ledger.com/pages/referral-program?referral_code=S50QTTWXAWNT5"
                  >
                    Ledger Hardware Wallet
                  </a>{" "}
                  - Be sure to only buy from ledger.com , get $10 BTC free using
                  this link on purchase.
                </li>
                <li>
                  <a
                    className="font-medium"
                    rel="nofollow"
                    target="_blank"
                    href="https://trezor.io/trezor-safe-3"
                  >
                    Trezo Safe 3
                  </a>
                </li>
              </ul>
              <p className="p-4">Or create a local Software wallet :</p>
              <ul className="ml-8">
                <li>
                  <a
                    className="font-medium"
                    rel="nofollow"
                    target="_blank"
                    href="https://www.exodus.com/"
                  >
                    Exodus Wallet
                  </a>{" "}
                  - This wallet is easy to use and beginner friendly.
                </li>
                <li>
                  <a
                    className="font-medium"
                    rel="nofollow"
                    target="_blank"
                    href="https://guarda.com/"
                  >
                    Guarda Software Wallet
                  </a>{" "}
                  - This wallet supports most coins and is available on
                  smartphones and desktops.
                </li>
              </ul>
              <p className="p-4"> Sign up at an exchange :</p>
              <ul className="ml-8">
                <li>
                  <a
                    className="font-medium"
                    rel="nofollow"
                    target="_blank"
                    href="https://www.kraken.com/"
                  >
                    Kraken
                  </a>{" "}
                  - Canadian Exchange offering instant bank transactions with US
                  banks.
                </li>
                <li>
                  <a
                    className="font-medium"
                    rel="nofollow"
                    target="_blank"
                    href="https://www.coinbase.com/"
                  >
                    Coinbase
                  </a>{" "}
                  - Most accepted top level exchange
                </li>
                <li>
                  <a
                    className="font-medium"
                    rel="nofollow"
                    target="_blank"
                    href="https://www.binance.us/"
                  >
                    Binance
                  </a>{" "}
                  - World wide accepted top level exchange
                </li>
              </ul>
              <p className="p-4">
                Make a deposit, hopefully win a lot and withdraw to your local
                wallet, then keep or exchange for local currencies on your
                exchange of choice.
              </p>
              <h4
                id="SlotReview"
                className="my-4 scroll-mt-40 text-3xl font-semibold"
              >
                Crypto Currency Casino Guide
              </h4>
              <p className="p-4">
                <b>Crypto Overview: </b> This guide is intended to help you
                understand just how easy getting involved with crypto currency
                can be, then of course using them to fund your online casino
                game play. The game play is easy, once you learn some very basic
                things to become comfortable holding and exchanging crypto
                currency sending a &quot;Bit&quot; to a casino is a breeze!
              </p>
              <p className="p-4">
                <b>Ownership Explanation: </b>
                With the many different types of storing bitcoin, the one
                constant you need to understand is ownership. If you buy Bitcoin
                on an exchange, you can send and receive from there as well, but
                you do not actually own it. Ownership is any defined by the
                holding of the keys to the wallet. I am sure you have heard
                about the FTX scandal where the exchange funneled hundreds of
                millions to political donations, a sister company that was also
                fraudulent and im sure many other expenses causing the loss of
                funds from the FTX users. In this terrible theft of funds, the
                FTX user learned that they did not own their balance on the FTX
                exchange, FTX held the keys to the storage crypto assets. Always
                remember the owner of the keys owns the crypto, with no
                exceptions, next we will explain what this key or keys are.
              </p>
              <p className="p-4">
                <b>Wallet Keys: </b>
                This may be the most important part of the crypto guide,
                understanding the keys is the actual &quot;Key&quot; to success!
                So what is a wallet key? A wallet key is usually a 12 or 24 word
                combination in exact order, you should always opt for a longer
                key for enhanced protection. This key consists of simple words
                such as hammer,door,eagle,triangle along with pretty much any
                other word. Once the key is established the currency is then
                ties to that sequence of words or key. As this key is so
                important you really never want to copt and paste on any pc,
                email or anything that can be compromised or stolen. A popular
                hardware wallet is Ledger, this is a small device that hold the
                key separate from your pc or cell phone, and must be tethered to
                process any sending of any coins. This physical separation makes
                it impossible to be stolen via virus or snooping on your
                computer. Legder gives you card to backup your key, by actually
                writing the words down and then verifying them back to the
                hardware, never will they be exposed other than from your own
                cards. Software wallets are also very secure and the easy to
                use, they are assigned keys in the same way, but they have been
                exposed on your device in some way but if your not hacked at
                this moment your ok, these wallets then set a password to access
                the funds on your device, but the key still is what holds your
                funds.
              </p>
              <p className="p-4">
                <b>Where to start?: </b>
                First I would install a software wallet to hold funds locally,
                write down your key on physical paper or card, store one locally
                and one remotely, know that giving this key to anyone is giving
                them access to your funds as well. Once you have the local
                wallet working you will need to exchange Fiat currency such as
                US dollars, Euros and others. I do not recommend spending coins
                from an exchange to any casino, nor to any location your not
                wanting tracked for whatever reason as they will know the
                sending (their) address and my track down the receiving address
                an a know whatever and close your account. YOu need to consider
                an exchange as what its called, a simple way to exchange one
                currency for another not where you want to store and spend from.
                So now you have a local wallet, and your crypto currency on the
                exchange, go ahead and withdraw your coins to your local wallet.
              </p>
              <p className="p-4">
                <b>Send crypto currency to your wallet: </b>
                Sending is simple but may seem a little scary at first. So you
                click on withdraw from your exchange and they will prompt you
                for a wallet address to send the funds to. This wallet address
                you need to get from you local wallet usually under addresses,
                or deposit options. You should be given multiple addresses to
                pick from or in the case of Ledger they will give you a new one
                for each transaction, know that all addresses will remain
                pointed yo your wallet after this initial creation so
                re-occurring payments will work to the same address. At this
                point you will be asked how fast you want the transaction
                happen, this process involves crypto miners that actually
                process all these additions to the blockchain. We will discuss
                the the blockchain more later in this guide but it is a
                continuos ledger of all transactions per coin type. Depending on
                activity fee&apos;s are small but you should be aware the small
                the value of your transfer the costs may be a higher percentage.
                Click send and then do not panic when your funds are nowhere
                yet! THe process may take seconds to hours depending on many
                variables such as transactions going on and amount of speed /
                fee you chose. Then, you now have funds in your very own local
                wallet to do whatever you like with!
              </p>
              <p className="p-4">
                <b>Deposit to your favorite casino </b>
                Casinos have made this very simple, when you go to the cashier
                you select the type of crypto you want to deposit such as
                Bitcoin, select the amount usually in your local currency value
                such as Dollars and click deposit. Usually you will see a QR
                code you can scan with your wallet if on a phone, or an address
                the same type you used to deposit to your local wallet. They
                will also give a very specific amount of coin to transfer to be
                pretty exact to the value you decided to deposit. Enter this
                data into your local wallet and send! This sounds quite lengthy
                but its much easier than setting uo a bank account and sending a
                wire by far and is very easy once you get the hang of it.
              </p>
              <p className="p-4">
                <b>Use a VPN to access all games </b>
                So now you are holding crypto, made a direct deposit to a great
                casino and want to play some games. Many software producers
                restrict different countries such as Microgaming for example and
                the casino does not actually host the games. The games are
                controlled by the software companies, and this is a good thing
                to prevent casinos from altering the odds of any such game. To
                access the most software currently an IP from Canada, but not
                the Ontario province is recommended.
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
