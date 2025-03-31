import prisma from "@/client";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { startOfMonth, subSeconds } from "date-fns";
import AdminHead from "@/components/AdminHead";
async function getProps({ params }) {
  const data = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      id: true,
      paypal_email: true,
    },

    orderBy: { id: "asc" },
  });
  return data;
}

export default async function Settings({ params }) {
  //Authenticate Admins only for this page
  const session = await getServerSession(authOptions);
  let userEmail = session?.user?.email;
  if (userEmail == undefined) {
    userEmail = "never@addUsername.no"; //  stop prisma from returning a val on undefined
  }
  //@ts-expect-error
  const myId: string = session?.user?.id;
  let user = await prisma.user.findFirst({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
    where: {
      email: userEmail,
    },
  });

  if (!userEmail) {
    user = null;
    redirect("/");
  }
  const userRole = user?.role;
  if (userRole !== 0) {
    redirect("/");
  }
  //End Authentication

  const now = new Date();
  const lastMonthWinners = await prisma.scratchCardAward.findMany({
    select: {
      id: true,
      usdAmount: true,
      createdAt: true,
      user: { select: { name: true, email: true, paypal_email: true } },
    },
    where: {
      createdAt: {
        gte: startOfMonth(subSeconds(startOfMonth(now), 1)),
        lt: startOfMonth(now),
      },
    },
    orderBy: { createdAt: "asc" },
  });

  const email = await getProps({ params });
  const last = email.slice(-1);

  return (
    <div>
      <AdminHead />
      <div className="m-10 p-5">
        {lastMonthWinners?.map((e, i) => (
          <div key={i}>{e.user.paypal_email ?? e.user.email}</div>
        ))}
      </div>
    </div>
  );
}
