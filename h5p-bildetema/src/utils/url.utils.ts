export function filterURL(url: string): string {
  const newUrl = url.replaceAll("&amp;", "&");
  return newUrl;
}
