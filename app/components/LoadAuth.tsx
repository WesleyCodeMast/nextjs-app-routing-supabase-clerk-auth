import { LoadMoreButton } from "./loadMoreButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { getServerSession } from "next-auth";

export default async function LoadAuth({ text }) {
  const session = await getServerSession(authOptions);
  console.log(session);
  let comment = text ?? "Submit Comment";
  if (session?.user?.name !== undefined) {
  }
  return (
    <>
      <LoadMoreButton text={comment} />
    </>
  );
}
