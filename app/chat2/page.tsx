import { ShoutForm } from "./ShoutForm";
import ShoutFeed from "./ShoutFeed";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import React, { Suspense, lazy } from "react";

import {
  getMessage,
  removeShout,
  replyShout,
  updateShout,
} from "./_lib/process";

const factoryEditModal = () => import("./components/EditModal");
const EditModal = lazy(factoryEditModal);
const factoryDeleteModal = () => import("./components/DeleteModal");
const DeleteModal = lazy(factoryDeleteModal);
const factoryReplyModal = () => import("./components/ReplyModal");
const ReplyModal = lazy(factoryReplyModal);

type props = {
  searchParams: Record<string, string> | null | undefined;
};

export default async function ShoutBox({ searchParams }: props) {
  const showEditModal = searchParams?.editModal === "true";
  const showRemoveModal = searchParams?.removeModal === "true";
  const showReplyModal = searchParams?.replyModal === "true";

  const messageId = searchParams?.id;
  const message = await getMessage(messageId);

  const saveMessage = async (comment, messageId) => {
    "use server";
    await updateShout(comment, messageId);
  };
  const removeMessage = async (messageId) => {
    "use server";
    await removeShout(messageId);
  };

  const replyMessage = async (message, messageId, depth) => {
    "use server";
    await replyShout(message, messageId, depth);
  };
  const session = await getServerSession(authOptions);
  let login = true;
  if (session?.user?.email == null || session?.user?.email == undefined) {
    login = false;
  }
  return (
    <div className="mx-auto p-2 lg:p-12 ">
      <h3 className="text-2xl font-semibold md:my-6 md:text-5xl">
        All Free Chips Community Chat
      </h3>
      <div className="container mx-auto">
        <div className="flex items-center gap-1 text-sm  font-medium md:gap-4">
          {login ? (
            <Suspense>
              <ShoutForm type={1} subId={1} />
            </Suspense>
          ) : (
            <LogIn />
          )}
        </div>
      </div>
      <div>
        <ShoutFeed type={1} subId={1} />
      </div>
      {showEditModal && (
        <Suspense>
          <EditModal
            show={showEditModal}
            message={message?.message}
            messageId={message?.id}
            saveMessage={saveMessage}
          />
        </Suspense>
      )}
      {showRemoveModal && (
        <Suspense>
          <DeleteModal
            show={showRemoveModal}
            messageId={message?.id}
            removeMessage={removeMessage}
          />
        </Suspense>
      )}
      {showReplyModal && (
        <Suspense>
          <ReplyModal
            show={showReplyModal}
            messageId={message?.id}
            messageSubId={message?.subId}
            messageDepth={message?.depth}
            replyMessage={replyMessage}
            username={message?.author?.name}
          />
        </Suspense>
      )}
    </div>
  );
}

function LogIn() {
  return (
    <div className="bg-color-red flex-1 rounded-lg text-center align-middle">
      <h5 className="p-10 text-2xl font-semibold sm:p-3 md:my-6 md:text-5xl">
        Please log in to participate!
      </h5>
    </div>
  );
}
