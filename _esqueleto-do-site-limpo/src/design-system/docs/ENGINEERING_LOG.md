# 🛠️ Cronograma de Engenharia de Interface - RECOM

Este documento registra o avanço da transformação do wireframe em um protótipo funcional, modular e escalável.

---

## 📊 Status Geral
- [x] **Rodada 1: Limpeza Estrutural** (CSS Refactor) - `100%`
- [x] **Rodada 2: Contrato de Componentes** - `100%`
- [x] **Rodada 3: Estrutura de Dados (JSON)** - `100%`
- [x] **Rodada 4: Conversão e Formulários** - `100%`
- [x] **Rodada 5: SEO Técnico** - `100%`
- [x] **Rodada 6: Acessibilidade e Mobile** - `100%`
- [x] **Rodada 7: Segurança e Publicação** - `100%`
- [x] **Rodada 8: QA Final do Wireframe** - `100%`
- [x] **Rodada 9: Fix e Organização Visual (Consistência)** - `100%`
- [x] **Rodada 10: Centralização Arquitetural e Declutter** - `100%`

---

## 🚀 Detalhamento dos Batches

### [x] Rodada 10: Centralização Arquitetural e Declutter
- [x] Criar estrutura `/src/design-system/` (Tokens, Hooks, Contracts, Schemas)
- [x] Unificar todos os tokens de design (Spacing, Typography, Radius, Colors)
- [x] Implementar taxonomia de Hooks centralizada (`site-hooks.js`)
- [x] Definir contratos de SEO e Navegação em arquivos JS únicos
- [x] Criar ponto de entrada único (`design-system/index.js`) carregado como módulo
- [x] Migrar lógica de formulários para `/lib/forms.js`
- [x] **Declutter**: Remover arquivos obsoletos (`js/contato.js`, `js/form-handler.js`, `DESIGN_HOOKS.md`)
- [x] **Consolidação**: Migrar toda documentação técnica para `/src/design-system/docs/`

### [x] Rodada 1: Limpeza Estrutural
- [x] Criar `/css/tokens.css` (Contratos de medidas e escalas)
- [x] Criar `/css/layout.css` (Grids, containers, stacks)
- [x] Criar `/css/components.css` (Cards, CTAs, Breadcrumbs)
- [x] Criar `/css/states.css` (Hover, focus, loading, erro)
- [x] Remover estilos inline do `index.html`
- [x] Remover estilos inline do `contato.html`
- [x] Remover estilos inline de `fornecedores.html` e `processos.html`
- [x] Remover estilos inline das subpáginas

### [x] Rodada 2: Contrato de Componentes
- [x] Criar `components/COMPONENT_CONTRACT.md`
- [x] Padronizar atributos `data-component` e `data-hook` em todo o site
- [x] Implementar estados visuais (hover, active) nos cards
- [x] Criar fallbacks para dados ausentes (ex: catálogo indisponível)

### [x] Rodada 3: Estrutura de Dados
- [x] Criar pasta `/data`
- [x] Criar `suppliers.json`, `processes.json`, `promotions.json`
- [x] Criar `navigation.json`, `contact.json`, `seo.json`
- [x] Centralizar informações recorrentes para evitar duplicação manual

### [x] Rodada 4: Conversão e Formulários
- [x] Refatorar campos do formulário (Labels permanentes)
- [x] Implementar Microcopy de erro/sucesso contextual
- [x] Criar estados: `Enviando`, `Sucesso`, `Falha`
- [x] Adicionar fallbacks visíveis (Tel/WhatsApp) em caso de erro no form

### [x] Rodada 5: SEO Técnico
- [x] Revisar Titles e H1s únicos
- [x] Implementar Meta Descriptions específicas
- [x] Criar `data/seo.json` para referência
- [x] Adicionar Tags Canonicais (Simuladas)

### [x] Rodada 6: Acessibilidade e Mobile
- [x] Ajustar alvos de clique (mínimo 44px)
- [x] Garantir navegação por teclado (focus-visible)
- [x] Implementar utilitários responsivos (`stack-mobile`, `hide-mobile`)
- [x] Garantir equivalência de conteúdo entre desktop e mobile

### [x] Rodada 7: Segurança e Publicação
- [x] Adicionar `rel="noopener noreferrer"` em links externos
- [x] Implementar sanitização básica no formulário de contato
- [x] Garantir que logs não capturem dados sensíveis

### [x] Rodada 8: QA Final
- [x] Executar Checklist de QA por página
- [x] Registrar pendências no `QA_CHECKLIST.md`

### [x] Rodada 9: Fix e Organização Visual (Consistência)
- [x] Implementar padrão `.section-header` em todas as páginas
- [x] Substituir classes obsoletas (`muted`, `small`) por utilitários padronizados (`text-muted`, `text-small`)
- [x] Remover estilos inline remanescentes em subpáginas de processos e fornecedores
- [x] Padronizar espaçamento interno de cards (`p-md`) e containers
- [x] Unificar escala tipográfica (`text-lg`, `text-xl`) para leads e subtítulos
- [x] Padronização de Grids (espaçamento e alinhamento)
- [x] Padronização de Imagens (Canvas flexível, aspect-ratio)
- [x] Limpeza de fundos (remoção de bg-muted em imagens)
- [x] Refatoração de loops (index, fornecedores, processos)
- [x] Refatoração de subpáginas técnicas

---

## 📝 Notas de Manutenção
- Manter o site visualmente "wireframe" (neutro) até o fim deste ciclo.
- Priorizar contratos e regras de negócio sobre estética.

---

## ✅ Conclusão da Fase Estrutural (Wireframe)
- **Correções Atuais:** Extensões e caminhos de imagens corrigidos (Kifix e BT-Fixo).
- **Status:** O wireframe vanilla (HTML/JS/CSS) atingiu o nível máximo de maturidade arquitetural (Design System Contract Layer). A estrutura está modular, segura, responsiva e pronta para adoção em um framework definitivo (como Next.js) ou integração em um CMS sem perda de previsibilidade.
