"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { addShout, getChatDigest } from "./_lib/process";
import { TAG_CHATS } from "./_lib/constants";

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
  const text = formData.get("comment");
  const subId = formData.get("subId");
  const type = formData.get("type");
  const parent = formData.get("id");

  if (text && text != "") {
    let comment = {
      type: Number(type),
      subId: Number(subId),
      parent: Number(parent),
      content: text,
      author: {
        name: session?.user?.name,
        image: session?.user?.image,
      },
      createdAt: new Date(),
    };
    await addShout(comment);
  }

  revalidateTag(TAG_CHATS);
  return {
    text: "Thanks for the comment " + session?.user?.name,
    errors: {
      text: undefined,
    },
  };
}

export async function hasNewerDigest(
  digest: string,
): Promise<{ refresh: boolean }> {
  const currentDigest: string = await getChatDigest();
  if (digest !== currentDigest) {
    return { refresh: true };
  }
  return { refresh: false };
}
