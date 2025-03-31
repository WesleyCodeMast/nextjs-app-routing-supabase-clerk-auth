"use client";

import { useFormState } from "react-dom";
import { FormState, createTodoAction } from "./action";
import { LoadMoreButton } from "../loadMoreButton";
import { useRef } from "react";

export function CommentForm({ type, id }) {
  const form = useRef<HTMLFormElement | null>(null);
  async function submit(previousState: FormState, formData) {
    if (form.current) {
      form.current.reset();
    }
    return await createTodoAction(previousState, formData);
  }
  const [formState, wrappedCreateTodoAction] = useFormState(submit, {
    text: "",
    errors: {
      text: undefined,
    },
  } as FormState);

  return (
    <form action={wrappedCreateTodoAction} ref={(f) => (form.current = f)}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="type" value={type} />
      <textarea
        id="comment"
        name="comment"
        rows={3}
        className="mt-6 w-full rounded-md border border-gray-300 px-3 py-2 text-lg placeholder-gray-300 focus:border-current focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:focus:border-gray-500 dark:focus:ring-gray-900"
        placeholder={"Write a comment..."}
        //props.addComments?.author?.email ??
        defaultValue={""}
        required={true}
      ></textarea>
      {formState.errors.text && (
        <div className="text-red-400">{formState.errors.text}</div>
      )}
      <LoadMoreButton text="Submit" />
    </form>
  );
}
