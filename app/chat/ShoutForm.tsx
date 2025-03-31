"use client";
import dynamic from "next/dynamic";
const RichText = dynamic(() => import("./components/RichText"), { ssr: false });
import { LoadMoreButton } from "../components/loadMoreButton";
import { useFormState } from "react-dom";
import { FormState, createTodoAction } from "./action";
import { lazy, useEffect, useRef, useState } from "react";

const factoryEditModal = () => import("./components/EditModal");
const EditModal = lazy(factoryEditModal);
const factoryDeleteModal = () => import("./components/DeleteModal");
const DeleteModal = lazy(factoryDeleteModal);

export function ShoutForm({ type, id }) {
  const form = useRef<HTMLFormElement | null>(null);

  const [loading, setLoading] = useState(true);

  async function submit(previousState: FormState, formData) {
    if (form.current) {
      form.current.reset();
      setComment("");
    }
    return await createTodoAction(previousState, formData);
  }

  const [comment, setComment] = useState("");

  const [formState, wrappedCreateTodoAction] = useFormState(submit, {
    text: comment,
    errors: {
      text: undefined,
    },
  } as FormState);

  useEffect(() => {
    setLoading(false);
  }, []);

  const saveMessage = (message) => {
    setComment(message);
  };

  return (
    <div className="w-full">
      {/* <LoadingRichText /> */}
      <form action={wrappedCreateTodoAction} ref={(f) => (form.current = f)}>
        {/* <div className="flex flex-col"> */}
        <div className="flex flex-col md:flex-row">
          <div className="mx-auto  flex text-gray-700">
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="type" value={type} />
            <input type="hidden" name="comment" value={comment} />
            {/* <textarea
              id="comment" 
              name="comment"
              rows={3}
              className="mt-6 w-full rounded-md border border-gray-300 px-3 py-2 text-lg placeholder-gray-300 focus:border-current focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-500 dark:focus:ring-gray-900"
              placeholder={"Write a comment..."}
              defaultValue={""}
              required={true}
            ></textarea> */}
            <RichText message={comment} setMessage={saveMessage} />
          </div>
          <div className="flex flex-col p-5 sm:p-1">
            <div
              className={`mr-2 mt-4 h-1/2 ${
                loading ? "opacity-0" : "opacity-100"
              } transition-opacity duration-500`}
            >
              <LoadMoreButton text="Send➡️" />
              {/* <button
                type="submit"
                className="flex flex-row gap-2 rounded-full bg-sky-700 px-5 py-3 text-white"
              >
                <svg
                  className="h-5 w-5 rotate-90 transform"
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
                Send
              </button> */}
            </div>
          </div>
          {formState.errors.text && (
            <div className="text-red-400">{formState.errors.text}</div>
          )}
        </div>
      </form>
    </div>
  );
}
