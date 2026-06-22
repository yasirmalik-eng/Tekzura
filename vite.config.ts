import { defineConfig, loadEnv, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { DEFAULT_MODEL, generateChatReply, sanitizeContext, sanitizeMessages } from './server/gemini';

// Dev-only handler that mirrors the Vercel /api/chat Edge function so the
// chatbot works under `npm run dev` without needing `vercel dev`.
function chatDevApi(env: Record<string, string>): PluginOption {
  return {
    name: 'tekzura-chat-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        const send = (status: number, body: unknown) => {
          res.statusCode = status;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(body));
        };

        if (req.method !== 'POST') return send(405, { error: 'Method not allowed' });

        const apiKey = (env.GEMINI_API_KEY || process.env.GEMINI_API_KEY || '').trim();
        if (!apiKey) return send(503, { error: 'Chat is not configured (missing GEMINI_API_KEY).' });

        let raw = '';
        for await (const chunk of req) raw += chunk;

        let payload: { messages?: unknown; context?: unknown };
        try {
          payload = JSON.parse(raw || '{}');
        } catch {
          return send(400, { error: 'Invalid JSON body.' });
        }

        const result = await generateChatReply(
          sanitizeMessages(payload.messages),
          sanitizeContext(payload.context),
          apiKey,
          (env.GEMINI_MODEL || DEFAULT_MODEL).trim(),
        );
        send(result.status, result.body);
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load every env var (empty prefix), including the server-only GEMINI_* keys.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), chatDevApi(env)],
    build: {
      target: 'es2020',
      outDir: 'build',
      sourcemap: false,
      minify: 'esbuild',
    },
    server: {
      port: 3000,
      open: false,
    },
  };
});
