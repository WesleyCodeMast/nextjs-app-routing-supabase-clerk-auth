import Modal from "@/components/Modal";
import React from "react";
import { useState } from "react";
interface Props {
  show: boolean;
  setShow: (boolean) => void;
  message: any;
  removeMessage: (messageId: string) => void;
}

const CommentDeleteModal: React.FC<Props> = ({
  show,
  setShow,
  message,
  removeMessage,
}) => {
  const submit = () => {
    removeMessage(message);
  };

  return (
    <>
      <Modal
        title="Danger Alert!"
        show={show}
        setShow={setShow}
        type="warning"
        submit={submit}
      >
        <p>Remove this message?</p>
      </Modal>
    </>
  );
};
export default CommentDeleteModal;
