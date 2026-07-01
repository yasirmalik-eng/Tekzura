// Vercel Serverless Function: /api/chat
//
// Server-side proxy to the Google Gemini API. Keeps GEMINI_API_KEY private
// (never shipped to the browser). Read env vars inside the handler so Vercel
// does not inline empty values at build time (common Edge runtime issue).
//
// Required in Vercel → Settings → Environment Variables (no VITE_ prefix):
//   GEMINI_API_KEY
// Optional:
//   GEMINI_MODEL (defaults to gemini-2.0-flash)
//   ALLOWED_ORIGINS (comma-separated; leave unset for same-origin only)

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { DEFAULT_MODEL, generateChatReply, sanitizeContext, sanitizeMessages } from '../server/gemini';

export const config = {
  runtime: 'nodejs',
};

function readAllowedOrigins() {
  return (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

function setCors(res: VercelResponse, origin: string | undefined, allowedOrigins: string[]) {
  const allow =
    allowedOrigins.length === 0 || (origin && allowedOrigins.includes(origin))
      ? origin || '*'
      : allowedOrigins[0];
  res.setHeader('Access-Control-Allow-Origin', allow);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-type');
  res.setHeader('Vary', 'Origin');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = typeof req.headers.origin === 'string' ? req.headers.origin : undefined;
  const allowedOrigins = readAllowedOrigins();
  setCors(res, origin, allowedOrigins);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY?.trim();
  const model = (process.env.GEMINI_MODEL || DEFAULT_MODEL).trim();

  if (!apiKey) {
    return res.status(503).json({ error: 'Chat is not configured.', fallbackToLead: true });
  }
  if (allowedOrigins.length > 0 && origin && !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Origin not allowed.' });
  }

  const payload = req.body as { messages?: unknown; context?: unknown } | undefined;
  if (!payload || typeof payload !== 'object') {
    return res.status(400).json({ error: 'Invalid JSON body.' });
  }

  const result = await generateChatReply(
    sanitizeMessages(payload.messages),
    sanitizeContext(payload.context),
    apiKey,
    model,
  );

  return res.status(result.status).json(result.body);
}
