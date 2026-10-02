import { Redis } from "@upstash/redis";

// Server-only. Do not import this from client or layout code.
//
// Keys are namespaced `s:` so they do not collide with the web timer's `e:`
// counters if both share one Redis. Days are Beijing time, same as the product.
//
// Environment variables: Vercel KV integration injects KV_REST_API_URL and
// KV_REST_API_TOKEN; the Upstash/Vercel Marketplace integration injects
// UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN. We read KV_* first
// (the names this Vercel project has), falling back to UPSTASH_* for setups
// that use that naming. When neither pair is set, the module becomes a no-op
// so local dev, CI and self-hosted deploys work without any Redis config.

const CST_OFFSET_MS = 8 * 60 * 60 * 1000;

export function eventDate(date = new Date()): string {
  return new Date(date.getTime() + CST_OFFSET_MS).toISOString().slice(0, 10);
}

export function eventKey(event: string, date = new Date()): string {
  return `s:${eventDate(date)}:${event}`;
}

function redisOrNull(): Redis | null {
  const url =
    process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? "";
  const token =
    process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? "";
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function incrementEvent(event: string): Promise<void> {
  const redis = redisOrNull();
  if (!redis) return;
  try {
    await redis.incr(eventKey(event));
  } catch {
    // Storage down must not fail the request.
  }
}
