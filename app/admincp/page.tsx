import prisma from "@/client";
import { redirect } from "next/navigation";
import LoadAuth from "../components/LoadAuth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";
import { revalidatePath, unstable_cache } from "next/cache";
import { LoadMoreButton } from "../components/loadMoreButton";
import AdminHead from "@/components/AdminHead";
import { revalidateTag } from "next/cache";
async function getProps({ params }) {
  const data = await prisma.site_setting.findMany({
    select: {
      name: true,
      value: true,
      id: true,
    },
    orderBy: { name: "asc" },
  });
  return data;
}
async function siteSetting(formData) {
  "use server";
  console.log("Revalidate");
  revalidateTag("settings");
  revalidateTag("global-cache");
  const settingName = formData.get("name");
  const settingValue = formData.get("value");
  const settingId = Number(formData.get("id")) ?? 9000;

  try {
    // Check if a setting already exists with the given name
    const existingSetting = await prisma.site_setting.findFirst({
      where: { id: settingId },
    });
    if (existingSetting) {
      // Update an existing setting's value if it exists
      await prisma.site_setting.update({
        where: { id: existingSetting.id },
        data: { name: settingName, value: settingValue },
      });

      console.log(
        `Updated setting "${existingSetting.name}" with value "${settingValue}"`,
      );
    } else {
      console.log("Add new");
      await prisma.site_setting.create({
        data: { name: settingName, value: settingValue },
      });

      console.log(
        `Created new setting "${settingName}" with value "${settingValue}"`,
      );
    }
  } catch (error) {
    console.error(error);
  }
  revalidatePath("CURRENT PAGE");
}

export default async function Settings({ params }) {
  const session = await getServerSession(authOptions);

  let userEmail = session?.user?.email;
  if (userEmail == undefined) {
    userEmail = "never@addUsername.no"; //  stop prisma from returning a val on undefined
  }

  const userRole = Number(session?.user?.role) ?? 1;
  if (userRole !== 0) {
  }
  const props = await getProps({ params });
  return (
    <div>
      <AdminHead />
      <div className="pl-24">
        <h2 className="border-b border-blue-800 pb-8 pt-12 text-4xl font-semibold md:text-3xl dark:border-white">
          Allfreechips Site Settings
        </h2>
      </div>
      <div className="p-24">
        {props.map((d, index) => (
          <div key={index}>
            <form action={siteSetting} id={`form` + index}>
              <input
                className="m-2 appearance-none rounded border-2 border-blue-400  bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
                type="text"
                defaultValue={d.name}
                id="nameInput"
                name="name"
              />
              <input
                className="m-2 appearance-none rounded border-2 border-blue-400 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-blue-500 focus:bg-white focus:outline-none"
                type="text"
                defaultValue={d.value}
                id="valueInput"
                name="value"
              />
              <input type="hidden" value={d.id} id="id" name="id" />
              <button
                className="focus:shadow-outline rounded bg-blue-800 px-2 py-1 font-bold text-white shadow hover:bg-blue-500 focus:outline-none"
                type="submit"
              >
                Save
              </button>
            </form>{" "}
          </div>
        ))}
        <h3 className="border-b border-blue-800 pb-8 pt-12 text-4xl font-semibold md:text-3xl dark:border-white">
          Add a new setting
        </h3>
        <form action={siteSetting} id="addNew">
          <div className="-mx-3 mb-6 flex flex-wrap">
            <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                Name
              </label>
              <input
                className="mb-3 block w-full appearance-none rounded border border-red-500 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                type="text"
                id="nameInput"
                name="name"
              />
              <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700">
                Value
              </label>
              <input
                className="mb-3 block w-full appearance-none rounded border border-red-500 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                type="text"
                id="valueInput"
                name="value"
              />
              <input
                className="mb-3 block w-full appearance-none rounded border border-red-500 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                type="hidden"
                value=""
                id="id"
                name="id"
              />
              <LoadMoreButton text="Add New" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
