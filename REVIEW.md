# Relatório de Revisão Crítica - Arquitetura e Clean Code

## 1. Princípios SOLID, DRY e Clean Code

### 1.1 Violação de DRY: `menuLateral` duplicado
Existe uma violação gritante do princípio DRY (Don't Repeat Yourself) nas páginas de produtos. O bloco `<ul className={styles.menuLateral}>` é repetido integralmente com pequenas variações (classe `.active` e links) em múltiplos arquivos:
* `src/pages/Produtos.jsx`
* `src/pages/Fresamento.jsx`
* `src/pages/Furacao.jsx`
* `src/pages/Torneamento.jsx`
* `src/pages/SugestoesUtilizacao.jsx` (Potencialmente)
* `src/pages/Seguranca.jsx` (Potencialmente)
* `src/pages/Videos.jsx` (Potencialmente)

**Justificativa técnica:** Manter este menu em cada página obriga que qualquer alteração de rotas ou adição de um novo item no menu lateral precise ser replicada em pelo menos 7 lugares distintos, criando o anti-pattern *Shotgun Surgery*.
*Solução:* Extrair este HTML para um componente React independente chamado `ProductSidebar` que aceite a rota atual via prop (ou utilize o hook `useLocation` do react-router-dom) para definir dinamicamente o link `active`.

### 1.2 Violação do Single Responsibility Principle (SRP)
O arquivo `src/pages/Contato.jsx` é responsável por renderizar o layout, o mapa de localização (iframe), os detalhes de contato, e gerenciar a renderização de um formulário de contato extenso.

**Justificativa técnica:** Misturar apresentação estática pesada (mapas e endereços) com lógica de captura de dados de formulário torna o componente inchado e difícil de testar.
*Solução:* Extrair o formulário para um componente `ContactForm.jsx`.

## 2. Tratamento de Erros e Complexidade Cognitiva

### 2.1 Tratamento de Erros no Formulário de Contato (`Contato.jsx`)
O formulário na página de Contato atualmente não possui nenhum tratamento de eventos ou estado:
```jsx
<form style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
    ...
    <button type="submit" ...>Enviar Mensagem</button>
</form>
```
Se o usuário clicar no botão "Enviar", haverá um recarregamento silencioso da página (`event.preventDefault()` não é chamado, e não há função `onSubmit`). Além disso, não há feedback visual, validação robusta (além do `required` do HTML), ou integração com a API.

**Justificativa técnica:** Falhas silenciosas pioram severamente a experiência do usuário e violam boas práticas de validação de formulários em React.
*Solução:* Implementar a captura do evento `onSubmit`, prevenir o comportamento padrão (`e.preventDefault()`), gerenciar estado com React hooks, e fornecer feedback visual (sucesso/erro).

### 2.2 Estilo Inline vs CSS Modules
Diversos componentes (como `Contato.jsx` e `Promocoes.jsx`) usam estilos inline extensos (`style={{ ... }}`) misturados com CSS Modules (`styles.xxx`).
* Exemplo no `Contato.jsx`: `<div className={styles.flexContainer} style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>`

**Justificativa técnica:** A mistura de estilos inline com classes dificulta a manutenção, sobrescreve especificidades do CSS, e prejudica a performance de renderização do React e a consistência visual.
*Solução:* Mover todos os estilos inline para os arquivos `.module.css` apropriados. (Para limitar o *blast radius* nesta task, focaremos primeiro na refatoração arquitetural, mas deixamos apontado o débito técnico).

## 3. Mapeamento de Arquitetura e Dependências

A arquitetura do site é um Single Page Application (SPA) padrão em React com Vite.

### 3.1 Violações de Camadas e Acoplamento
* **Acoplamento Forte a Ativos Estáticos:** Os componentes de páginas (`Home.jsx`, `Produtos.jsx`) possuem acoplamento muito forte com dezenas de imports diretos de imagens, inflando o código do componente.
    * Exemplo em `Home.jsx`: Há 14 imports seguidos de imagens e construção manual do array de `slides`.
* **Proposta DDD (Domain-Driven Design) - Bounded Contexts:**
  Para um site corporativo / catálogo, os "Bounded Contexts" poderiam ser delimitados em:
  - `Core / Institucional`: Home, Empresa, Layout, Navegação.
  - `Catálogo / Produtos`: Produtos genéricos, Furação, Fresamento, Torneamento (compartilham o menu lateral e informações de catálogo).
  - `Comunicação`: Contato, Promoções.

### 3.2 Código Morto e Imports não Utilizados
* O setup inicial possui imagens como `.gif` que possivelmente poderiam ser substituídas por formatos modernos ou CSS animations, mas estão sendo ativamente referenciadas.
* Após análise visual e de linters, não há dead code severo (imports não usados nos arquivos `.jsx`), visto que o build passa com sucesso, porém arquivos como o `.gitignore` e `vite.config.js` são bem limpos.

O diagrama de dependências (`dependency-graph.svg`) demonstra que todas as páginas convergem fortemente para os arquivos estáticos na pasta `src/assets/images/` e para o `Layout.jsx` e `Page.module.css`. A extração de componentes visuais comuns (como a sidebar de produtos) diminuirá as conexões radiais das páginas de produto no diagrama.
