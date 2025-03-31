import Image from "next/image";
import Link from "next/link";
const BankOptions = (props) => {
  const banksRaw = props.data.bankListItems;

  let banks = banksRaw.filter(function (e) {
    return e.bank_data.status > 0;
  });

  const casino = props.data.casinoData.casinoname;
  return (
    <div className="flex flex-col">
      <div className="flex cursor-pointer select-none items-center justify-between p-4 md:justify-start md:space-x-4">
        <b className="my-6 text-3xl font-semibold md:text-4xl">
          Payment methods at {casino}
        </b>
      </div>
      <hr className="m-4" />
      <div className="m-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {banks?.map(function (d, id) {
          let url = "../casino-banks/" + d.bank_data.name;
          return (
            <div key={id} className="flex flex-col items-center justify-end ">
              <div className="flex justify-center">
                <Link href={url}>
                  <Image
                    unoptimized
                    width={55}
                    height={50}
                    alt={d.bank_data.name}
                    src={`/image/bank/large/${encodeURIComponent(
                      d.bank_data.largeimage,
                    )}`}
                  />
                </Link>
              </div>
              <div className="flex justify-center space-x-2">
                {d.bank_data.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default BankOptions;
