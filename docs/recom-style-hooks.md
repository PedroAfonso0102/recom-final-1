# RECOM Style Hooks

This document defines the structural hook system used across the RECOM site.

## Convention

Use `data-recom-*` attributes only for structure, styling, QA and analytics.

### Attribute Map

- `data-recom-page`: page-level root identifier
- `data-recom-section`: page section identifier
- `data-recom-component`: reusable component identifier
- `data-recom-element`: named inner element
- `data-recom-role`: functional role for the element
- `data-recom-variant`: visual or behavioral variant
- `data-recom-state`: runtime or content state
- `data-recom-slot`: internal content slot
- `data-recom-track`: future analytics hook

### Naming Rules

- Use kebab-case
- Keep names stable and functional
- Avoid visual descriptors like colors, sizes or decorative adjectives
- Do not place personal or sensitive data in hook values
- Prefer context-based names like `supplier-card`, `process-card`, `contact-form`

### Example

```html
<main data-recom-page="home">
  <section data-recom-section="hero">
    <h1 data-recom-slot="title">...</h1>
    <a data-recom-component="button" data-recom-variant="primary" data-recom-role="primary-cta">
      ...
    </a>
  </section>
</main>
```

## Pages

| Page | Hook |
| --- | --- |
| Home | `data-recom-page="home"` |
| A RECOM | `data-recom-page="about"` |
| Fornecedores & Catálogos | `data-recom-page="suppliers"` |
| Página individual de fornecedor | `data-recom-page="supplier-detail"` |
| Soluções | `data-recom-page="solutions"` |
| Página individual de processo | `data-recom-page="process-detail"` |
| Promoções | `data-recom-page="promotions"` |
| Contato / Orçamento | `data-recom-page="contact"` |
| Política de Privacidade | `data-recom-page="privacy"` |
| 404 | `data-recom-page="not-found"` |

## Sections

| Section | Hook |
| --- | --- |
| Global header | `data-recom-section="global-header"` |
| Global footer | `data-recom-section="global-footer"` |
| Hero | `data-recom-section="hero"` |
| Intro | `data-recom-section="intro"` |
| Trust | `data-recom-section="trust"` |
| Supplier hub | `data-recom-section="supplier-hub"` |
| Supplier list | `data-recom-section="supplier-list"` |
| Supplier overview | `data-recom-section="supplier-overview"` |
| Process hub | `data-recom-section="process-hub"` |
| Process grid | `data-recom-section="process-grid"` |
| Contact strip | `data-recom-section="contact-strip"` |
| CTA final | `data-recom-section="cta-final"` |
| Form area | `data-recom-section="form-area"` |
| Catalog list | `data-recom-section="catalog-list"` |
| Related items | `data-recom-section="related-items"` |
| Empty state area | `data-recom-section="empty-state"` |
| Fallback links | `data-recom-section="fallback-links"` |
| Page intro | `data-recom-section="page-intro"` |
| Page summary | `data-recom-section="page-summary"` |
| Page guidance | `data-recom-section="page-guidance"` |
| Page body | `data-recom-section="page-body"` |
| Privacy intro | `data-recom-section="privacy-intro"` |
| Privacy body | `data-recom-section="privacy-body"` |
| Not found body | `data-recom-section="not-found-body"` |

## Components

| Component | Hook |
| --- | --- |
| Page shell | `data-recom-component="page-shell"` |
| Site header | `data-recom-component="site-header"` |
| Site footer | `data-recom-component="site-footer"` |
| Navigation menu | `data-recom-component="nav-menu"` |
| Mobile menu | `data-recom-component="mobile-menu"` |
| Logo | `data-recom-component="logo"` |
| Button | `data-recom-component="button"` |
| Text link | `data-recom-component="text-link"` |
| External link | `data-recom-component="external-link"` |
| Generic card | `data-recom-component="card"` |
| Supplier card | `data-recom-component="supplier-card"` |
| Process card | `data-recom-component="process-card"` |
| Promotion card | `data-recom-component="promotion-card"` |
| Contact form | `data-recom-component="contact-form"` |
| Form field | `data-recom-component="form-field"` |
| Empty state | `data-recom-component="empty-state"` |
| Alert | `data-recom-component="alert"` |
| Breadcrumb | `data-recom-component="breadcrumb"` |
| Image | `data-recom-component="image"` |
| CTA section | `data-recom-component="cta-section"` |
| WhatsApp FAB | `data-recom-component="whatsapp-fab"` |

## Elements

| Element | Hook |
| --- | --- |
| Title | `data-recom-element="title"` |
| Subtitle | `data-recom-element="subtitle"` |
| Body | `data-recom-element="body"` |
| Primary CTA | `data-recom-element="primary-cta"` |
| Secondary CTA | `data-recom-element="secondary-cta"` |
| Tertiary CTA | `data-recom-element="tertiary-cta"` |
| Card title | `data-recom-element="card-title"` |
| Card description | `data-recom-element="card-description"` |
| Card image | `data-recom-element="card-image"` |
| Form label | `data-recom-element="form-label"` |
| Form input | `data-recom-element="form-input"` |
| Form error | `data-recom-element="form-error"` |
| Form success | `data-recom-element="form-success"` |
| Form help | `data-recom-element="form-help"` |
| Form checkbox | `data-recom-element="form-checkbox"` |
| Status message | `data-recom-element="status-message"` |
| Skip link | `data-recom-element="skip-link"` |
| Brand link | `data-recom-element="brand-link"` |

## Variants

| Variant | Meaning |
| --- | --- |
| `primary` | Main action or strongest emphasis |
| `secondary` | Secondary action |
| `tertiary` | Low-emphasis control |
| `external` | Points outside the app |
| `inline` | Embedded in text or list flow |
| `compact` | Reduced layout density |
| `featured` | Highlighted item |
| `disabled` | Not interactive |
| `empty` | Empty or no-data state |
| `open` | Expanded or visible state |
| `closed` | Collapsed or hidden state |

## States

| State | Meaning |
| --- | --- |
| `active` | Current active item |
| `idle` | Default neutral state |
| `loading` | In flight / submitting |
| `submitting` | Lead form submit in progress |
| `success` | Completed successfully |
| `error` | Failed or invalid |
| `invalid` | Validation failed |
| `unavailable` | Feature or endpoint not available |
| `empty` | No results or no content |
| `disabled` | Temporarily disabled |
| `open` | Expanded menu/state |
| `closed` | Collapsed menu/state |
| `catalog-available` | Supplier catalog exists |
| `catalog-unavailable` | Supplier catalog missing |

## Track Hooks

These are reserved for future analytics wiring. Existing logic still uses the current analytics helpers.

- `primary-cta-click`
- `secondary-cta-click`
- `contact-phone-click`
- `contact-email-click`
- `contact-whatsapp-click`
- `whatsapp-click`
- `supplier-card-click`
- `supplier-catalog-click`
- `process-card-click`
- `lead-form-submit`

## Current Central Files

- `src/styles/recom/index.css`
- `src/styles/recom/tokens.css`
- `src/styles/recom/base.css`
- `src/styles/recom/components.css`
- `src/styles/recom/sections.css`
- `src/styles/recom/utilities.css`
- `src/styles/recom/states.css`
- `src/styles/recom/motion.css`
- `src/styles/recom/styleRegistry.js`

## How To Style Later

1. Keep HTML semantics intact.
2. Style `data-recom-page` first for page-wide defaults.
3. Layer `data-recom-section` for block-level layout.
4. Use `data-recom-component` for reusable surfaces like cards, forms and buttons.
5. Use `data-recom-state` and `data-recom-variant` only when a component genuinely changes behavior or appearance.
6. Keep motion work isolated to `src/styles/recom/motion.css`.

## What Is Not Migrated Yet

- Active visual system still lives in `src/index.css`
- Legacy CSS files under `src/assets/css/*` remain in the repo but are not part of the current app shell
- No component-level redesign was introduced
- No new animation system was added
- No heavy design system dependency was introduced

## Do Not Change In This Phase

- Brand colors
- Typography
- Spacing scale
- Shadows
- Border radius
- Layout grid
- Animation behavior
- Existing content copy unless needed for technical hooks or test compatibility
- HTML semantics

## Notes

- The hook registry is intentionally simple and string-based.
- The site currently passes lint, build and Playwright verification after instrumentation.
