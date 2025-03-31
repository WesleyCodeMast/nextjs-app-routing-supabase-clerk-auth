import "../css/customrichtext.css";
import React, { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";
import "react-quill/dist/quill.snow.css";
import quillEmoji from "react-quill-emoji";
import "react-quill-emoji/dist/quill-emoji.css";

const modules = {
  toolbar: {
    container: [["bold", "italic"], ["emoji"]],
  },
  "emoji-toolbar": true,
  "emoji-textarea": true,
  "emoji-shortname": true,
};

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default ({ message, setMessage }) => {
  Quill.register(
    {
      "formats/emoji": quillEmoji.EmojiBlot,
      "modules/emoji-toolbar": quillEmoji.ToolbarEmoji,
      "modules/emoji-shortname": quillEmoji.ShortNameEmoji,
    },
    true,
  );

  return (
    <div
      className="break-all text-gray-700 dark:text-gray-300"
      style={{ maxWidth: "960px", alignItems: "stretch" }}
    >
      <ReactQuill
        modules={{
          toolbar: {
            container: [
              [{ font: [] }],
              [{ size: [] }],
              [{ color: [] }, { background: [] }],
              ["bold", "italic", "blockquote"],
              [{ align: [] }],
              ["image", "video"],
              ["emoji"],
            ],
          },
          "emoji-toolbar": true,
          "emoji-shortname": true,
        }}
        theme="snow"
        value={message}
        onChange={setMessage}
      />
    </div>
  );
};
