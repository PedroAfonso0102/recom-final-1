# RECOM Frontend Audit

Atualizado em 2026-04-28.

## Stack e convencoes encontradas

- Next.js App Router, React 19, TypeScript, Tailwind/shadcn/ui, Supabase.
- Leituras publicas concentradas em `src/lib/services/supabase-data.ts` e `src/cms/queries.ts`.
- Mutacoes de CMS/admin em `src/server/actions/*`.
- Vitrine publica em `src/app/(public)`.
- Admin em `src/app/(admin)/admin`.
- Design system parcialmente criado em `src/design-system`, com tokens TS e alguns contratos JS.

## Paginas publicas existentes

- `/`: Home, tenta renderizar CMS `home`; fallback hardcoded com fornecedores, processos e promocoes.
- `/fornecedores`: hub de fornecedores e catalogos.
- `/fornecedores/[slug]`: detalhe de fornecedor.
- `/processos`: hub de solucoes/processos.
- `/processos/[slug]`: detalhe de processo.
- `/promocoes`: promocoes.
- `/sobre`: institucional + contato.
- `/[...slug]`: renderizacao dinamica de paginas CMS publicadas.
- `not-found.tsx`: 404 global.

## Rotas publicas alvo ainda nao nativas

- `/a-recom`: deve apontar para institucional.
- `/fornecedores-catalogos`: deve apontar para hub de fornecedores.
- `/fornecedores-catalogos/[slug]`: deve apontar para detalhe de fornecedor.
- `/solucoes`: deve apontar para hub de processos.
- `/solucoes/[slug]`: deve apontar para detalhe de processo.
- `/contato`: deve apontar para contato/orcamento.

## Paginas admin existentes

- `/admin`: painel operacional.
- `/admin/leads`: pipeline comercial com drawer.
- `/admin/fornecedores`, `/novo`, `/[slug]/editar`.
- `/admin/processos`, `/novo`, `/[slug]/editar`.
- `/admin/promocoes`, `/novo`, `/[slug]/editar`.
- `/admin/pages`, `/new`, `/[id]`, `/[id]/sections`.
- `/admin/media`, `/admin/audit`, `/admin/configuracoes`, `/admin/preview/[...slug]`.

## Componentes publicos

- `Header`, `Footer`, `MainNavigation`, `ContactForm`, `WhatsAppFAB`, `HeroCarousel`.
- Design-system publico: `SupplierCard`, `ProcessCard`, `PromotionCard`, `CTASection`, `Breadcrumb`, `EmptyState`, `ErrorState`, `RecomButton`, `RecomSection`, `RecomHero`.

## Componentes admin

- `AdminShell`, `admin-kit` com `DataTable`, `StatusBadge`, `SaveBar`, `PreviewPanel`, `EntityDrawer`.
- Form builders: `SupplierForm`, `ProcessForm`, `PromotionForm`.
- CMS: `page-editor`, `page-form`, `section-form`, `publish-page-button`, `revision-history`.
- Leads: `LeadsManager`.

## Dados hardcoded observados

- Home fallback possui textos institucionais e cards de processos fixos.
- Sobre fallback possui narrativa institucional, diferenciais e imagem fixa.
- Contato usa `siteConfig` como fallback de telefone, email, endereco e WhatsApp.
- Fornecedores possuem excecao visual para Mitsubishi em alguns pontos.
- Alguns labels/CTAs usam rotas antigas (`/sobre#contato`, `/fornecedores`, `/processos`).
- `getSiteSettings` le de `admin_configs` em vez de tabela `site_settings` dedicada.

## CTAs atuais

- Solicitar orcamento, Ver fornecedores, Explorar catalogos, Ver ferramentas por processo, Solicitar visita comercial.
- Fornecedor: Solicitar cotacao, Acessar catalogo oficial, Voltar para fornecedores.
- Processo: Solicitar orcamento, Falar com a RECOM, Ver fornecedores.
- Promocoes: Quero receber avisos.
- Contato: Enviar solicitacao, Ligar, WhatsApp, E-mail.

## Links externos

- Catalogos oficiais de fornecedores (`catalogUrl`, `eCatalogUrl`, `catalogs[]`).
- WhatsApp (`wa.me`), telefone (`tel:`), email (`mailto:`), LinkedIn em settings.
- Google Maps previsto em settings, ainda nao normalizado como fonte dedicada.

## Paginas sem proximo passo claro

- Dynamic CMS pages dependem dos blocos publicados; se uma pagina for composta sem CTA, o fallback global nao garante proximo passo.
- 404 deve oferecer recuperacao clara para fornecedores, solucoes e contato.

## Campos duplicados ou divergentes

- `supplier.relatedProcesses` guarda relacao como array no registro; arquitetura alvo recomenda `supplier_processes`.
- `lead.process_interest` e `lead.process_id` coexistem.
- `admin_configs.site_settings` cobre papel de `site_settings`.
- `audit_logs` existe; arquitetura alvo pede `activity_log`.
- CMS usa `page_sections`; arquitetura alvo cita `page_blocks`.

## Dados que devem vir do Supabase

- Fornecedores, processos, promocoes, leads, media, paginas CMS.
- Site settings: telefone, WhatsApp, email, endereco, horarios, mapa, SEO default.
- Relacionamentos fornecedor-processo.
- Conteudo editorial recorrente e estados de publicacao.

## Estados ausentes ou incompletos

- Loading: existe em algumas rotas dinamicas, mas nao em todos os hubs.
- Error: existe global, mas hubs publicos usam fallback silencioso.
- Empty: existe design-system e admin, mas cobertura irregular.
- Disabled: formulario cobre submit; CTAs sem catalogo precisam estado mais claro.
- Draft/published/scheduled/archived: CMS cobre draft/published/archived; scheduled foi adicionado por governance migration.
- Expired: promocoes publicas ainda precisam filtrar/marcar vencidas por data alem do status.

## Riscos principais

- Service role nao aparece no client, mas server actions publicas usam admin client para lead; aceitavel no servidor, desde que nunca importado em client.
- Publico depende de `status = active` para suppliers/processes/promotions; arquitetura alvo quer `published` em algumas tabelas. Precisa compatibilidade gradual.
- Rotas novas precisam aliases para nao quebrar as antigas.
- Database types podem ficar defasados ate rodar `supabase gen types`.

## Direcao incremental

1. Consolidar contratos, tokens e taxonomia sem quebrar imports.
2. Criar aliases publicos das novas rotas para os componentes existentes.
3. Normalizar filtros publicos para ocultar draft/archived e promocoes expiradas.
4. Criar migrations compatíveis: `site_settings`, `supplier_processes`, `lead_events`, `lead_files`, `activity_log`.
5. Atualizar docs de QA e eventos.
