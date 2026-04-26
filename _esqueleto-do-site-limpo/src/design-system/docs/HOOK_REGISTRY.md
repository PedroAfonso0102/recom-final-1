# Hook Registry — RECOM

Mapeamento de âncoras (`data-hook`) para estilização e identificação de componentes.

## 📏 Padrão de Nomenclatura
Os hooks seguem a hierarquia:
`[area].[page].[section].[component].[slot].[state]`

---

## 🏗️ Layout (Global)
| Hook | Descrição |
| :--- | :--- |
| `site.header` | Container principal do topo |
| `site.footer` | Container principal do rodapé |
| `site.main` | Área de conteúdo principal da página |
| `site.breadcrumb` | Trilhas de navegação |

## 🏠 Home Page
| Hook | Descrição |
| :--- | :--- |
| `home.hero` | Seção de destaque inicial |
| `home.trust-proof` | Bloco de autoridade (Mitsubishi) |
| `home.suppliers-preview` | Grid de marcas na Home |
| `home.processes-preview` | Grid de soluções na Home |
| `home.final-cta` | Chamada para ação ao fim da página |

## 📦 Fornecedores (Suppliers)
| Hook | Descrição |
| :--- | :--- |
| `suppliers.hub` | Listagem geral de marcas |
| `suppliers.card` | Card individual de fornecedor |
| `suppliers.catalog-link` | Link externo para PDF/Site |
| `suppliers.internal-link` | Link para subpágina de detalhes |
| `suppliers.detail-hero` | Hero da subpágina do fornecedor |

## ⚙️ Processos (Processes)
| Hook | Descrição |
| :--- | :--- |
| `processes.hub` | Listagem geral de processos |
| `processes.card` | Card individual de operação (Usinagem, etc) |
| `processes.detail-hero` | Hero da subpágina do processo |

## 📞 Contato & Leads
| Hook | Descrição |
| :--- | :--- |
| `contact.form` | Tag `<form>` de captura |
| `contact.form.field.name` | Input de Nome |
| `contact.form.field.email` | Input de E-mail |
| `contact.form.submit` | Botão de envio |
| `contact.form.success` | Mensagem de sucesso |
| `contact.form.error` | Mensagem de erro |
