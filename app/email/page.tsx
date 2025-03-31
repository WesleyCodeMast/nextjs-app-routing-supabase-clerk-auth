import prisma from "@/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import CasinoSingleCardA from "@/components/CasinoSIngleCardA";
export default async function awardPoints() {
  //Authenticate

  const session = await getServerSession(authOptions);
  let userEmail = session?.user?.email;
  let userName = session?.user?.name;
  let message = "";
  let rndIntFinal: Number;
  if (userEmail == undefined) {
    userEmail = null; //  stop prisma from returning a val on undefined
    message =
      "Sorry you do not seem to currently be logged in! Please log in and try again.";
  } else {
    const rndInt = randomIntFromInterval(1, 6);
    if (rndInt > 4) {
      rndIntFinal = randomIntFromInterval(10, 50);
    } else {
      rndIntFinal = randomIntFromInterval(3, 25);
    }
    const prize = rndIntFinal.toString();
    message = "Congrats " + userName + " you won " + prize + " AFC Rewards!";
  }
  const cardData = {
    title: `Play from Anywhere`,
    casino_id: 1310,
  };
  return (
    <div>
      <div className="border-1 mx-auto my-auto h-96 w-96 rounded-2xl bg-[url('/images/afcchest.png')]">
        <div className="p-6 pt-20 text-center  text-5xl font-extrabold text-green-100 ">
          <Suspense fallback={"Opening..."}>
            <Award />
          </Suspense>
        </div>
      </div>
      <div className="pl-28 pr-28 pt-5 sm:pl-2 sm:pr-2">
        <h2 className="px-8 py-4 text-2xl font-semibold md:py-14 md:text-5xl">
          Please check out our sponsor America777 Casino
        </h2>
        <CasinoSingleCardA data={cardData} />
        <p className="py-4 text-left text-base font-medium md:text-2xl md:font-normal">
          America777 offers American and Canadian players full banking options
          and the rest of the world can play with crypto. This casino offers
          many softwares ordinary casinos in the USA do not offer so use the no
          deposit bonus and give them a shot!
        </p>
      </div>
    </div>
  );

  async function Award() {
    let chest = "";
    let afcRewards = "";
    let lookup: any;
    if (userEmail) {
      const game = await prisma.site_setting.findFirst({
        where: { id: 11 },
        select: { value: true },
      });
      lookup = await prisma.user.findFirst({
        where: { email: userEmail },
        select: { afcRewards: true, chest: true },
      });
      if (game?.value == lookup.chest) {
        // User already played.
        message = "Sorry but you already won this round!";
      } else {
        // WInner lets add
        const newRewards = lookup.afcRewards + rndIntFinal;

        const update = await prisma.user.update({
          where: { email: userEmail },
          data: { chest: game?.value, afcRewards: newRewards },
        });
      }
    }

    return <div>{message}</div>;
  }

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
