# RECOM CMS Fase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first safe, block-based CMS layer for RECOM: real pages, real sections, real publish/preview flow, and public rendering from Supabase.

**Architecture:** Keep the current Next.js app and admin shell, then layer a CMS page/section model on top. The CMS is registry-driven: every renderable block is approved, schema-validated, and rendered only if it exists in the registry. Public routes consume published data only, while preview/admin routes can read drafts.

**Tech Stack:** Next.js App Router, Server Actions, Supabase SSR + supabase-js, Zod, shadcn/ui, TypeScript.

---

### Task 1: CMS Database Foundation

**Files:**
- Create: `supabase/migrations/20260426000003_cms_pages.sql`
- Modify: `src/lib/database.types.ts`

- [ ] **Step 1: Write the CMS migration**

Add `pages`, `page_sections`, and `page_versions`, plus enums/policies/triggers for CMS content. Include:

- `pages.status` with `draft | published | archived`
- `page_sections.status` with `draft | published | archived`
- `page_sections.visibility` with `visible | hidden`
- unique `(page_id, version_number)` on `page_versions`
- updated_at triggers
- RLS that keeps draft data private

- [ ] **Step 2: Apply the migration locally**

Run:

```powershell
npx supabase migration up
```

Expected: the new CMS tables are created without breaking the existing `suppliers`, `processes`, `promotions`, or `leads` tables.

- [ ] **Step 3: Regenerate Supabase types**

Run:

```powershell
npm run db:types
```

Expected: `src/lib/database.types.ts` includes the new CMS tables and enums.

- [ ] **Step 4: Verify the type surface**

Run:

```powershell
npx tsc --noEmit
```

Expected: the repo still typechecks after the schema expansion.

---

### Task 2: CMS Schemas and Registry

**Files:**
- Create: `src/cms/types.ts`
- Create: `src/cms/editor-fields.ts`
- Create: `src/cms/schemas/page.schema.ts`
- Create: `src/cms/schemas/section.schema.ts`
- Create: `src/cms/schemas/components/hero-section.schema.ts`
- Create: `src/cms/schemas/components/page-header.schema.ts`
- Create: `src/cms/schemas/components/cta-section.schema.ts`
- Create: `src/cms/schemas/components/supplier-grid.schema.ts`
- Create: `src/cms/schemas/components/process-grid.schema.ts`
- Create: `src/cms/schemas/components/promotion-grid.schema.ts`
- Create: `src/cms/schemas/components/text-section.schema.ts`
- Create: `src/cms/component-registry.ts`
- Create: `src/cms/type-tests.ts`

- [ ] **Step 1: Define the shared CMS types**

Add the shared registry and field types needed by the admin and renderer.

- [ ] **Step 2: Write the page and section schemas**

Implement Zod schemas for page create/update and section create/update. Reject reserved slugs and unknown component types.

- [ ] **Step 3: Write block schemas**

Implement strict Zod schemas for the first blocks only:

- `HeroSection`
- `PageHeader`
- `CTASection`
- `SupplierGrid`
- `ProcessGrid`
- `PromotionGrid`
- `TextSection`

- [ ] **Step 4: Build the component registry**

Register the blocks with:

- `type`
- `label`
- `description`
- `category`
- `component`
- `schema`
- `defaultProps`
- `fields`

The registry must be the only allowed source of renderable CMS blocks.

- [ ] **Step 5: Add type-level smoke tests**

Create `src/cms/type-tests.ts` with `@ts-expect-error` assertions for:

- unknown component type
- invalid section props
- reserved slug rejection

Run:

```powershell
npx tsc --noEmit
```

Expected: the type tests fail before implementation is complete, then pass after the schemas/registry are in place.

---

### Task 3: CMS Queries, Renderer, and Revalidation

**Files:**
- Create: `src/server/queries/cms-pages.ts`
- Create: `src/cms/render-page.tsx`
- Create: `src/cms/render-section.tsx`
- Create: `src/lib/revalidation/cms.ts`

- [ ] **Step 1: Write the read query layer**

Add query helpers for:

- `listPages`
- `getPageById`
- `getPageBySlug`
- `getPreviewPageBySlug`
- `getPageVersions`
- `getSectionsForPage`

The public query path must return only published content.

- [ ] **Step 2: Write the page renderer**

Implement `render-page.tsx` to:

- read a page record and its sections
- sort sections by `sort_order`
- render only registered blocks
- skip invalid public sections without crashing the page

- [ ] **Step 3: Write the section renderer**

Implement `render-section.tsx` to:

- look up the block definition in the registry
- validate props against the schema
- render the component or return a safe fallback

- [ ] **Step 4: Add revalidation helpers**

Create CMS-specific revalidation helpers for:

- `/`
- `/admin/pages`
- `/admin/pages/[id]`
- `/admin/preview/[slug]`
- any CMS public slug route

- [ ] **Step 5: Verify renderer behavior**

Run:

```powershell
npx tsc --noEmit
```

Expected: renderer/query imports resolve and the public renderer only accepts registered component types.

---

### Task 4: CMS Authentication and Server Actions

**Files:**
- Modify: `src/lib/auth/utils.ts`
- Modify: `src/lib/supabase/middleware.ts`
- Modify: `src/server/actions/auth.ts`
- Create: `src/server/actions/cms-pages.ts`
- Modify: `src/app/(auth)/login/page.tsx`

- [ ] **Step 1: Replace mock-first admin access**

Make admin access depend on a real Supabase session in middleware and server-side auth checks. Keep the auth gate fail-closed.

- [ ] **Step 2: Implement a real login flow**

Replace the mock login button with a Supabase auth flow that can create or consume a real session. The login page must no longer rely on the `recom_mock_auth` cookie as the primary path.

- [ ] **Step 3: Write CMS server actions**

Implement:

- `createPage`
- `updatePage`
- `archivePage`
- `createSection`
- `updateSection`
- `duplicateSection`
- `reorderSections`
- `hideSection`
- `archiveSection`
- `publishPage`
- `restorePageVersion`

Every action must:

- verify auth
- validate input with Zod
- return `ActionResult`
- revalidate affected paths
- keep service-role usage server-only

- [ ] **Step 4: Add action-level smoke checks**

Run:

```powershell
npx tsc --noEmit
```

Expected: the action signatures and imports are valid, and the auth gate is used consistently.

---

### Task 5: Admin Pages for CMS

**Files:**
- Create: `src/app/(admin)/admin/pages/page.tsx`
- Create: `src/app/(admin)/admin/pages/new/page.tsx`
- Create: `src/app/(admin)/admin/pages/[id]/page.tsx`
- Create: `src/app/(admin)/admin/pages/[id]/sections/page.tsx`
- Create: `src/app/(admin)/admin/preview/[slug]/page.tsx`
- Modify: `src/app/(admin)/admin/layout.tsx`

- [ ] **Step 1: Add CMS navigation in the admin shell**

Expose the new CMS pages entry in the admin sidebar without removing the existing commerce screens.

- [ ] **Step 2: Build the page list screen**

Show real CMS pages with:

- title
- slug
- status
- updated_at
- published_at
- edit and preview actions

- [ ] **Step 3: Build page create/edit screens**

Allow editing page metadata:

- title
- slug
- description
- SEO title
- SEO description
- OG image URL

- [ ] **Step 4: Build section management**

Allow:

- add section from registry
- edit props
- duplicate
- hide
- archive
- move up/down

- [ ] **Step 5: Build protected preview**

Preview should render draft content for authenticated users and show invalid block diagnostics instead of hiding errors silently.

- [ ] **Step 6: Verify the admin UI**

Run:

```powershell
npx tsc --noEmit
```

Then visually verify the admin screens in the browser after the build is green.

---

### Task 6: Public CMS Route Integration

**Files:**
- Modify: `src/app/(public)/page.tsx`
- Create: `src/app/(public)/[slug]/page.tsx`

- [ ] **Step 1: Wire the public CMS route**

Add a public CMS route that loads a page by slug and renders it through the CMS renderer.

- [ ] **Step 2: Keep the legacy homepage as fallback**

If no published CMS record exists for `home`, keep the current homepage behavior for now.

- [ ] **Step 3: Ensure invalid sections do not break public pages**

Public rendering must skip invalid sections and continue rendering the rest of the page.

- [ ] **Step 4: Verify the public route**

Run:

```powershell
npm run build
```

Expected: the public route compiles and the legacy pages continue to work.

---

### Task 7: Verification and Cleanup

**Files:**
- Modify only if needed to fix issues surfaced during verification

- [ ] **Step 1: Run lint**

Run:

```powershell
npm run lint
```

- [ ] **Step 2: Run typecheck**

Run:

```powershell
npx tsc --noEmit
```

- [ ] **Step 3: Run build**

Run:

```powershell
npm run build
```

- [ ] **Step 4: Fix any regressions and re-run the failed command**

Do not leave the branch with a broken build or broken typecheck.

- [ ] **Step 5: Commit the implementation**

Use a focused commit message for the CMS Fase 1 work after the checks are green.

---

## Coverage Check

This plan covers the spec items as follows:

- pages, sections, and versions: Task 1
- component registry and schemas: Task 2
- secure rendering and revalidation: Task 3
- auth and server actions: Task 4
- admin page UX: Task 5
- public route integration: Task 6
- lint/typecheck/build: Task 7

## Gaps Intentionally Deferred

These are intentionally excluded from Fase 1 and will be handled in later phases:

- theme tokens and theme publishing
- asset uploads and library management
- navigation editor
- site settings editor
- rich workflow or granular roles
- drag-and-drop page builder
- removal of legacy commerce routes

