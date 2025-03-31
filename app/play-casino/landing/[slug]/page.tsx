import { getCasinoUrl } from "@/app/lib/FetchCasino";
import OutCatch from "@/components/OutCatch";

export default async function PlayCasinoLanding({
  params,
}: {
  params: { slug: string };
}) {
  let url: URL | null = null;
  let [casino_url, name] = await getCasinoUrl(params.slug);
  // TODO: record this action
  if (casino_url) {
    url = new URL(casino_url);
  }
  return (
    <OutCatch
      casinoUrl={url?.toString() ?? null}
      casinoName={name || "Unknown Casino"}
    />
  );
}
