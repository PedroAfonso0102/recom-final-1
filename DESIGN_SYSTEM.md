# Padroes visuais RECOM

Este projeto usa React + Vite, CSS Modules por componente e tokens globais em `src/index.css`.

## Tokens

- Cores de marca e estados ficam em `:root`: `--accent-blue`, `--accent-red`, `--accent-green`, `--accent-caution`.
- Texto usa `--text-primary`, `--text-secondary` e `--text-muted`.
- Espacamento usa a escala `--space-xs` ate `--space-3xl`.
- Bordas usam `--radius-sm` ate `--radius-2xl`; pills usam `--radius-full`.
- Sombras devem preferir `--shadow-xs`, `--shadow-sm` e `--shadow-md` em componentes comuns.
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

## Regras praticas

- Nao criar estilos locais de input/select/textarea quando `FormField` + `Input/Textarea/Select` resolverem.
- Nao hardcodar foco com `box-shadow` local; use os tokens de controle.
- Botao novo deve usar `ActionButton`/`Button`, nao uma classe `.ctaBtn` local.
- Card novo deve comecar em `Card`; especialize apenas imagem, conteudo e metadados.
- CTA final deve usar `CTASection` quando nao houver uma necessidade visual especifica da pagina.
- Se uma pagina precisar de excecao visual, mantenha a excecao no CSS Module da pagina e preserve tokens globais.
