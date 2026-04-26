# ✅ Checklist de QA - RECOM Metal Duro (Fase Wireframe)

Este documento serve para validar a integridade técnica do esqueleto antes da aplicação de estética avançada.

## 1. Estrutura e Semântica
- [x] Cada página possui exatamente um `<h1>`.
- [x] A hierarquia de headings (H2, H3) é lógica e consistente.
- [x] O arquivo `wireframe.css` é o único CSS carregado (via `@import` dos módulos).
- [x] Não existem estilos inline (`style="..."`) nos arquivos HTML. (Limpeza profunda concluída).

## 2. Componentes Dinâmicos (`js/components.js`)
- [x] Header e Footer carregam corretamente em todas as páginas.
- [x] A variável `{{ROOT}}` é substituída corretamente em subdiretórios.
- [x] Atributos `data-component` e `data-hook` estão presentes conforme o `COMPONENT_CONTRACT.md`.

## 3. Conversão e Formulários
- [x] O formulário de contato possui labels visíveis.
- [x] O feedback de "Enviando" aparece ao clicar no botão.
- [x] A mensagem de sucesso é exibida e o formulário é limpo após o envio simulado.
- [x] Links de WhatsApp e E-mail estão funcionando (href correto).

## 4. Responsividade e Acessibilidade
- [x] O site é navegável em telas de 360px sem quebras críticas.
- [x] O header se adapta para mobile (uso de `stack-mobile`).
- [x] Todos os links e botões possuem `:focus-visible` claro.
- [x] Imagens informativas possuem atributo `alt` preenchido.

## 5. SEO e Metadados
- [x] `<title>` é único por página e condiz com o conteúdo.
- [x] `<meta name="description">` é única e persuasiva.
- [x] Links para catálogos externos possuem `rel="noopener noreferrer"`.

## 6. Dados e Manutenibilidade
- [x] O Design System está centralizado em `/src/design-system/`.
- [x] O arquivo `/src/design-system/index.js` é carregado como módulo em todas as páginas.
- [x] As configurações globais residem em `js/config.js`.
- [x] O código segue o guia de estilo `regra.md`.
- [x] **Declutter**: Não existem arquivos JS ou MD redundantes na raiz do projeto.

---
*QA executado por Antigravity em 26/04/2026.*
*Status Final: 100% PRONTO PARA ESTÉTICA.*
