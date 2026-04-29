# Component Contract

## Regras globais

- Navegacao usa `Link` ou `<a href>`, nunca botao sem href.
- Componente publico nao le service role nem importa `createAdminClient`.
- Conteudo publico lista apenas itens publicados/ativos e nao arquivados.
- CTA externo deve indicar que sai do site ou abre catalogo oficial.
- Toda tela termina com proximo passo: contato, fornecedores, solucoes, promocoes ou volta ao inventario.
- Estados obrigatorios: loading, empty, error, disabled, draft, published, scheduled, archived, expired quando aplicavel.
- Cards nao podem depender apenas de hover para revelar informacao essencial.
- Formularios usam label permanente, erro junto ao campo e validacao server-side.

## Componentes publicos

| Componente | Objetivo | Fonte de dados | Estados | Eventos | Aceite |
|---|---|---|---|---|---|
| PublicHeader | Navegacao global e CTA | site_settings/navigation | active, mobile-open | whatsapp_click, contact_phone_click | links reais e estado ativo |
| PublicFooter | Fechamento institucional | site_settings | default | contact_email_click | telefone, email, endereco e links uteis |
| Breadcrumbs | Orientacao interna | rota atual | default | none | aparece em paginas internas |
| HeroSection | Explicar oferta B2B | CMS/fallback seguro | loading, default | cta_click | H1 unico e CTA claro |
| TrustProof | Prova curta de confianca | suppliers/settings | empty, default | supplier_card_click | sem claims nao suportadas |
| SupplierCard | Fornecedor e catalogo oficial | suppliers | catalog-unavailable, published | supplier_card_click, supplier_catalog_click | nao publica card vazio |
| SupplierGrid | Hub de fornecedores | suppliers/processes | loading, empty, no-results | supplier_card_click | filtro leve quando houver dados |
| ProcessCard | Processo/solucao | processes | published | process_card_click | link para pagina individual |
| ProcessGrid | Hub de processos | processes | loading, empty | process_card_click | CTA transversal para contato |
| PromotionCard | Oferta comercial controlada | promotions | active, expired | promotion_click | expirada nao parece ativa |
| CTASection | Proximo passo | page/CMS/settings | default | cta_click | anchor text especifico |
| ContactMethods | Canais diretos | site_settings | default | phone/email/whatsapp | visivel em erro de formulario |
| LeadForm | Captura de lead | leadSchema/server action | idle, invalid, submitting, success, error | generate_lead_form_submit, form_error | preserva dados em erro |
| ExternalCatalogLink | Saida para catalogo oficial | supplier.catalogUrl | available, unavailable | supplier_catalog_click | rotulo explicito |
| EmptyState | Ausencia contextual | caller | empty | none | tem proximo passo |
| ErrorState | Falha recuperavel | caller | error | form_error quando formulario | explica alternativa |
| NotFoundRecovery | Recuperar usuario | routes/settings | not-found | none | links para hubs e contato |

## Componentes admin

| Componente | Objetivo | Fonte de dados | Estados | Permissoes | Aceite |
|---|---|---|---|---|---|
| AdminShell | Organizar admin | auth/nav | active, mobile | authenticated | grupos claros |
| AdminSidebar | Navegacao admin | nav config | active | authenticated | sem icones ambiguos |
| AdminHeader | Status compacto | auth/system | online, permission | authenticated | nao ocupa area de trabalho |
| DataTable | Inventario primeiro | server queries | loading, empty, error, no-results | role-based | status visivel |
| StatusBadge | Estado textual | entity.status | draft, published, scheduled, archived | all | nao depende so de cor |
| PublishStatus | Estado publicacao | CMS | draft, published, scheduled, archived | editor/admin | bloqueios explicitos |
| SaveBar | Edicao segura | form state | unsaved, saving, saved, error | editor/admin | salvar rascunho e publicar |
| PreviewPanel | Preview responsivo | public preview | desktop, tablet, mobile | editor/admin | nao fica espremido |
| EntityEditor | Editor agrupado | schemas/actions | invalid, saving, saved | editor/admin | secoes por responsabilidade |
| SeoEditor | SEO controlado | schemas/actions | complete, missing | editor/admin | fallback explicito |
| MediaPicker | Escolha de asset | media_assets | loading, empty | editor/admin | nao cola URL sem contexto quando asset existe |
| ActivityLog | Auditoria | activity_log/audit_logs | empty, default | admin/owner | mostra ator, acao e data |
| LeadDrawer | Atendimento comercial | leads/lead_events | open, saving, error | comercial/admin | responder em ate dois cliques |

## Criterios gerais de aceite

- Uma pessoa nao tecnica edita a Home vendo apenas um bloco aberto por vez.
- Um lead pode ser respondido em ate dois cliques.
- Fornecedor sem catalogo/SEO aparece na lista.
- Nenhuma acao critica depende apenas de icone.
- Nenhuma pagina publica importante termina sem CTA ou link de recuperacao.
