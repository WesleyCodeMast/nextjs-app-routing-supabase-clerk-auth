import Image from "next/legacy/image";
import Link from "next/link";
const SoftwareProv = (props) => {
  return (
    <div className="flex flex-col">
      <div className="flex cursor-pointer select-none items-center justify-between p-4 md:justify-start md:space-x-4">
        <b className="my-6 text-3xl font-semibold md:text-4xl">
          Game providers at {props.data.casinoname}
        </b>
      </div>
      <hr className="m-4" />
      <div className="m-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {props.data &&
          props.data.softwares &&
          props.data.softwares.length > 0 &&
          props.data.softwares.map(function (d, id) {
            const url = "/software/" + d.softwarelist.link;
            return (
              <div key={d.id} className="flex items-center">
                <Link href={url}>
                  <Image
                    unoptimized
                    width={175}
                    height={100}
                    alt={d.softwarelist.software_name}
                    src={`/image/software/${encodeURIComponent(
                      d.softwarelist.image,
                    )}`}
                  />
                </Link>
                {/* <Image  unoptimized
                width={175}
                height={100}
                alt={d.softwarelist.software_name}
                src={`https://www.allfreechips.com/image/software/${encodeURIComponent(
                  d.softwarelist.image
                )}`}
              /> */}
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default SoftwareProv;
