import Link from "next/link";
import SoftBox from "./SoftBox";
const SlotSoftware = (data) => {
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
          let url = "../software/" + d.link;
          return (
            <Link key={d.id} href={url}>
              <SoftBox
                image={d.img}
                title={d.name}
                count={d.count}
                games={d.games}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SlotSoftware;
