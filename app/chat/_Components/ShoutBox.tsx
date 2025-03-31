"use client";
import React, { useRef } from "react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { EmojiPickerIcon, SendMessageIcon } from "../_lib/ChatData";
import OnIntervalFn from "../OnIntervalFn";
const factoryEmojiPicker = () => import("./EmojiPicker");
const EmojiPicker = dynamic(factoryEmojiPicker, { ssr: false });

interface props {
  loading: boolean;
  sendMessage: (event: any) => void;
}

const ShoutBox: React.FC<props> = ({ loading, sendMessage }) => {
  const textAreaRef: any = useRef(null);
  const [formData, setFormData] = useState({
    message: "",
  });
  const [showEmojis, setShowEmojis] = useState(false);

  useEffect(() => {
    factoryEmojiPicker();
  }, []);

  const setTextAreaPost = (postion) => {
    if (textAreaRef.current) {
      textAreaRef.current.selectionStart = postion;
      textAreaRef.current.selectionEnd = postion;
      textAreaRef.current.focus();
    }
  };
  // add Emoji from emoji mart
  const addEmoji = (emoji: any) => {
    let myField: any = document.getElementById("message");
    let myValue = emoji["native"];

    // count emoji in textarea
    let findEmojis = (text) => {
      const emojiRegex =
        /[\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}]/gu;
      const emojis = text.match(emojiRegex) || [];
      return emojis;
    };

    const emojiCount = findEmojis(myField["value"]).length;

    // if emoji count < 5 , you can add emoji
    if (emojiCount < 5) {
      //IE support
      if (document["selection"]) {
        myField.focus();
        let sel = document["selection"].createRange();
        sel.text = myValue;
      }
      //MOZILLA and others
      else if (myField["selectionStart"] || myField["selectionStart"] == "0") {
        var startPos = myField["selectionStart"];
        var endPos = myField["selectionEnd"];
        myField["value"] =
          myField["value"].substring(0, startPos) +
          myValue +
          myField["value"].substring(endPos, myField["value"].length);
        // Set cursor position after updating textarea value
        setTextAreaPost(startPos + myValue.length);
      } else {
        myField["value"] += myValue;
      }
    }
    setFormData({
      message: myField["value"],
    });
    return emojiCount;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (formData.message && formData.message != "") {
      sendMessage(formData);
    }

    setFormData({
      message: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <>
      {!loading ? (
        <div>
          <form
            className="mb-6"
            //// @ts-expect-error
            action={sendMessage}
          >
            <div className="bg-grey-lighter sm:px:2 flex md:px-4 ">
              <div className="flex-1 sm:mx-2 md:mx-4">
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  onChange={handleInputChange}
                  value={formData.message}
                  ref={textAreaRef}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-lg placeholder-gray-300 focus:border-current focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-500 dark:focus:ring-gray-900"
                  placeholder="Leave a comment..."
                  required
                />
              </div>
              <div className="mt-3 md:ml-2">
                <button
                  className="flex flex-shrink-0 items-center justify-center py-1 text-white sm:px-1 md:px-4"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowEmojis(true);
                  }}
                >
                  <EmojiPickerIcon />
                </button>
              </div>
              <div className="mt-3 sm:ml-2 md:ml-4">
                <button
                  onClick={handleFormSubmit}
                  className="flex flex-shrink-0 items-center justify-center rounded-xl bg-indigo-500 px-4 py-1 text-white hover:bg-indigo-600"
                >
                  <span>Send</span>
                  <span className="ml-2">
                    <SendMessageIcon />
                  </span>
                </button>
              </div>
            </div>
          </form>

          {/* <OnIntervalFn intervalMs={500} fn={refresh} /> */}
        </div>
      ) : (
        <></>
      )}
      {loading && (
        <div
          role="status"
          className="max-w-lg sm:px:4 flex animate-pulse space-y-2.5 sm:py-4 md:px-8 md:py-2"
        >
          <div className="flex w-full items-center space-x-2">
            <div className="mb-4 h-16 w-4/5 rounded-xl bg-gray-200 dark:bg-gray-700"></div>
            <div className="... relative h-32 w-32">
              <div className="... absolute right-0 top-0 h-12 w-8">
                <div className="absolute bottom-0 left-0 h-8 w-24 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEmojis ? (
        <EmojiPicker
          show={showEmojis}
          addEmoji={addEmoji}
          setShowEmojis={setShowEmojis}
        />
      ) : undefined}
    </>
  );
};

export default ShoutBox;
