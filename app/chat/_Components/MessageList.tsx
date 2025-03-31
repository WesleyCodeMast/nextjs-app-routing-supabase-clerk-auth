"use client";
import { lazy, useEffect, useState } from "react";
import { DeleteIcon, EditIcon, replaceEmoticons } from "../_lib/ChatData";
import LikeButton from "./LikeButton";
import ShoutBox from "./ShoutBox";
import Image from "next/image";
const factoryDeleteModal = () => import("./CommentDeleteModal");
const CommentDeleteModal = lazy(factoryDeleteModal);
const factoryEditModal = () => import("./CommentEditModal");
const CommentEditModal = lazy(factoryEditModal);

interface props {
  user: any;
  getMessages: () => any;
  like: (message: any) => void;
  updateMessage: (message: any) => Promise<void>;
  removeMessage: (messageId: string) => any;
  sendMessage: (message: any) => any;
}
const MessageList: React.FC<props> = ({
  user,
  getMessages,
  like,
  updateMessage,
  removeMessage,
  sendMessage,
}) => {
  const myId = user?.id;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [message, setMessage] = useState(null);
  // const [messages, setMessages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [optimisticMessages, setOptimisticMessages] = useState<any[]>([]);
  const [initLoading, setInitLoading] = useState(true);
  useEffect(() => {
    async function fetchMessages() {
      const initMessages = await getMessages();
      setOptimisticMessages(initMessages);
      setInitLoading(false);
    }

    fetchMessages();
    const intervalId = setInterval(() => {
      fetchMessages();
    }, 50000); // Fetch every 5 seconds

    // Return a cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const likeMessage = async (message) => {
    await like(message);

    modifyOptimisticMessage(message);
  };

  const addOptimisticMessage = (message: any) => {
    message = { ...message, sending: true };
    let updatedMessages = optimisticMessages;
    updatedMessages.unshift(message);
    setOptimisticMessages(updatedMessages);
  };

  const modifyOptimisticMessage = (message: any) => {
    let updatedMessages = optimisticMessages.map((mes) => {
      if (mes.id === message["id"]) {
        return message;
      }
      return mes;
    });
    setOptimisticMessages(updatedMessages);
  };

  const sendNewMessage = async (event: any) => {
    const message = event.message?.toString() ?? "";
    addOptimisticMessage(message);
    const result = await sendMessage(message);
    if (result?.id) {
      let updatedMessages = optimisticMessages.map((message) => {
        if (message?.sending) {
          return result;
        } else {
          return message;
        }
      });
      setOptimisticMessages(updatedMessages);
    } else {
      return;
    }
  };
  // import MessageDeleteModal
  useEffect(() => {
    factoryDeleteModal();
  }, [showModalDelete]);

  // import MessageEditModal
  useEffect(() => {
    factoryEditModal();
  }, [showEditModal]);

  const showModalEdit = (message: any) => {
    setMessage(message);
    setShowEditModal(true);
  };

  const dModalShow = (message) => {
    setMessage(message);
    setShowModalDelete(true);
  };

  const deleteMessage = (message: any) => {
    setLoading(true);
    let updatedMessages = optimisticMessages.filter(
      (mes) => mes.id != message.id,
    );
    setOptimisticMessages(updatedMessages);
    const res = removeMessage(message?.id);
    setLoading(false);
  };

  const editMesssage = (message: any) => {
    modifyOptimisticMessage(message);

    updateMessage(message);
  };
  const renderMessages =
    optimisticMessages &&
    optimisticMessages.length > 0 &&
    optimisticMessages.map((message) => {
      if (message?.sending == true) {
        return (
          <div
            key={new Date() + "sending..."}
            className="flex items-center justify-between"
          >
            <div>
              <div className="mb-2.5 h-3 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="h-3 w-96 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
          </div>
        );
      } else {
        let createdAt = message?.createdAt.toLocaleString();

        let role = user?.role;

        let text = message?.message;
        const replacedText = replaceEmoticons(text);

        const messageToolButtons = (message: any, role: number) => {
          // function messageToolButtons(message: any)  {
          let liked: boolean = message.isLiked;

          const likes = (
            <>
              <LikeButton
                likeMessage={likeMessage}
                message={message}
                liked={liked}
                myId={myId}
              />
            </>
          );

          if (
            role == 0 ||
            role == 2 ||
            (role == 1 && message?.userId == myId)
          ) {
            // if (message?.author.id == myId) {
            return (
              <div className="flex items-center">
                {likes}
                <button
                  className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  onClick={() => showModalEdit(message)}
                  type="button"
                >
                  <EditIcon />
                </button>
                <button
                  className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  onClick={() => dModalShow(message)}
                  type="button"
                >
                  <DeleteIcon />
                </button>
              </div>
            );
          } else return <div className="flex items-center">{likes}</div>;
        };

        return (
          <div
            key={message?.id}
            role="status"
            className="max-w-sm rounded-lg border border-gray-200 p-0 shadow md:p-6 dark:border-gray-700"
          >
            <article className="mb-2 rounded-lg bg-white p-0 text-base dark:bg-gray-900">
              <footer className="mb-2 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="inline-flex items-center text-sm text-gray-900 dark:text-white">
                    {message?.userImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <div className="relative mr-2  sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-16 lg:w-16">
                        <Image
                          unoptimized
                          fill
                          sizes="8em"
                          src={userImage(message.userImage)}
                          alt={message?.username}
                          className="rounded-full object-cover"
                        />
                      </div>
                    )}
                    {!message?.userImage && (
                      <div className="relative mr-2  sm:h-8 sm:w-8 md:h-12 md:w-12 lg:h-16 lg:w-16">
                        <Image
                          unoptimized
                          fill
                          sizes="8em"
                          src={`/images/emptyuser.png`}
                          alt={message?.username}
                          className="rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 items-center px-4 font-bold leading-tight">
                    {message?.username}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 ">
                    {createdAt}
                  </p>
                </div>

                {messageToolButtons(message, role)}
                {/* {messageToolButtons(message)} */}
              </footer>
              <div className="w-11/12 px-16">
                <label
                  className=" text-gray-500 dark:text-gray-400"
                  style={{ wordWrap: "break-word" }}
                >
                  {replacedText}
                </label>
              </div>
            </article>
          </div>
        );
      }
    });

  const renderNullMessages = (
    <>{loading || initLoading ? <></> : <h2>Sorry, there is no message.</h2>}</>
  );
  const loadingSkeleton = (
    <>
      <div
        role="status"
        className="max-w-md animate-pulse space-y-4 divide-y divide-gray-200 rounded border border-gray-200 p-4 shadow md:p-6 dark:divide-gray-700 dark:border-gray-700"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2.5 h-3 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-3 w-96 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="mb-2.5 h-3 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-3 w-96 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="mb-2.5 h-3 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-3 w-96 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="mb-2.5 h-3 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-3 w-96 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="mb-2.5 h-3 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <div className="h-3 w-96 rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
  const messageRender = (
    <>
      {initLoading && loadingSkeleton}
      {!initLoading && optimisticMessages && optimisticMessages.length > 0
        ? renderMessages
        : renderNullMessages}
      {message && (
        <>
          <CommentEditModal
            message={message}
            show={showEditModal}
            setShow={setShowEditModal}
            saveMessage={editMesssage}
          />
          <CommentDeleteModal
            message={message}
            show={showModalDelete}
            setShow={setShowModalDelete}
            removeMessage={deleteMessage}
          />
        </>
      )}
    </>
  );

  return (
    <div className="mx-auto px-4 sm:w-full md:w-10/12">
      {user && user.id && (
        <ShoutBox sendMessage={sendNewMessage} loading={loading} />
      )}

      <div className="max-h-200 h-200 overflow-y-auto">
        <div className="flex flex-col space-y-2">
          {/* {!loading &&  */}
          {messageRender}
          {/* // }
            // {loading && loadingSkeleton} */}
        </div>
      </div>
    </div>
  );
};

function userImage(image) {
  let img = image ?? "/images/emptyuser.png";
  if (img.indexOf("http") == 0) {
    return img;
  }
  img = "/image/users/" + img; // if we store in blob then we use the image/users route

  return img;
}
export default MessageList;
