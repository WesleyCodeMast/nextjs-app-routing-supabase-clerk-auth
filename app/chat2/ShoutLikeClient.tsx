"use client";

import { useOptimistic } from "react";

export function ShoutLikeClientP({
  isLiked,
  likes,
  action,
}: {
  isLiked: boolean;
  likes: number;
  action: () => Promise<void>;
}) {
  const [likeData, setLikeData] = useOptimistic<
    {
      isLiked: boolean;
      likes: number;
    },
    {
      isLiked: boolean;
      likes: number;
    }
  >(
    {
      likes,
      isLiked,
    },
    (_, p) => p,
  );
  return (
    <div className="flex items-center justify-center ">
      <div className="m-2">
        <p
          className="mx-2 mt-6"
          style={{ cursor: "pointer" }}
          onClick={async () => {
            setLikeData({
              isLiked: !isLiked,
              likes: isLiked ? likes - 1 : likes + 1,
            });
            await action();
          }}
        >
          <span>{likeData.isLiked ? "❤️" : "💛"}</span> {likeData.likes}
        </p>
      </div>
    </div>
  );
}
