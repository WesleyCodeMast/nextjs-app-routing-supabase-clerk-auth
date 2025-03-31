"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
export default function UserNamePannel() {
  const router = useRouter();
  const setShowAvatarPannel = (show) => {
    if (show) {
      router.push("?showProfilePannel=true");
    }
  };
  const { data: session, status } = useSession();
  const path = usePathname();
  useEffect(() => {
    // this should be in middleware
    if (
      path !== "/myprofile" &&
      status === "authenticated" &&
      (session?.user?.name?.length ?? 0) < 1
    )
      router.push("/myprofile");
  }, [path, router, session, status]);
  return (
    <div className="flex items-center">
      <div className="relative">
        {session && session.user ? (
          <div className="flex items-center gap-4">
            {/* <div>
                <button
                  type="button"
                  className="relative dark:text-white/80"
                  onClick={(e) => {
                    e.preventDefault();
                    showNotificationArea();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                  {mcount > 0 && (
                    <span className="absolute -top-px ml-4 mb-3 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-600"></span>
                    </span>
                  )}
                </button>
                {showNoti && (
                  <div ref={notiRef}>
                    <NotificationArea
                      showArea={setShowNoti}
                      totalCount={mcount}
                      messages={unreadMessages}
                      showModal={setNotificationDetail}
                    />
                  </div>
                )}
              </div> */}
            <div
              onClick={() => setShowAvatarPannel(true)}
              className="flex cursor-pointer items-center rounded border-2 border-transparent text-sm transition duration-150 ease-in-out focus:border-white focus:outline-none"
            >
              {session?.user?.image && session?.user?.image.length > 0 ? (
                <Image
                  unoptimized
                  src={userImage(session.user.image)}
                  className="h-8 w-8 rounded"
                  alt={session?.user?.name || "Unknown User"}
                  width={"8"}
                  height={"8"}
                />
              ) : (
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 text-white">
                  {session?.user?.name}
                </span>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chevron-down ml-2 text-current dark:text-gray-200"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z"></path>
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        ) : (
          <span
            className="font-medium hover:cursor-pointer hover:text-gray-400"
            onClick={() => signIn()}
          >
            Sign&nbsp;In
          </span>
        )}
      </div>
    </div>
  );
}

function userImage(image) {
  let img = image ?? "/images/emptyuser.png";
  if (img.indexOf("http") == 0) {
    return img;
  }
  img = "/image/users/" + img; // if we store in blob then we use the image/users route

  return img;
}
