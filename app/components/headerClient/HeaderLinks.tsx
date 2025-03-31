import Link from "next/link";

export default function HeaderLinks() {
  return (
    <ul
      className={`xs:hidden absolute left-0 z-[-1] w-full bg-white pb-12 pl-9 transition-all duration-100 ease-in sm:hidden md:hidden lg:static lg:z-auto lg:flex lg:w-auto lg:grow lg:items-center lg:pb-0 lg:pl-0 lg:transition-none dark:bg-zinc-800`}
    >
      <li className="my-7 text-xl lg:my-0 lg:ml-8">
        <Link
          href="/casinos"
          className="font-medium duration-500 hover:text-gray-400"
        >
          Casino Reviews
        </Link>
      </li>
      <li className="my-7 text-xl lg:my-0 lg:ml-8">
        <Link
          href="/casino-bonuses"
          className="font-medium duration-500 hover:text-gray-400"
        >
          Casino Bonuses
        </Link>
      </li>
      <li className="my-7 text-xl lg:my-0 lg:ml-8">
        <Link
          href="/software"
          className="font-medium duration-500 hover:text-gray-400"
        >
          Casino Softwares
        </Link>
      </li>
      <li className="my-7 text-xl lg:my-0 lg:ml-8">
        <Link
          href="/guides"
          className="font-medium duration-500 hover:text-gray-400"
        >
          Guides
        </Link>
      </li>
    </ul>
  );
}
