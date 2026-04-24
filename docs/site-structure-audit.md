# Auditoria estrutural do site RECOM

Data: 2026-04-24

## 1. Mapa da arquitetura anterior

Rotas existentes antes desta rodada:

- `/` - Home.
- `/a-recom` - página institucional.
- `/fornecedores-catalogos` - hub de fornecedores.
- `/fornecedores-catalogos/:slug` - página individual de fornecedor.
- `/solucoes` - hub de processos.
- `/solucoes/:slug` - página individual de processo.
- `/promocoes` - promoções.
- `/contato` - contato e orçamento.
- `/politica-de-privacidade` - política de privacidade.
- `*` - página 404.

Rotas legadas com redirecionamento:

- `/empresa` para `/a-recom`.
- `/catalogo` para `/fornecedores-catalogos`.
- `/produtos` para `/solucoes`.
- `/torneamento`, `/fresamento`, `/furacao` para páginas de processo.
- `/seguranca`, `/sugestoes-de-utilizacao`, `/videos` para rotas atuais.

Diagnóstico da arquitetura anterior:

- A estrutura mínima já existia, mas algumas páginas ainda pareciam uma versão reduzida de landing page.
- A Home explicava a RECOM parcialmente, mas ainda misturava prova institucional, imagem e cards sem deixar explícito que o site não é e-commerce nem catálogo próprio.
- Fornecedores eram úteis, mas o hub não explicava com força suficiente a lógica de catálogos oficiais.
- Páginas individuais de fornecedor tinham conteúdo, mas precisavam de orientação mais clara de próximo passo.
- Processos existiam, mas faltava fixação / porta-ferramentas, embora fornecedores cadastrados apontassem para esse tipo de demanda.
- Promoções repetia três vezes o mesmo estado vazio como se fossem campanhas.
- Contato tinha campos previstos na lógica, mas a interface exibia só nome, empresa, e-mail e mensagem.
- Header exibia telefone e e-mail sem links acionáveis.
- Política de privacidade tinha tom jurídico mais forte do que a maturidade atual permite.

## 2. Mapa da arquitetura proposta

Arquitetura principal mantida e fortalecida:

- `/` - Home como mapa do negócio.
- `/a-recom` - institucional objetivo.
- `/fornecedores-catalogos` - hub de fornecedores e catálogos oficiais.
- `/fornecedores-catalogos/[fornecedor]` - página individual com contexto, catálogos, processos e contato.
- `/solucoes` - hub por processo de usinagem.
- `/solucoes/[processo]` - página individual com fornecedores, catálogos úteis e orientação.
- `/promocoes` - promoções e condições especiais com empty state honesto.
- `/contato` - contato e orçamento com canais diretos e formulário completo.
- `/politica-de-privacidade` - texto simples, com marcação de revisão jurídica.
- `*` - 404 útil.

Rota auxiliar adicionada:

- `/fixacao` redireciona para `/solucoes/fixacao-porta-ferramentas`.

## 3. Páginas criadas ou revisadas

### Home / Início

- Objetivo: explicar quem é a RECOM e oferecer três caminhos: fornecedor, processo ou contato.
- Pergunta respondida: "O que a RECOM faz e por onde começo?"
- CTA principal: Solicitar orçamento.
- CTA secundário: Ver fornecedores e catálogos.
- Prova de confiança: base em Campinas-SP, canais diretos, histórico declarado, fornecedores identificados e links oficiais.
- Próximo passo: contato, fornecedores ou soluções por processo.
- Avaliação: suficiente para barebone; sem depender de visual.
- Blocos removidos/reorientados: imagens em destaque sem função editorial foram substituídas por blocos de decisão.
- Blocos adicionados: "O que o usuário deve fazer aqui", presença institucional, contato rápido, promoções com estado vazio e prova de confiança.

### A RECOM

- Objetivo: apresentar a empresa com precisão comercial.
- Pergunta respondida: "A RECOM é fabricante, distribuidor, representante ou apoio comercial?"
- CTA principal: Falar com a RECOM.
- CTA secundário: Ver fornecedores e catálogos.
- Prova de confiança: dados cadastrais, endereço, atuação desde 1990 e canais de contato.
- Próximo passo: contato, fornecedores ou soluções por processo.
- Avaliação: ficou menos genérica e menos dependente de claims.
- Blocos adicionados: resumo institucional, história curta, atuação atual, relação com fornecedores, como ajuda e quando falar.

### Fornecedores e catálogos

- Objetivo: organizar fornecedores e acesso a catálogos oficiais.
- Pergunta respondida: "Qual marca ou catálogo devo consultar?"
- CTA principal: Não sabe qual fornecedor consultar? Fale com a RECOM.
- CTA secundário: Ver soluções por processo.
- Prova de confiança: links externos identificados como catálogos oficiais e contexto por fornecedor.
- Próximo passo: página do fornecedor, catálogo oficial ou contato.
- Avaliação: suficiente para barebone; cada fornecedor tem utilidade mínima.
- Blocos adicionados: orientação explícita de que não é catálogo próprio de SKUs, processos relacionados e instrução de uso.

### Página individual de fornecedor

- Objetivo: explicar a marca no contexto comercial da RECOM.
- Pergunta respondida: "O que faço com este fornecedor no site da RECOM?"
- CTA principal: Acessar catálogo oficial da marca ou solicitar catálogo/orientação.
- CTA secundário: Solicitar orientação comercial.
- Prova de confiança: links oficiais, aviso de saída externa e processos relacionados.
- Próximo passo: catálogo oficial, contato, hub de fornecedores ou processo relacionado.
- Avaliação: deixou de ser apenas logo + botão; cada página tem contexto, retorno e uso mínimo.

### Soluções por processo

- Objetivo: atender quem sabe a aplicação, mas não sabe qual fornecedor consultar.
- Pergunta respondida: "Por qual processo começo?"
- CTA principal: Solicitar orientação comercial.
- CTA secundário: Ver fornecedores e catálogos.
- Prova de confiança: processos ligados a fornecedores reais cadastrados.
- Próximo passo: página individual de processo ou contato.
- Avaliação: suficiente; ganhou fixação / porta-ferramentas.

### Página individual de processo

- Objetivo: relacionar processo, fornecedores, catálogos úteis e contato.
- Pergunta respondida: "Que fornecedor ou catálogo ajuda neste processo?"
- CTA principal: Solicitar orientação comercial.
- CTA secundário: Voltar para soluções por processo.
- Prova de confiança: fornecedores relacionados, catálogos úteis e perguntas frequentes práticas.
- Próximo passo: fornecedor, catálogo, contato ou outro processo.
- Avaliação: conteúdo agora é comercial e navegacional, sem virar artigo técnico longo.

### Promoções e condições especiais

- Objetivo: tratar condições comerciais de forma B2B séria.
- Pergunta respondida: "Há alguma condição ativa? Se não, como consulto?"
- CTA principal: Consultar disponibilidade.
- CTA secundário: Ver fornecedores e catálogos.
- Prova de confiança: empty state honesto, sem simular campanha inexistente.
- Próximo passo: contato, WhatsApp ou fornecedores.
- Avaliação: suficiente e mais correto que cards duplicados.

### Contato e orçamento

- Objetivo: permitir contato mesmo se o formulário falhar.
- Pergunta respondida: "Como falo com a RECOM e o que devo enviar?"
- CTA principal: Enviar mensagem.
- CTA secundário: ligar, WhatsApp, e-mail, fornecedores e processos.
- Prova de confiança: endereço, telefone, e-mail, mapa e fallback.
- Próximo passo: contato direto ou formulário.
- Avaliação: formulário agora reflete o processo comercial real.

### Política de privacidade

- Objetivo: explicar coleta e uso dos dados do formulário.
- Pergunta respondida: "Que dados envio e para que são usados?"
- CTA principal: Falar com a RECOM.
- CTA secundário: Voltar ao início.
- Prova de confiança: transparência sobre revisão jurídica pendente.
- Próximo passo: contato ou início.
- Avaliação: texto simples e sem promessa jurídica absoluta.

### 404

- Objetivo: recuperar navegação.
- Pergunta respondida: "Para onde vou agora?"
- CTA principal: Início.
- CTA secundário: fornecedores, soluções e contato.
- Prova de confiança: não aplicável, mas a página evita beco sem saída.
- Próximo passo: rotas principais.
- Avaliação: útil para barebone.

## 4. Seções adicionadas

- Home: escolha por fornecedor, processo ou contato.
- Home: presença institucional com nota de validação.
- Home: contato rápido completo.
- Home: prova de confiança sem claims inflados.
- A RECOM: atuação atual.
- A RECOM: relação com fornecedores e catálogos.
- A RECOM: como a RECOM ajuda o cliente.
- A RECOM: quando falar com a RECOM.
- Fornecedores: orientação de uso e aviso de que não é catálogo próprio.
- Fornecedores: processos relacionados por fornecedor.
- Processo individual: catálogos úteis.
- Processo individual: perguntas frequentes práticas.
- Contato: orientação do que enviar.
- Política: revisão jurídica pendente.

## 5. Textos adicionados

- Explicação direta de que o site não é e-commerce nem catálogo próprio de SKUs.
- Texto de orientação para consultar fornecedores e catálogos oficiais.
- Texto de orientação para navegar por processo.
- Empty state único para promoções.
- Fallbacks globais para lista vazia, fornecedor sem catálogo, processo sem fornecedor, promoção encerrada, imagem indisponível, erro de formulário e link externo indisponível.
- Mensagens de contato sobre marca, processo, código, item, aplicação e canal de retorno.

## 6. CTAs padronizados

CTAs reforçados ou padronizados:

- Solicitar orçamento.
- Falar com a RECOM.
- Ver fornecedores e catálogos.
- Acessar catálogo oficial da [marca].
- Ver soluções por processo.
- Ver detalhes do processo.
- Consultar disponibilidade.
- Enviar mensagem.
- Ligar para a RECOM.
- Solicitar orientação comercial.
- Enviar aplicação para orientação.

CTAs genéricos reduzidos:

- "Saiba mais".
- "Clique aqui".
- "Entrar em contato" quando o destino podia ser mais específico.

## 7. Conteúdos que dependem de validação humana

- Fundação em 1990: já estava em dados centrais, mas deve ser validada documentalmente antes de uso em material final.
- Razão social e CNPJ.
- Horário de atendimento.
- Endereço e link do Google Maps.
- Qualquer afirmação de distribuição autorizada ou parceria formal.
- Histórico de parceria com fornecedores.
- Região de atendimento além de Campinas-SP.
- Política de privacidade final e prazos de retenção.
- Endpoint definitivo do formulário.

## 8. Fornecedores pendentes de validação

Fornecedores atualmente cadastrados:

- Mitsubishi Materials.
- 7Leaders.
- BT Fixo.
- Kifix.

Pendências:

- Confirmar vínculo comercial permitido para cada marca.
- Confirmar se a RECOM pode se apresentar como distribuidora, revenda autorizada, representante ou apenas canal comercial para cada marca.
- Confirmar se todos os links de catálogo são oficiais e atualizados.
- Confirmar se há fornecedores adicionais que devem entrar no hub.

## 9. Processos pendentes de validação

Processos atualmente cadastrados:

- Torneamento.
- Fresamento.
- Furação.
- Fixação e porta-ferramentas.

Pendências:

- Confirmar se "fixação e porta-ferramentas" deve aparecer como processo, família auxiliar ou categoria operacional.
- Confirmar se 7Leaders deve ser relacionado a torneamento ou apenas a fresamento/aplicações complementares.
- Confirmar se Mitsubishi Materials deve ser relacionada a todos os processos de corte exibidos.
- Confirmar processos adicionais apenas se houver base real de fornecedores.

## 10. Links externos pendentes

- Mitsubishi Materials: catálogo geral, webcatalog e página Brasil.
- 7Leaders: catálogo digital e página de produtos.
- BT Fixo: central de catálogos.
- Kifix: catálogo PDF e downloads.
- Google Maps do endereço.
- Instagram.

Todos devem ser revisados antes de produção.

## 11. Riscos de páginas rasas

- Promoções continuará rasa enquanto não houver campanhas reais, mas agora o estado vazio é honesto.
- Política de privacidade precisa validação jurídica antes de ser considerada final.
- Fornecedores dependem de validação de relação comercial.
- Processos podem precisar ajuste de nomenclatura conforme o vocabulário usado pela equipe comercial.
- O formulário ainda depende de endpoint real para envio em produção.

## 12. Próximas etapas recomendadas

1. Validar dados comerciais com a equipe RECOM.
2. Validar links oficiais de catálogos.
3. Confirmar modelo de relação com cada fornecedor.
4. Configurar endpoint real do formulário.
5. Revisar política de privacidade juridicamente.
6. Só depois iniciar design system visual, hierarquia final e refinamento responsivo.

