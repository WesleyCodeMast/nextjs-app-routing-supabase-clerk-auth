import Link from "next/link";
import prisma from "@/client";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
export default async function AdminHead() {
  const session = await getServerSession(authOptions);

  let userEmail = session?.user?.email;
  if (userEmail == undefined) {
    userEmail = null; //  stop prisma from returning a val on undefined
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

  const opt = "";
  return (
    <div className="text-center">
      <Link href="/admincp">
        <button className="m-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Settings
        </button>
      </Link>
      <Link href="/admincp/email">
        <button className="m-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          User Accounts
        </button>
      </Link>
      <Link href="/admincp/contests">
        <button className="m-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Contest Winners
        </button>
      </Link>
      <Link href="/admincp/software">
        <button className="m-5 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Software Text
        </button>
      </Link>
    </div>
  );
}
