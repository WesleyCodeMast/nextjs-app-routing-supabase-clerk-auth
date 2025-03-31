"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/client";
import { getServerSession } from "next-auth";

export async function getComment(type, parent) {
  "use server";

  const comments: any = await prisma.comments.findMany({
    select: {
      id: true,
      content: true,
      createdAt: true,
      author: { select: { image: true, name: true, id: true, email: true } },
    },
    where: {
      type: type,
      parentId: parent,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
}

export async function getCountComment(type, parent) {
  "use server";

  const count = await prisma.comments.count({
    where: {
      type: type,
      parentId: parent,
    },
  });
  return count;
}

export async function addComment(comment) {
  "use server";

  const session = await getServerSession(authOptions);
  let user: any = session?.user;

  if (user) {
    const { type, parent, content } = comment;
    if (type == 1) {
      let newComment = await prisma.comments.create({
        select: {
          id: true,
          content: true,
          createdAt: true,
          author: {
            select: { image: true, name: true, id: true, email: true },
          },
        },
        data: {
          type: comment.type,
          parentId: comment.parent,
          author: { connect: { id: user?.id } },
          content: comment.content,
          casino_comments: { connect: { id: comment.parent } },
        },
      });
      return newComment;
    }
    if (type == 2) {
      let newComment = await prisma.comments.create({
        select: {
          id: true,
          content: true,
          createdAt: true,
          author: {
            select: { image: true, name: true, id: true, email: true },
          },
        },
        data: {
          type: comment.type,
          parentId: comment.parent,
          author: { connect: { id: user?.id } },
          content: comment.content,
          game_comments: { connect: { game_id: comment.parent } },
        },
      });
      return newComment;
    }
    if (type == 3) {
      let newComment = await prisma.comments.create({
        select: {
          id: true,
          content: true,
          createdAt: true,
          author: {
            select: { image: true, name: true, id: true, email: true },
          },
        },
        data: {
          type: comment.type,
          parentId: comment.parent,
          author: { connect: { id: user?.id } },
          content: comment.content,
          news: { connect: { id: comment.parent } },
        },
      });
      return newComment;
    }
  }
}
