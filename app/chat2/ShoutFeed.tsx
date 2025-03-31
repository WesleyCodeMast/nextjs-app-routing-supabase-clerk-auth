import { ShoutUpdater } from "./ShoutUpdater";
import { getShout } from "./_lib/process";
import "react-quill/dist/quill.snow.css";
import RecursiveReply from "./components/RecursiveReplyComponent";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/auth";

export default async function ShoutFeed({ type, subId }) {
  const [shouts, currentDigest] = await getShout(type, subId);
  const session = await getServerSession(authOptions);
  let user: any = session?.user ?? null;
  const _isAdmin = user?.role == 0 || user?.role == 9;

  return (
    <div className="ql-snow p-2 lg:p-6">
      {shouts
        .filter((shout) => shout.parent === null)
        .map((s) => {
          let filteredShouts = shouts.filter((shout) => shout?.depth >= 2);
          return (
            <div key={s.id}>
              <RecursiveReply
                shouts={filteredShouts}
                shout={s}
                depth={1}
                editable={_isAdmin}
              />
            </div>
          );
        })}
      <ShoutUpdater currentDigest={currentDigest} />
    </div>
  );
}
