import prisma from "@/client";
import Author from "@/components/AboutAuthor";
import SlotSoftware from "@/components/SlotSoftware";
import monthYear from "@/components/functions/monthYear";

import { Metadata } from "next";
export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Casino Software Online - Gambling Software | Allfreechips";
  const description =
    "Elevate your online gaming with cutting-edge casino software. Experience seamless play, captivating graphics, and a diverse game selection. Dive into excellence with our top-notch online casino software. Play smarter, play better.";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}

async function getProps() {
  const data = await prisma.casino_p_software.findMany({
    select: {
      id: true,
      software_name: true,
      image: true,
      link: true,
    },
  });
  // Get the number of Casinos for each software
  const numdata: any[] = await prisma.$queryRawUnsafe(
    `SELECT  m.id,CAST(sum(case when mp.casino is not null then 1 else 0 end) as INT) as coun FROM casino_p_software m
    LEFT JOIN casino_p_software_link mp ON mp.software = m.id
    GROUP BY m.id`,
  );

  // get the number of games for each software
  const numGames: any[] = await prisma.$queryRawUnsafe(
    `SELECT m.id, CAST(sum(case when mp.game_software is not null then 1 else 0 end) as INT) as coun FROM casino_p_software m
    LEFT JOIN casino_p_games mp ON mp.game_software = m.id
    GROUP BY m.id`,
  );
  function sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  }

  function mergeOnId(a1, a2, g1) {
    let a3 = Array();
    a1.map(function (d) {
      let coun = d.coun;
      let id = d.id;
      let name = a2.find((x) => x.id === id).software_name;
      let img = a2.find((x) => x.id === id).image;
      let link = a2.find((x) => x.id === id).link;
      let games = g1.find((x) => x.id === id).coun;
      if (games && coun) {
        a3.push({
          id: id,
          name: name,
          img: img,
          count: coun,
          games: games,
          link: link,
        });
      }
    });
    return a3;
  }

  const newData = sortByKey(numdata, "coun");
  const casSoft = newData.reverse();

  const softFull = mergeOnId(casSoft, data, numGames);

  return { softFull };
}

export default async function PageOut({ params }) {
  const props = await getProps();
  const author = "AFC Chris";
  const reviewDate = "";
  const authorText =
    "Chris Started working on Allfreechips in July of 2004, After many frustrating years of learning how to make a webpage we now have the current site!  Chris started by being a player first, and loved online gaming so much he created the Allfreechips Community.";
  const authorData = { author, authorText };
  const casSoft = props.softFull;

  /*
     <Head>
        <title>Best casino software Providors</title>
        <meta name="description" content="Description Of Page" />
      </Head>
      */

  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      <section className="px-6  py-8">
        <div className="container mx-auto">
          <h1 className="border-b border-blue-800 pb-12 text-4xl font-semibold md:text-5xl dark:border-white">
            Best {monthYear()} Casino Software Providors
          </h1>

          {/* <div className="bg-slate-100 dark:bg-gray-200 dark:text-black rounded-xl mt-3">
            <div className="card p-4">
              <div className="heading flex items-center border-b gap-7 pb-4">
                <span className="w-10 h-7 rounded bg-sky-700 dark:bg-zinc-800"></span>
                <h2 className="text-lg">
                  Why you can trust{" "}
                  <span className="font-bold">allfreechips.com</span>
                </h2>
              </div>
              <p className="font-normal pt-4 pb-2 text-justify md:text-xl md:p-6">
                Allfreechips is dedicated to bringing the best and latest online
                casino bonus information. We rely on your input to insure the
                casinos listed here are both correct and on the level by leaving
                your reviews.
              </p>
            </div>
          </div> */}
        </div>
      </section>
      <div className="text-lg font-medium md:text-xl">
        <SlotSoftware casSoft={casSoft} />
        <div className="mt-2 p-4 text-left md:mx-24 md:text-2xl">
          <h3 className="text-2xl font-semibold md:text-5xl">
            Best Online casino software
          </h3>
          <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
            A lot goes into trying to decide what is the best online casino
            software, there are many reasons one would prefer one over another.
            Of course my first vote would go towards the casino software that
            pays out the most but with many independent audits out there I do
            not believe there is a clear winner on this. Second would be the
            trust factor, over the years there have been a few software brands
            that where found to be no so on the level and were quickly called
            out and we never saw them again. But the best way I decide on the
            best is if I feel both safe and secure while playing, and have a
            good time as well. Effort in the user experience is very important
            these days with the amount of slot machines available.
          </p>
          <h4 className="text-2xl font-semibold md:text-5xl">
            USA online casino software
          </h4>
          <p className="my-6 text-justify text-base font-medium md:text-2xl md:font-normal">
            With the regulations way back in 2006 we lost a lot of games and
            casinos in the USA like Microgaming, Playtech and a few others. THis
            was quite depressing as these were considered the very best at the
            time. Fortunately today we have Saucify, RTG still and quite a few
            others delivering great fun slots and table games in the US.
          </p>
        </div>

        <div>
          <Author data={authorData} />
        </div>
      </div>
    </div>
  );
}
