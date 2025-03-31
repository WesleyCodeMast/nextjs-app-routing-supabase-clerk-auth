import { Metadata } from "next";
export const revalidate = 7200;

export async function generateMetadata({ params }): Promise<Metadata> {
  const Title = "Problem Gaming help :: Stop your addiction now please!";
  const description =
    "Problem gaming is a terrible situations to be in, please seek help right now if you even feel you may have an issue.";
  return {
    metadataBase: new URL("https://www.allfreechips.com"),
    title: Title,
    description: description,
  };
}
export default async function Page() {
  return (
    <div className="mx-auto text-sky-700 md:container dark:text-white">
      Online Problem gaming assistance now
    </div>
  );
}
