# Lint Baseline - Administrative Unification

This document records legacy lint errors found during the standardization of the administrative CMS to avoid regression in new components.

## Current Status
- **Date**: 2026-04-30
- **Total Errors/Warnings**: 0 (Phase 2E cleanup complete)
- **Status**: **CLEAN**

## Resolved Issues (Phase 2E)
The following files have been cleaned of lint debt:
- `src/components/admin/suppliers/SupplierGeneralFields.tsx`: Fixed `any` casts in status select and unused `processes` prop.
- `src/components/admin/suppliers/SupplierCatalogListEditor.tsx`: Fixed `any` casts in status select and unused `productLines` prop.
- `src/components/admin/suppliers/SupplierMediaEditor.tsx`: Fixed duplicate `value` prop and `any` casts in type select.
- `src/components/admin/suppliers/SupplierLayoutEditor.tsx`: Fixed `any` casts in theme, layout, and hero mode selects.
- `src/components/admin/suppliers/SupplierProductLinesEditor.tsx`: Fixed unused map index.
- `src/components/admin/editor/AdminEntityListPage.tsx`: Replaced `<a>` with `Link` and fixed unused `eyebrow` prop.

## Standard Rules
All new components in `src/components/admin/editor/` must adhere to:
1. **No Explicit Any**: Use real types or `unknown`.
2. **Next.js Link**: Use `Link` from `next/link` for internal navigation.
3. **Unused Vars**: Remove or prefix with `_` if intentional.
