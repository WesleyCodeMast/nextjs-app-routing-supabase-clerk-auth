"use client";
import Link from "next/link";
import { LoadMoreButton } from "@/app/components/loadMoreButton";
import { useEffect } from "react";
export default function OutCatch({
  casinoUrl,
  casinoName,
}: {
  casinoUrl: string | null;
  casinoName: string;
}) {
  useEffect(() => {
    if (casinoUrl) {
      window.location.href = casinoUrl;
    }
  }, [casinoUrl]);
  return (
    <div>
      <div className="p-15 mx-auto rounded-xl border-4 border-solid border-orange-400 lg:max-w-1/2">
        <div>
          <h3 className="p-5 text-center text-2xl font-extrabold text-orange-400">
            Opening Casino Safely
          </h3>
          <div className="pt-8 text-center">
            You will be redirected to the casino momentarily. If this does not
            work after a few seconds, you can click the button below.
          </div>
          {casinoUrl ? (
            <div className="p-10 text-center">
              <a rel="nofollow" href={casinoUrl}>
                <LoadMoreButton text={"Play " + casinoName} />
              </a>
            </div>
          ) : null}
          <div className="p-2 text-center">
            Contact us if you have any issues opening {casinoName}
          </div>
          <div className="p-2 text-center">
            <Link href="http://www.allfreechips.com/contact-us">
              <LoadMoreButton text="Contact Us!" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
