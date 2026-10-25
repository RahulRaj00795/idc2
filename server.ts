import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const DEFAULT_NEWSDATA_KEY = 'pub_2e72df6f380347b0bebe68551574a7d3';
const ALLOWED_CATEGORIES = new Set(['breaking', 'politics', 'science', 'business']);
const ALLOWED_LANGUAGES = new Set(['en', 'hi']);

interface CacheEntry {
  timestamp: number;
  payload: unknown;
}

const feedCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function startServer() {
  const app = express();
  app.use(express.json());

  // Proxy endpoint for NewsData.io India Latest Events & News feed
  app.get('/api/events-feed', async (req: Request, res: Response) => {
    try {
      const envKey = process.env.NEWSDATA_API_KEY?.trim();
      const apiKey = (envKey && envKey !== 'MY_NEWSDATA_API_KEY')
        ? envKey
        : DEFAULT_NEWSDATA_KEY;

      // Validate and sanitize category query param
      const rawCat = typeof req.query.category === 'string'
        ? req.query.category
        : 'breaking,politics,science,business';
      const validCats = rawCat
        .split(',')
        .map((c) => c.trim().toLowerCase())
        .filter((c) => ALLOWED_CATEGORIES.has(c));
      const categoryParam = validCats.length > 0
        ? validCats.join(',')
        : 'breaking,politics,science,business';

      // Validate and sanitize language query param
      const rawLang = typeof req.query.language === 'string'
        ? req.query.language
        : 'en,hi';
      const validLangs = rawLang
        .split(',')
        .map((l) => l.trim().toLowerCase())
        .filter((l) => ALLOWED_LANGUAGES.has(l));
      const languageParam = validLangs.length > 0 ? validLangs.join(',') : 'en,hi';

      const pageParam = typeof req.query.page === 'string' && req.query.page.trim()
        ? req.query.page.trim()
        : '';
      const bypassCache = req.query.refresh === 'true';

      const cacheKey = `${categoryParam}|${languageParam}|${pageParam}`;
      if (!bypassCache) {
        const cached = feedCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
          res.json(cached.payload);
          return;
        }
      }

      const params = new URLSearchParams({
        apikey: apiKey,
        country: 'in',
        language: languageParam,
        category: categoryParam,
      });
      if (pageParam) {
        params.set('page', pageParam);
      }

      const upstreamUrl = `https://newsdata.io/api/1/latest?${params.toString()}`;
      const upstreamRes = await fetch(upstreamUrl);
      const data = await upstreamRes.json();

      if (!upstreamRes.ok || data.status === 'error') {
        const errMsg = data?.results?.message || data?.message || 'Failed to fetch live India feed';
        res.status(upstreamRes.ok ? 502 : upstreamRes.status).json({
          status: 'error',
          message: errMsg,
        });
        return;
      }

      feedCache.set(cacheKey, {
        timestamp: Date.now(),
        payload: data,
      });

      res.json(data);
    } catch (err) {
      console.error('Error fetching NewsData feed:', err);
      res.status(500).json({
        status: 'error',
        message: err instanceof Error ? err.message : 'Internal server error while fetching live feed',
      });
    }
  });

  const distPath = path.resolve(__dirname, 'dist');
  const distIndex = path.join(distPath, 'index.html');
  const isDev = process.env.NODE_ENV === 'development' || !fs.existsSync(distIndex);

  if (isDev) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(distIndex);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (${isDev ? 'development' : 'production'})`);
  });
}

startServer();
