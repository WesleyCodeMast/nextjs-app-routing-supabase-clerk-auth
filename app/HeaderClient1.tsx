import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import HeaderSearchForm from "./components/headerClient/HeaderSearchForm";
import MobileMenuButton from "./components/headerClient/MobileMenuButton";
import UserNamePannel from "./components/headerClient/UserNamePannel";
import HeaderLinks from "./components/headerClient/HeaderLinks";

const HeaderClient1 = async ({ mobileIcon }) => {
  const headerClassName = `flex w-full top-0 left-0 justify-between px-12 lg:px-32 py-6 z-20 bg-white text-sky-700 dark:bg-zinc-800 dark:text-white border-b-2 sticky top-0`;

  return (
    <div className={headerClassName}>
      <div className="flex items-center justify-between px-7 py-2 lg:min-w-fit lg:px-10">
        <Suspense>
          <MobileMenuButton mobileIcon={mobileIcon} />
        </Suspense>

        <div className="flex cursor-pointer items-center text-3xl font-medium">
          <Link href="/">
            <Image
              priority
              alt={"Allfreechips Casino Guide"}
              width={250}
              height={57}
              src={`/images/logo.png`}
            />
          </Link>
        </div>
      </div>
      <HeaderLinks />
      <div className="ml-2 mt-2 flex items-center justify-end space-x-4 md:basis-1/4">
        <Suspense>
          <HeaderSearchForm />
        </Suspense>

        <div>
          <Suspense>
            <UserNamePannel />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
export default HeaderClient1;
