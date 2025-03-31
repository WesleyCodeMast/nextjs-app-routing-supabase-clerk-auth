"use client";

import Modal from "./modal";
import React, { useEffect, useState } from "react";
import RichText from "./RichText";
import { useRouter } from "next/navigation";

interface Props {
  message: any;
  messageId: any;
  show: boolean;
  saveMessage: (message: any, messageId: any) => void;
}

const EditModal: React.FC<Props> = ({
  message,
  messageId,
  show,
  saveMessage,
}) => {
  debugger;
  const [comment, setComment] = useState(message);
  const router = useRouter();
  const submit = () => {
    debugger;
    saveMessage(comment, messageId);
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
        title="Comment Edit"
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

export default EditModal;
