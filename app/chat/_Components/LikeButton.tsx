"use client";
import React, { useState } from "react";

interface Props {
  message: any;
  myId: string;
  liked: boolean;
  likeMessage: (message: any) => void;
}

const LikeButton: React.FC<Props> = ({ message, myId, liked, likeMessage }) => {
  const [isLike, setIsLike] = useState(liked),
    onLikeButtonClick = (message: any) => {
      if (myId && myId != message.userId) {
        message.isLiked = !isLike;
        setIsLike(!isLike);
        likeMessage(message);
        message.like = message.like + (isLike ? -1 : 1);
      }
    };

  return (
    <>
      <button
        className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700"
        onClick={() => {
          onLikeButtonClick(message);
        }}
        type="button"
      >
        {isLike ? "❤️" : "💛"}
        <p>{message?.like}</p>
      </button>
    </>
  );
};

export default LikeButton;
