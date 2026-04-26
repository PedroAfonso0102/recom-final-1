# Padrão RECOM de Qualidade Digital

Este documento consolida a matriz de conformidade normativa que rege o desenvolvimento do ecossistema digital da RECOM (Site + CMS). Não seguimos templates genéricos; construímos um produto digital operável baseado em normas internacionais de usabilidade, acessibilidade, segurança e qualidade de software.

## Matriz de Conformidade

### 1. UX e Usabilidade
**Base:** ISO 9241-11:2018 e ISO 9241-110:2020
- **Critérios:** Eficácia, eficiência e satisfação.
- **Aplicação Prática:**
  - O usuário entende instantaneamente onde está e o que a RECOM faz.
  - Navegação entre fornecedores, processos e contatos ocorre sem esforço cognitivo.
  - O sistema fornece feedback claro para cada ação.
  - Formulários orientam, validam preventivamente e confirmam o sucesso.

### 2. Acessibilidade
**Base:** WCAG 2.2 / W3C WAI
- **Critérios:** Perceptível, operável, compreensível e robusto.
- **Aplicação Prática:**
  - Labels explícitos e visíveis em todos os formulários.
  - Foco de teclado visível e não obscurecido em links, botões e campos.
  - Alvos clicáveis adequados para mobile (touch).
  - Contraste legível validado.
  - Hierarquia de headings (H1-H6) semântica e sequencial.
  - Erros de formulário descritivos e amigáveis a leitores de tela.

### 3. Qualidade de Software
**Base:** ISO/IEC 25010:2023
- **Critérios:** Adequação funcional, eficiência, compatibilidade, confiabilidade, segurança e manutenibilidade.
- **Aplicação Prática:**
  - O CMS permite editar apenas as entidades controladas (Fornecedores, Processos, Leads), não quebrando layouts.
  - Desempenho rápido (Next.js Server Components).
  - Compatibilidade garantida em todos os navegadores modernos (Playwright E2E).
  - Manutenibilidade através da centralização de design tokens, schemas Zod e Server Actions.

### 4. SEO Técnico e Indexação
**Base:** Google Search Central
- **Critérios:** Rastreabilidade, HTTP 200, marcação semântica.
- **Aplicação Prática:**
  - HTML semântico e puramente indexável.
  - Rotas limpas, sitemap.xml automático e robots.txt bem configurado.
  - Uso de tags `<a href="...">` reais para links (evitar simulação via JS para roteamento público).
  - Tags `<title>`, `<meta name="description">` exclusivas por página.
  - Canonical tags configuradas.
  - Breadcrumbs estruturados com Schema.org.

### 5. Segurança
**Base:** OWASP ASVS + ABNT NBR ISO/IEC 27001/27002
- **Critérios:** Autenticação, autorização, proteção de dados e validação.
- **Aplicação Prática:**
  - Autenticação forte via Supabase.
  - Validação estrita Server-Side (com Zod) independente da validação Client-Side.
  - Sanitização de inputs para prevenir XSS.
  - Proteção CSRF nativa do Next.js App Router / Server Actions.
  - Uploads de arquivos (leads) restritos a tipos e tamanhos específicos.
  - Storage em Buckets privados (Supabase) com assinaturas de URL.

### 6. Privacidade e Proteção de Dados
**Base:** Lei Geral de Proteção de Dados (LGPD)
- **Critérios:** Minimização de dados, transparência e controle.
- **Aplicação Prática:**
  - Coletar estritamente o necessário no formulário de contato (Lead).
  - Deixar explícita a finalidade do envio dos dados.
  - Controle de acesso baseado em Roles (RBAC) para visualização de leads no painel.
  - Proteção total contra exposição pública de arquivos e anexos de clientes.

### 7. Conversão B2B
**Base:** Padrão Interno RECOM (UX + Realidade Comercial)
- **Critérios:** Fricção mínima, clareza de intenção e ação mensurável.
- **Aplicação Prática:**
  - Apenas uma ação primária por contexto (orientação antes de persuasão).
  - CTA sempre reflete a ação real (ex: "Acessar Catálogo" em vez de "Clique Aqui").
  - Múltiplas vias de contato mapeadas: Formulário, WhatsApp gerado, E-mail, Telefone.
  - Rastreamento (Analytics) estruturado para cada evento chave.
  - Leads enriquecidos com origem (source page) e interesse (fornecedor/processo) antes de caírem no CMS.

---
*Este padrão norteia as decisões arquiteturais, code reviews e testes automatizados da RECOM.*
