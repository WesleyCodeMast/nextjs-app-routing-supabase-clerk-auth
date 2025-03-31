export function extractRoute(page: string): string | null {
  const matcher = /^app(.*)\/page.[A-z]{2,3}$/;
  const re = matcher.exec(page);
  if (re) {
    const res = re.pop();
    return res ? res : "/";
  }
  return null;
}
