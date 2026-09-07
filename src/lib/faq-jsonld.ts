/**
 * Build FAQPage JSON-LD from the same Markdown body the page renders.
 * Answers are converted to visible text (link labels, not URLs) so the
 * structured data matches what a reader sees.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

const LINK_RE = /\[([^\]]+)\]\([^)]+\)/g;

export function markdownToVisibleText(markdown: string): string {
  return markdown
    .replace(/\r\n/g, "\n")
    .replace(LINK_RE, "$1")
    .replace(/\\([\\`*_[\]()#+.!-])/g, "$1")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

export function parseFaqMarkdown(body: string): FaqItem[] {
  const source = body.replace(/\r\n/g, "\n").trim();
  if (!source) return [];

  const chunks = source.split(/^## /m);
  const items: FaqItem[] = [];

  for (const chunk of chunks) {
    const trimmed = chunk.trim();
    if (!trimmed) continue;
    const newline = trimmed.indexOf("\n");
    const question = (newline === -1 ? trimmed : trimmed.slice(0, newline)).trim();
    const rest = newline === -1 ? "" : trimmed.slice(newline + 1);
    const answer = markdownToVisibleText(rest);
    if (!question || !answer) continue;
    items.push({ question, answer });
  }

  return items;
}

export function faqPageJsonLd(
  items: readonly FaqItem[],
  options: { locale: string; url: string },
): Record<string, unknown> | undefined {
  if (items.length === 0) return undefined;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: options.locale,
    url: options.url,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
