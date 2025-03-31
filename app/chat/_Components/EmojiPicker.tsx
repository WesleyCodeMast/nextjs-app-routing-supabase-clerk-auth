import Modal from "@/components/Modal";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import React, { useState } from "react";
import { initialFrequentEmojis } from "../_lib/ChatData";

interface EmojiMartProps {
  show: boolean;
  addEmoji: (any) => number;
  setShowEmojis: (boolean) => void;
}

const EmojiPicker: React.FC<EmojiMartProps> = ({
  show,
  addEmoji,
  setShowEmojis,
}) => {
  const [emojiCount, setEmojiCount] = useState(0);

  // Initialize frequently emoji
  let count = 0;
  const initialFrequentlyUsed = initialFrequentEmojis;
  const emojiPicker = (e) => {
    count = addEmoji(e);
    setEmojiCount(count);
  };

  const WarningElement = () => {
    return (
      <div
        className="mb-4 flex rounded-lg bg-red-50 p-4 text-sm text-red-800 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <svg
          aria-hidden="true"
          className="mr-3 inline h-5 w-5 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        <span className="sr-only">Info</span>
        <div>
          <span className="font-medium">Warning</span> Only add less than 5
          Emojis.
        </div>
      </div>
    );
  };

  return (
    <>
      <Modal show={show} setShow={setShowEmojis}>
        {emojiCount >= 5 && <WarningElement />}
        <Picker
          id="emojiPicker"
          FrequentlyUsed={initialFrequentlyUsed}
          data={data}
          perLine={8}
          onEmojiSelect={emojiPicker}
          onClickOutside={(e) => {
            e.preventDefault();
            setShowEmojis(false);
          }}
        />
      </Modal>
    </>
  );
};

React.createElement("div", {}, "Children");

export default EmojiPicker;
