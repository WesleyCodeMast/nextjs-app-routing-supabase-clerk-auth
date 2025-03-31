import Image from "next/legacy/image";
const Casino = (props) => {
  return (
    <span className="mx-2 my-4 flex flex-col items-center space-y-2 rounded-xl border-x-2 border-b-2 border-gray-300 p-6 shadow-md md:m-6 md:space-y-6">
      <p className="h-7 text-xl font-medium">{props.title}</p>
      <p>
        <Image
          unoptimized
          width={175}
          height={100}
          alt={props.title}
          src={`/image/software/${encodeURIComponent(props.image)}`}
        />
      </p>
      <p className="text-xl font-medium">Casinos : {props.count}</p>
      <p className="text-xl font-medium">Slots : {props.games}</p>
    </span>
  );
};

export default Casino;
