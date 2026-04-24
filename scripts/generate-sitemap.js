import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://www.recommetalduro.com.br';

const routes = [
  '/',
  '/a-recom',
  '/fornecedores-catalogos',
  '/fornecedores-catalogos/mitsubishi-materials',
  '/fornecedores-catalogos/7leaders',
  '/fornecedores-catalogos/bt-fixo',
  '/fornecedores-catalogos/kifix',
  '/solucoes',
  '/solucoes/torneamento',
  '/solucoes/fresamento',
  '/solucoes/furacao',
  '/promocoes',
  '/contato',
  '/politica-de-privacidade'
];

function generateSitemap() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
    <url>
      <loc>${SITE_URL}${route}</loc>
      <changefreq>${route === '/' || route === '/promocoes' ? 'weekly' : 'monthly'}</changefreq>
      <priority>${route === '/' ? '1.0' : route.startsWith('/solucoes') || route.startsWith('/fornecedores') ? '0.8' : '0.6'}</priority>
    </url>`
    )
    .join('')}
</urlset>
  `;

  const publicPath = path.resolve('public');
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath);
  }

  fs.writeFileSync(path.resolve(publicPath, 'sitemap.xml'), sitemap.trim());
  console.log('Sitemap gerado com sucesso!');
}

generateSitemap();
