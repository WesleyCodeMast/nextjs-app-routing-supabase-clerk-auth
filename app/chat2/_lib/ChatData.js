// initial FrequentEmojis
export const initialFrequentEmojis = [
  "+1",
  "grinning",
  "kissing_heart",
  "heart_eyes",
  "laughing",
  "stuck_out_tongue_winking_eye",
  "sweat_smile",
  "joy",
  "scream",
];

// custom Emojis
export const customEmojis = [
  {
    id: "github",
    name: "GitHub",
    emojis: [
      {
        id: "octocat",
        name: "Octocat",
        keywords: ["github"],
        skins: [{ src: "./images/bandit.png" }],
      },
      {
        id: "shipit",
        name: "Squirrel",
        keywords: ["github"],
        skins: [
          { src: "./shipit-1.png" },
          { src: "./shipit-2.png" },
          { src: "./shipit-3.png" },
          { src: "./shipit-4.png" },
          { src: "./shipit-5.png" },
          { src: "./shipit-6.png" },
        ],
      },
    ],
  },
  {
    id: "gifs",
    name: "GIFs",
    emojis: [
      {
        id: "party_parrot",
        name: "Party Parrot",
        keywords: ["dance", "dancing"],
        skins: [{ src: "./party_parrot.gif" }],
      },
    ],
  },
];

// Emoticons
export const emoticonMappings = {
  ":‑)": "🙂",
  ":)": "🙂",
  ":‑]": "😊",
  ":]": "😊",
  ":->": "😀",
  ":>": "😀",
  "8‑)": "😎",
  "8)": "😎",
  ":‑D": "😃",
  ":D": "😃",
  "x‑D": "😆",
  xD: "😆",
  ":‑(": "☹️",
  ":(": "☹️",
  ":‑[": "😣",
  ":[": "😖",
  ":'‑(": "😢",
  ":'(": "😢",
  ":O": "😮",
  ":-O": "😮",
  ":*": "😘",
  ";‑)": "😉",
  ";)": "😉",
  ":/": "😕",
  ":|": "😐",
  ":$": "🤑",
  ":'D": "😂",
  ">:(": "😡",
  ":'‑)": "😅",
  ":')": "😅",
  "<3": "❤️",
};
const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const emoticonPattern = new RegExp(
  Object.keys(emoticonMappings)
    .map((emoticon) => escapeRegex(emoticon))
    .join("|"),
  "g",
);
export const replaceEmoticons = (text) => {
  return text.replace(emoticonPattern, (matched) => emoticonMappings[matched]);
};

export const EditIcon = () => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="[color]-$fill-color h-5 w-5"
      style={{
        strokeWidth: "var(--grid-item-icon-stroke-width)",
        transform: "scale(var(--grid-item-icon-scale))",
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      ></path>
    </svg>
  );
};

export const DeleteIcon = () => {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="[color]-$fill-color h-5 w-5"
      style={{
        strokeWidth: "var(--grid-item-icon-stroke-width)",
        transform: "scale(var(--grid-item-icon-scale))",
      }}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      ></path>
    </svg>
  );
};

export const NoAvartar = () => {
  return (
    <svg
      className="absolute -left-1 h-14 w-14 text-gray-400"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export const EmojiPickerIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
    >
      <path
        opacity=".45"
        fill="#263238"
        d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z"
      ></path>
    </svg>
  );
};

export const SendMessageIcon = () => {
  return (
    <svg
      className="-mt-px h-4 w-4 rotate-45 transform"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
      ></path>
    </svg>
  );
};

export const getRole = ({ author, uId }) => {
  if (uId == author?.id) return 1;
  return 0;
};
