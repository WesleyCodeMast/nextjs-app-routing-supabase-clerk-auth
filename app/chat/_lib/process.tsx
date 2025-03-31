"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/client";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { revalidateTag, unstable_cache } from "next/cache";
import React from "react";
import { TAG_CHATS, TAG_LIKES } from "./constants";

export async function getChatDigest() {
  return unstable_cache(
    async () => {
      return crypto.randomUUID();
    },
    ["chat-digest"],
    {
      revalidate: false,
      tags: [TAG_CHATS, TAG_LIKES],
    },
  )();
}

export async function getShout(type, parent = null) {
  type = Number(1);
  const comments = await unstable_cache(
    async () => {
      const msg = await prisma.shoutMessage.findMany({
        select: {
          id: true,
          message: true,
          createdAt: true,
          parent: true,
          reply: true,
          depth: true,
          type: true,
          author: {
            select: { name: true, image: true, id: true, email: true },
          },
          _count: { select: { likes: true } },
        },
        where: {
          type: type,
          // parent: null,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return msg;
    },
    ["fetch-chats"],
    {
      revalidate: 60 * 60, // 1 hour (seconds * minutes)
      tags: [TAG_CHATS, TAG_LIKES],
    },
  )();
  const currentDigest: string = await getChatDigest();
  return [comments, currentDigest] as const;
}

export const getUserShouts = React.cache(async function getUserShouts(
  shoutIds: string[],
) {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!user) {
    return [];
  }

  const likedMessages = await unstable_cache(
    async () =>
      await prisma.shoutMessage
        .findMany({
          where: { id: { in: shoutIds } },
          select: {
            id: true,
            likes: {
              where: {
                author: { id: user.id },
              },
            },
          },
        })
        .then((res) =>
          res.map((e) => ({ id: e.id, liked: Boolean(e.likes?.length) })),
        ),
    ["user-shout-likes", user.id],
    {
      revalidate: 60 * 60, // 1 hour (seconds * minutes)
      tags: [TAG_CHATS, TAG_LIKES],
    },
  )();

  return likedMessages;
});

export async function addShout(comment) {
  // console.log("************ this is text ****************");
  // console.log(comment);
  const session = await getServerSession(authOptions);
  let user = session?.user;
  if (!user) {
    return null;
  }

  const { type, parent, content } = comment;

  let newComment = await prisma.shoutMessage.create({
    select: {
      type: true,
      message: true,
      createdAt: true,
      author: {
        select: { image: true, name: true, id: true, email: true },
      },
    },
    data: {
      author: { connect: { id: user?.id } },
      message: comment.content,
      type: type,
    },
  });
  revalidateTag(TAG_CHATS);
  return newComment;
}

export async function likeAction(shoutId: string) {
  const session = await getServerSession(authOptions);
  let user = session?.user;
  if (!user) {
    return null;
  }

  const message = await prisma.shoutMessage.findUniqueOrThrow({
    where: { id: shoutId },
    select: { likes: { where: { authorId: user.id } } },
  });
  if (message.likes.length) {
    await prisma.tb_pbot_shout.deleteMany({
      where: { messageId: shoutId, authorId: user.id },
    });
  } else {
    await prisma.tb_pbot_shout.create({
      data: {
        authorId: user.id,
        messageId: shoutId,
      },
    });
  }
  revalidateTag(TAG_LIKES);
}

export async function getMessage(id) {
  if (!id) return null;
  const msg = await prisma.shoutMessage.findUniqueOrThrow({
    select: {
      id: true,
      message: true,
      createdAt: true,
      type: true,
      parent: true,
      depth: true,
      author: {
        select: { name: true, image: true, id: true, email: true },
      },
      _count: { select: { likes: true } },
    },
    where: {
      id: id,
    },
  });
  //console.log(msg);
  return msg;
}
export async function updateShout(comment, messageId) {
  //console.log("EDIT - " + comment);
  const session = await getServerSession(authOptions);
  let user = session?.user;
  // if (!user) {
  //   return null;
  // }
  let result = await prisma.shoutMessage.update({
    where: { id: messageId },
    data: {
      message: comment,
    },
  });
  revalidateTag(TAG_CHATS);
  return result;
}
export async function removeShout(messageId) {
  const session = await getServerSession(authOptions);
  let user = session?.user;
  // if (!user) {
  //   return null;
  // }
  let result = await prisma.shoutMessage.delete({ where: { id: messageId } });

  revalidateTag(TAG_CHATS);
  return result;
}

export async function replyShout(message, messageId, depth = 1, type = 1) {
  const session = await getServerSession(authOptions);
  let user = session?.user;
  if (!user) {
    return null;
  }

  let newComment = await prisma.shoutMessage.create({
    // select: {
    //   type: true,
    //   message: true,
    //   //  createdAt: true,
    //   author: {
    //     select: { image: true, name: true, id: true, email: true },
    //   },
    // },
    data: {
      author: { connect: { id: user?.id } },
      message: message,
      root: { connect: { id: messageId } },
      depth: depth,
      type: type,
    },
  });
  revalidateTag(TAG_CHATS);
  return newComment;
}
