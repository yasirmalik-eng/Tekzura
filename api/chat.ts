// Vercel Edge Function: /api/chat
//
// Server-side proxy to the Google Gemini API. Keeps GEMINI_API_KEY private.
// Read env vars inside the handler so Vercel does not inline empty values
// at build time.
//
// Required in Vercel → Settings → Environment Variables (no VITE_ prefix):
//   GEMINI_API_KEY
// Optional:
//   GEMINI_MODEL (defaults to gemini-2.0-flash)
//   ALLOWED_ORIGINS (comma-separated; leave unset for same-origin only)

import { DEFAULT_MODEL, generateChatReply, sanitizeContext, sanitizeMessages } from './lib/gemini';

export const config = { runtime: 'edge' };

function readAllowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

function corsHeaders(origin: string | null, allowedOrigins: string[]) {
  const allow =
    allowedOrigins.length === 0 || (origin && allowedOrigins.includes(origin))
      ? origin || '*'
      : allowedOrigins[0];
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    Vary: 'Origin',
  };
}

function json(body: unknown, status: number, origin: string | null, allowedOrigins: string[]) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(origin, allowedOrigins) },
  });
}

function readServerEnv(...names: string[]) {
  const env = process.env as Record<string, string | undefined>;
  for (const name of names) {
    const value = env[name]?.trim();
    if (value) return value;
  }
  return '';
}

export default async function handler(req: Request): Promise<Response> {
  const origin = req.headers.get('origin');
  const allowedOrigins = readAllowedOrigins();

  try {
    if (req.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders(origin, allowedOrigins) });
    }
    if (req.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405, origin, allowedOrigins);
    }

    const apiKey = readServerEnv('GEMINI_API_KEY', 'GOOGLE_GEMINI_API_KEY');
    const model = readServerEnv('GEMINI_MODEL') || DEFAULT_MODEL;

    if (!apiKey) {
      return json({ error: 'Chat is not configured.', fallbackToLead: true }, 503, origin, allowedOrigins);
    }
    if (allowedOrigins.length > 0 && origin && !allowedOrigins.includes(origin)) {
      return json({ error: 'Origin not allowed.' }, 403, origin, allowedOrigins);
    }

    let payload: { messages?: unknown; context?: unknown };
    try {
      payload = (await req.json()) as { messages?: unknown; context?: unknown };
    } catch {
      return json({ error: 'Invalid JSON body.' }, 400, origin, allowedOrigins);
    }

    const result = await generateChatReply(
      sanitizeMessages(payload.messages),
      sanitizeContext(payload.context),
      apiKey,
      model,
    );

    return json(result.body, result.status, origin, allowedOrigins);
  } catch (error) {
    console.error('Chat handler failed:', error);
    return json({ error: 'The assistant is unavailable right now.', fallbackToLead: true }, 500, origin, allowedOrigins);
  }
}
