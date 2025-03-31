"use client";
import { useRouter } from "next/navigation";
import Modal from "./modal";

interface Props {
  show: boolean;
  messageId: any;
  removeMessage: (any) => void;
}

const DeleteModal: React.FC<Props> = ({ show, messageId, removeMessage }) => {
  const router = useRouter();
  const submit = () => {
    debugger;
    removeMessage(messageId);
  };

  const setShow = (b) => {
    if (!b) router.back();
  };

  const cancel = () => {
    router.back();
  };
  return (
    <>
      <Modal
        title="Danger Alert!"
        show={show}
        setShow={setShow}
        type="warning"
        submit={submit}
        cancel={cancel}
      >
        <p>Remove this message?</p>
      </Modal>
    </>
  );
};
export default DeleteModal;
