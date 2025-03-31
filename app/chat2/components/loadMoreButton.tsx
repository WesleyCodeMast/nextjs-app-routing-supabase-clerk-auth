"use client";
import { useFormStatus } from "react-dom";

export function LoadMoreButton({ text, disable = false }) {
  const useText = text ?? "Load More";
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="relative w-fit rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 disabled:opacity-50"
      disabled={pending}
    >
      {pending || disable ? (
        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
          <svg
            className="h-full w-auto animate-spin py-1 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      ) : null}
      <span className={pending || disable ? "invisible" : ""}>{useText}</span>
    </button>
  );
}
