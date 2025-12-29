import { USE_FALLBACK } from "@/lib/config";

export async function fetchJsonOrFallback<T>(url: string, fallback: T, init?: RequestInit): Promise<T> {
  console.info(`fetchJsonOrFallback called for ${url} (USE_FALLBACK=${USE_FALLBACK})`);
  // If fallback mode is enabled, short-circuit and return fallback without contacting backend
  if (USE_FALLBACK) {
    console.info(`USE_FALLBACK=true — returning fallback for ${url}`);
    return fallback;
  }

  try {
    const res = await fetch(url, init);
    if (!res.ok) {
      console.warn(`Fetch to ${url} returned non-OK status ${res.status}; using fallback.`);
      return fallback;
    }
    const data = await res.json();
    return data as T;
  } catch (err) {
    console.warn(`Fetch to ${url} failed; using fallback.`, err);
    return fallback;
  }
}