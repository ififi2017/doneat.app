import { Redis } from "@upstash/redis";

// Server-only. Do not import this from client or layout code.
//
// Keys are namespaced `s:` so they do not collide with the web timer's `e:`
// counters if both share one Redis. Days are Beijing time, same as the product.

const CST_OFFSET_MS = 8 * 60 * 60 * 1000;

export function eventDate(date = new Date()): string {
  return new Date(date.getTime() + CST_OFFSET_MS).toISOString().slice(0, 10);
}

export function eventKey(event: string, date = new Date()): string {
  return `s:${eventDate(date)}:${event}`;
}

function redisOrNull(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL ?? "";
  const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? "";
  if (!url || !token) return null;
  return Redis.fromEnv();
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
