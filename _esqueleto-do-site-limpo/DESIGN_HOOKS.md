# RECOM Design Hooks (Anchor Points)

Este documento descreve o sistema de ancoragem utilizado no esqueleto limpo do site. Os hooks permitem que estilos de arte sejam aplicados futuramente de forma desacoplada da estrutura HTML.

## Convenção de Nomenclatura

Atributo: `data-hook="[categoria]-[elemento]"`

### Categorias

- **layout**: Estruturas globais e de containers.
- **nav**: Elementos de navegação.
- **content**: Blocos de texto, imagens e informações.
- **action**: Botões, links e gatilhos de interação.
- **form**: Campos e rótulos de formulário.

## Mapa de Hooks

| Hook | Descrição | Localização |
|------|-----------|-------------|
| `layout-header` | Container principal do topo | Header |
| `layout-footer` | Container principal do rodapé | Footer |
| `layout-main` | Área de conteúdo principal | Main |
| `nav-menu` | Lista de navegação principal | Nav |
| `nav-item` | Item individual do menu | Nav > Li |
| `nav-link` | Link de navegação | Nav > A |
| `content-hero` | Seção de destaque da página | Home / Section |
| `content-title` | Título principal (H1) | Todas as páginas |
| `content-subtitle` | Subtítulo ou tagline | Home / Seções |
| `content-text` | Blocos de parágrafos | Todas as páginas |
| `action-button` | Botões de chamada para ação | CTA / Forms |
| `form-container` | Tag <form> do contato | Contato |
| `form-group` | Div que agrupa label e input | Contato |
| `form-input` | Campos de entrada de dados | Contato |
| `form-submit` | Botão de envio do form | Contato |
| `header-logo-triangle` | Logo central (apenas triângulo) | Header |
| `catalog-links-container` | Seção de catálogos de fornecedor | Fornecedores / Sub-páginas |
| `catalog-link-[brand]` | Link específico para catálogo | Sub-páginas Fornecedores |
| `content-image-[brand]` | Logo ou imagem de marca específica | Fornecedores |

## Como utilizar para Estilização

Para aplicar estilos de arte baseados nestes hooks, utilize seletores de atributo no CSS:

```css
/* Exemplo de aplicação de estilo de arte */
[data-hook="layout-header"] {
    background: var(--brand-primary);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

[data-hook="nav-link"] {
    font-family: 'Outfit', sans-serif;
    text-transform: uppercase;
    transition: color 0.3s ease;
}
```
