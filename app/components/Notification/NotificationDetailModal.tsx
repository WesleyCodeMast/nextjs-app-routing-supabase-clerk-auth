"use client";

import { report } from "@/app/lib/Report";
import Modal from "@/components/Modal";
import { useComponentVisible } from "@/hooks/useComponentVisible";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface props {
  item: any;
  show: boolean;
  setShow: (boolean) => void;
}

const NotificationDetailModal: React.FC<props> = ({ item, show, setShow }) => {
  const refTool = useRef(null);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false, [refTool]);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const name = item?.author?.name || item?.name || "";
  const [mes, setMes] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {}, [isComponentVisible, showReplyForm, refTool, ref]);

  const removeItem = async (e) => {
    e.preventDefault();

    setShow(false);
    const response = await fetch(`/notification/${item.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item?.id,
      }),
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    const response = await fetch(`/notification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: mes,
        toEmail: item.email,
        email: session?.user?.email,
        name: session?.user?.name,
        // name: 'admin',
        // email: "test@test.com",
        replyedId: item?.id,
      }),
    });
    const result = await response.json();
    if (result) {
      report({
        type: "success",
        title: "Success",
        message: "Replied successfully!",
        confirm: "OK",
      });
      setShow(false);
    } else {
      report({
        type: "failure",
        title: "Failed",
        message: "Your reply was failed, server action error!",
        confirm: "OK",
      });
      setShow(false);
    }
  };

  return (
    <Modal show={show} setShow={setShow}>
      <div className="container flex w-full flex-col justify-between pt-6 md:flex-row">
        <div
          role="status"
          className="max-w-sm w-full rounded-lg  p-0 md:pt-6 dark:border-gray-700"
        >
          <article className="mb-2 rounded-lg bg-white p-0 text-base dark:bg-gray-900">
            <footer className="mb-2 flex items-center justify-between">
              <div className="flex items-center">
                <div className="inline-flex items-center text-sm text-gray-900 dark:text-white">
                  <div className="relative overflow-hidden rounded-full bg-gray-100 sm:h-8 sm:w-8 md:h-12 md:w-12 dark:bg-gray-600">
                    {item?.author?.image && (
                      <Image
                        unoptimized
                        src={item?.author?.image}
                        alt="avatar"
                        width={100}
                        height={100}
                      />
                    )}
                    {!item?.author?.image && (
                      <span className="mr-4 flex items-center justify-center rounded-full bg-yellow-500 text-white sm:h-8 sm:w-8 md:h-12 md:w-12">
                        {name}
                      </span>
                    )}
                  </div>
                </div>
                <div className="font-md flex flex-1 items-center px-4 leading-tight">
                  {name}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 ">
                  {item.createdAt.toLocaleString()}
                </p>
              </div>
              <div className="relative ml-4 flex items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsComponentVisible(true);
                  }}
                  className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-sky-700 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="[color]-$fill-color h-5 w-5"
                    style={{
                      strokeWidth: "var(--grid-item-icon-strokeWidth)",
                      transform: "scale(var(--grid-item-icon-scale))",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                    />
                  </svg>
                </button>

                <div ref={ref}>
                  {isComponentVisible && (
                    <div
                      ref={refTool}
                      className="fadeIn absolute right-0 top-0 z-50 mt-12 rounded border border-white bg-white shadow dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div
                        onClick={(e) => {
                          setIsComponentVisible(false);
                          setShowReplyForm(true);
                        }}
                        className="block flex cursor-pointer items-center px-5 pb-3 pt-3 text-sm text-current hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="[color]-$fill-color h-5 w-5"
                          style={{
                            strokeWidth: "var(--grid-item-icon-strokeWidth)",
                            transform: "scale(var(--grid-item-icon-scale))",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                          />
                        </svg>
                        <p className="px-2">Reply</p>
                      </div>

                      <div
                        onClick={(e) => removeItem(e)}
                        className="block flex cursor-pointer items-center px-5 pb-3 pt-3 text-sm text-rose-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                      >
                        <svg
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          className="[color]-$fill-color h-5 w-5"
                          style={{
                            strokeWidth: "var(--grid-item-icon-strokeWidth)",
                            transform: "scale(var(--grid-item-icon-scale))",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          ></path>
                        </svg>
                        <p className="px-2">Delete</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </footer>

            <div className="w-11/12 px-16">
              <label
                className=" text-gray-500 dark:text-gray-400"
                style={{ overflowWrap: "break-word" }}
              >
                {item?.message}
              </label>
            </div>
          </article>
          {showReplyForm && (
            <div className="flex w-full items-center justify-between border-t border-gray-300 pt-6">
              <textarea
                value={mes}
                onChange={(e) => {
                  e.preventDefault();
                  setMes(e.target.value);
                }}
                rows={1}
                placeholder="Message"
                className="mr-3 block w-full rounded-xl bg-gray-100 py-2 pl-4 outline-none focus:text-gray-700"
                name="message"
                required
              />

              <button onClick={sendMessage}>
                <svg
                  className="h-5 w-5 origin-center rotate-90 transform text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default NotificationDetailModal;
