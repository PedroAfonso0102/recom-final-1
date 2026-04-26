# UI States — RECOM

Vocabulário oficial para estados de interface e entidades de negócio.

## 🖱️ Estados de Interação (UIStates)
| Estado | Descrição |
| :--- | :--- |
| `default` | Estado inicial padrão |
| `hover` | Mouse sobre o elemento |
| `focus` | Elemento focado (teclado/clique) |
| `active` | Elemento sendo clicado ou em uso |
| `disabled` | Elemento desabilitado |
| `loading` | Aguardando processamento/carregamento |
| `success` | Operação concluída com sucesso |
| `error` | Falha na operação |

## 📦 Estados de Entidade

### Leads (LeadStates)
| Estado | Descrição |
| :--- | :--- |
| `new` | Lead recém-chegado |
| `contacted` | Primeiro contato realizado |
| `qualified` | Lead pronto para orçamento |
| `lost` | Lead descartado ou sem interesse |

### Promoções (PromotionStates)
| Estado | Descrição |
| :--- | :--- |
| `draft` | Em rascunho (não visível) |
| `active` | Promoção válida e visível |
| `expired` | Data de validade ultrapassada |
| `archived` | Removida do catálogo histórico |
