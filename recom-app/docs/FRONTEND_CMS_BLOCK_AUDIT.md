# RECOM Frontend + CMS Block Audit

Data: 2026-04-28

## Escopo lido

- App Next.js em `recom-app`.
- Rotas publicas em `src/app/(public)`.
- Rotas admin em `src/app/(admin)/admin`.
- CMS proprio em `src/cms`, com `pages`, `page_sections`, `page_versions` e `cms_revisions`.
- Dados comerciais em Supabase: `suppliers`, `processes`, `promotions`, `leads`, `site_settings`, `supplier_processes`, `media_assets`.
- Design system existente em `src/design-system`.

## Mapa de paginas publicas

| Pagina | Rota atual | Origem principal | Observacoes |
| --- | --- | --- | --- |
| Home | `/` | `getHomePage()` + fallback hardcoded + suppliers/promotions | Ja tenta CMS primeiro, mas fallback ainda tem muitos blocos fixos. |
| A RECOM | `/a-recom` | reexporta `sobre` | Rota correta existe, mas conteudo real fica em `sobre`. |
| Sobre legado | `/sobre` | redirect permanente para `/a-recom` via `next.config.ts` | Canonizado no batch de consolidacao; arquivo legado fica como base da rota reexportada por `/a-recom`. |
| Fornecedores hub | `/fornecedores-catalogos` | reexporta `fornecedores` | Rota desejada existe. |
| Fornecedores legado | `/fornecedores` | redirect permanente para `/fornecedores-catalogos` | Canonizado no batch de consolidacao. |
| Fornecedor detalhe | `/fornecedores-catalogos/[slug]` e `/fornecedores/[slug]` | Supabase | Precisa garantir relacao via `supplier_processes` em vez de apenas arrays. |
| Solucoes hub | `/solucoes` | reexporta `processos` | Rota desejada existe. |
| Processos legado | `/processos` | redirect permanente para `/solucoes` | Canonizado no batch de consolidacao. |
| Processo detalhe | `/solucoes/[slug]` e `/processos/[slug]` | Supabase | Deve consolidar rota canonica em `/solucoes/[slug]`. |
| Promocoes | `/promocoes` | `getPageBySlug("promocoes")` + Supabase | Ja filtra ativos na query, mas copy/CTA ainda estao fixos no fallback. |
| Contato | `/contato` | `getPageBySlug("contato")` + `site_settings` + suppliers/processes + formulario | Batch 2026-04-28: deixou de reexportar `sobre`; agora tem jornada propria de contato/orcamento. |
| 404 | `src/app/not-found.tsx` | hardcoded | Tem recuperacao basica; precisa entrar em CMS/settings sem perder links fixos. |
| Catch-all CMS | `/[...slug]` | `getPageBySlug(path)` | Preview via query `?preview=true`; precisa evitar vazamento e exigir permissao. |

## Mapa de blocos por pagina

| Pagina | Blocos atuais | Contrato alvo |
| --- | --- | --- |
| Home | `RenderPage` se CMS existe; fallback com `RecomHero`, marcas, trust, promocoes, processos, CTA | `hero`, `trust_proof`, `supplier_preview`, `process_preview`, `editorial_text`, `promotion_preview`, `contact_cta` |
| A RECOM | fallback institucional dentro de `sobre` + contato | `hero`, `editorial_text`, `feature_list`, `trust_proof`, `location_block`, `contact_cta` |
| Fornecedores | hero fallback, `SupplierCard`, catalogos rapidos, CTA | `hero`, `supplier_grid`, `catalog_cta`, `contact_cta` |
| Fornecedor detalhe | detail hero/card e CTAs | `supplier_detail_header`, `catalog_cta`, `related_processes`, `editorial_text`, `contact_cta` |
| Solucoes/processos | grid de processos | `hero`, `process_grid`, `related_suppliers`, `contact_cta` |
| Processo detalhe | detail hero, fornecedores relacionados, texto/FAQ se existir | `process_detail_header`, `related_suppliers`, `feature_list`, `faq`, `contact_cta` |
| Promocoes | hero fallback, `PromotionCard`, CTA lista | `hero`, `promotion_grid`, `editorial_text`, `contact_cta` |
| Contato | atualmente pagina `sobre` | `hero`, `contact_methods`, `lead_form`, `location_block` |
| 404 | `ErrorState` | `not_found_recovery` |

## Origem dos dados por bloco

| Bloco | Origem esperada | Estado atual |
| --- | --- | --- |
| Conteudo de pagina | `pages` + `page_sections.props` | Existe como `page_sections`, nao como `page_blocks`; ainda usa tipos genericos (`HeroSection`, `TextSection`). |
| Fornecedores | `suppliers` publicados + `supplier_processes` | Existe query com fallback local; relacao ainda tambem aparece como array `related_processes`. |
| Processos | `processes` publicados + `supplier_processes` | Existe query com fallback local. |
| Promocoes | `promotions` ativas/publicadas | Existe filtro por status e data. |
| Contato/localizacao | `site_settings` | Existe `site_settings` + fallback `admin_configs`/`siteConfig`. |
| Leads | `leads` + `lead_events` | Server Actions existem; precisa smoke end-to-end. |
| Auditoria | `audit_logs`/`activity_log`/`cms_revisions` | Ha bases paralelas; precisa consolidar governanca e leitura no admin. |

## Campos editaveis principais

- Paginas: titulo, slug, route pattern, tipo generico, template key, status, SEO title/description, OG image.
- Secoes CMS: component type, props JSON, sort order, status, visibility, anchor.
- Fornecedores: nome, slug, descricoes, logo, catalog URL, status, sort order, SEO, settings; ainda faltam campos alvo como `catalog_status`, `catalog_label`, `last_reviewed_at` no contrato publico.
- Processos: nome, slug, descricoes, body, imagem, status, sort order, SEO.
- Promocoes: titulo, slug, fornecedor, descricao, imagem, status, inicio/fim, CTA, termos, SEO.
- Settings: company/contact/social/SEO; precisa alimentar header/footer/contato sem duplicacao.

## Componentes usados

- Publicos: `RecomHero`, `RecomSection`, `CTASection`, `SupplierCard`, `ProcessCard`, `PromotionCard`, `Breadcrumb`, `EmptyState`, `ErrorState`, `ContactForm`, `Header`, `Footer`.
- CMS: `RenderPage`, `RenderSection`, `componentRegistry`, `page-editor`, `section-form`, `publish-page-button`, `revision-history`.
- Admin: `AdminShell`, forms de suppliers/processes/promotions, managers de leads/media.

## Gaps encontrados

1. `page_sections` cumpre papel de blocos, mas o vocabulário ainda e generico e nao expressa os blocos B2B alvo.
2. `cmsPageTypeSchema` ainda aceita apenas `static | dynamic_template | landing`, diferente dos tipos de pagina de negocio.
3. Preview publico por query `?preview=true` agora passa por `resolveCmsPreviewRequest`; anônimo cai para conteudo publicado e apenas `admin`/`editor` usam leitura admin.
4. `contato` ja nao reexporta `sobre`; `/a-recom` agora fica institucional e termina com CTA para contato.
6. Home ainda contem fallback hardcoded extenso e `HeroCarousel`, contrariando a meta de blocos estruturados simples.
7. Eventos existiam em `design-system/hooks`, mas com nomes incompletos e um evento antigo `generate_lead_form_submit`.
8. Links de contato e e-mail ainda aparecem fixos em alguns blocos, por exemplo `mailto:contato@recom.com.br`, em vez de `site_settings`.
9. RLS existe em migrations recentes, mas Docker/Supabase local, seeds, storage e policies ainda nao foram validados nesta sessao.
10. Dados fallback locais em `supabase-data.ts` sao uteis para staging, mas podem mascarar falta de dados vivos.

## Prioridade de correcao

| Prioridade | Correcao | Motivo |
| --- | --- | --- |
| P0 | Validar Supabase local, migrations, seeds e RLS | Sem isso, nao ha garantia de fonte unica de verdade. |
| P0 | Validar preview com sessao real e bloquear compartilhamento anonimo | Helper aplicado; falta smoke com auth real. |
| P0 | Converter contato duplicado em `/sobre` para CTA institucional | Concluido no batch de consolidacao. |
| P1 | Mapear `page_sections` para contratos de blocos de negocio | Permite CMS seguro sem page builder livre. |
| P1 | Consolidar page types e regras de publicacao | Bloqueia publicacao incompleta. |
| P1 | Remover duplicacao de rotas ou definir redirects/canonicals | Melhora SEO e reduz manutencao. |
| P1 | Trocar dados hardcoded recorrentes por `site_settings` | Evita divergencia de telefone, e-mail e endereco. |
| P2 | Refinar estados vazios/loading/erro em todos os grids | Melhora robustez publica/admin. |
| P2 | Amarrar eventos em todos os CTAs/catalogos/formularios | Viabiliza leitura comercial. |
| P2 | Criar smoke visual/mobile e acessibilidade com Playwright | Fecha criterio de staging. |

## Artefatos adicionados neste batch

- `src/design-system/contracts/page-blocks.ts`: contrato canonico dos 21 blocos e 10 tipos de pagina.
- `src/design-system/events/analytics-events.ts`: registry canonico de eventos e parametros.
- Testes TypeScript de contrato em `src/design-system/contracts/page-blocks.test.ts` e `src/design-system/events/analytics-events.test.ts`.

## Progresso do batch seguinte

- `src/cms/preview.ts`: helper testavel para autorizar preview apenas para `admin` e `editor`.
- `src/app/(public)/[...slug]/page.tsx`: preview publico usa o helper e marca preview autorizado como `noindex`.
- `src/app/(admin)/admin/preview/[...slug]/page.tsx`: exige `requireAdmin()` antes de renderizar preview admin.
- `src/app/(public)/contato/page.tsx`: rota propria de Contato / Orcamento com canais diretos, formulario e contexto de fornecedores/processos.
- `src/components/public/ContactForm.tsx`: canais do formulario podem vir de `site_settings`.

## Progresso do batch de consolidacao

- `next.config.ts`: redirects permanentes para `/sobre -> /a-recom`, `/fornecedores -> /fornecedores-catalogos`, `/fornecedores/:slug -> /fornecedores-catalogos/:slug`, `/processos -> /solucoes`, `/processos/:slug -> /solucoes/:slug`.
- `src/app/(public)/sobre/page.tsx`: removeu formulario duplicado e contatos extensos; pagina institucional agora fecha com CTA para `/contato`.
- Supabase local: `supabase status` confirmou API, DB, Studio e Storage rodando enquanto Docker estava ativo; `supabase migration list --local` mostrou todas as 15 migrations aplicadas; `supabase migration up --local` retornou "Local database is up to date".
- RLS comportamental: pendente, porque Docker foi parado antes das consultas SQL de policies e testes como anon/authenticated.
