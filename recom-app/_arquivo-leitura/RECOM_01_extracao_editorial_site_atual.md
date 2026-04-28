# RECOM — Extração editorial do site atual

**Projeto:** RECOM Metal Duro  
**Domínio analisado:** `www.recommetalduro.com.br`  
**Data da extração:** 2026-04-28  
**Formato:** inventário de redação, páginas, blocos, microcopies e conteúdo comunicacional.

> Nota de método: este documento registra a redação e a informação pública do site em formato de inventário editorial. Rótulos, CTAs, títulos curtos e microcopies foram preservados quando relevantes. Blocos longos de texto técnico/institucional foram sintetizados fielmente para uso em migração, reescrita e documentação, evitando reprodução integral de páginas extensas.

---

## 1. Mapa geral do site extraído

| Página / bloco | URL | Função atual | Tipo de conteúdo |
|---|---|---|---|
| Home | `/` | Entrada institucional, fornecedores, novidades, vídeo e produtos em imagem | Institucional + vitrine |
| A Empresa | `?page=empresa` | História e legitimidade da RECOM | Institucional |
| Produtos | `?page=produtos` | Conteúdo introdutório sobre metal duro e usinagem | Técnico/educacional |
| Catálogo Mitsubishi | `?page=catalogo_mitsubishi` | Link para download de catálogo | Catálogo externo/download |
| Promoções | `?page=promocoes` | Promoção em imagem | Comercial |
| Contato | `?page=contato` | Formulário, endereço e mapa | Conversão |
| O que é Metal Duro? | `?page=o-que-e-metal-duro` | Explicação didática sobre ferramentas, metal duro e usinagem | Técnico/educacional |
| Sugestões de Utilização | `?page=sugestoes-de-utilizacao` | Tabela de riscos, perigos e precauções | Técnico/segurança |
| Segurança | `?page=seguranca` | Informações de segurança e características dos materiais | Técnico/segurança |
| Torneamento | `?page=torneamento` | Índice de famílias e sublinhas Mitsubishi para torneamento | Catálogo técnico |
| Fresamento | `?page=fresamento` | Índice de famílias e sublinhas para fresamento e fixação | Catálogo técnico |
| Furação | `?page=furacao` | Índice de famílias de brocas e sistemas de furação | Catálogo técnico |
| Vídeos | `?page=videos` | Biblioteca de vídeos por processo/família | Conteúdo técnico |
| Novidade linha Mitsubishi | `?page=novidade-linha-mitsubishi` | Notícia técnica/comercial de lançamento | News |
| FENASUCRO 2012 | `?feira=fenasucro&page=feiras` | Galeria de imagens de feira | Prova/evento |

---

## 2. Componentes globais repetidos

### 2.1. Bloco “Onde estamos”

**Função:** bloco de contato/localização exibido no topo/lateral do layout legado.

**Conteúdo identificado:**

- Rua Alferes João José, 350 — Jardim Chapadão
- CEP 13070-188 — Campinas — São Paulo — Brasil
- Fones: (19) 3233 2224, PABX; fax (19) 3232 6935
- E-mail: vendas.recom@montelione.com.br

**Leitura editorial:** a localização aparece como prova institucional forte. Deve continuar visível no novo site, mas com formatação atualizada, telefone clicável, e-mail clicável, eventual WhatsApp e coerência com Google Business Profile.

### 2.2. Navegação principal

**Rótulos identificados:**

- Home — Inicio
- A Empresa — Sobre nós
- Produtos — Nosso catálogo
- Promoções — Preços especiais
- Contato — Fale conosco

**Leitura editorial:** o menu mistura página institucional, catálogo técnico, promoção e contato. O rótulo “Produtos / Nosso catálogo” cria ambiguidade, pois o projeto atual entende o catálogo como hub de fornecedores/catálogos oficiais, não como catálogo próprio de SKUs.

### 2.3. Breadcrumb

**Padrão textual:**

- “Você está em: Home”
- “Você está em: Home > Empresa”
- “Você está em: Home > Produtos”
- “Você está em: Home > Contato”
- “Você está em: Home > Torneamento”
- “Você está em: Home > Fresamento”
- “Você está em: Home > Furacao”
- “Você está em: Home > Videos”

**Leitura editorial:** já existe uma tentativa de orientação, mas a nomenclatura está datada e sem padronização de acentos. No novo site, breadcrumbs devem ser preservados nas páginas internas.

### 2.4. Footer

**Texto identificado:**

- “© Recom Metal Duro 2013 - Todos os direitos reservados.”
- “Desenvolvido por Cloudmedia”

**Leitura editorial:** o ano fixo de 2013 comunica abandono/desatualização. O rodapé deve ser substituído por copyright dinâmico, dados locais, links legais, navegação útil e CTA de contato.

---

## 3. Página: Home

**URL:** https://www.recommetalduro.com.br/  
**Função atual:** página de entrada com fornecedores, imagens de produtos/linhas, vídeo e novidades antigas.

### 3.1. Blocos identificados

#### Fornecedores

**Heading:** “Fornecedores”

**Logos/imagens identificados:**

- Mitsubishi Materials Corporation
- 7Leaders — The Art of Cutting
- BT Fixo
- Kifix — Grampos de Fixação

**Leitura editorial:** o bloco de fornecedores é um ativo central. No novo site, deve virar seção estruturada com cards, descrição curta por marca, CTA interno e link para catálogo/material oficial.

#### Imagens de linhas/produtos

**Labels/alt text identificados:**

- Torneamento
- Fresas de topo
- Fresas
- Furação
- Linha 7Leaders
- Linha BT Fixo
- Cones

**Leitura editorial:** a Home usa imagens para sugerir categorias, mas a informação textual está pobre. O novo site deve transformar esses itens em cards rastreáveis e editáveis.

#### Vídeo

**Heading:** “Vídeo”

**Estado atual:** presença de componente visual/vídeo com imagem, sem copy de apoio textual suficiente no HTML extraído.

#### Novidades

**Heading:** “Novidades”

**Itens identificados:**

- Notícia sobre novidades da Mitsubishi em todas as linhas.
- CTA curto: “Clique aqui e confira os detalhes”.
- Galeria FENASUCRO 2012.
- CTA curto: “Fotos da FENASUCRO 2012”.
- Chamada sobre vídeos promocionais.
- Termos associados: “Smart Miracle” e “MC6025”.

**Datas identificadas:**

- 30/09/2013
- 19/09/2012

**Problema técnico/editorial visível:** a Home exibe mensagens de erro relacionadas a `simplexml_load_file` e carregamento de RSS externo.

**Leitura editorial:** a Home tem bom material de prova de atuação, mas está presa a notícias antigas e erro técnico visível. No novo site, “Novidades” deve ser trocado por prova ativa: fornecedores, processos, promoções válidas, contato e talvez posts recentes, se houver rotina de manutenção.

---

## 4. Página: A Empresa

**URL:** https://www.recommetalduro.com.br/index.php?page=empresa  
**Função atual:** explicar origem, histórico e vínculo com Mitsubishi/MMC.

### 4.1. Conteúdo comunicacional extraído

**Núcleos de mensagem:**

- A RECOM Metal Duro foi fundada em 1990.
- A empresa está localizada em Campinas, interior de São Paulo.
- A especialização descrita é em ferramentas de corte rotativas e estáticas.
- A partir de 1992, a empresa passou a representar Mitsubishi Carbide via importador de Belo Horizonte.
- A atuação era associada ao atendimento de Campinas, região e interior de São Paulo.
- A partir de 1998, a empresa passou a atuar como representante e distribuidor autorizado diretamente com a MMC Metal do Brasil, subsidiária da Mitsubishi Materials do Japão.
- O texto declara equipe técnica treinada pelo departamento técnico da MMC Metal do Brasil.
- O fechamento enfatiza melhor atendimento a parceiros e clientes.

### 4.2. Copy curta / termos reaproveitáveis

- “Fundada no ano de 1990”
- “RECOM Metal Duro”
- “Campinas”
- “Ferramentas de Corte Rotativas e Estáticas”
- “Mitsubishi Carbide”
- “MMC Metal do Brasil”
- “Mitsubishi Materials”
- “Parceiros e Clientes”

### 4.3. Leitura editorial

A página tem valor alto porque concentra legitimidade. O novo site deve preservar história, Campinas, relação com Mitsubishi/MMC e atendimento humano, mas reescrever com frases mais limpas, correção ortográfica e posicionamento atual de distribuidor B2B.

---

## 5. Página: Produtos / O que é Metal Duro?

**URLs:**  
- https://www.recommetalduro.com.br/index.php?page=produtos  
- https://www.recommetalduro.com.br/index.php?page=o-que-e-metal-duro

**Função atual:** conteúdo didático sobre ferramentas de corte, metal duro e usinagem.

### 5.1. Submenu técnico identificado

- O que é Metal Duro?
- Sugestões de Utilização
- Segurança nas Ferramentas
- Torneamento
- Fresamento
- Furação
- Vídeos

### 5.2. Estrutura editorial identificada

#### Introdução

**Tema:** explica que produtos metálicos fazem parte do cotidiano e introduz métodos de usinagem, corte, ferramentas de corte e produção de cavacos.

**Exemplos usados:** facas, raladores, tesouras, apontadores, serrotes e plainas.

**Leitura:** linguagem didática, de origem educacional/fabricante, mais voltada a explicar conceitos do que a vender.

#### Processo de fabricação de ferramentas de metal duro

**Tema:** mistura de carboneto de tungstênio com cobalto, pó como matéria-prima, prensagem, sinterização, aquecimento aproximado a 1400ºC, redução de volume e dureza elevada.

#### O que é usinagem?

**Tema:** aresta de corte, cavacos, alta temperatura na ponta da ferramenta, insertos indexáveis e suportes.

#### Três processos principais

- Torneamento: material usinado gira; máquina chamada torno.
- Fresamento: ferramenta gira; fresa de facear e fresa de topo; máquina chamada fresadora.
- Furação: brocas produzem furos circulares; uso em máquinas de fresamento ou torneamento.

#### Sumário

**Mensagem:** torneamento, fresamento e furação são os três métodos principais; ferramentas de metal duro aumentam produtividade, velocidade, precisão e reduzem custos de fabricação.

**Fonte declarada:** Mitsubishi Materials.

### 5.3. Leitura editorial

Este conteúdo tem valor como base técnica, mas não deve dominar a arquitetura nova. Ele pode virar seção “conteúdo técnico de apoio”, FAQ ou blocos auxiliares dentro de páginas de processo. A escrita é pedagógica e longa; precisa ser condensada para o comprador B2B.

---

## 6. Página: Catálogo Mitsubishi

**URL:** https://www.recommetalduro.com.br/index.php?page=catalogo_mitsubishi

### 6.1. Conteúdo identificado

**Breadcrumb:** “Home > Produtos Mitsubishi”  
**Heading/CTA:** “Catálogo Mitsubishi (Download)”

### 6.2. Leitura editorial

O modelo atual é simples: uma página de passagem para download. No novo site, isso deve virar página de fornecedor com contexto, linhas, processos relacionados, CTA para catálogo oficial e CTA comercial da RECOM.

---

## 7. Página: Promoções

**URL:** https://www.recommetalduro.com.br/index.php?page=promocoes

### 7.1. Conteúdo identificado

**Heading:** “Promoção”

**Conteúdo em imagem identificado visualmente:**

- “SUPORTE PARA CANAL EXTERNO”
- “PROMOÇÃO”
- Lista de medidas e preços zerados/placeholder:
  - 10 x 10 — R$ 0,00 — 30 insertos
  - 12 x 12 — R$ 0,00 — 30 insertos
  - 16 x 16 — R$ 0,00 — 30 insertos
  - 20 x 20 — R$ 0,00 — 30 insertos
  - 25 x 25 — R$ 0,00 — 40 insertos
  - 32 x 32 — R$ 0,00 — 50 insertos
- Exemplos:
  - RGY-2020-3T20 — suporte direito (R)
  - LGY-2525-4T20 — suporte esquerdo (L)
- Observação: para insertos GY2M Mitsubishi.

### 7.2. Leitura editorial

A promoção está presa em imagem, com pouca informação textual rastreável. Isso prejudica SEO, acessibilidade, edição e validade comercial. No novo site, promoções precisam virar cards estruturados com título, fornecedor, produto/linha, validade, condição, ressalva e CTA.

---

## 8. Página: Contato

**URL:** https://www.recommetalduro.com.br/index.php?page=contato

### 8.1. Formulário

**Campos identificados:**

- Nome *
- Email *
- Telefone
- Código(s) do(s) produto(s) desejados
- Assunto *
- Comentários

**Microcopy identificada:**

- “* Campos obrigatorios”

### 8.2. Bloco “CONTATO”

**Dados identificados:**

- Endereço: Rua Alferes João José, 350
- Bairro: Jardim Chapadão
- Cidade: Campinas, SP
- CEP: 13070-188
- Telefone: (19) 3233-2224 ou (19) 3232-6935
- Email: vendas.recom@montelione.com.br

### 8.3. Bloco “ONDE ESTAMOS”

**CTA/link identificado:**

- Exibir mapa ampliado

### 8.4. Leitura editorial

O formulário já é orientado a orçamento técnico porque pede código de produtos. Precisa ser modernizado com labels permanentes, validação, upload opcional, estado de sucesso/erro e mensagens mais humanas.

---

## 9. Página: Sugestões de Utilização

**URL:** https://www.recommetalduro.com.br/index.php?page=sugestoes-de-utilizacao

### 9.1. Estrutura identificada

A página opera como tabela de risco/precaução com três eixos:

- Produto
- Perigo
- Precaução

### 9.2. Categorias de produto extraídas

- Todas as ferramentas de usinagem
- Insertos intercambiáveis
- Suportes e outras ferramentas rotativas
- Brocas
- Ferramentas soldadas
- Outras máquinas e ferramentas

### 9.3. Temas recorrentes

- Arestas afiadas.
- Quebra e estilhaços expelidos da máquina.
- Uso de EPIs e óculos de proteção.
- Dados de corte inadequados.
- Desgaste excessivo.
- Peças e ferramentas quentes.
- Cavacos quentes.
- Risco de fogo/incêndio.
- Falta de balanceamento.
- Vibração e sons anormais.
- Fixação inadequada de insertos.
- Uso de ferramentas dentro das recomendações de catálogo.

### 9.4. Leitura editorial

É conteúdo técnico de segurança, útil como material de apoio, mas com estrutura densa. No novo site, deve ser reformatado como página técnica/FAQ, download ou seção “boas práticas de segurança”.

---

## 10. Página: Segurança

**URL:** https://www.recommetalduro.com.br/index.php?page=seguranca

### 10.1. Estrutura identificada

- Utilização de Ferramentas de Corte
- Características Básicas dos Metais das Ferramentas
- Termos de “Segurança das Ferramentas de Metal Duro”
- Características Físicas
- Componentes
- Sugestões de Manuseio de Ferramentas de Metal Duro
- Sugestões de Utilização de Ferramentas de Corte

### 10.2. Conceitos extraídos

- Ferramentas de metais duros: liga de metal duro, cermet, cerâmica, CBN sinterizado, diamante sinterizado.
- Liga de metal duro: ferramentas com WC como componente principal.
- Características físicas: aparência variável, sem cheiro, dureza elevada, peso específico.
- Componentes: W, Ti, Al, Si, Ta, B, Co, Ni, Cr, Mo.
- Recomendações: cuidado com choque, aperto excessivo, peso, dilatação térmica, armazenamento, corrosão por refrigerantes, afiação, poeira, descarte de líquido refrigerante, trincas, marcação e solda.

### 10.3. Leitura editorial

É material de origem técnica/fabricante. Deve ser mantido como acervo, mas com disclaimer, fonte clara, data de revisão e linguagem mais organizada.

---

## 11. Página: Torneamento

**URL:** https://www.recommetalduro.com.br/index.php?page=torneamento

### 11.1. Headings e famílias identificadas

- Torneamento
- Inserto de Torneamento
  - Identificação
  - Tool Navi
  - Aplicação de classes e quebra-cavacos para torneamento
  - Sistema de quebra-cavaco retificados
  - Inserto alisador
- Inserto de Torneamento (PCD e CBN)
  - Identificação
- Ferramentas para Torneamento Externo
  - Identificação
  - Tipo LL
  - Tipo Dupla Fixação
  - Tipo WP
  - Tipo SP
  - Suporte para Perfilar
  - Tipo AL
  - Tipo ML
  - Tipo MC
- Small Tools
  - Apresentação de Small Tools
  - Classificação das ferramentas de torneamento externo
  - Ferramentas para magazines
  - Torres opostas
  - Tipo magazines
  - Tornos com came
- Madrilhamento
  - Dimple Bar
  - Suportes para torneamento interno ISO
  - Características da Dimple Bar
  - Afiação de aresta de corte de barras de mandrilar micro-mini
- Canal Externo
  - Características da série GY
  - Referência para pedido da série GY
  - Inserto
  - Localizador
  - Suporte modular
- Canal
  - Suporte DG
  - Grampo de fixação
  - Conjunto de porta-ferramentas
  - Estrutura
  - Localizador para canal externo e rebaixo
  - Localizador para canal de face
- Rosqueamento
  - Rosca standard e inserto
  - Características da linha MMT
  - Método de rosqueamento
  - Tipos de insertos
  - Métodos de avanço
  - Profundidade de rosca
  - Selecionando condições de corte
  - Escolhendo o calço do inserto para a linha MMT
  - Padrão de profundidade de corte

### 11.2. Leitura editorial

A página é mais índice técnico do que conteúdo comercial. Deve virar página de processo com breve explicação, famílias principais, fornecedores relacionados, CTA para catálogo Mitsubishi e CTA para apoio comercial.

---

## 12. Página: Fresamento

**URL:** https://www.recommetalduro.com.br/index.php?page=fresamento

### 12.1. Headings e famílias identificadas

- Fresamento
- Fresas de topo inteiriças
  - Identificação / descrições dos símbolos
- Insertos de fresamento e de furação
  - Identificação
- Fresamento
  - Dispositivos de controle
- Ferramentas HSK
  - Apresentação das ferramentas HSK
- Fixação
  - Classificação do sistema de fixação troca-rápida
  - Identificação
  - Fresas de facear
  - Fresas tangenciais
  - Ferramentas de mandrilar
  - ABS® License KOMET®
  - Sistema HSK

### 12.2. Leitura editorial

Tem valor como árvore de famílias, mas precisa de contexto. No novo site, “Fresamento” deve responder: o que cobre, quais famílias podem ser relevantes, quais fornecedores aparecem e como pedir orientação.

---

## 13. Página: Furação

**URL:** https://www.recommetalduro.com.br/index.php?page=furacao

### 13.1. Headings e famílias identificadas

- Furação
- Furação
  - Identificação / descrições dos símbolos
- Furação — metal duro inteiriço
  - Pequenos diâmetros MWS Brocas WSTAR
  - MWE / MWS
  - MWS_DB
  - MNS / MNS_DB
  - MHS
  - MZE / MZS
  - MGS — broca canhão inteiriça
  - MAE / MAS
- Furação — tipo soldada
  - BRS / BRM / BRK
  - BRA / BRL
- Furação — tipo intercambiável
  - S-TAW
  - TAW
  - TAFS / TAFM / TAFL
  - Bucha expansiva — JFS

### 13.2. Leitura editorial

Assim como Torneamento e Fresamento, a página funciona como índice técnico. Precisa ser reestruturada para navegação, intenção comercial e CTA.

---

## 14. Página: Vídeos

**URL:** https://www.recommetalduro.com.br/index.php?page=videos

### 14.1. Categorias e vídeos identificados

#### Torneamento

- Linha UE
- Quebra-cavacos MV
- Quebra-cavacos MW/SW
- Quebra-cavacos FJ/MJ/GJ
- Barras de Mandrilar
- Small Tool / Swiss Tool

#### Fresamento

- AQX
- ASX400
- BXD
- AJX
- DLC
- SRM2
- APX
- M-Star
- VC-SFPR
- DLC-2MA
- Fresa tipo QMC

#### Furação

- Sistema de furação inteiriça
- Broca super longa WSTAR
- TAF
- TAW

#### Classe

- Cobertura CBN — MBC010
- MB710 / MB730
- UC5105 / UC5115
- MB8025 / MB810 / MB835

### 14.2. Leitura editorial

É um acervo de materiais técnicos. Pode virar biblioteca de recursos, mas só vale manter no MVP se os vídeos estiverem ativos e se houver contexto editorial para não parecer galeria abandonada.

---

## 15. Página: Novidade linha Mitsubishi

**URL:** https://www.recommetalduro.com.br/index.php?page=novidade-linha-mitsubishi

### 15.1. Conteúdo comunicacional extraído

**Data indicada:** 29/09/2013

**Tema:** notícia sobre pacote de novidades Mitsubishi Materials no Brasil em torneamento, fresamento e furação.

**Torneamento:**

- Expansão da linha GY para torneamento de canais.
- Inclusão de suportes e localizadores.
- Complemento com insertos de 8 mm.
- Classes para aços, ferro fundido e materiais de difícil usinabilidade.
- Quebra-cavacos GS, GM, MM, MS e BM.
- Ampliação de insertos CBN na classe BC8020.

**Fresamento:**

- Fresa tangencial VOX400 com corpo tipo passo extrafino.
- AXD4000 para usinagem de alumínio com quebra-cavaco GM.
- Novas classes PVD, MP6120 e MP9120.
- Tecnologia Tough-Σ.
- Fresas VQ Smart Miracle.
- Fresas DF e DFC com cobertura de diamante.

**Furação:**

- Expansão da linha MHS.
- Brocas MVS e MVE com e sem refrigeração.
- Aplicação multimaterial.
- Furos de refrigeração em formato trigonal.
- Diâmetros e comprimentos específicos indicados.

### 15.2. Leitura editorial

O conteúdo é tecnicamente rico, mas datado. Pode ser reaproveitado como registro histórico ou como referência de linhas, mas não como “novidade” atual.

---

## 16. Página: FENASUCRO 2012

**URL:** https://www.recommetalduro.com.br/index.php?feira=fenasucro&page=feiras

### 16.1. Conteúdo identificado

**Heading:** “FENASUCRO 2012”  
**Formato:** galeria com imagens, sem texto de apoio relevante extraído.

### 16.2. Leitura editorial

É prova de participação/atividade, mas antiga. Pode ser arquivada ou transformada em seção histórica apenas se houver contexto e imagens úteis.

---

## 17. Inventário de microcopy e rótulos

### Navegação

- Inicio
- Sobre nós
- Nosso catálogo
- Preços especiais
- Fale conosco

### Orientação

- Você está em:
- Onde estamos:
- CONTATO
- ONDE ESTAMOS

### Ações / CTAs

- Clique aqui e confira os detalhes
- Fotos da FENASUCRO 2012
- Download
- Exibir mapa ampliado

### Formulário

- Nome
- Email
- Telefone
- Código(s) do(s) produto(s) desejados
- Assunto
- Comentários
- Campos obrigatorios

### Conteúdo técnico

- O que é Metal Duro?
- Sugestões de Utilização
- Segurança nas Ferramentas
- Torneamento
- Fresamento
- Furação
- Vídeos
- Fonte: Mitsubishi Materials

---

## 18. Inventário de ativos de marca/fornecedores

| Ativo | Evidência no site | Papel no novo site |
|---|---|---|
| RECOM Metal Duro | Logo e textos institucionais | Marca principal |
| Mitsubishi Materials | Logo, catálogo, páginas técnicas, notícia | Fornecedor/parceiro prioritário |
| 7Leaders | Logo e linha de produtos | Fornecedor |
| BT Fixo | Logo, linha de produtos, catálogo | Fornecedor |
| Kifix | Logo | Fornecedor |

---

## 19. Diagnóstico da redação atual

### Pontos fortes

- Há legitimidade institucional real: fundação, Campinas, atendimento regional, relação com Mitsubishi/MMC.
- Há conteúdo técnico abundante.
- Há vocabulário de processo relevante para compradores industriais.
- Há contato claro e repetido.
- Há fornecedores já identificáveis.

### Pontos fracos

- Redação datada, com acentuação e padronização inconsistentes.
- Textos técnicos longos demais para navegação comercial moderna.
- CTAs genéricos e pouco persuasivos.
- Promoções e produtos dependem muito de imagens.
- Rodapé e notícias antigas comunicam abandono.
- Erros técnicos aparecem na Home.
- O site não diferencia bem “produto”, “catálogo”, “fornecedor” e “processo”.
- Há pouco conteúdo próprio da RECOM; parte relevante parece importada/adaptada de material Mitsubishi.

---

## 20. Próximo uso recomendado desta extração

1. Usar a página “A Empresa” como base para reescrever a narrativa institucional.
2. Transformar “Produtos” em dois eixos: Fornecedores & Catálogos + Soluções/Processos.
3. Preservar conteúdo técnico em páginas auxiliares, FAQ ou biblioteca.
4. Converter imagens de promoção em dados editáveis no CMS.
5. Converter vídeos em biblioteca apenas se os links estiverem válidos.
6. Criar CTAs mais humanos: “Solicitar orçamento”, “Falar com a RECOM”, “Consultar catálogo oficial”, “Pedir orientação técnica/comercial”.
7. Padronizar acentos, caixa, terminologia e links.

---

## 21. Fontes consultadas

- Home: https://www.recommetalduro.com.br/
- A Empresa: https://www.recommetalduro.com.br/index.php?page=empresa
- Produtos: https://www.recommetalduro.com.br/index.php?page=produtos
- Catálogo Mitsubishi: https://www.recommetalduro.com.br/index.php?page=catalogo_mitsubishi
- Promoções: https://www.recommetalduro.com.br/index.php?page=promocoes
- Contato: https://www.recommetalduro.com.br/index.php?page=contato
- O que é Metal Duro?: https://www.recommetalduro.com.br/index.php?page=o-que-e-metal-duro
- Sugestões de Utilização: https://www.recommetalduro.com.br/index.php?page=sugestoes-de-utilizacao
- Segurança: https://www.recommetalduro.com.br/index.php?page=seguranca
- Torneamento: https://www.recommetalduro.com.br/index.php?page=torneamento
- Fresamento: https://www.recommetalduro.com.br/index.php?page=fresamento
- Furação: https://www.recommetalduro.com.br/index.php?page=furacao
- Vídeos: https://www.recommetalduro.com.br/index.php?page=videos
- Novidade linha Mitsubishi: https://www.recommetalduro.com.br/index.php?page=novidade-linha-mitsubishi
- FENASUCRO 2012: https://www.recommetalduro.com.br/index.php?feira=fenasucro&page=feiras