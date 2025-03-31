import prisma from "@/client";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { revalidatePath, unstable_cache } from "next/cache";
import { LoadMoreButton } from "@/app/components/loadMoreButton";
import AdminHead from "@/components/AdminHead";
async function getProps({ params }) {
  const existingSetting = await prisma.site_setting.findFirst({
    where: { id: 10 },
  });

  const data = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      id: true,
    },

    orderBy: { id: "asc" },
    where: {
      NOT: [{ name: null }],
      added_mailer: null,
    },
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
  const emails = await getProps({ params });
  const last = emails.slice(-1);
  const lastId = last[0]?.id;
  const count = emails.length;
  return (
    <div>
      <AdminHead />
      <div className="m-10 p-5">
        {emails?.map((e, i) => (
          <div key={i}>
            {grabName(e.name, e.email)},{e.email}
          </div>
        ))}
        <h3>Total users : {count}</h3>
        <form action={saveEmailExport} className="text-center">
          <input type="hidden" name="lastEmail" value={lastId || ""} />
          <LoadMoreButton text="Save Placeholder" />
        </form>
      </div>
    </div>
  );
}
function grabName(string, email) {
  //  if name does not exsist take left og @ as name
  string = string?.trim();
  const name = string || email.substring(0, email.indexOf("@"));
  return name;
}
async function saveEmailExport(formData) {
  "use server";
  const lastId = formData.get("lastEmail");

  await prisma.user.updateMany({
    where: { added_mailer: null, NOT: [{ name: null }] },
    data: { added_mailer: 1 },
  });

  revalidatePath("/admincp/email");
}
