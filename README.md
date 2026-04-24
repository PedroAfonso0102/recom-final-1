# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Lead handling

The contact / quote form expects a configured delivery endpoint. When no endpoint is available, the site switches to fallback-only mode and does not claim that the message was sent.

### Environment variables

- `VITE_RECOM_CONTACT_ENDPOINT`: HTTPS URL of the contact delivery endpoint, webhook, or serverless function.
- `VITE_RECOM_CONTACT_TIMEOUT_MS` is not required in the current app; the client uses a built-in timeout.
- In local tests, `window.__RECOM_CONTACT_ENDPOINT__` can temporarily override the endpoint before the app loads.

### Expected endpoint contract

The endpoint should:

- Accept `POST` requests with JSON.
- Validate required fields on the server.
- Sanitize and normalize inputs before delivering them by e-mail, webhook, or CRM.
- Set `Reply-To` to the lead e-mail when allowed by the integration.
- Return a 2xx status only after the message has been accepted for delivery.
- Avoid leaking stack traces, raw tokens, or secrets in public responses.

Suggested payload keys:

- `form_name`
- `subject`
- `reply_to`
- `page_location`
- `referrer`
- `submitted_at`
- `consent`
- `lead.name`
- `lead.company`
- `lead.email`
- `lead.phone`
- `lead.phone_digits`
- `lead.supplier_interest`
- `lead.process_interest`
- `lead.codes`
- `lead.message`
- `email.subject`
- `email.body`

### Pending human setup

Before the form can deliver production leads, the following still needs to be confirmed outside the repository:

1. Final delivery endpoint or webhook URL.
2. Final destination mailbox / CRM inbox.
3. Sender domain and API credentials, if the integration sends e-mail directly.
4. Retention and logging policy for personal data.

## UI patterns

The site uses React with CSS Modules plus global design tokens in `src/index.css`.

- Use `src/components/ActionButton.jsx` for button-like links and actions. Supported visual variants include `primary`, `secondary`, `contrast`, `contrastSecondary`, `whatsapp`, `ghost`, `link`, `tertiary`, and `danger`.
- Use `src/components/ui/Card.jsx` for repeated card shells. Keep page-specific layout in each page module, but reuse the base card for border, radius, shadow, and hover behavior.
- Use `src/components/ui/FormField.jsx` for label/helper/error wiring on form controls. It centralizes `aria-describedby`, `aria-invalid`, `required`, and `aria-required`.
- Use `src/components/ui/Notice.jsx` for info, warning, error, and success states instead of creating one-off status panels.
- Use `src/components/ui/ExternalLink.jsx` for links that open in a new tab, especially catalog links.
- Prefer tokens from `src/index.css` for spacing, radius, shadows, focus rings, transitions, text colors, semantic colors, container widths, and control heights. Avoid hardcoded colors or bespoke shadows unless the component has a clear visual reason.
