# 📄 Contrato de Componentes - RECOM

Este documento define as regras de estrutura, nomenclatura e semântica para os componentes do site. O objetivo é garantir que a interface seja "burra" (estilo) e "inteligente" (semântica/dados), facilitando a automação e a futura aplicação de estética.

---

## 1. Regras Gerais

- **Independência Visual**: Componentes não devem ter estilos inline. Devem usar as classes do `wireframe.css` (`stack`, `cluster`, `grid`, `card`, `button`).
- **Semântica via `data-hook`**: Todo elemento que contém conteúdo dinâmico ou ação deve possuir um atributo `data-hook`.
- **Injeção via `data-component`**: Componentes globais (Header, Footer, Nav) são injetados pelo `js/components.js`.

---

## 2. Dicionário de Hooks (`data-hook`)

| Hook | Descrição | Exemplo de Uso |
| :--- | :--- | :--- |
| `layout-main` | Container principal da página | `<main data-hook="layout-main">` |
| `content-title` | Título principal da seção/página (H1/H2) | `<h1 data-hook="content-title">` |
| `content-subtitle` | Subtítulo ou título de card | `<h2 data-hook="content-subtitle">` |
| `content-text` | Texto corrido ou descrição | `<p data-hook="content-text">` |
| `content-card` | Wrapper de um item repetível | `<div class="card" data-hook="content-card">` |
| `content-image` | Imagem informativa ou logo | `<img data-hook="content-image">` |
| `action-button` | Botão de navegação ou CTA primário | `<a class="button" data-hook="action-button">` |
| `form-submit` | Botão de envio de formulário | `<button data-hook="form-submit">` |
| `form-input` | Campo de entrada de dados | `<input data-hook="form-input">` |

---

## 3. Estrutura Padrão de Card

Todo card (Fornecedor, Processo, Promoção) deve seguir esta estrutura básica para garantir consistência:

```html
<div class="card stack" data-hook="content-card">
    <div class="cluster items-center mb-md" data-hook="content-header">
        <!-- Logo ou Ícone -->
    </div>
    <div class="cluster gap-xs mb-sm" data-hook="content-tags">
        <!-- Tags/Badges -->
    </div>
    <h3 data-hook="content-subtitle">Título do Card</h3>
    <p data-hook="content-text" class="small muted">Descrição curta do item.</p>
    <div class="grid gap-xs mt-auto" data-hook="content-actions">
        <!-- Botões de Ação -->
    </div>
</div>
```

---

## 4. Estados de Interface

Componentes devem prever estados visuais via classes CSS:

- `.is-loading`: Quando o conteúdo está sendo buscado.
- `.is-error`: Quando houve falha no carregamento.
- `.is-empty`: Quando não há dados para exibir.
- `.is-active`: Estado ativo/selecionado (ex: menu).

---

## 5. Próximos Passos (Rodada 3)

Após a definição deste contrato, os dados serão movidos para arquivos JSON (`/data`), e os componentes serão alimentados dinamicamente ou gerados via script, respeitando estes hooks.
