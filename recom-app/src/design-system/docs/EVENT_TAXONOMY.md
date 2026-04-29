# Event Taxonomy

Eventos oficiais ficam centralizados em `src/design-system/hooks/analytics-events.ts`.

## Eventos

| Evento | Quando dispara | Parametros obrigatorios |
|---|---|---|
| `generate_lead_form_submit` | tentativa de envio bem-sucedida do formulario | `page_location`, `form_name` |
| `form_error` | erro de validacao ou envio | `page_location`, `form_name`, `error_type`, `field_name` quando existir |
| `contact_phone_click` | clique em telefone | `page_location`, `placement`, `cta_label` |
| `contact_email_click` | clique em email | `page_location`, `placement`, `cta_label` |
| `whatsapp_click` | clique em WhatsApp | `page_location`, `placement`, `cta_label` |
| `supplier_card_click` | clique em card de fornecedor | `page_location`, `placement`, `entity_type`, `entity_slug` |
| `supplier_catalog_click` | clique em catalogo oficial | `page_location`, `placement`, `entity_slug`, `outbound_url` |
| `process_card_click` | clique em processo | `page_location`, `placement`, `entity_type`, `entity_slug` |
| `promotion_click` | clique em promocao | `page_location`, `placement`, `entity_type`, `entity_slug` |
| `file_download` | download de arquivo quando houver | `page_location`, `placement`, `outbound_url` |
| `external_catalog_unavailable_click` | usuario pede ajuda quando catalogo nao existe | `page_location`, `placement`, `entity_slug` |

## Regras

- Nao espalhar strings soltas em componentes.
- Nao duplicar evento no card e no link interno ao mesmo tempo.
- `outbound_url` deve ser enviado apenas para link externo.
- `entity_type` usa valores: `supplier`, `process`, `promotion`, `page`.
- `placement` descreve area: `header`, `footer`, `hero`, `card`, `detail`, `final_cta`, `contact_form`.
