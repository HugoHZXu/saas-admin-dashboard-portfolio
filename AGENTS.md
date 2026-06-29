# AGENTS

## Repo Role

- This repository is a pnpm workspaces monorepo for Hugo SaaS Console, a desensitized B2B SaaS management-console frontend portfolio.
- It contains the dashboard shell, feature remotes, shared admin utilities, docs, and AI workflow instructions.
- It consumes an external local Admin BFF GraphQL service from `/Users/xuhaoze/code-demo/hugo-saas-backend`.
- Backend contract, seed, database, Prisma, SQLite, and Activity Log normalization changes belong in `/Users/xuhaoze/code-demo/hugo-saas-backend`.
- The design system is maintained in the separate `HugoHZXu/hugo-ui` repository. This repository consumes `@hugo-ui/mui`; it does not own Hugo UI component source, Storybook, package publishing, or changesets.

## Core Boundaries

- Prefer small, package-scoped changes. Avoid mixing unrelated edits across packages.
- Do not edit generated output in `dist`, `coverage`, `storybook-static`, or `node_modules`.
- Preserve user changes already present in the worktree. Do not revert unrelated edits.
- If `.codex/local-context.md` exists, read it for local-only cross-repo context. Do not commit that file.
- Keep Hugo UI changes in the external `hugo-ui` repository unless the user explicitly asks to work across repositories.
- Do not add private company code, real customer data, real endpoints, access tokens, screenshots, production logs, or internal business rules.
- Use only synthetic B2B SaaS admin examples such as Organization, User, Domain, Admin, Role, Status, and Activity Log.
- If a dashboard task requires a backend contract change, stop and coordinate the backend repo first.
- Dashboard changes may update GraphQL client usage only when the external contract has already changed.

## External Design System Boundary

- Dashboard packages may import `@hugo-ui/mui` through npm-style package imports.
- Local source linking uses the ignored `hugo-ui/` symlink plus `docs/local-hugo-ui.md`; do not commit the symlink or `.local/hugo-ui.json`.
- Keep Hugo SaaS Console docs clear that Hugo UI is external. Do not list Hugo UI packages as packages owned by this repository.
- Do not add component-library tests, stories, package exports, changesets, or publishing scripts to this repository.
- If a dashboard task requires a reusable component API change, call out that the change belongs in the external design-system repository before editing.

## Current Architecture Boundaries

- `packages/admin-console`: browser shell and Module Federation host.
- `packages/admin-shared`: shared session and admin-shell UI utilities used by feature remotes.
- `packages/org-management`: Organization Management routing, page state, list/detail/activity surfaces, and workflow composition.
- `packages/user-management`: User Management routing, organization-scoped user workflows, detail/activity surfaces, and workflow composition.
- The Admin BFF GraphQL endpoint is external and defaults to `http://127.0.0.1:4010/graphql`.

## Project Skills

- Use `$portfolio-desensitization-review` when adding mock data, business copy, docs, README content, or code adapted from prior experience.
- Use `$local-hugo-ui-link` when setting up or repairing local symlink-based linking to an external `hugo-ui` clone without npm publishing.
- Use `$admin-dashboard-feature-slice` before implementing Organization Table, Organization Detail, Activity Log UI, or User Management slices.
- Use `$activity-log-normalization` only for dashboard consumption of normalized Activity Log records. Backend normalization belongs in `hugo-saas-backend`.

## High-Risk Changes

Treat these as high risk and call out the impact surface before making edits:

- Changes to Module Federation config, remote exposure, shared singleton config, or host/remote URLs.
- Changes to package exports, subpath exports, or root `index.ts` files in dashboard packages.
- Changes to providers, theme consumption, aliases, tokens, or shared style infrastructure.
- Changes to route structure or GraphQL client usage.
- Changes to React Compiler config or `"use memo"` coverage.

For high-risk changes:

- Prefer a minimal patch over a broad refactor.
- Validate more than the local file you changed.
- Mention likely downstream effects in the final summary.

## React Compiler Guardrails

- React Compiler is intentionally enabled only for `packages/org-management` and `packages/user-management`.
- The current rollout uses `compilationMode: "annotation"`. Add `"use memo"` only to components or custom hooks that are meant to be compiled.
- Do not enable React Compiler for `admin-console` or the external Hugo UI design system unless the user explicitly asks for that broader rollout.
- Do not delete `useMemo` or `useCallback` from provider, context, `useSyncExternalStore`, module-federation session, or cross-package API boundaries just because Compiler is available.
- Good candidates for Compiler-managed memoization are page-local derived objects, table rows, summary calculations, column definitions, and local modal handlers inside annotated feature components.
- When changing Compiler config or `"use memo"` coverage, verify the affected remote builds and the `admin-console` host build.

## Definition Of Done

- Dashboard behavior changes should include focused validation for the affected package.
- Public docs and README changes should stay aligned with the current package map, external backend boundary, and external design-system boundary.
- Generated output must not be left behind in the worktree unless the user explicitly asked for build artifacts.
- Do not start a local dev server after code updates unless the user explicitly asks for it.

## Validation Routing

### Dashboard App Changes

- For `packages/org-management`, run package typecheck/lint/build.
- For `packages/user-management`, run package typecheck/lint/build.
- If the change affects federated consumption, also run `./scripts/codex-node.sh pnpm run build-admin-console`.

### React Compiler Changes

- If you changed `babel-plugin-react-compiler`, `@rolldown/plugin-babel`, `reactCompilerPreset`, or Compiler options, run typecheck, lint, and build for both `org-management` and `user-management`.
- If a Compiler change affects either remote, also run `./scripts/codex-node.sh pnpm run build-admin-console` to verify the Module Federation host still consumes the remotes.

### Shared Styling And Provider Usage

- For changes to theme consumption, app-level providers, global style, locale, or alias files, do not stop at a single test file.
- Run package builds for affected dashboard packages.
- If the desired change requires modifying Hugo UI tokens or component internals, move that work to the external design-system repository instead of editing through this repo.

### Cross-Package Changes

- If the change spans app packages, shared utilities, or Module Federation wiring, prefer root validation commands.
- Use `./scripts/codex-node.sh pnpm run typecheck`, `./scripts/codex-node.sh pnpm run test:all`, `./scripts/codex-node.sh pnpm run build:all`, or `./scripts/codex-node.sh pnpm run verify` when the impact surface is broad.

## Common Commands

- Install dependencies: `./scripts/codex-node.sh pnpm install`
- Lint dashboard packages: `./scripts/codex-node.sh pnpm run lint`
- Typecheck dashboard packages: `./scripts/codex-node.sh pnpm run typecheck`
- Test frontend packages: `./scripts/codex-node.sh pnpm run test:frontend`
- Test all dashboard-owned tests: `./scripts/codex-node.sh pnpm run test:all`
- Build admin shared utilities: `./scripts/codex-node.sh pnpm run build-admin-shared`
- Build Organization remote: `./scripts/codex-node.sh pnpm run build-org-management`
- Build User remote: `./scripts/codex-node.sh pnpm run build-user-management`
- Build admin shell: `./scripts/codex-node.sh pnpm run build-admin-console`
- Build all dashboard packages: `./scripts/codex-node.sh pnpm run build:all`
- Full repo verification: `./scripts/codex-node.sh pnpm run verify`
- Set up local Hugo UI link: `./scripts/codex-node.sh pnpm run setup:local-hugo-ui`

Codex command sessions may not inherit the interactive terminal's Node PATH. When running Node.js, pnpm, or package scripts in this repository, use `./scripts/codex-node.sh <command>` so the local Node/pnpm runtime is selected consistently.
Do not run `./scripts/codex-node.sh pnpm run dev:*` at the end of an implementation unless the user explicitly asks for a running local server.

## Package Notes

### `packages/admin-console`

- Browser shell and Module Federation host.
- Imports `@hugo-ui/mui` as an external design-system dependency.
- Verify host builds when remote exposure, shared singleton config, or cross-remote routing changes.

### `packages/admin-shared`

- Shared session and admin-shell UI utilities used by feature remotes.
- Keep APIs small and avoid feature-specific business behavior unless shared by multiple dashboard packages.

### `packages/org-management`

- Owns Organization Management routing, page composition, query state, navigation, list/detail views, and object-scoped Activity Log surfaces.
- Keep Organization-specific behavior out of generic UI components.

### `packages/user-management`

- Owns User Management routing, organization-scoped user workflows, detail views, and user Activity Log surfaces.
- Keep user-management scope lightweight unless the user explicitly asks for a complete IAM-style implementation.
