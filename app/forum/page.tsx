import prisma from "@/client";
import { unstable_cache } from "next/cache";
import Link from "next/link";
import { revalidateTag } from "next/cache";
export default async function Forums() {
  //revalidateTag("forums");
  const forumList = await unstable_cache(async () => getForums(), ["forums"], {
    tags: ["forums"],
  })();

  return (
    <div className="px-4 py-8 md:px-28">
      <div className="rounded-xl border bg-slate-100 p-4 md:grid-cols-4  md:grid-rows-1 md:p-12 dark:bg-zinc-700">
        <h1 className="text-center text-4xl">
          Allfreechips online casino forums
        </h1>
        <p className="p-4 text-center text-xl md:p-12">
          After thinking we no longer needed a forums by popular demand I built
          this little lightweight system to make everyone happy hopefully!
        </p>

        {forumList.map((forum, id) => (
          <div
            key={id}
            className="mb-4 grid gap-4 rounded-xl border bg-slate-200 p-4  md:grid-cols-2 md:grid-rows-1 dark:bg-zinc-800"
          >
            <div className="pl-12 text-center text-2xl md:text-left md:text-4xl">
              <Link href={`/forum/${forum.path}`}>{forum.title} ➡️</Link>
            </div>
            <div className="md:col-span-2">{forum.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
async function getForums() {
  const forums = await prisma.forums.findMany({
    select: { id: true, title: true, path: true, description: true },
    orderBy: { order: "asc" },
  });
  return forums;
}
