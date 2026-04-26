# Analytics Contracts — RECOM

Estrutura de rastreamento de eventos comerciais.

## 📊 Plano de Mensuração
O site rastreia interações através de atributos `data-event`.

| Evento (Slug) | Descrição | Parâmetros Obrigatórios |
| :--- | :--- | :--- |
| `generate_lead_form_submit` | Envio do form de contato | `form_id`, `supplier_interest` |
| `whatsapp_click` | Clique no botão flutuante ou CTA | `placement` |
| `supplier_catalog_click` | Clique no link de catálogo | `supplier_name`, `catalog_type` |
| `contact_phone_click` | Clique em números de telefone | `phone_number` |

---
*Referência técnica em `src/design-system/hooks/analytics-events.js`.*
