# RECOM — Inventário de páginas, componentes e campos de conteúdo

**Projeto:** RECOM Metal Duro  
**Data:** 2026-04-28  
**Objetivo:** transformar a extração do site legado em estrutura operacional para novo site, CMS, IA de redação e implementação.

---

## 1. Modelo de página legado observado

O site atual usa um padrão repetido:

```txt
Logo / topo visual
Bloco "Onde estamos"
Menu principal
Breadcrumb "Você está em..."
Conteúdo da página
Fonte, quando técnico
Footer com copyright 2013
```

### Problema principal

O modelo funciona como site institucional antigo, mas não como sistema de conversão atual. A informação comercial está fragmentada entre imagens, notícias antigas, páginas técnicas e formulário simples.

---

## 2. Componentes globais recomendados para migração

### 2.1. Header / Navegação

**Origem no legado:** menu com Home, A Empresa, Produtos, Promoções e Contato.

**Campos no novo CMS/configuração:**

```yaml
header:
  logo:
  nav_items:
    - label
    - href
    - description_optional
  primary_cta:
    label: Solicitar orçamento
    href: /contato/
  secondary_contact:
    phone:
    email:
    whatsapp_optional:
```

**Regras de copy:**

- Usar rótulos claros.
- Evitar “Nosso catálogo” se a página for hub de fornecedores.
- Padronizar: “Início”, “A RECOM”, “Fornecedores & Catálogos”, “Soluções / Processos”, “Promoções”, “Contato / Orçamento”.

---

### 2.2. Bloco de contato/localização

**Origem no legado:** “Onde estamos”.

**Campos:**

```yaml
contact_block:
  heading: Onde estamos
  address_line_1:
  neighborhood:
  city_state:
  postal_code:
  country:
  phones:
  email:
  map_url:
```

**Copy recomendada:**

- “Atendimento em Campinas e região”
- “Fale com a RECOM”
- “Solicite apoio para orçamento, catálogo ou identificação da linha correta”

---

### 2.3. Breadcrumb

**Origem no legado:** “Você está em: Home > Página”.

**Campos:**

```yaml
breadcrumb:
  items:
    - label
    - href
```

**Regras:**

- Sempre acentuar corretamente.
- Manter coerência entre breadcrumb, URL, title e H1.
- Usar “Início”, não “Home”, se a interface estiver toda em português.

---

### 2.4. Footer

**Origem no legado:** copyright fixo 2013 + crédito de agência.

**Campos:**

```yaml
footer:
  company_summary:
  navigation:
  suppliers:
  processes:
  contact:
  legal_links:
  copyright_dynamic:
```

**Regras:**

- O copyright deve ser dinâmico.
- O footer deve reforçar contato e localização.
- Evitar rodapé “morto” com apenas créditos.

---

## 3. Modelagem de páginas para o novo site

### 3.1. Home

**Função:** orientar rapidamente o visitante para fornecedores, processos, promoções ou contato.

**Blocos derivados do legado:**

- Fornecedores
- Produtos/processos em imagem
- Vídeo
- Novidades
- Contato/localização

**Novo modelo recomendado:**

```yaml
home:
  hero:
    eyebrow:
    title:
    subtitle:
    primary_cta:
    secondary_cta:
  trust_proof:
    items:
  suppliers_preview:
    heading:
    description:
    supplier_ids:
  processes_preview:
    heading:
    description:
    process_ids:
  promotions_preview:
    heading:
    active_promotions:
  final_cta:
    title:
    text:
    cta:
```

**Copy base recomendada:**

- Título: “Ferramentas de corte e soluções para usinagem com atendimento próximo em Campinas”
- Subtítulo: “A RECOM conecta clientes industriais a fornecedores, catálogos e caminhos de atendimento para torneamento, fresamento, furação e fixação.”
- CTA primário: “Solicitar orçamento”
- CTA secundário: “Ver fornecedores e catálogos”

---

### 3.2. A RECOM

**Função:** transformar histórico em confiança.

**Conteúdo legado aproveitável:**

- Fundação em 1990.
- Localização em Campinas.
- Especialização em ferramentas de corte rotativas e estáticas.
- Histórico com Mitsubishi Carbide e MMC Metal do Brasil.
- Atendimento regional e equipe treinada.

**Novo modelo recomendado:**

```yaml
about_page:
  h1:
  intro:
  history_blocks:
    - year
    - title
    - description
  current_positioning:
  trust_points:
  images:
  contact_cta:
```

**Copy base recomendada:**

- “Desde 1990, a RECOM atua em Campinas com foco em ferramentas de corte para usinagem.”
- “A empresa construiu sua trajetória atendendo clientes industriais e aproximando compradores de fornecedores reconhecidos.”
- “Hoje, o site organiza fornecedores, catálogos e caminhos de contato para tornar a solicitação comercial mais simples.”

---

### 3.3. Fornecedores & Catálogos

**Origem:** Home + Catálogo Mitsubishi + logos de fornecedores.

**Entidades identificadas:**

- Mitsubishi Materials
- 7Leaders
- BT Fixo
- Kifix

**Modelo de fornecedor:**

```yaml
supplier:
  id:
  name:
  slug:
  logo_url:
  short_description:
  long_description:
  catalog_url:
  official_site_url:
  related_processes:
  status:
  sort_order:
  seo_title:
  seo_description:
  last_reviewed_at:
```

**Card recomendado:**

```yaml
supplier_card:
  logo:
  name:
  short_description:
  related_processes:
  cta_internal: Ver fornecedor
  cta_external: Acessar catálogo oficial
  fallback_cta: Falar com a RECOM sobre esta marca
```

**Copy base:**

- “Escolha um fornecedor para acessar informações, catálogos e caminhos de atendimento.”
- “Os catálogos direcionam para materiais oficiais dos fabricantes/parceiros quando disponíveis.”

---

### 3.4. Página individual de fornecedor

**Origem:** página “Catálogo Mitsubishi”, hoje rasa.

**Modelo recomendado:**

```yaml
supplier_detail:
  h1:
  intro:
  relationship_context:
  product_lines:
  related_processes:
  catalog_cta:
  contact_cta:
  source_note:
```

**Copy base para Mitsubishi:**

- “A Mitsubishi Materials é uma das principais referências associadas ao histórico comercial da RECOM.”
- “Consulte o catálogo oficial ou fale com a RECOM para apoio na identificação da linha adequada.”

---

### 3.5. Soluções / Processos

**Origem:** Torneamento, Fresamento, Furação e imagens da Home.

**Processos identificados:**

- Torneamento
- Fresamento
- Furação
- Fixação / porta-ferramentas / cones
- Rosqueamento
- Mandrilamento
- Canal externo
- Small tools
- Brocas e sistemas WSTAR
- Ferramentas HSK

**Modelo de processo:**

```yaml
process:
  id:
  name:
  slug:
  short_description:
  long_description:
  related_suppliers:
  related_product_families:
  cta:
  seo_title:
  seo_description:
```

**Copy base:**

- “Encontre caminhos de consulta por aplicação: torneamento, fresamento, furação e fixação.”
- “Cada processo reúne famílias relevantes, fornecedores associados e contato comercial da RECOM.”

---

### 3.6. Promoções

**Origem:** página de promoções com imagens.

**Modelo recomendado:**

```yaml
promotion:
  id:
  title:
  slug:
  supplier:
  product_line:
  description:
  image:
  status:
  starts_at:
  ends_at:
  price_or_condition:
  items:
    - code
    - dimension
    - condition
    - inserts_included
  terms:
  cta_label:
  cta_href:
```

**Copy base:**

- “Consulte condições especiais disponíveis.”
- “As promoções podem ter disponibilidade limitada e devem ser confirmadas com a equipe da RECOM.”
- “Consultar disponibilidade”

**Regra crítica:** texto de promoção não deve ficar apenas dentro da imagem.

---

### 3.7. Contato / Orçamento

**Origem:** formulário legado.

**Campos legados:**

- Nome
- Email
- Telefone
- Código(s) do(s) produto(s) desejados
- Assunto
- Comentários

**Campos recomendados para novo formulário:**

```yaml
lead_form:
  name:
    required: true
  company:
    required: true
  email:
    required: true
  phone_or_whatsapp:
    required: false
  supplier_interest:
    required: false
  process_interest:
    required: false
  item_code:
    required: false
  message:
    required: true
  file_upload:
    required: false
  privacy_consent:
    required: conditional
```

**Microcopy recomendada:**

- “Informe o máximo de contexto possível para a equipe retornar com mais precisão.”
- “Se já tiver código, desenho, lista ou referência do item, envie junto na mensagem.”
- “Mensagem enviada. A equipe da RECOM recebeu sua solicitação.”

---

## 4. Biblioteca técnica derivada do legado

### 4.1. Conteúdo educativo

**Origem:** “Produtos” e “O que é Metal Duro?”.

**Uso recomendado:**

- Transformar em artigo ou página de apoio.
- Reduzir texto.
- Separar por cards:
  - O que são ferramentas de corte
  - O que é metal duro
  - O que é usinagem
  - Torneamento
  - Fresamento
  - Furação

### 4.2. Segurança e utilização

**Origem:** “Sugestões de Utilização” e “Segurança”.

**Uso recomendado:**

- Manter como material técnico.
- Adicionar data de revisão.
- Incluir fonte.
- Não misturar com fluxo comercial principal.

### 4.3. Vídeos

**Origem:** página “Vídeos”.

**Uso recomendado:**

- Verificar links/embeds.
- Manter apenas vídeos ativos.
- Agrupar por processo.
- Adicionar texto de contexto em cada vídeo.

---

## 5. Taxonomia editorial recomendada

### 5.1. Tipos de conteúdo

```yaml
content_types:
  page:
    examples: Home, A RECOM, Contato
  supplier:
    examples: Mitsubishi Materials, 7Leaders, BT Fixo, Kifix
  process:
    examples: Torneamento, Fresamento, Furação
  promotion:
    examples: Suporte para canal externo
  technical_article:
    examples: O que é metal duro?, Segurança
  video_resource:
    examples: Linha UE, AQX, TAF
  news_archive:
    examples: Novidade linha Mitsubishi, FENASUCRO 2012
```

### 5.2. Vocabulário controlado

**Preferir:**

- Fornecedores & Catálogos
- Soluções / Processos
- Solicitar orçamento
- Falar com a RECOM
- Acessar catálogo oficial
- Consultar disponibilidade
- Ferramentas de corte
- Usinagem
- Campinas e região
- Distribuidor B2B

**Evitar ou revisar:**

- “Nosso catálogo”, se o catálogo for externo.
- “Produtos” como menu genérico.
- “Clique aqui”.
- “Preços especiais” sem contexto.
- “Promocoes”, “Furacao”, “Videos” sem acento.
- Texto promocional sem validade ou condição.

---

## 6. Matriz de reaproveitamento

| Conteúdo legado | Reaproveitar? | Como |
|---|---:|---|
| História da empresa | Sim | Reescrever em página “A RECOM” |
| Dados de contato | Sim | Centralizar em `site_settings` |
| Logos de fornecedores | Sim | Criar entidade `supplier` |
| Conteúdo Mitsubishi técnico | Parcial | Reformatar e citar fonte |
| Promoção em imagem | Sim, com cautela | Transformar em dados editáveis |
| Notícias 2012/2013 | Arquivar | Usar apenas como histórico, não destaque |
| Vídeos | Validar | Manter se links ativos |
| Galeria FENASUCRO 2012 | Opcional | Arquivo histórico |
| Rodapé 2013 | Não | Substituir |
| CTAs “Clique aqui” | Não | Reescrever com ação específica |

---

## 7. Regras para LLM/coder usar esta extração

1. Não criar o novo site como e-commerce.
2. Não povoar catálogo próprio de SKUs sem validação.
3. Tratar fornecedores como entidades centrais.
4. Tratar processos como portas de entrada para o usuário.
5. Não enterrar contato no fim do site.
6. Não usar texto técnico longo na Home.
7. Não transformar promoção em imagem sem texto acessível.
8. Não reutilizar redação datada sem revisão ortográfica.
9. Preservar legitimidade: 1990, Campinas, Mitsubishi/MMC, atendimento humano.
10. Converter todo CTA genérico em ação específica.

---

## 8. Checklist de conteúdo para implementação

### Home

- [ ] Hero com proposta de valor atualizada.
- [ ] Bloco de fornecedores.
- [ ] Bloco de processos.
- [ ] CTA de orçamento.
- [ ] Contato visível.
- [ ] Remover notícias antigas da primeira dobra.
- [ ] Remover erro técnico/RSS.

### A RECOM

- [ ] História reescrita.
- [ ] Linha do tempo.
- [ ] Prova local.
- [ ] Foto real, se disponível.
- [ ] CTA.

### Fornecedores

- [ ] Mitsubishi.
- [ ] 7Leaders.
- [ ] BT Fixo.
- [ ] Kifix.
- [ ] Descrição curta.
- [ ] Links oficiais.
- [ ] Status do catálogo.

### Processos

- [ ] Torneamento.
- [ ] Fresamento.
- [ ] Furação.
- [ ] Fixação.
- [ ] Páginas com fornecedores relacionados.

### Promoções

- [ ] Cards editáveis.
- [ ] Validade.
- [ ] Condição.
- [ ] CTA.
- [ ] Estado expirado.

### Contato

- [ ] Formulário moderno.
- [ ] Validação.
- [ ] Telefone/e-mail clicáveis.
- [ ] Mapa.
- [ ] Mensagem de sucesso.
- [ ] Fallback para WhatsApp ou telefone.

---

## 9. Fontes

- Site atual RECOM Metal Duro: https://www.recommetalduro.com.br/
- Página institucional: https://www.recommetalduro.com.br/index.php?page=empresa
- Página Produtos: https://www.recommetalduro.com.br/index.php?page=produtos
- Página Contato: https://www.recommetalduro.com.br/index.php?page=contato
- Página Promoções: https://www.recommetalduro.com.br/index.php?page=promocoes
- Páginas técnicas e de processo listadas no documento de extração.