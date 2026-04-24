import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourcePath = path.join(__dirname, '..', 'src', 'data', 'fornecedores.js');
const source = fs.readFileSync(sourcePath, 'utf8');

const blocks = [...source.matchAll(/\{\s*id:\s*'([^']+)'[\s\S]*?\n\s*\},/g)];

const getField = (block, field) => {
  const pattern = new RegExp(`${field}:\\s*'([^']*)'`, 'm');
  const match = block.match(pattern);
  return match ? match[1] : '';
};

const getArrayField = (block, field) => {
  const pattern = new RegExp(`${field}:\\s*\\[([\\s\\S]*?)\\]`, 'm');
  const match = block.match(pattern);
  return match ? match[1] : '';
};

const getUrlIssues = (url) => {
  if (!url || !url.trim()) return ['empty'];
  if (url.trim() === '#') return ['hash'];
  if (/^javascript:/i.test(url.trim())) return ['javascript'];
  return [];
};

const report = blocks.map(([blockText, id]) => {
  const nome = getField(blockText, 'nome');
  const slug = getField(blockText, 'slug');
  const descricao = getField(blockText, 'descricao');
  const catalogoUrl = getField(blockText, 'catalogoUrl');
  const linkInstitucional = getField(blockText, 'linkInstitucional');
  const status = getField(blockText, 'status');
  const observacoes = getField(blockText, 'observacoes');
  const catalogosRaw = getArrayField(blockText, 'catalogos');
  const catalogoUrls = [...catalogosRaw.matchAll(/url:\s*'([^']*)'/g)].map(([, url]) => url);
  const issues = [];
  const warnings = [];

  if (!descricao.trim()) issues.push('missing_description');
  if (!catalogoUrl.trim() && catalogoUrls.length === 0) issues.push('missing_catalog');
  if (!status.trim()) issues.push('missing_status');
  if (!observacoes.trim()) issues.push('missing_observations');

  for (const urlIssue of getUrlIssues(catalogoUrl)) {
    issues.push(`invalid_catalog_url:${urlIssue}`);
  }

  for (const urlIssue of getUrlIssues(linkInstitucional)) {
    issues.push(`invalid_institutional_url:${urlIssue}`);
  }

  catalogoUrls.forEach((url, index) => {
    getUrlIssues(url).forEach((issue) => issues.push(`invalid_catalogos[${index}]:${issue}`));
  });

  if (/\?v=/.test(catalogoUrl)) {
    warnings.push('temporary_catalog_url');
  }

  return { id, nome, slug, issues, warnings };
});

const warnings = report.flatMap((item) => item.warnings.map((warning) => ({ id: item.id, issue: warning })));
const failing = report.filter((item) => item.issues.length > 0);

console.log(JSON.stringify({ total: report.length, failing, warnings }, null, 2));

if (failing.length > 0) {
  process.exitCode = 1;
}
