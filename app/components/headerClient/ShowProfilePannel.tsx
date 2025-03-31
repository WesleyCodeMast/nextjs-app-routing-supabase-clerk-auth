"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

export default function ShowProfilePannel() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showProfilePannel = searchParams?.get("showProfilePannel");
  const [isComponentVisible, setIsComponentVisible] = useState(
    showProfilePannel == "true" ? true : false,
  );
  const [open, setOpen] = useState(showProfilePannel == "true" ? true : false);

  const { data: session, status } = useSession();

  const closeMenu = () => {
    if (showProfilePannel == "true") {
      router.push(window.location.pathname);
    }
  };

  const ref = useOutsideClick(closeMenu);

  return (
    <>
      {showProfilePannel && (
        <div ref={ref}>
          <div className="fadeIn absolute right-8 top-12 z-50 mt-12 rounded border border-white bg-white shadow dark:border-gray-800 dark:bg-gray-900">
            <p className="border border-l-0 border-r-0 border-t-0 border-gray-200 px-5 pb-3 pt-3 text-sm text-current dark:border-gray-700 dark:text-orange-300 ">
              {session?.user?.email}
            </p>
            {session?.user && session?.user?.name && (
              <a
                className="block px-5 pb-3 pt-3 text-sm text-current hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
                href="#"
              >
                {session.user?.name}
              </a>
            )}
            <a
              className="block px-5 pb-3 pt-3 text-sm text-current hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
              href="/myprofile"
            >
              Account Settings
            </a>

            <p
              className="block cursor-pointer px-5 pb-3 pt-3 text-sm text-current hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700"
              onClick={() => signOut()}
            >
              Sign Out
            </p>
          </div>
        </div>
      )}
    </>
  );
}
