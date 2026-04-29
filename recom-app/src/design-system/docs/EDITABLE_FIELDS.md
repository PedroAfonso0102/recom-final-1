# Editable Fields

## Fornecedores

- Identidade: `name`, `slug`, `logoUrl`, `shortDescription`, `longDescription`.
- Catalogo: `catalogUrl`, `eCatalogUrl`, `catalogs[]`.
- Relacionamentos: `relatedProcesses` ou tabela `supplier_processes`.
- SEO: `seoTitle`, `seoDescription`.
- Publicacao: `status`, `sortOrder`, `publishedAt`, `scheduledAt`, `lastReviewedAt`.

## Processos

- Identidade: `name`, `slug`, `imageUrl`.
- Conteudo: `shortDescription`, `longDescription`.
- Relacionamentos: fornecedores associados.
- SEO: `seoTitle`, `seoDescription`.
- Publicacao: `status`, `sortOrder`, `publishedAt`, `scheduledAt`.

## Promocoes

- Conteudo: `title`, `slug`, `description`, `imageUrl`, `terms`.
- Comercial: `supplierId`, `startsAt`, `endsAt`, `ctaLabel`, `ctaUrl`.
- SEO: `seoTitle`, `seoDescription`.
- Publicacao: `status`, `publishedAt`, `scheduledAt`.

## Site settings

- Empresa: `companyName`.
- Contato: `phone`, `whatsapp`, `email`, `address`, `businessHours`, `googleMapsUrl`.
- Social: `socialLinks`.
- SEO default: `defaultSeoTitle`, `defaultSeoDescription`.

## Leads

- Entrada publica: `name`, `company`, `email`, `phone`, `whatsapp`, `supplierInterest`, `processInterest`, `itemCode`, `message`, `sourcePage`, `sourceType`.
- Operacao interna: `status`, `priority`, `assignedTo`, `notes`, `lastContactedAt`, `leadEvents`.
