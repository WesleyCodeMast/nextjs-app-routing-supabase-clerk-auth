"use client";
import Modal from "@/components/Modal";
import React, { useEffect, useState } from "react";

interface Props {
  message: any;
  show: boolean;
  setShow: (boolean) => void;
  saveMessage: (message: any) => void;
}

const CommentEditModal: React.FC<Props> = ({
  message,
  show,
  setShow,
  saveMessage,
}) => {
  const [comment, setComment] = useState(message.message);
  useEffect(() => {
    setComment(message.message);
  }, [message]);

  const submit = () => {
    message.message = comment;
    saveMessage(message);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setComment(e.target.value);
  };

  return (
    <>
      <Modal
        title="Comment Edit"
        show={show}
        setShow={setShow}
        type="success"
        submit={submit}
      >
        <div className="max-w-lg mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
          <label htmlFor="comment" className="sr-only">
            Your comment
          </label>
          <textarea
            id="comment"
            name="comment"
            value={comment}
            onChange={handleChange}
            rows={6}
            className="w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            required={true}
          ></textarea>
        </div>
      </Modal>
    </>
  );
};

export default CommentEditModal;
