import { isTrackedEvent } from "../src/lib/analytics-events";
import { incrementEvent } from "../src/lib/server/analytics";

export const config = { runtime: "edge" };

// sendBeacon posts a plain event name. Always 204 so the client cannot infer
// configuration or write success.

export default async function handler(request: Request): Promise<Response> {
  const noContent = new Response(null, { status: 204 });

  if (request.method !== "POST") return noContent;

  try {
    const raw = await request.text();
    if (raw.length > 64) return noContent;
    const event = raw.trim();
    if (!isTrackedEvent(event)) return noContent;
    await incrementEvent(event);
  } catch {
    // Swallow: tracking must never surface an error.
  }

  return noContent;
}
