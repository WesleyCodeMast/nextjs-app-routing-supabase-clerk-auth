import Link from "next/link";
import { FcBusinessman } from "react-icons/fc";
import { RiMailLine } from "react-icons/ri";

const Author = (props) => {
  return (
    <div
      id="author"
      className="flex flex-col rounded-lg border border-gray-200 p-3"
    >
      <h5 className="text-base">ABOUT THE AUTHOR</h5>
      <div className="flex items-center">
        <div>
          <FcBusinessman className="text-6xl" />
        </div>
        <div className="flex flex-col">
          <h5 className="text-3xl">{props.data.author}</h5>
          <div className="my-2 flex space-x-4 text-sm">
            <span className="flex items-center">
              <RiMailLine />
              <Link href="/contact-us">Contact</Link>
            </span>
          </div>
        </div>
      </div>
      <p className="my-6">{props.data.authorText}</p>
    </div>
  );
};
export default Author;
