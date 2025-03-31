"use client";

import Modal from "./modal";
import React, { useEffect, useState } from "react";
import RichText from "./RichText";
import { useRouter } from "next/navigation";

interface Props {
  messageId: any;
  messageDepth: any;
  show: boolean;
  replyMessage: (message: any, messageId: any, messageType: number) => void;
  username?: any;
}

const ReplyModal: React.FC<Props> = ({
  messageId,
  messageDepth,
  show,
  replyMessage,
  username,
}) => {
  debugger;
  const [comment, setComment] = useState("");
  const router = useRouter();
  const submit = () => {
    replyMessage(comment, messageId, messageDepth + 1);
  };

  const setShow = (b) => {
    debugger;
    if (!b) router.back();
  };
  const cancel = () => {
    router.back();
  };
  return (
    <>
      <Modal
        title={`Reply to ${username}`}
        show={show}
        setShow={setShow}
        type="success"
        submit={submit}
        cancel={cancel}
      >
        <RichText message={comment} setMessage={setComment} />
      </Modal>
    </>
  );
};

export default ReplyModal;
