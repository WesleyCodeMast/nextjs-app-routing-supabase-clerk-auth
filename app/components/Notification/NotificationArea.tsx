"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import NotificationItem from "./NotificationItem";

interface props {
  messages: any;
  totalCount: number;
  showArea: (show: boolean) => void;
  showModal: (item: any) => void;
}

const NotificationArea: React.FC<props> = ({
  totalCount,
  showArea,
  messages,
  showModal,
}) => {
  const [sDetail, setSDetail] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [count, setCount] = useState(totalCount);
  const { data: session, status } = useSession();

  const _showDetailModal = (i: any) => {
    showModal(i);
    showArea(false);
  };

  useEffect(() => {
    setItems(messages);
  }, [messages]);

  const removeNoti = async (item: any) => {
    const filteredItems = items.filter((i: any) => i.id !== item.id);

    const response = await fetch(`/notification/${item.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item?.id,
      }),
    });

    setItems(filteredItems);
    setCount(count - 1);
  };

  const readAllMessages = async () => {
    const myEmail = session?.user?.email;

    const response = await fetch(`/notification/readAll`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: myEmail,
      }),
    });

    const result = await response.json();
    if (result) {
      setCount(0);
      setItems([]);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border border-white dark:border-gray-800 rounded absolute top-0 right-5 mt-12 shadow z-50 fadeIn">
      <div className="text-current dark:text-white/80 px-2 py-2.5 border-b border-current/10 flex items-center gap-2">
        <h4 className="basis-1/2">Notification</h4>
        <div className="basis-1/4">
          <span className="inline-block bg-violet-600/10 text-purple text-[10px] p-1 leading-none rounded">
            {count}
          </span>
        </div>

        {count > 0 && (
          <span
            onClick={readAllMessages}
            className="group flex relative inline-block text-purple text-[10px] p-1 leading-none rounded hover:bg-gray-100 cursor-pointer "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
            <span
              className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute
                    -translate-x-1/2 translate-y-1/2 opacity-0 m-1 mx-auto"
            >
              All read
            </span>
          </span>
        )}
      </div>

      <ul className="max-h-56 overflow-y-auto px-2">
        {items?.length > 0 &&
          items.map((noti: any) => (
            <li key={noti.id}>
              <NotificationItem
                item={noti}
                showDetail={_showDetailModal}
                removeItem={removeNoti}
              />
            </li>
          ))}
      </ul>
      <div className="px-2 py-2.5 border-t border-black/10 dark:border-darkborder transition ease-in-out delay-150 hover:translate-x-1 duration-300">
        <a
          href="/messages"
          className="text-current dark:text-white dark:hover:text-purple-100"
        >
          Read All
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 inline-block relative -top-[1px]"
          >
            <path
              d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
              fill="currentColor"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default NotificationArea;
