# Event Taxonomy — RECOM

Taxonomia oficial para eventos de Analytics (GA4/GTM).

## 🚀 Eventos Comerciais

| Evento | Trigger | Propriedades Sugeridas |
| :--- | :--- | :--- |
| `generate_lead_form_submit` | Sucesso no envio do form de contato | `form_id`, `supplier_interest` |
| `form_error` | Erro na validação ou envio | `field_name`, `error_type` |
| `contact_phone_click` | Clique no link de telefone | `phone_number`, `placement` |
| `contact_email_click` | Clique no link de e-mail | `email_address`, `placement` |
| `whatsapp_click` | Clique no botão de WhatsApp | `placement` |
| `supplier_card_click` | Clique no card do fornecedor | `supplier_name`, `slug` |
| `supplier_catalog_click` | Clique no link de catálogo (PDF/Site) | `supplier_name`, `catalog_type` |
| `process_card_click` | Clique no card de processo | `process_name`, `slug` |
| `promotion_click` | Clique em banner de promoção | `promotion_title`, `id` |

---

## 🛠️ Atributos HTML
Utilize o atributo `data-event` nos elementos interativos conforme definido em `analytics-events.js`.
