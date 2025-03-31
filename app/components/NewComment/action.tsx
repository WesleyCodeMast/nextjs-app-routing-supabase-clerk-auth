"use server";
import { revalidatePath } from "next/cache";
import { addComment } from "@/app/lib/CommentFetch";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";

export type FormState = {
  text: string;
  errors: {
    text: string | undefined;
  };
};

export async function createTodoAction(
  previousState: FormState,
  formData: FormData,
) {
  const session = await getServerSession(authOptions);
  const text = formData.get("comment") as string;
  const type = formData.get("type");
  const parent = formData.get("id");

  if (text) {
    let comment = {
      type: Number(type),
      parent: Number(parent),
      content: text,
      author: {
        name: session?.user?.name,
        image: session?.user?.image,
      },
      createdAt: new Date(),
    };
    await addComment(comment);
  }
  if (text == "test") {
    return {
      text,
      errors: {
        text: "Please actually make a comment!",
      },
    };
  }
  revalidatePath("/");
  return {
    text: "Thanks for the comment " + session?.user?.name,
    errors: {
      text: undefined,
    },
  };
}
