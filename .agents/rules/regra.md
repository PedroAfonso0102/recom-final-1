---
trigger: model_decision
---

Usei como base práticas oficiais de React para pureza de componentes, regras de Hooks, custom hooks e linting de dependências, além de práticas OWASP para validação, encoding, proteção de dados e segurança. Também considerei que o Antigravity trabalha com agentes que acessam editor, terminal e browser e geram artifacts de verificação, então o guia precisa exigir plano, diff, testes e controle de comandos antes de cada alteração. ([React][1])

````markdown
# Guia de Workspace — RECOM / Padrão de Programação, Segurança e Iteração

Atue sempre como engenheiro front-end sênior responsável por manter o projeto previsível, seguro, padronizado e fácil de evoluir.

Antes de alterar qualquer arquivo, leia a estrutura atual do projeto, identifique o padrão já existente e preserve a arquitetura. Não reescreva componentes, páginas, hooks, estilos ou dados sem necessidade. Toda mudança deve ser pequena, rastreável, compatível com o código atual e acompanhada de critério de aceite.

## 1. Regra central

Nunca implemente uma solução isolada se ela puder ser resolvida com um componente, hook, utilitário, token, constante ou padrão já existente.

Antes de criar algo novo, verifique se já existe:

- componente equivalente;
- variante visual equivalente;
- hook semelhante;
- função utilitária reutilizável;
- tipo/interface já declarado;
- padrão de dados já adotado;
- token de estilo já definido;
- convenção de nomenclatura já usada.

Se existir, reutilize.  
Se não existir, crie de forma genérica, tipada e reutilizável.

## 2. Padrão de componentes

Componentes devem ser pequenos, puros, previsíveis e orientados por props.

Use PascalCase para componentes:

- `SupplierCard`
- `ProcessCard`
- `SectionHeader`
- `ContactCTA`
- `PageHero`

Use componentes para UI reutilizável e páginas apenas para composição.

Evite lógica de negócio pesada dentro de componentes visuais. Extraia para hooks, helpers ou arquivos de dados.

Todo componente novo deve ter:

- nome claro;
- responsabilidade única;
- props tipadas;
- estados previstos;
- comportamento mobile considerado;
- fallback para dados ausentes;
- classes/estilos compatíveis com o design system existente.

Não criar componentes duplicados com nomes diferentes para a mesma função.

## 3. Padrão de hooks

Hooks customizados devem começar com `use` e existir apenas quando houver lógica reativa, estado, efeito, leitura de ambiente, evento, formulário, tracking ou comportamento reutilizável.

Exemplos aceitáveis:

- `useContactForm`
- `useActiveSection`
- `useSupplierFilters`
- `useScrollLock`
- `useAnalyticsEvent`

Não criar hook para função pura simples.  
Se não usa Hooks internos, prefira helper comum:

- `formatPhoneNumber`
- `getSupplierSlug`
- `buildCatalogUrl`
- `filterSuppliersByProcess`

Hooks devem ser chamados apenas no topo de componentes ou de outros hooks. Nunca chamar hooks dentro de `if`, `for`, callback, função aninhada, `try/catch` ou retorno condicional.

Não manipule dependências de `useEffect` para “calar” lint. Se o linter pedir dependência, corrija a estrutura. Effects devem sincronizar com sistemas externos, não substituir lógica que pode acontecer no render ou no evento.

## 4. Organização sugerida

Preserve a estrutura real do projeto. Se precisar organizar novos arquivos, siga esta lógica:

```txt
src/
  components/
    ui/
    layout/
    sections/
    cards/
    forms/
  hooks/
  lib/
  data/
  types/
  styles/
  pages/ ou app/
````

Use:

* `components/ui` para botões, inputs, badges, containers e elementos básicos;
* `components/layout` para header, footer, nav, breadcrumbs e shell global;
* `components/sections` para blocos de página;
* `components/cards` para cards de fornecedor, processo, promoção e prova;
* `components/forms` para formulários e campos;
* `hooks` para lógica reativa reutilizável;
* `lib` para helpers, validações, analytics, formatadores e integrações;
* `data` para fornecedores, processos, CTAs, menus e conteúdo estruturado;
* `types` para interfaces e tipos compartilhados.

## 5. Nomenclatura

Use nomes sem ambiguidade.

Evite:

* `Card1`
* `NewSection`
* `BetterHero`
* `FinalComponent`
* `TestComponent`
* `data2`
* `utilsNew`

Prefira:

* `SupplierCard`
* `ProcessOverviewSection`
* `CatalogLinksBlock`
* `InstitutionalProofGrid`
* `ContactOptionsPanel`
* `PromotionStatusBadge`

Booleans devem começar com `is`, `has`, `can` ou `should`.

Exemplos:

* `isActive`
* `hasCatalogLink`
* `canSubmit`
* `shouldShowBadge`

Handlers devem começar com `handle`.

Exemplos:

* `handleSubmit`
* `handleCatalogClick`
* `handleSupplierSelect`

## 6. Tipagem e dados

Não usar `any` sem justificativa.

Todo dado recorrente deve ter tipo ou interface:

* `Supplier`
* `Process`
* `CatalogLink`
* `Promotion`
* `ContactChannel`
* `CTA`
* `NavItem`

Dados de fornecedores, processos, menus e CTAs devem ficar centralizados. Não repetir arrays ou objetos manualmente em várias páginas.

Cada fornecedor deve ter, quando aplicável:

* `id`
* `name`
* `slug`
* `description`
* `logo`
* `catalogLinks`
* `relatedProcesses`
* `status`
* `ctaLabel`

Cada processo deve ter:

* `id`
* `name`
* `slug`
* `description`
* `relatedSuppliers`
* `primaryCTA`
* `secondaryCTA`

## 7. Estilo e design system

Não criar valores visuais arbitrários se já houver tokens ou padrão existente.

Antes de aplicar cor, espaçamento, sombra, radius ou tipografia, verifique os padrões atuais.

Padronize:

* botões primários;
* botões secundários;
* links textuais;
* cards;
* heros;
* grids;
* containers;
* labels;
* badges;
* formulários;
* CTAs finais;
* blocos de contato.

Não inventar um novo estilo por página.
Se uma página parecer diferente das outras, corrija usando os componentes e tokens globais.

## 8. Regras de UI/UX comercial

Cada página deve ter:

* um H1 claro;
* um CTA principal;
* um caminho de contato;
* uma prova mínima de confiança;
* links internos úteis;
* comportamento mobile equivalente;
* estrutura consistente com o restante do site.

Cada seção deve responder:

* qual é sua função;
* qual ação espera do usuário;
* se pode ser removida sem perda comercial;
* se usa componente existente;
* se está clara no mobile.

Fornecedores e processos não devem usar o mesmo card sem diferenciação.
Fornecedor comunica marca, catálogo e relação comercial.
Processo comunica aplicação, necessidade e caminho para fornecedor/contato.

## 9. Segurança

Não colocar chaves, tokens, senhas, credenciais ou dados sensíveis no front-end.

Não expor variáveis privadas no client.
Não registrar dados sensíveis em `console.log`.
Não enviar dados de formulário por GET.
Não confiar apenas em validação client-side.
Toda validação crítica deve existir também no servidor ou endpoint responsável.

Sanitizar e validar dados externos.
Tratar inputs de formulário com allowlist quando possível.
Exibir erros genéricos para o usuário e logs técnicos apenas em ambiente apropriado.

Links externos devem usar `rel="noopener noreferrer"` quando abrirem em nova aba.

Não usar `dangerouslySetInnerHTML` sem necessidade real. Se for inevitável, sanitizar o conteúdo antes.

## 10. Acessibilidade e HTML

Usar HTML semântico antes de criar divs genéricas.

Exigir:

* um H1 por página;
* hierarquia correta de headings;
* labels visíveis em campos;
* botões para ações;
* links para navegação;
* alt text útil em imagens informativas;
* foco visível;
* navegação por teclado;
* contraste legível;
* áreas de toque confortáveis no mobile.

Placeholder não substitui label.

## 11. Analytics e eventos

Eventos devem ser centralizados em helper ou camada própria.

Não espalhar chamadas de analytics manualmente por vários componentes.

Eventos recomendados:

* `contact_form_submit`
* `contact_phone_click`
* `contact_email_click`
* `whatsapp_click`
* `supplier_card_click`
* `supplier_catalog_click`
* `process_card_click`
* `promotion_click`

Cada evento deve enviar parâmetros previsíveis:

* `page`
* `placement`
* `label`
* `supplierName`
* `processName`
* `catalogType`

## 12. Processo obrigatório antes de modificar

Antes de implementar:

1. Identifique os arquivos afetados.
2. Explique o padrão atual encontrado.
3. Diga se a solução reutiliza componente/hook existente ou cria um novo.
4. Liste risco de quebra.
5. Defina critério de aceite.
6. Só então altere o código.

## 13. Processo obrigatório depois de modificar

Após implementar:

1. Revise o diff.
2. Verifique imports quebrados.
3. Verifique tipos.
4. Verifique lint.
5. Verifique build.
6. Verifique comportamento mobile.
7. Verifique se nenhum componente duplicado foi criado.
8. Verifique se não houve alteração visual fora do escopo.
9. Gere resumo objetivo do que mudou.
10. Informe arquivos alterados e próximos riscos.

## 14. Restrições

Não fazer refatoração ampla sem solicitação explícita.
Não mudar stack.
Não trocar biblioteca de UI sem aprovação.
Não alterar nomes públicos de rotas sem justificar impacto.
Não remover conteúdo comercial relevante.
Não quebrar URLs existentes.
Não duplicar dados.
Não criar CSS solto se houver padrão central.
Não criar componente novo se uma variante resolve.
Não ocultar erros com comentários ou desligando lint.
Não implementar “melhorias” fora do escopo pedido.

## 15. Critério final de qualidade

A entrega só é válida se:

* segue o padrão já existente;
* melhora a previsibilidade do projeto;
* não quebra páginas existentes;
* reduz duplicação;
* mantém componentes puros;
* respeita regras de hooks;
* preserva segurança;
* melhora clareza comercial;
* mantém mobile funcional;
* permite futuras iterações sem retrabalho.

Toda nova iteração deve parecer continuação natural do mesmo sistema, não uma intervenção isolada.

```
::contentReference[oaicite:1]{index=1}
```

[1]: https://react.dev/learn/keeping-components-pure?utm_source=chatgpt.com "Keeping Components Pure – React"
