# Padroes visuais RECOM

Este projeto usa React + Vite, CSS Modules por componente e tokens globais em `src/index.css`.

## Tokens

- Cores de marca e estados ficam em `:root`: `--accent-blue`, `--accent-red`, `--accent-green`, `--accent-caution`.
- Texto usa `--text-primary`, `--text-secondary` e `--text-muted`.
- A escala editorial usa `--text-h1`, `--text-h2`, `--text-h3`, `--text-body-lg`, `--text-body`, `--text-caption` e `--text-overline`.
- Espacamento usa a escala `--space-xs` ate `--space-3xl`.
- Bordas usam `--radius-sm` ate `--radius-2xl`; cards usam `--card-radius`, paineis usam `--panel-radius` e pills usam `--radius-full`.
- Sombras devem preferir `--shadow-xs`, `--shadow-sm`, `--shadow-md` e `--shadow-interactive` em componentes comuns.
- Superficies devem preferir `--surface-editorial`, `--surface-card`, `--surface-subtle` e `--surface-blue-soft`.
- Controles de formulario usam `--control-height-md`, `--control-padding-y`, `--control-padding-x`, `--control-radius`, `--control-focus-shadow` e `--control-error-shadow`.
- Transicoes interativas devem usar `--transition-interactive`.
- Larguras de pagina devem preferir `--container-narrow`, `--container-width` e `--container-wide`.

## Componentes base

- `ActionButton` e export `Button` em `components/ui`: botao/link com variantes `primary`, `secondary`, `ghost`, `link`, `danger`, `contrast`, `contrastSecondary`, `whatsapp` e `tertiary`.
- `Card`: base para cards estaticos ou clicaveis, com `interactive`, `to`, `href`, `variant` e `elevated`.
- `FormField`: label, helper, erro, required e associacao ARIA.
- `Input`, `Textarea`, `Select`: controles visuais padronizados para usar dentro de `FormField`.
- `Notice`: mensagens de informacao, alerta, erro e sucesso.
- `EmptyState`: estado vazio reutilizavel.
- `CTASection`: bloco de chamada final quando a pagina nao precisar de composicao propria.
- `ExternalLink`: link externo com atributos seguros.
- `CatalogGroups`: agrupamento de catalogos por tipo (`Catálogo técnico`, `Catálogo online`, `Downloads oficiais`, `Portal institucional`) para evitar links indistintos.

## Central editorial

- `src/styles/Editorial.module.css` e a camada de tokens globais sao a fonte de verdade para H1, H2, H3, overlines, badges, paineis e cards editoriais.
- H1 deve usar `pageTitle` ou `--text-h1`; H2 deve usar `sectionTitle` ou `--text-h2`.
- Overlines/kickers usam `kicker` ou `--text-overline`, sem letter-spacing negativo.
- Cards especificos devem herdar `Card` ou `cardBase` e especializar apenas logo, imagem, metadados e CTA.
- Hubs de fornecedores devem usar categorias de catalogo, nao listas planas, porque PDF tecnico, web catalog, downloads e portal institucional têm finalidades diferentes.

## Regras praticas

- Nao criar estilos locais de input/select/textarea quando `FormField` + `Input/Textarea/Select` resolverem.
- Nao hardcodar foco com `box-shadow` local; use os tokens de controle.
- Botao novo deve usar `ActionButton`/`Button`, nao uma classe `.ctaBtn` local.
- Card novo deve comecar em `Card`; especialize apenas imagem, conteudo e metadados.
- CTA final deve usar `CTASection` quando nao houver uma necessidade visual especifica da pagina.
- Se uma pagina precisar de excecao visual, mantenha a excecao no CSS Module da pagina e preserve tokens globais.
