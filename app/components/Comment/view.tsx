"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SendMessageIcon } from "../../chat/_lib/ChatData";

interface Props {
  type: number;
  parent: number;
  addComment: (comment: any) => any;
  comments: any;
  totalCount: any;
}
export const CommentView: React.FC<Props> = ({
  type,
  parent,
  addComment,
  comments,
  totalCount,
}) => {
  const { data: session, status } = useSession();

  const user: any = session?.user;
  const [content, setContent] = useState("");
  const [count, setCount] = useState(3);
  const [total, setTotal] = useState(0);
  const [optimisticComments, setOptimisticComments] = useState<any[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    function fetchComments() {
      setOptimisticComments(comments);
      setTotal(totalCount);
      if (totalCount > 3) setShowMore(true);
      setLoading(false);
    }

    fetchComments();
    const intervalId = setInterval(() => {
      fetchComments();
    }, 100000); // Fetch every 100 seconds

    // Return a cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickShowOrHide = () => {
    if (showMore) {
      setCount(total);
    } else {
      setCount(3);
    }
    setShowMore(!showMore);
  };

  const ShowMoreButton = () => {
    if (total > 3) {
      return (
        <button
          onClick={clickShowOrHide}
          className={`my-6 flex items-center justify-center rounded-lg bg-sky-700 px-10 py-3 text-white dark:bg-white dark:text-black `}
        >
          {showMore ? "Show More" : "Show Less"}
        </button>
      );
    } else {
      return <></>;
    }
  };

  const addOptimisticComment = (comment: any) => {
    comment = { ...comment, sending: true };
    let updatedComments = optimisticComments;
    updatedComments.unshift(comment);
    setOptimisticComments(updatedComments);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setContent(value);
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (content && content != "") {
      let comment = {
        type: type,
        parent: parent,
        content: content,
        author: {
          name: user.name,
          image: user.image,
        },
        createdAt: new Date(),
      };
      setTotal(total + 1);
      if (count > 3) setCount(count + 1);
      addOptimisticComment(comment);

      let addedComment = await addComment(comment);

      if (addedComment?.id) {
        let updatedMessages = optimisticComments.map((com) => {
          if (com?.sending) {
            return addedComment;
          } else {
            return com;
          }
        });
        setOptimisticComments(updatedMessages);
      } else {
        optimisticComments.shift();
        setTotal(total - 1);
        setCount(count - 1);
      }
    }
    setContent("");
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900 lg:text-2xl dark:text-white">
          Discussion ({loading ? "..." : total})
        </h2>
      </div>

      {user && (
        <form className="mb-6">
          <textarea
            id="comment"
            rows={3}
            className="mt-6 w-full rounded-md border border-gray-300 px-3 py-2 text-lg placeholder-gray-300 focus:border-current focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-500 dark:focus:ring-gray-900"
            onChange={handleInputChange}
            placeholder="Write a comment..."
            value={content}
            required={true}
          ></textarea>
          <div className="mt-3 sm:ml-2 md:ml-4">
            <button
              className="my-6 flex items-center justify-center rounded-lg bg-sky-700 px-10 py-3 text-white dark:bg-white dark:text-black"
              onClick={submitForm}
            >
              <span>Send</span>
              <span className="ml-2">
                <SendMessageIcon />
              </span>
            </button>
          </div>
        </form>
      )}

      {!loading &&
        optimisticComments &&
        optimisticComments.length > 0 &&
        optimisticComments.slice(0, count).map((comment) => (
          <article
            key={comment?.createdAt.toLocaleString()}
            className="border-t border-gray-200 bg-white p-6 text-base dark:border-gray-700 dark:bg-gray-900"
          >
            <footer className="mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <p className="mr-3 inline-flex items-center text-sm text-gray-900 dark:text-white">
                  <picture>
                    {comment?.author?.image && (
                      <Image
                        unoptimized
                        className="mr-4 rounded-full sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-12 lg:w-12"
                        src={user?.image}
                        alt={user?.name ? user.name : "No Avatar"}
                        width={100}
                        height={100}
                      />
                    )}
                    {!comment?.author?.image && (
                      <span className="mr-4 flex items-center justify-center rounded-full bg-yellow-500 text-white sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-12 lg:w-12">
                        {comment?.author?.name}
                      </span>
                    )}
                  </picture>
                  {comment?.author?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {comment?.createdAt.toLocaleString()}
                </p>
              </div>
            </footer>
            <p className="text-gray-500 dark:text-gray-400">
              {comment?.content}
            </p>
          </article>
        ))}

      {!loading && <ShowMoreButton />}
    </div>
  );
};
