import type { VercelResponse } from '@vercel/node';

/**
 * Set CORS headers on the response.
 * In production (same origin) this is a no-op, but needed for local dev.
 */
export function setCorsHeaders(res: VercelResponse): void {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Max-Age', '86400');
}

/**
 * Handle CORS preflight (OPTIONS). Returns true if this was a preflight request.
 */
export function handleCorsPreflight(req: { method?: string }, res: VercelResponse): boolean {
  if (req.method === 'OPTIONS') {
    setCorsHeaders(res);
    res.status(200).end();
    return true;
  }
  return false;
}
