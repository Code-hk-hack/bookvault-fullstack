// In production (Vercel), empty string = same origin. In local dev, set VITE_API_URL.
const BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Fetch wrapper with timeout to prevent hanging when backend is cold-starting (e.g. Render free tier).
 * Falls back gracefully after TIMEOUT_MS milliseconds.
 */
export async function fetchWithTimeout(
  path: string,
  options: RequestInit & { timeoutMs?: number } = {}
): Promise<Response> {
  const { timeoutMs = 10000, ...fetchOptions } = options;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...fetchOptions,
      signal: controller.signal,
    });
    return res;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Fetch JSON with timeout. Returns null on failure (network error / timeout).
 */
export async function fetchJSON<T = unknown>(
  path: string,
  options: RequestInit & { timeoutMs?: number } = {}
): Promise<T | null> {
  try {
    const res = await fetchWithTimeout(path, options);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}
