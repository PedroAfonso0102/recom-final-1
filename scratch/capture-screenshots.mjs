import http from 'node:http';
import path from 'node:path';
import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';

const scratchDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scratchDir, '..');
const distDir = path.join(rootDir, 'dist');
const outDir = path.join(rootDir, 'instruçoes', 'screenshots');
const playwrightUrl = 'file:///C:/Users/Outlet%20do%20Notebook/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const basePath = '/recom-final-1';

const routes = [
  { name: 'home', url: '/#/' },
  { name: 'a-recom', url: '/#/a-recom' },
  { name: 'fornecedores-catalogos', url: '/#/fornecedores-catalogos' },
  { name: 'fornecedor-mitsubishi-materials', url: '/#/fornecedores-catalogos/mitsubishi-materials' },
  { name: 'fornecedor-7leaders', url: '/#/fornecedores-catalogos/7leaders' },
  { name: 'fornecedor-bt-fixo', url: '/#/fornecedores-catalogos/bt-fixo' },
  { name: 'fornecedor-kifix', url: '/#/fornecedores-catalogos/kifix' },
  { name: 'solucoes', url: '/#/solucoes' },
  { name: 'solucoes-torneamento', url: '/#/solucoes/torneamento' },
  { name: 'solucoes-fresamento', url: '/#/solucoes/fresamento' },
  { name: 'solucoes-furacao', url: '/#/solucoes/furacao' },
  { name: 'promocoes', url: '/#/promocoes' },
  { name: 'contato', url: '/#/contato' },
  { name: 'seguranca', url: '/#/seguranca' },
  { name: 'sugestoes-de-utilizacao', url: '/#/sugestoes-de-utilizacao' },
  { name: 'videos', url: '/#/videos' },
  { name: '404', url: '/#/pagina-inexistente' },
];

await fs.mkdir(outDir, { recursive: true });

function contentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html; charset=utf-8';
    case '.js': return 'text/javascript; charset=utf-8';
    case '.mjs': return 'text/javascript; charset=utf-8';
    case '.css': return 'text/css; charset=utf-8';
    case '.png': return 'image/png';
    case '.jpg':
    case '.jpeg': return 'image/jpeg';
    case '.svg': return 'image/svg+xml';
    case '.ico': return 'image/x-icon';
    case '.json': return 'application/json; charset=utf-8';
    default: return 'application/octet-stream';
  }
}

async function serveFile(res, filePath) {
  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { 'Content-Type': contentType(filePath) });
    res.end(data);
    return true;
  } catch {
    return false;
  }
}

const server = http.createServer(async (req, res) => {
  const reqPath = decodeURIComponent((req.url || '/').split('?')[0]);
  const strippedPath = reqPath.startsWith(basePath) ? reqPath.slice(basePath.length) || '/' : reqPath;
  const safePath = strippedPath === '/' ? '/index.html' : strippedPath;
  const target = path.join(distDir, safePath);
  const resolved = path.resolve(target);
  if (!resolved.startsWith(path.resolve(distDir))) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  if (await serveFile(res, resolved)) return;

  const fallback = path.join(distDir, 'index.html');
  await serveFile(res, fallback);
});

const port = await new Promise((resolve) => {
  server.listen(0, '127.0.0.1', () => {
    const address = server.address();
    resolve(address.port);
  });
});

const { chromium } = await import(playwrightUrl);
const browser = await chromium.launch({
  headless: true,
  executablePath: chromePath,
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1600 },
  deviceScaleFactor: 1,
});

try {
  for (const [index, route] of routes.entries()) {
    const targetUrl = `http://127.0.0.1:${port}${basePath}${route.url}`;
    await page.goto(targetUrl, { waitUntil: 'load' });
    await page.waitForLoadState('networkidle');
    await page.screenshot({
      fullPage: true,
      path: path.join(outDir, `${String(index + 1).padStart(2, '0')}-${route.name}.png`),
    });
    console.log(`saved ${route.name}`);
  }
} finally {
  await browser.close();
  server.close();
}
