"use client";
import { DeleteIcon, EditIcon, ReplyIcon } from "@/app/chat/_lib/ChatData";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function MessageToolbar({
  shoutId,
  userId,
  editable,
}: {
  shoutId: string;
  userId: any;
  editable: boolean;
}) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const editAvailable = user && (user?.id === userId || editable);

  const router = useRouter();
  const showEditModal = (e) => {
    e.preventDefault();
    router.push(`?editModal=true&id=${shoutId}`);
  };
  const showRemoveModal = (e) => {
    e.preventDefault();
    router.push(`?removeModal=true&id=${shoutId}`);
  };
  const showReplyModal = (e) => {
    e.preventDefault();
    router.push(`?replyModal=true&id=${shoutId}`);
  };
  return (
    <>
      {editAvailable && (
        <div className="flex items-center justify-center ">
          <div className="m-2">
            <Link
              href={`?editModal=true&id=${shoutId}`}
              onClick={showEditModal}
              className="flex rounded-xl bg-gray-100 p-2.5 text-white transition-all duration-300 hover:rounded-3xl hover:bg-gray-200"
            >
              <EditIcon />
            </Link>
          </div>
        </div>
      )}
      {editAvailable && (
        <div className="flex items-center justify-center ">
          <div className="m-2">
            <Link
              href={`?removeModal=true&id=${shoutId}`}
              onClick={showRemoveModal}
              className="flex rounded-xl bg-gray-100 p-2.5 text-white transition-all duration-300 hover:rounded-3xl hover:bg-gray-200"
            >
              <DeleteIcon />
            </Link>
          </div>
        </div>
      )}
      <div className="flex items-center justify-center ">
        <div className="m-2">
          <Link
            href={`?editModal=true&id=${shoutId}`}
            onClick={showReplyModal}
            className="flex rounded-xl bg-gray-100 p-2.5 text-white transition-all duration-300 hover:rounded-3xl hover:bg-gray-200"
          >
            <ReplyIcon />
          </Link>
        </div>
      </div>
    </>
  );
}
