// Vercel Edge Function: /api/chat
//
// Server-side proxy to the Google Gemini API. Keeps GEMINI_API_KEY private
// (never shipped to the browser), applies light origin + size checks, and
// delegates the actual model call to the shared logic in server/gemini.ts so
// local dev (Vite middleware) and production behave identically.
//
// Required environment variable (set in Vercel project settings, NOT prefixed
// with VITE_): GEMINI_API_KEY
// Optional: GEMINI_MODEL (defaults to gemini-flash-latest),
//           ALLOWED_ORIGINS (comma-separated; defaults to allowing same-origin).

import { DEFAULT_MODEL, generateChatReply, sanitizeContext, sanitizeMessages } from '../server/gemini';

export const config = { runtime: 'edge' };

const env = (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {};
const MODEL = (env.GEMINI_MODEL || DEFAULT_MODEL).trim();
const API_KEY = env.GEMINI_API_KEY?.trim();
const ALLOWED_ORIGINS = (env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((value) => value.trim())
  .filter(Boolean);

function corsHeaders(origin: string | null) {
  const allow =
    ALLOWED_ORIGINS.length === 0 || (origin && ALLOWED_ORIGINS.includes(origin))
      ? origin || '*'
      : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    Vary: 'Origin',
  };
}

function json(body: unknown, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin) },
  });
}

export default async function handler(req: Request): Promise<Response> {
  const origin = req.headers.get('origin');

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }
  if (req.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405, origin);
  }
  if (!API_KEY) {
    return json({ error: 'Chat is not configured.' }, 503, origin);
  }
  if (ALLOWED_ORIGINS.length > 0 && origin && !ALLOWED_ORIGINS.includes(origin)) {
    return json({ error: 'Origin not allowed.' }, 403, origin);
  }

  let payload: { messages?: unknown; context?: unknown };
  try {
    payload = (await req.json()) as { messages?: unknown; context?: unknown };
  } catch {
    return json({ error: 'Invalid JSON body.' }, 400, origin);
  }

  const result = await generateChatReply(
    sanitizeMessages(payload.messages),
    sanitizeContext(payload.context),
    API_KEY,
    MODEL,
  );

  return json(result.body, result.status, origin);
}
