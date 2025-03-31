"use server";
import prisma from "@/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";

export async function getRating(type, parent, email) {
  "use server";
  try {
    if (email) {
      const result = await prisma.rating.findFirst({
        select: {
          rating: true,
        },
        where: {
          type: type,
          parentId: parent,
          author: {
            email: email,
          },
        },
      });
      return result?.rating;
    }
    if (!email) {
      const result = await prisma.rating.aggregate({
        _avg: {
          rating: true,
        },
        where: {
          type: type,
          parentId: parent,
        },
      });
      return result?._avg?.rating;
    }
    return 0;
  } catch (err) {
    console.log(err);
  }
}

export async function setRating(rating, type, parent) {
  "use server";
  const session = await getServerSession(authOptions);
  let user: any = session?.user;
  const userRole: Number = Number(user?.role);
  const userEmail = session?.user?.email ?? null; //  stop prisma from returning a val on undefined
  let myId: any = user?.id;
  if (!userEmail || userEmail == "" || userRole == 3) {
    user = null;
  }
  if (user)
    try {
      const parentId = type == 1 ? "casinoId" : "gameId";
      if (type == 1) {
        const result = await prisma.rating.create({
          select: {
            id: true,
            rating: true,
            type: true,
            parentId: true,
            casino_ratings: { select: { id: true, clean_name: true } },
            author: {
              select: { image: true, name: true, id: true, email: true },
            },
          },
          data: {
            casino_ratings: { connect: { id: parent } },
            type: type,
            parentId: parent,
            author: { connect: { id: user?.id } },
            rating: rating,
          },
        });

        return result;
      }
      if (type == 2) {
        const result = await prisma.rating.create({
          select: {
            id: true,
            rating: true,
            type: true,
            parentId: true,
            author: {
              select: { image: true, name: true, id: true, email: true },
            },
          },
          data: {
            type: type,
            parentId: parent,
            game_ratings: { connect: { game_id: parent } },
            author: { connect: { id: user?.id } },
            rating: rating,
          },
        });

        return result;
      }
    } catch (err) {
      console.log(err);
    }
}
