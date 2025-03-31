import Image from "next/image";
import IconHint from "../assets/svgIcon/hint.svg";
const CasinoHint = ({ text, title }: { text: string; title: string }) => {
  if (text.length < 1) {
    return null;
  }
  return (
    <div className="mb-8 flex flex-col border  pl-1 font-normal shadow-md ">
      <div className="flex border-l-4 border-s-4 border-[#0369a1] pb-8 pl-6 pr-6 pt-8">
        <div className="pr-8  ">
          <Image
            unoptimized
            src={IconHint}
            alt={"hint"}
            width={200}
            height={200}
          />
        </div>
        <div>
          <p className="text-3xl font-semibold">{title}</p>
          <span>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default CasinoHint;
