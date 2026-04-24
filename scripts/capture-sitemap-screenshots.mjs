import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const cwd = process.cwd();
const outDir = path.join(cwd, 'instruçoes', 'screenshots');
await fs.mkdir(outDir, { recursive: true });

const baseUrl = 'http://127.0.0.1:4173/recom-final-1';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 2200 } });

const routes = [
  { name: 'home', url: '/' },
  { name: 'a-recom', url: '/a-recom' },
  { name: 'fornecedores-catalogos', url: '/fornecedores-catalogos' },
  { name: 'fornecedor-mitsubishi-materials', url: '/fornecedores-catalogos/mitsubishi-materials' },
  { name: 'fornecedor-7leaders', url: '/fornecedores-catalogos/7leaders' },
  { name: 'fornecedor-bt-fixo', url: '/fornecedores-catalogos/bt-fixo' },
  { name: 'fornecedor-kifix', url: '/fornecedores-catalogos/kifix' },
  { name: 'solucoes', url: '/solucoes' },
  { name: 'solucao-torneamento', url: '/solucoes/torneamento' },
  { name: 'solucao-fresamento', url: '/solucoes/fresamento' },
  { name: 'solucao-furacao', url: '/solucoes/furacao' },
  { name: 'promocoes', url: '/promocoes' },
  { name: 'contato', url: '/contato' },
  { name: 'politica-de-privacidade', url: '/politica-de-privacidade' },
];

const manifest = [];
for (let i = 0; i < routes.length; i += 1) {
  const route = routes[i];
  await page.goto(`${baseUrl}${route.url}`, { waitUntil: 'networkidle' });
  const fileName = `${String(i + 1).padStart(2, '0')}-${route.name}.png`;
  await page.screenshot({ path: path.join(outDir, fileName), fullPage: true });
  manifest.push({ route: route.url, fileName, title: await page.title() });
}

await browser.close();
console.log(JSON.stringify({ outDir, count: manifest.length, manifest }, null, 2));
