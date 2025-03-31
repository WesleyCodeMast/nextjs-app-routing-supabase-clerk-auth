import prisma from "@/client";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { revalidatePath, unstable_cache } from "next/cache";
import AdminHead from "@/components/AdminHead";
import Image from "next/image";
async function getProps({ params }) {
  const existingSetting = await prisma.site_setting.findFirst({
    where: { id: 10 },
  });

  const data = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      id: true,
      image: true,
    },

    orderBy: { id: "desc" },
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
            <Image
              unoptimized
              src={userImage(e.image)}
              width={200}
              height={200}
              alt={"profile"}
            />
          </div>
        ))}
        <h3>Total users : {count}</h3>
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

  await prisma.site_setting.update({
    where: { id: 10 },
    data: { name: "lastEmail", value: lastId },
  });

  revalidatePath("/admincp/email");
}
function userImage(image) {
  let img = image ?? "/images/emptyuser.png";
  if (img.indexOf("http") == 0) {
    return img;
  }
  img = "/image/users/" + img; // if we store in blob then we use the image/users route

  return img;
}
