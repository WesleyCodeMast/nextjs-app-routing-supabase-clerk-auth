"use server";
import prisma from "@/client";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth/next";

export async function getCasinosWithSoftware(softwares) {
  "use server";

  const swId = softwares?.map((software: any) => software.id);

  try {
    const comments: any = await prisma.casino_p_casinos.findMany({
      select: {
        id: true,
        clean_name: true,
        livegames: true,
        casino: true,
        casino_geo: {
          select: {
            id: true,
            casino: true,
            country: true,
          },
        },
        bonuses: {
          orderBy: [{ nodeposit: "desc" }, { deposit: "desc" }],
        },
      },
      where: {
        approved: 1,
        rogue: 0,
        softwares: {
          some: {
            software: {
              in: swId,
            },
          },
        },
      },
      orderBy: [{ hot: "desc" }, { new: "desc" }],
      take: 10,
    });
    return comments;
  } catch (err) {
    console.log(err);
  }
}

export type CasinosWithLocation = Awaited<
  ReturnType<typeof getCasinosWithLocation>
>[0];

export async function getCasinosWithLocation(location) {
  "use server";

  const casinos = await prisma.casino_p_casinos.findMany({
    select: {
      id: true,
      clean_name: true,
      casino: true,
      hot: true,
      new: true,
      button: true,
      livegames: true,
      banklist: {
        select: {
          id: true,
          bank: true,
          bank_data: true,
          parent: true,
          type: true,
        },
      },
      casino_geo: {
        select: {
          id: true,
          casino: true,
          country: true,
        },
      },
      bonus_percent: true,
      deposit: true,
      freespins: true,
      nodeposit: true,
      jurisdictions: {
        select: {
          jurisdiction_data: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
      mobile: true,
      softwares: {
        select: {
          id: true,
          software: true,
          softwares: true,
          softwarelist: true,
        },
      },
      bonuses: {
        orderBy: [{ nodeposit: "desc" }, { deposit: "desc" }],
      },
      casino_ratings: {
        select: {
          rating: true,
        },
      },
      review: {
        select: {
          description: true,
        },
        orderBy: {
          ordered: "desc",
        },
      },
    },
    where: {
      approved: 1,
      rogue: 0,
      OR: [
        {
          NOT: { casino_geo: { some: { country: location, allow: 0 } } },
          casino_geo: { some: { allow: 0 } },
        },
        {
          casino_geo: { some: { allow: 1, country: location } },
        },
      ],
    },
    orderBy: [{ hot: "desc" }, { new: "desc" }],
    take: 15,
  });
  return casinos;
}

export async function getFilterCondition() {
  "use server";
  const session = await getServerSession(authOptions);
  let user: any = session?.user;
  const userRole: Number = Number(user?.role);
  const userEmail = session?.user?.email ?? null; //  stop prisma from returning a val on undefined

  if (!userEmail) {
    user = null;
  }

  if (user?.id) {
    let myId: any = user?.id;
    const cond = await prisma.casino_filter_condition.findFirst({
      where: {
        authorId: myId,
      },
    });
    return cond;
  }
  return "{}";
}

export async function saveFilterCondition(payload) {
  "use server";
  const session = await getServerSession(authOptions);
  let user: any = session?.user;
  const userRole: Number = Number(user?.role);
  const userEmail = session?.user?.email ?? null; //  stop prisma from returning a val on undefined

  if (!userEmail) {
    user = null;
  }

  if (user?.id) {
    let myId: string = user?.id;
    const cond = await prisma.casino_filter_condition.findFirst({
      where: {
        authorId: myId,
      },
    });
    let result: any = undefined;
    try {
      if (!cond?.id) {
        result = await prisma.casino_filter_condition.create({
          data: {
            condition: JSON.stringify(payload),
            createdAt: new Date(),
            authorId: myId,
          },
        });
      } else {
        result = await prisma.casino_filter_condition.update({
          where: {
            id: cond.id,
          },
          data: {
            condition: JSON.stringify(payload),
            authorId: myId,
          },
        });
      }
    } catch (error) {
      return false;
    }
    return result;
  }
  return {
    isNotAuthenticated: true,
    session: session,
    userEmail: userEmail,
    user: user,
  };
}
