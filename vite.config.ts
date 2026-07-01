import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, loadEnv, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { insightCaseStudies } from './src/content/insights';
import { services, siteConfig } from './src/content/site';
import { DEFAULT_MODEL, generateChatReply, sanitizeContext, sanitizeMessages } from './api/lib/gemini';

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

function sitemapPlugin(): PluginOption {
  return {
    name: 'tekzura-sitemap',
    closeBundle() {
      const staticPaths = [
        '/',
        '/about',
        '/services',
        '/build-package',
        '/work',
        '/blog',
        '/contact',
        '/process',
        '/get-started',
      ];
      const paths = [
        ...staticPaths,
        ...services.map((service) => `/services/${service.slug}`),
        ...insightCaseStudies.map((study) => `/blog/${study.slug}`),
      ];
      const uniquePaths = [...new Set(paths)];
      const lastmod = new Date().toISOString().slice(0, 10);
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniquePaths
  .map((path) => {
    const loc = `${siteConfig.url}${path}`;
    const priority = path === '/' ? '1.0' : path.startsWith('/services/') || path.startsWith('/blog/') ? '0.8' : '0.9';
    return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>${priority}</priority></url>`;
  })
  .join('\n')}
</urlset>
`;
      writeFileSync(resolve(__dirname, 'build/sitemap.xml'), xml, 'utf8');
    },
  };
}

export default defineConfig(({ mode }) => {
  // Load every env var (empty prefix), including the server-only GEMINI_* keys.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), chatDevApi(env), sitemapPlugin()],
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
