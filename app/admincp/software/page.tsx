import prisma from "@/client";
import { revalidatePath } from "next/cache";
import { LoadMoreButton } from "@/app/components/loadMoreButton";
import AdminHead from "@/components/AdminHead";
import StringRehype from "@/app/components/StringRehype";
import cssFormat from "@/components/functions/cssFormat";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
let casino_id = 1;

async function update(formData) {
  "use server";
  const type = formData.get("type");
  const title = formData.get("title");
  let content = formData.get("content");
  const id = formData.get("id");
  const softPick = formData.get("softPick");
  if (softPick) {
    casino_id = Number(softPick);
  }
  if (content == "No Content") {
    content = null;
  }
  console.log("Working...." + type + content);
  if (id && content && type) {
    console.log("Updateing " + id);
    const nId = Number(id);
    if (!isNaN(nId) && nId) {
      await prisma.casino_p_subcontent.update({
        where: { id: nId },
        data: { title: title, content: content, content_linked: null }, // erase linked content to re-create
      });
    }
  } else if (content && type) {
    // New one!
    console.log("Add new");
    await prisma.casino_p_subcontent.create({
      data: {
        title: title,
        content: content,
        type: Number(type),
        content_id: casino_id,
      },
    });
  } else {
    console.log("Failed to add");
  }

  revalidatePath("/admincp/software");
}

async function getProps({ params }) {
  const data = await prisma.casino_p_software.findMany({
    where: { id: casino_id },
    select: {
      software_name: true,
      subcontent: {
        select: {
          content_id: true,
          type: true,
          id: true,
          content: true,
          title: true,
        },
        orderBy: { type: "asc" },
      },
    },
  });
  return data;
}

export default async function Settings({ params }) {
  const softdata = await prisma.casino_p_software.findMany({
    where: { vercel_image_url: { not: null }, status: 1 },
    select: {
      software_name: true,
      id: true,
    },
    orderBy: { software_name: "asc" },
  });

  let selectList = "";

  softdata.map((s) => {
    if (s.id && s.software_name) {
      selectList =
        selectList +
        '<option value="' +
        s.id +
        '">' +
        s.software_name +
        "</option>";
    }
  });

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

  const data = await getProps({ params });
  const software = data[0]?.software_name ?? "None Selected";
  const rev = [
    data[0]?.subcontent[0] ?? null,
    data[0]?.subcontent[1] ?? null,
    data[0]?.subcontent[2] ?? null,
    data[0]?.subcontent[3] ?? null,
  ];
  let m = new Array();
  rev.map((e) => {
    if (e?.type == 1) {
      m[1] = e;
    }
    if (e?.type == 2) {
      m[2] = e;
    }
    if (e?.type == 3) {
      m[3] = e;
    }
    if (e?.type == 4) {
      m[4] = e;
    }
  });
  const d = [m[1] ?? null, m[2] ?? null, m[3] ?? null, m[4] ?? null];
  const text = [
    "Top Slot Section",
    "Bottom Slot Section",
    "Top Casino Section",
    "Bottom Casino Section",
  ];
  const defTitle = [
    "Explore slots from " + software,
    "More information about " + software + " online slots",
    "Casinos from " + software,
    "More details on " + software + "online casinos",
  ];

  const opSelText = software ?? "Pick One";
  const opSel = casino_id ?? 0;
  return (
    <div>
      <AdminHead />
      <div className="p2">
        <form action={update}>
          <select
            className="ml-10 appearance-none rounded border-2 border-blue-400  bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
            name="softPick"
          >
            <option selected value={opSel}>
              {opSelText}
            </option>
            {softdata.map((s) => (
              <option key={s.id} value={s.id}>
                {s.software_name}
              </option>
            ))}
            ;
          </select>

          <LoadMoreButton text="Update Selection" />
        </form>
        {rev.map((d, i) => (
          <div key="i" className="m-10 p-5">
            <form action={update}>
              <h3 className=" text-3xl">{text[i]}</h3>
              <input type="hidden" name="id" value={d?.id ?? null} />
              <input type="hidden" name="type" value={d?.type ?? i + 1} />
              <input
                className="m-2 appearance-none rounded border-2 border-blue-400  bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
                type="text"
                size={100}
                name="title"
                defaultValue={d?.title ?? defTitle[i]}
              />
              <textarea
                className="rounded-5 border-2 p-5 "
                rows={10}
                cols={200}
                name="content"
                defaultValue={d?.content ?? "No Content"}
              ></textarea>
              <div>
                <LoadMoreButton text="Update Section" />
              </div>
            </form>
            <div>
              <StringRehype
                html={{
                  __html:
                    cssFormat(d?.content, "h4") ||
                    "<p>There is no review...</p>",
                }}
              />
            </div>
          </div>
        ))}
        ;
      </div>
    </div>
  );
}
