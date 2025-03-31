import { headers } from "next/headers";

export default async function CountryName() {
  const headersList = headers();
  let visitorCountry = headersList.get("x-vercel-ip-country") || "US";
  const name = new Intl.DisplayNames(["en"], {
    type: "region",
  }).of(visitorCountry);
  return name;
}
