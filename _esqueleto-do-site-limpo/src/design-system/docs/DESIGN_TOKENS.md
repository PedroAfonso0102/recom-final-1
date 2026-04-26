# Design Tokens — RECOM

Documentação dos tokens de design centralizados. Estes valores devem ser utilizados para manter a consistência visual em todo o projeto.

## 🎨 Cores (Colors)
Mapeadas para variáveis CSS globais em `tokens.css`.

| Token | Valor (CSS Var) | Descrição |
| :--- | :--- | :--- |
| **brand** | `--wire-brand` | Azul institucional RECOM |
| **text** | `--wire-text` | Cor principal de texto (quase preto) |
| **muted** | `--wire-muted` | Cor de suporte para textos secundários |
| **border** | `--wire-border` | Cor padrão de bordas e divisores |
| **surface** | `--wire-surface` | Cor de fundo de containers e cards |
| **success** | `--wire-success` | Feedback positivo |
| **danger** | `--wire-danger` | Erros e alertas críticos |

## 📏 Espaçamento (Spacing)
Escala baseada em 4px.

| Token | Valor | Uso Recomendado |
| :--- | :--- | :--- |
| **1** | 4px | Gaps mínimos, paddings internos de badges |
| **2** | 8px | Gaps entre labels e inputs |
| **3** | 12px | Espaçamento interno de cards pequenos |
| **4** | 16px | Padding padrão (md) |
| **5** | 24px | Padding confortável (lg) |
| **6** | 32px | Gaps entre seções menores |
| **7** | 48px | Padding de seções hero (xl) |
| **8** | 64px | Padding de seções amplas (2xl) |
| **9** | 96px | Gaps de layout majoritários |

## 🅰️ Tipografia (Typography)
Família principal: `Inter, sans-serif`.

| Token | Valor | Uso |
| :--- | :--- | :--- |
| **sm** | 0.85rem | Textos de rodapé, notas, badges |
| **md** | 1rem | Corpo de texto padrão |
| **lg** | 1.25rem | Leads de seção, títulos de cards |
| **xl** | 1.5rem | Títulos de seção (H2) |
| **xxl** | 2rem | Títulos principais (H1) |

## ⚪ Arredondamento (Radius)

| Token | Valor | Aplicação |
| :--- | :--- | :--- |
| **sm** | 4px | Badges e tags |
| **md** | 8px | Botões e inputs |
| **lg** | 12px | Cards e pequenos painéis |
| **xl** | 16px | Cards principais e modais |
| **card** | 16px | Alias para xl (padrão de cards) |
| **button**| 8px | Alias para md (padrão de botões) |
| **panel** | 20px | Alias para painéis de destaque |
