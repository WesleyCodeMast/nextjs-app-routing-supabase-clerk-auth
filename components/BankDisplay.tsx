import Link from "next/link";
import BankBox from "./BankBox";
const BankDisplay = (data) => {
  const dataS = data.casSoft;

  return (
    <div className="md:px-24 py-8 text-center p-2">
      <p className="py-6 font-medium md:text-xl md:my-10">
        Allfreechips supports over 400 online casino software providers for both
        online casinos and casino games such as slots and video slots. the
        following displays the number of casinos for each provider.
      </p>
      <div className="grid grid-cols-2 md:grid md:grid-cols-3">
        {dataS?.map(function (d, id) {
          let url = "../casino-banks/" + d.name;
          let name = d.display ?? d.name;
          return (
            <Link key={d.id} href={url}>
              <BankBox
                w={d.w}
                h={d.h}
                image={d.img}
                title={name}
                name={name}
                count={d.count}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BankDisplay;
