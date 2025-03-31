import Image from "next/legacy/image";
import Link from "next/link";
import { BsArrowRightCircleFill } from "react-icons/bs";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import { BonusItemTerms } from "./BonusItemTerms";
import Currency from "./functions/currency";
import { PlayCasinoLink } from "./PlayCasinoLink";
function BonusItem(props) {
  const bonusTerms = "";
  const casinologo = "/image/casinoiconscut/" + props.data.buttondata;
  const casinobonusalt = props.data.casinoname + " Casino Bonus";

  return (
    <div id="bonusList">
      {props.data.bonuslist?.map(function (d, id) {
        var currency = Currency(d.multi_currency);
        var infoLine = currency + "20";
        var infoLine2 = "Min. deposit";
        var bnamethree = d.playthrough + "X";
        var bvalthree = "Playthrough";
        if (d.code) {
          var infoLine = "" + d.code;
          var infoLine2 = "Bonus Code";
        }

        var bname = "Free";
        var bnameTwo = "Spins";
        var bonusValue = "" + d.freespins;

        if (d.nodeposit && !d.freespins) {
          var bname = "No Deposit";
          var bnameTwo = "Bonus";
          var bonusValue = currency + d.nodeposit;
        }
        if (d.deposit) {
          var bname = d.percent + "%";
          var bnameTwo = "Bonus";
          var bonusValue = currency + d.deposit;
        }

        if (d.deposit && d.freespins) {
          var infoLine = "Plus " + d.freespins;
          var infoLine2 = "Free Spins";
          if (d.code) {
            var bnamethree = "" + d.code;
            var bvalthree = "Bonus Code";
          }
        }

        // IF CODE

        return (
          <div
            key={d.id}
            className="my-4 flex flex-col border border-gray-200 px-6 py-2"
          >
            <div className="flex flex-col  rounded-md md:flex-row md:justify-between">
              <div className="my-2 flex items-center ">
                <Image
                  unoptimized
                  src={casinologo}
                  alt={casinobonusalt}
                  width="100"
                  height="80"
                />
                <div className="flex items-center text-5xl">
                  {bonusValue}
                  <div className="flex flex-col">
                    <span className="text-sm">{bname}</span>
                    <span className="text-sm">{bnameTwo}</span>
                  </div>
                </div>
              </div>
              <div className="my-4 flex items-center justify-center space-x-1">
                <div className="flex flex-col items-center">
                  <span className="text-2xl">{infoLine}</span>
                  <span className="text-xs font-light">{infoLine2}</span>
                </div>
                <hr className="h-1 w-10 rotate-90 border-sky-200 dark:border-white" />
                <div className="flex flex-col items-center">
                  <span className="text-2xl">{bnamethree}</span>
                  <span className="text-xs font-light">{bvalthree}</span>
                </div>
              </div>

              <PlayCasinoLink
                href={d.link ? d.link : undefined}
                casinoId={props?.data.clean ?? ""}
                className="my-6 flex items-center justify-center rounded-lg bg-sky-700 px-10 py-3 text-white dark:bg-white dark:text-black"
              >
                Claim Now
                <BsArrowRightCircleFill className="mx-4" />
              </PlayCasinoLink>
            </div>
            {/* <BonusItemTerms
              bonusTerms={bonusTerms}
              open={<FaChevronCircleDown />}
              close={<FaChevronCircleUp />}
            /> */}
          </div>
        );
      })}
    </div>
  );
}

export default BonusItem;
