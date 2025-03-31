import { ShoutLikeClientP } from "./ShoutLikeClient";
import { getUserShouts, likeAction } from "./_lib/process";

export function ShoutLikePlaceholder({ likes }: { likes: number }) {
  return (
    <p>
      <span style={{ visibility: "hidden" }}>{"❤️"}</span> {likes}
    </p>
  );
}

export async function ShoutLikeUser({
  shoutIds,
  shoutId,
  likes,
}: {
  shoutIds: string[];
  shoutId: string;
  likes: number;
}) {
  const data = await getUserShouts(shoutIds);
  const isLiked = data.find((e) => e.id === shoutId)?.liked ?? false;
  const action = likeAction.bind(null, shoutId);
  return <ShoutLikeClientP action={action} isLiked={isLiked} likes={likes} />;
}
