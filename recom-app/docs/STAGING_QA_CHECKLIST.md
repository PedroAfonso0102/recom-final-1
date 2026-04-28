# RECOM Staging QA Checklist

Data: 2026-04-28

Use este checklist antes de considerar producao. Marque com evidencia, nao por intuicao.

## Build

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] Sem warnings novos relevantes em lint/build.

## Supabase local

- [ ] Docker em execucao.
- [x] `supabase start` ou stack local ativa. Validado por `supabase status` em 2026-04-28 antes do Docker ser parado.
- [x] `supabase migration up --local`. Retornou "Local database is up to date" em 2026-04-28.
- [x] Aplicar `supabase/migrations/20260428000005_seed_editorial_cms_pages.sql`. Aplicada em 2026-04-28; validacao anon confirmou paginas publicadas e secoes visiveis.
- [x] Aplicar `supabase/migrations/20260428000006_visual_media_presets.sql`. Aplicada em 2026-04-28; validacao anon confirmou presets e imagens em blocos CMS.
- [ ] `supabase db reset` com seed aplicavel.
- [ ] Tipos regenerados com `npm run db:types`.
- [ ] RLS habilitada nas tabelas publicas. Consulta SQL pendente porque Docker foi parado.
- [ ] Anon le apenas conteudo publicado/ativo.
- [ ] Anon cria lead.
- [ ] Anon nao le leads, audit log, revisoes ou drafts.
- [ ] Authenticated/editor/admin/comercial respeitam roles esperadas.
- [ ] Storage publico serve apenas assets aprovados.
- [ ] Storage privado protege anexos de leads com signed URL.

## Publico

- [ ] Home renderiza CMS publicado quando existe.
- [ ] Home fallback nao aparece se CMS publicado estiver valido.
- [ ] A RECOM em `/a-recom` tem H1 unico, breadcrumbs e CTA.
- [x] `/sobre` tem politica definida: redirect permanente para `/a-recom`.
- [ ] Fornecedores hub em `/fornecedores-catalogos`.
- [x] `/fornecedores` tem politica definida: redirect permanente para `/fornecedores-catalogos`.
- [ ] Fornecedor individual publicado aparece em `/fornecedores-catalogos/[slug]`.
- [ ] Fornecedor draft/archived nao aparece no publico.
- [ ] Solucoes hub em `/solucoes`.
- [x] `/processos` tem politica definida: redirect permanente para `/solucoes`.
- [ ] Processo individual publicado aparece em `/solucoes/[slug]`.
- [ ] Processo draft/archived nao aparece no publico.
- [ ] Promocoes mostram apenas ativas/publicaveis.
- [ ] Promocao vencida nao aparece como ativa.
- [x] Contato tem pagina propria, canais diretos e formulario.
- [ ] 404 oferece links para Inicio, Fornecedores, Solucoes e Contato.

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
- [ ] Configuracoes alimentam header, footer, contato e SEO fallback.
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

- [ ] Log do build.
- [ ] Log de migrations.
- [ ] Resultado de testes RLS.
- [ ] Screenshots desktop/mobile das paginas publicas.
- [ ] Screenshots do editor admin.
- [ ] Lead real criado em ambiente local/staging.
- [ ] Registro de audit log para publicacao.
