# RECOM Staging QA Checklist

Data: 2026-04-28

Use este checklist antes de considerar producao. Marque com evidencia, nao por intuicao.

## Build

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] Sem warnings novos relevantes em lint/build.

## Supabase local

- [x] Docker em execucao.
- [x] `supabase start` ou stack local ativa. Validado por `supabase status` em 2026-04-28 antes do Docker ser parado.
- [x] `supabase migration up --local`. Retornou "Local database is up to date" em 2026-04-28.
- [x] Aplicar `supabase/migrations/20260428000005_seed_editorial_cms_pages.sql`. Aplicada em 2026-04-28; validacao anon confirmou paginas publicadas e secoes visiveis.
- [x] Aplicar `supabase/migrations/20260428000006_visual_media_presets.sql`. Aplicada em 2026-04-28; validacao anon confirmou presets e imagens em blocos CMS.
- [x] Aplicar `supabase/migrations/20260429000008_lead_files_private_storage.sql`. Aplicada em 2026-04-28; smoke validou bucket privado `lead-files`, signed URL funcional e URL publica sem acesso.
- [x] Aplicar `supabase/migrations/20260429003000_lead_public_insert_policy.sql`. Aplicada em 2026-04-28; smoke validou insert anon sem retorno publico.
- [x] `supabase db reset` com seed aplicavel. Administrador dev@recom.local (ID 0...1) agora persistente via seed.sql.
- [x] Tipos coerentes com migrations atuais. `npm run db:types` pendente por permissao Docker, mas `database.types.ts` foi reconciliado para `site_settings`, `admin_configs` e `sales_reps`.
- [x] RLS habilitada nas tabelas publicas. Validado: `admin_configs` agora tem RLS via migracao hardening.
- [x] Anon le apenas conteudo publicado/ativo. Validado via `check_db.ts`.
- [x] Anon cria lead. Validado via `scratch/staging_qa_http.mjs`; insert sem `.select()` funciona e service localizou o registro criado.
- [x] Anon nao le leads, audit log, revisoes ou drafts. Validado via `check_db.ts`.
- [x] Authenticated/editor/admin/comercial respeitam roles esperadas. Smoke criou usuarios temporarios por role: admin le lead, editor nao le leads, comercial le/atualiza leads e comercial nao cria paginas.
- [x] Storage publico serve apenas assets aprovados. Smoke validou bucket `media` publico.
- [x] Storage privado protege anexos de leads com signed URL. Smoke validou bucket `lead-files` privado, signed URL 200 e URL publica 400.

## Publico

- [x] Home renderiza CMS publicado quando existe.
- [x] Home fallback nao aparece se CMS publicado estiver valido.
- [x] A RECOM em `/a-recom` tem H1 unico, breadcrumbs e CTA.
- [x] `/sobre` tem politica definida: redirect permanente para `/a-recom`.
- [x] Fornecedores hub em `/fornecedores-catalogos`.
- [x] `/fornecedores` tem politica definida: redirect permanente para `/fornecedores-catalogos`.
- [x] Fornecedor individual publicado aparece em `/fornecedores-catalogos/[slug]`. Smoke validou `/fornecedores-catalogos/mitsubishi` com status 200.
- [x] Fornecedor draft/archived nao aparece no publico. Validado via limpeza de seed estatico em GridSection e enforcement de RLS (status=active/published).
- [x] Solucoes hub em `/solucoes`.
- [x] `/processos` tem politica definida: redirect permanente para `/solucoes`.
- [x] Processo individual publicado aparece em `/solucoes/[slug]`. Smoke validou `/solucoes/torneamento` com status 200.
- [x] Processo draft/archived nao aparece no publico. Smoke criou processo draft temporario e anon nao leu.
- [x] Promocoes mostram apenas ativas/publicaveis. Smoke validou lista anon sem vencidas.
- [x] Promocao vencida nao aparece como ativa. Smoke criou promocao ativa vencida temporaria e anon nao leu.
- [x] Contato tem pagina propria, canais diretos e formulario.
- [x] 404 oferece links para Inicio, Fornecedores, Solucoes e Contato. Smoke validou links; status HTTP observado no dev server foi 200 e ainda precisa confirmacao SEO/staging.

## Admin

- [ ] Dashboard mostra pendencias reais.
- [ ] Paginas listam status, rota, SEO e ultima edicao.
- [x] Editor de pagina permite escolher experiencia governada de UI/UX via presets, sem layout livre.
- [ ] Editor de blocos nao permite layout livre.
- [ ] Editor mostra loading, saving, saved, dirty, validation_error e publish_blocked.
- [ ] Preview responsivo nao vaza publicamente sem permissao. Helper aplicado; falta smoke com sessao real e anonima.
- [ ] Publicacao bloqueia pagina sem blocos minimos.
- [ ] Fornecedores: listagem, editor, catalogo, processos, SEO, publicacao, preview.
- [ ] Processos: listagem, editor, fornecedores, FAQ, SEO, publicacao, preview.
- [ ] Promocoes: status, vencimento, fornecedor, CTA, termos, SEO, preview.
- [ ] Leads: listagem, filtros, drawer, eventos, notas, prioridade, responsavel.
- [x] Configuracoes alimentam header, footer, contato e SEO fallback. Validado via `SettingsForm` e sincronizacao entre `admin_configs` e `site_settings`.
- [ ] Audit log registra publicar, arquivar, editar entidades e leads.

## Fluxos

- [ ] Criar fornecedor draft.
- [ ] Preencher campos minimos.
- [ ] Validar checklist de publicacao.
- [ ] Gerar preview.
- [ ] Publicar fornecedor.
- [ ] Confirmar aparicao no publico.
- [ ] Arquivar fornecedor.
- [ ] Confirmar remocao do publico.
- [ ] Criar processo e relacionar fornecedor.
- [ ] Criar promocao ativa com validade.
- [ ] Enviar lead via contato com dados validos.
- [ ] Lead aparece no admin.
- [ ] Mudar status do lead.
- [ ] Registrar nota/evento do lead.
- [ ] Testar erro de formulario e preservacao dos campos.

## Acessibilidade

- [ ] Menu mobile por teclado.
- [ ] Foco visivel em links, botoes, cards e formulario.
- [ ] Labels em todos os campos.
- [ ] `aria-describedby` para ajuda e erro.
- [ ] ErrorSummary no topo do formulario quando houver multiplos erros.
- [ ] Drawers prendem foco e fecham com Escape.
- [ ] Badges nao dependem apenas de cor.
- [ ] Links externos tem texto previsivel.
- [ ] Cards nao dependem apenas de hover.
- [ ] Hierarquia de headings correta.
- [ ] Skip link se a base do layout permitir.

## SEO

- [ ] Title unico por pagina.
- [ ] H1 unico por pagina.
- [ ] Meta description.
- [ ] Canonical.
- [ ] Open Graph.
- [ ] Admin, preview, draft, scheduled e archived nao indexam.
- [ ] Sitemap inclui apenas paginas publicadas e entidades publicadas.
- [ ] Robots bloqueia admin/preview.
- [ ] BreadcrumbList quando aplicavel.
- [ ] Links internos rastreaveis com href real.

## Analytics

- [ ] `lead_form_submit`
- [ ] `lead_form_error`
- [ ] `contact_phone_click`
- [ ] `contact_email_click`
- [ ] `whatsapp_click`
- [ ] `supplier_card_click`
- [ ] `supplier_detail_click`
- [ ] `supplier_catalog_click`
- [ ] `supplier_catalog_unavailable_click`
- [ ] `process_card_click`
- [ ] `process_supplier_click`
- [ ] `promotion_click`
- [ ] `promotion_contact_click`
- [ ] `external_link_click`
- [ ] `file_download`

## Evidencias obrigatorias

- [x] Log do build. `npm run lint`, `npm run typecheck` e `npm run build` passaram em 2026-04-28.
- [x] Log de migrations. `npx supabase migration up --local --include-all` aplicou `20260429000008`; `npx supabase migration up --local` aplicou `20260429003000`.
- [x] Resultado de testes RLS. Validado via scratch/test_anon_rls.ts: status filtering funciona como esperado.
- [ ] Screenshots desktop/mobile das paginas publicas.
- [ ] Screenshots do editor admin.
- [x] Lead real criado em ambiente local/staging. Smoke criou lead temporario via anon e removeu no cleanup apos validar leitura por admin/comercial.
- [ ] Registro de audit log para publicacao.

## Evidencia adicional em 2026-04-28

- `node scratch/staging_qa_http.mjs`: 25 checks passaram.
- `npm run lint`: passou.
- `npm run typecheck`: passou.
- `npm run build`: passou; Next compilou 27 rotas.
- `npm run db:types`: bloqueado por permissao Docker no pipe `docker_engine`; tipos foram reconciliados manualmente nos pontos afetados.
- Risco pendente: rota inexistente renderizou tela de recuperacao com links corretos, mas respondeu `200` no smoke local. Validar em staging se precisa status `404` real.
