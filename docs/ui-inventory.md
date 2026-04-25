# UI Inventory - RECOM Metal Duro

## Snapshot

- Stack: React 19 + Vite + React Router DOM + `react-helmet-async`
- Current styling: global CSS baseline in `src/index.css`
- New central hook layer: `src/styles/recom/*`
- Legacy CSS bundle in `src/assets/css/*` exists but is not imported by the app shell
- Content/data sources: `src/data/contato.js`, `src/data/fornecedores.js`, `src/data/processos.js`, `src/data/promocoes.js`

## Public Routes

| Route | File | Main component | Main hooks | Sections / internal blocks | Notes |
| --- | --- | --- | --- | --- | --- |
| `/` | `src/pages/Home.jsx` | `Home` | `data-recom-page="home"` | `hero`, `intro`, `trust`, `supplier-hub`, `process-hub`, `contact-strip`, `cta-final` | Hero CTA, supplier cards, process cards, contact block, promotions empty state, presence image |
| `/a-recom` | `src/pages/ARecom.jsx` | `ARecom` | `data-recom-page="about"` | `hero`, `page-summary`, `page-body`, `page-guidance`, `supplier-hub`, `contact-strip` | Institutional overview and supplier list |
| `/fornecedores-catalogos` | `src/pages/FornecedoresCatalogos.jsx` | `FornecedoresCatalogos` | `data-recom-page="suppliers"` | `hero`, `supplier-list`, `page-guidance` | Supplier cards, catalog links, empty state |
| `/fornecedores-catalogos/:slug` | `src/pages/FornecedorPage.jsx` | `FornecedorPage` | `data-recom-page="supplier-detail"` | `hero`, `supplier-overview`, `catalog-list`, `related-items`, `contact-strip`, `fallback-links` | Supplier detail, related processes, external institutional/catalog links |
| `/solucoes` | `src/pages/Solucoes.jsx` | `Solucoes` | `data-recom-page="solutions"` | `hero`, `intro`, `page-guidance`, `process-grid`, `cta-final` | Select-to-navigate, process cards, empty state |
| `/solucoes/:slug` | `src/pages/ProcessoPage.jsx` | `ProcessoPage` | `data-recom-page="process-detail"` | `hero`, `page-guidance`, `related-items`, `catalog-list`, `page-body`, `contact-strip`, `fallback-links` | Process detail, supplier cards, useful catalogs, FAQ |
| `/promocoes` | `src/pages/Promocoes.jsx` | `Promocoes` | `data-recom-page="promotions"` | `hero`, `page-body`, `contact-strip` | Promotions list or empty state |
| `/contato` | `src/pages/Contato.jsx` | `Contato` | `data-recom-page="contact"` | `hero`, `form-area`, `page-body`, `contact-strip`, `page-summary`, `page-guidance` | Contact form, direct channels, location, before-send checklist |
| `/politica-de-privacidade` | `src/pages/PoliticaPrivacidade.jsx` | `PoliticaPrivacidade` | `data-recom-page="privacy"` | `hero`, `privacy-intro`, `privacy-body`, `page-body`, `fallback-links`, `page-summary`, `page-guidance`, `cta-final` | Legal/content page with contact links |
| `*` | `src/pages/NotFound.jsx` | `NotFound` | `data-recom-page="not-found"` | `not-found-body` | Recovery links only, `noindex` metadata |

## Legacy Redirects

These live in `src/App.jsx` and remain unchanged for compatibility:

- `/empresa` -> `/a-recom`
- `/catalogo` and `/Catalogo` -> `/fornecedores-catalogos`
- `/produtos` -> `/solucoes`
- `/torneamento`, `/fresamento`, `/furacao`, `/fixacao` -> matching solution routes
- `/Contato` -> `/contato`
- `/seguranca` -> `/fornecedores-catalogos/mitsubishi-materials`
- `/sugestoes-de-utilizacao` -> `/solucoes`
- `/videos` -> `/solucoes`

## Global Components

| Component | File | Hooks added | Purpose |
| --- | --- | --- | --- |
| `Layout` | `src/components/Layout.jsx` | `page-shell`, skip link | App shell wrapper around header, routed page content, footer |
| `Header` | `src/components/Header.jsx` | `site-header`, `global-header`, `nav-menu`, `mobile-menu`, `logo`, `button`, `text-link` | Global navigation and contact shortcuts |
| `Footer` | `src/components/Footer.jsx` | `site-footer`, `global-footer`, `text-link`, `external-link`, `cta-section` | Global footer links and contacts |
| `ContactForm` | `src/components/ContactForm.jsx` | `contact-form`, `form-field`, `alert`, `button`, `external-link` | Lead capture form and fallback handling |
| `BrandLogo` | `src/components/BrandLogo.jsx` | `logo` | SVG logo component, currently not used in header but kept for reuse |
| `WhatsAppFAB` | `src/components/WhatsAppFAB.jsx` | `whatsapp-fab`, `external-link` | Floating WhatsApp contact shortcut |
| `SEOHead` | `src/components/SEOHead.jsx` | none | Metadata only; no structural hook required |

## Critical Reusable Elements

- Buttons and CTAs
  - `data-recom-component="button"`
  - `data-recom-variant="primary|secondary|tertiary"`
  - `data-recom-role="primary-cta|secondary-cta|form-submit|menu-toggle"`
- Text and external links
  - `data-recom-component="text-link"`
  - `data-recom-component="external-link"`
  - `data-recom-track="contact-phone-click|contact-email-click|whatsapp-click|supplier-catalog-click|process-card-click|lead-form-submit"`
- Cards
  - `supplier-card`
  - `process-card`
  - `promotion-card`
- Form structure
  - `contact-form`
  - `form-field`
  - `form-label`, `form-input`, `form-error`, `form-help`
  - states: `idle`, `loading`, `success`, `error`, `invalid`, `unavailable`
- Empty and status blocks
  - `empty-state`
  - `alert`
- Media
  - `logo`
  - `image`
  - `card-image`

## Hook Coverage By File

- `src/pages/Home.jsx`
  - Page: `home`
  - Sections: `hero`, `intro`, `trust`, `supplier-hub`, `process-hub`, `contact-strip`, `cta-final`
  - Components: supplier cards, process cards, images, CTA groups
- `src/pages/ARecom.jsx`
  - Page: `about`
  - Sections: `hero`, `page-summary`, `page-body`, `page-guidance`, `supplier-hub`, `contact-strip`
  - Components: supplier cards, CTA groups, institutional image
- `src/pages/FornecedoresCatalogos.jsx`
  - Page: `suppliers`
  - Sections: `hero`, `supplier-list`, `page-guidance`
  - Components: supplier cards, catalog links, empty state
- `src/pages/FornecedorPage.jsx`
  - Page: `supplier-detail`
  - Sections: `hero`, `supplier-overview`, `catalog-list`, `related-items`, `contact-strip`, `fallback-links`
  - Components: supplier card blocks, external catalog links, empty states
- `src/pages/Solucoes.jsx`
  - Page: `solutions`
  - Sections: `hero`, `intro`, `page-guidance`, `process-grid`, `cta-final`
  - Components: select field, process cards, empty state
- `src/pages/ProcessoPage.jsx`
  - Page: `process-detail`
  - Sections: `hero`, `page-guidance`, `related-items`, `catalog-list`, `page-body`, `contact-strip`, `fallback-links`
  - Components: supplier cards, external links, empty states
- `src/pages/Promocoes.jsx`
  - Page: `promotions`
  - Sections: `hero`, `page-body`, `contact-strip`
  - Components: promotion cards, empty state, WhatsApp fallback
- `src/pages/Contato.jsx`
  - Page: `contact`
  - Sections: `hero`, `form-area`, `page-body`, `contact-strip`, `page-summary`, `page-guidance`
  - Components: contact form, direct links, map link
- `src/pages/PoliticaPrivacidade.jsx`
  - Page: `privacy`
  - Sections: `hero`, `privacy-intro`, `privacy-body`, `page-body`, `fallback-links`, `page-summary`, `page-guidance`, `cta-final`
  - Components: contact links, CTA buttons
- `src/pages/NotFound.jsx`
  - Page: `not-found`
  - Section: `not-found-body`
  - Components: empty state + recovery nav

## Central Style Files

Created as a non-visual scaffold in `src/styles/recom/`:

- `index.css`
- `tokens.css`
- `base.css`
- `components.css`
- `sections.css`
- `utilities.css`
- `states.css`
- `motion.css`

## Pending Modularization

- `src/index.css` still holds the active global baseline and utility classes
- `src/assets/css/*` still exists as legacy CSS but is not imported
- Some nested list items still rely on semantics plus parent hooks instead of per-item `data-recom-*`
- `SEOHead` is intentionally hook-free because it only emits metadata
- The site still uses inline structural styles in a few legacy places to preserve the current visual baseline

## Notes For Future Styling

- Keep hook names stable and functional
- Prefer central styling in `src/styles/recom/*`
- Avoid changing visible copy just to satisfy hook names; use `aria-label` or hook attributes when possible
- The current build and tests pass after hook insertion
