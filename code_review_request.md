# Code Review Request - Merge Conflict Resolution & Import Standardization

## Changes
- Resolved all merge conflicts in `frontend/src/App.tsx`, `Dashboard.tsx`, and all pages in `materials`, `warehouses`, and `works` directories.
- Standardized all local imports in the frontend to use the `.js` extension, as requested and required for the build environment.
- Fixed `StockMovement.tsx` by replacing non-existent common components with standard UI components (`Card`, `Input`, `Button`).
- Fixed missing `ghost` variant in the `Button` component by changing it to `outline` across multiple files.
- Cleaned up generated `.js` and `.d.ts` files in the `src` directories that were causing build issues.
- Fixed a TypeScript error in `auth.middleware.ts` by defining an `AuthRequest` interface.

## Verification
- `npm run build` succeeds in the `frontend` directory.
- `tsc` succeeds in the `backend` directory.
