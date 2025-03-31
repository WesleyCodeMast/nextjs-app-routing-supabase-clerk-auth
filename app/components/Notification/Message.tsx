"use client";

import { NoAvartar } from "@/app/chat/_lib/ChatData";
import { useState } from "react";

interface props {
  messages: any;
  readMessage: (id: string) => void;
}
const Messages: React.FC<props> = ({ messages, readMessage }) => {
  const [messageList, setMessageList] = useState<any[]>(messages);

  const removeFromList = (id) => {
    const list = messageList.filter((mes: any) => mes.id != id);

    setMessageList(list);

    readMessage(id);
  };

  return (
    <div>
      {!messageList ||
        (messageList.length == 0 && (
          <p className="max-w-2xl font-serif text-xl text-gray-500 md:text-2xl">
            {" "}
            There are no messages...{" "}
          </p>
        ))}
      {messageList &&
        messageList.length > 0 &&
        messageList.map((message: any) => (
          <div
            key={message.id}
            className="max-w-sm p-0 border-b-2 border-gray-200 md:p-6 dark:border-gray-700 mb-6"
          >
            <article className="p-0 mb-2 text-base bg-white rounded-lg dark:bg-gray-900">
              <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="inline-flex items-center text-sm text-gray-900 dark:text-white">
                    {message?.author?.image && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        className="mr-2 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16 rounded-full"
                        src={message?.author?.image}
                        alt={message?.username}
                      />
                    )}
                    {!message?.author?.image && (
                      <div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        <NoAvartar />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                    {message?.author?.name}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ">
                    {message.createdAt.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromList(message.id);
                    }}
                    className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path
                        d="M12.0007 10.5865L16.9504 5.63672L18.3646 7.05093L13.4149 12.0007L18.3646 16.9504L16.9504 18.3646L12.0007 13.4149L7.05093 18.3646L5.63672 16.9504L10.5865 12.0007L5.63672 7.05093L7.05093 5.63672L12.0007 10.5865Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </button>
                </div>
              </footer>
              <div className="px-16 w-11/12">
                <label
                  className=" text-gray-500 dark:text-gray-400"
                  style={{ overflowWrap: "break-word" }}
                >
                  {message?.message}
                </label>
              </div>
            </article>
          </div>
        ))}
    </div>
  );
};

export default Messages;
