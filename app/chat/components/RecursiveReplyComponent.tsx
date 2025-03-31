import Image from "next/image";
import { Suspense } from "react";
import { ShoutLikePlaceholder, ShoutLikeUser } from "../ShoutLike";
import { MessageToolbar } from "./MessageToolBar";
import StringRehype from "@/app/components/StringRehype";

export default async function RecursiveReply({
  shouts,
  shout,
  depth,
  editable,
}) {
  let filteredShouts = shouts.filter(
    (s1) => s1.depth >= depth + 1 && s1.parent === shout.id,
  );

  const render =
    filteredShouts.length > 0 &&
    filteredShouts.map((shout) => {
      return (
        <div key={shout.id}>
          <RecursiveReply
            shouts={shouts}
            shout={shout}
            depth={depth + 1}
            key={shout.id}
            editable={editable}
          />
        </div>
      );
    });

  return (
    <div className="ml-12">
      <div className="max-w-sm ql-editor mt-2 rounded-lg border border-gray-200 p-0 shadow md:p-6 dark:border-gray-700">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative mr-2  sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-16 lg:w-16">
              <Image
                unoptimized
                fill
                sizes="8em"
                src={userImage(shout.author.image)}
                alt={shout.author.name ?? "Community Member"}
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <p className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
                {shout.author?.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {new Date(shout.createdAt).toLocaleString("en-US")}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-normal">
            <Suspense
              fallback={<ShoutLikePlaceholder likes={shout._count.likes} />}
            >
              <ShoutLikeUser
                shoutIds={shouts.map((s) => s.id)}
                shoutId={shout.id}
                likes={shout._count.likes}
              />
            </Suspense>
            <MessageToolbar
              shoutId={shout.id}
              userId={shout.author.id}
              editable={editable}
            />
          </div>
        </div>
        <Suspense fallback={"Loading..."}>
          <StringRehype html={{ __html: shout.message }} />
        </Suspense>
      </div>
      {render}
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
