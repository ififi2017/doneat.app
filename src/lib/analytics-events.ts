// Public allowlist for official-site counters. The /api/e endpoint is open;
// only these names are written, and only as daily aggregates.
//
// No cookies, user ids, IP, User-Agent, locale, schedule, or salary.

export const trackedEvents = [
  "hall_view",
  "download_view",
  "faq_view",
  "about_view",
  "how_it_works_view",
  "privacy_view",
  "web_timer_open",
  "app_store_open",
  "microsoft_store_open",
  "github_source_open",
  "github_releases_open",
] as const;

export type TrackedEvent = (typeof trackedEvents)[number];

export function isTrackedEvent(value: string): value is TrackedEvent {
  return (trackedEvents as readonly string[]).includes(value);
}

export function contentTrackPage(
  page: "download" | "privacy" | "about" | "faq" | "how-it-works",
): TrackedEvent {
  switch (page) {
    case "download":
      return "download_view";
    case "faq":
      return "faq_view";
    case "about":
      return "about_view";
    case "how-it-works":
      return "how_it_works_view";
    case "privacy":
      return "privacy_view";
  }
}
