export function jsonLdMarkup(
  data: Record<string, unknown> | Record<string, unknown>[] | undefined,
): string {
  if (!data) return "";
  const blocks = Array.isArray(data) ? data : [data];
  const open = "<script type=\"application/ld+json\">";
  const close = "</scr" + "ipt>";
  return blocks.map((block) => `${open}${JSON.stringify(block)}${close}`).join("");
}
