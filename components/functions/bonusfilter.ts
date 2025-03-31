import { CasinosWithLocation } from "@/app/lib/FilterCasino";
import Currency from "./currency";

export type BonusFilterResponse = ReturnType<typeof BonusFilter>[0];

type Enhanced = CasinosWithLocation &
  Partial<{
    currency: string;
    fstext: string;
    nodeposit_type: string;
    ndcurrency: string;
    nodepositplaythrough: number | null;
    nodepositCode: string | null;
    depositBonus: number | null;
    depositPlaythough: number | null;
    depositCode: string | null;
    depositPercent: number | null;
    depCodeDisp: string | null;
    code: string | null;
    ndCodeDisp: string | null;
    casinoRevText: string | null;
    casinoSiteText: string;
    genericValue: string;
    genericText: string;
  }>;
const BonusFilter = <T extends CasinosWithLocation>(
  bdata: T[],
): Omit<Enhanced, "bonuses">[] => {
  bdata?.forEach(function (item: Enhanced, index) {
    let firstBonus = item?.bonuses.find((v) => (v.deposit ?? 0) > 0);
    let ndBonus = item.bonuses.find((v) => (v.nodeposit ?? 0) > 0);
    item.currency = firstBonus ? Currency(firstBonus.multi_currency) : "";
    item.fstext = "";
    if (firstBonus && ndBonus) {
      item.nodeposit_type = "No Deposit";
      item.ndcurrency = Currency(firstBonus.multi_currency);
      if ((ndBonus.freespins ?? 0) > 0) {
        item.nodeposit_type = "Free Spins";
        item.fstext = "Spins";
        item.ndcurrency = "";
      }
      item.nodeposit = ndBonus.nodeposit;
      item.nodepositplaythrough = ndBonus.playthrough;
      item.nodepositCode = ndBonus.code;

      item.deposit = firstBonus.deposit;
      item.depositBonus = firstBonus.deposit_amount;
      if (item.deposit && item.depositBonus) {
        firstBonus.percent = Math.round(
          (item.depositBonus / item.deposit) * 100,
        );
      }
      item.depositPlaythough = firstBonus.playthrough;
      item.depositCode = firstBonus.code;
      item.depositPercent = firstBonus.percent;
      if ((item.depositCode?.length ?? 0) > 1) {
        item.depCodeDisp = item.depositCode;
        item.code = item.depositCode; // If we have a code make Generic code match
      } else {
        item.depCodeDisp = "No Code Used";
        item.code = item.depCodeDisp; // if no code set generic code as such
      }
      if ((ndBonus.code?.length ?? 0) > 1) {
        item.ndCodeDisp = ndBonus.code;
        item.code = ndBonus.code; // if we have a ND code override generic code with it
      } else {
        item.ndCodeDisp = "No Code";
      }

      if ((item.casino?.length ?? 0) > 10) {
        item.casinoRevText = item.casino;
        item.casinoSiteText = "site";
      } else {
        item.casinoRevText = item.casino + " Review";
        item.casinoSiteText = "secure site";
      }
    } else if (firstBonus) {
      item.deposit = firstBonus.deposit;
      item.depositBonus = firstBonus.deposit_amount;
      if (item.deposit && item.depositBonus) {
        firstBonus.percent = Math.round(
          (item.depositBonus / item.deposit) * 100,
        );
      }
      item.depositPlaythough = firstBonus.playthrough;
      item.depositCode = firstBonus.code;
      item.depositPercent = firstBonus.percent;
      if ((item.depositCode?.length ?? 0) > 1) {
        item.depCodeDisp = item.depositCode;
      } else {
        item.depCodeDisp = "No Code";
      }
      if ((item.casino?.length ?? 0) > 10) {
        item.casinoRevText = item.casino;
        item.casinoSiteText = "site";
      } else {
        item.casinoRevText = item.casino + " Review";
        item.casinoSiteText = "secure site";
      }
    }
    //  generic display either percentage or no deposit bonus
    item.genericValue = item.depositPercent + "%";
    item.genericText = "Bonus";
    if (ndBonus?.nodeposit) {
      item.genericValue = ndBonus.nodeposit.toString();
      item.genericText = item.nodeposit_type;
    }

    // @ts-expect-error
    delete item.bonuses;
  });

  return bdata;
};
export default BonusFilter;
