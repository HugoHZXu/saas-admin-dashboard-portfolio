# AGENTS

## Repo Role

- This repository is a pnpm workspaces monorepo for a desensitized B2B SaaS admin dashboard portfolio.
- It contains the dashboard shell, feature remotes, shared admin utilities, local GraphQL BFF, synthetic data, docs, and AI workflow instructions.
- The design system is maintained in the separate `HugoHZXu/hugo-ui` repository. This repository consumes `@hugo-ui/mui`; it does not own Hugo UI component source, Storybook, package publishing, or changesets.
- Use `docs/project-brief.md`, `docs/desensitization-rules.md`, `docs/implementation-roadmap.md`, and `docs/agent-workflow.md` as working context before expanding dashboard features.

## Core Boundaries

- Prefer small, package-scoped changes. Avoid mixing unrelated edits across packages.
- Do not edit generated output in `dist`, `coverage`, `storybook-static`, or `node_modules`.
- Preserve user changes already present in the worktree. Do not revert unrelated edits.
- If `.codex/local-context.md` exists, read it for local-only cross-repo context. Do not commit that file.
- Keep Hugo UI changes in the external `hugo-ui` repository unless the user explicitly asks to work across repositories.
- Do not add private company code, real customer data, real endpoints, access tokens, screenshots, production logs, or internal business rules.
- Use only synthetic B2B SaaS admin examples such as Organization, User, Domain, Admin, Role, Status, and Activity Log.

## Portfolio-Specific Guardrails

- Treat this repository as a desensitized B2B SaaS admin dashboard portfolio, not an open-source copy of any prior product.
- Preserve reusable capability patterns only. Do not copy private implementation assets, class names, token names, endpoint names, screenshots, customer data, permission rules, or product-specific wording from external/internal projects.
- Keep `Table` behavior generic at the design-system boundary. Put Organization/User-specific search, filters, query state, sorting behavior, pagination behavior, and navigation in page-level code or the BFF/mock service layer.
- `SearchBox` is the preferred search control for table search. Do not build search fields by composing generic inputs unless the user explicitly asks for an input-only prototype.
- Search and Filter are mutually exclusive table control modes in this dashboard pattern. Use a `Toggle`-style mode switch instead of showing search and filter controls side by side.
- Render status pills with `StatusTag` instead of hardcoded page styles.
- Keep business state to visual tone mapping in the app/business layer; `StatusTag` stays visual and generic.
- Shared UI styling should consume `@hugo-ui/mui` theme roles, typography, and public component APIs.
- Mock data must be synthetic and should not resemble real customer records.

## External Design System Boundary

- Dashboard packages may import `@hugo-ui/mui` through npm-style package imports.
- Local source linking uses the ignored `hugo-ui/` symlink plus `docs/local-hugo-ui.md`; do not commit the symlink or `.local/hugo-ui.json`.
- Keep admin-dashboard docs clear that Hugo UI is external. Do not list Hugo UI packages as packages owned by this repository.
- Do not add component-library tests, stories, package exports, changesets, or publishing scripts to this repository.
- If a dashboard task requires a reusable component API change, call out that the change belongs in the external design-system repository before editing.

## Current Architecture Boundaries

- `packages/admin-console`: browser shell and Module Federation host.
- `packages/admin-server`: local GraphQL BFF, Prisma schema, synthetic seed data, list contracts, and Activity Log normalization.
- `packages/admin-shared`: shared session and admin-shell UI utilities used by feature remotes.
- `packages/org-management`: Organization Management routing, page state, list/detail/activity surfaces, and workflow composition.
- `packages/user-management`: User Management routing, organization-scoped user workflows, detail/activity surfaces, and workflow composition.
- Shared types can be introduced when they clarify the contract between app and BFF/mock service; do not add shared packages speculatively.

## Project Skills

- Use `$portfolio-desensitization-review` when adding mock data, business copy, docs, README content, or code adapted from prior experience.
- Use `$local-hugo-ui-link` when setting up or repairing local symlink-based linking to an external `hugo-ui` clone without npm publishing.
- Use `$admin-dashboard-feature-slice` before implementing Organization Table, Organization Detail, Activity Log, or future User Management slices.
- Use `$activity-log-normalization` before implementing Activity Log BFF normalization or audit-event view models.

## Plan Before Editing

- Make a brief plan first when the task changes package boundaries, touches shared infra, changes public APIs, or affects Module Federation setup.
- Skip formal planning only for narrow, low-risk edits such as a focused component usage fix, a local test update, or a typo-level documentation change.
- If the change is likely to affect multiple packages, state the impact surface before editing.

## Investigation-Only Tasks

- For investigation-only tasks, prefer no-edit analysis first.
- Do not create speculative patches unless the user asked for implementation.
- For root cause analysis, API surveys, export graph mapping, dependency audits, or migration planning, gather evidence before proposing code changes.
- If a task begins as investigation and later clearly requires implementation, state that transition before editing.

## High-Risk Changes

Treat these as high risk and call out the impact surface before making edits:

- Changes to Module Federation config, remote exposure, shared singleton config, or host/remote URLs.
- Changes to package exports, subpath exports, or root `index.ts` files in admin-dashboard packages.
- Changes to providers, theme consumption, aliases, tokens, or shared style infrastructure.
- Changes to public BFF contracts, GraphQL schema, seed data shape, Activity Log normalization, or route structure.
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
- For public documentation about Compiler adoption, keep the positioning generic and portfolio-safe. Do not imply private production benchmarking or private system history.

## Definition Of Done

- Dashboard behavior changes should include focused validation for the affected package.
- BFF or data-contract changes should include tests when behavior changed.
- Public docs and README changes should stay aligned with the current package map and external design-system boundary.
- Generated output must not be left behind in the worktree unless the user explicitly asked for build artifacts.
- Do not start a local dev server after code updates unless the user explicitly asks for it. Developers will start dev servers themselves.
- Validation must follow the default ladder below unless the task is investigation-only or the user requested a narrower scope.

## Default Validation Ladder

- First: run the nearest unit, package, or file-scoped validation that matches the change.
- Then: run the affected package build for app, BFF, shared utility, routing, or styling changes.
- Then: run the `admin-console` host build when a remote, shared dependency, or Module Federation behavior changed.
- Finally: use root-level validation only for cross-package, shared infra, or broad-impact changes.

## Validation Routing

Follow the default validation ladder and expand only when risk or scope requires it.

### Dashboard App Changes

- For `packages/org-management`, run package typecheck/lint/build.
- For `packages/user-management`, run package typecheck/lint/build.
- If the change affects federated consumption, also run `./scripts/codex-node.sh pnpm run build-admin-console`.

### BFF And Data Changes

- For `packages/admin-server`, run the nearest tests first.
- If schema, seed data, or resolver behavior changed, run `./scripts/codex-node.sh pnpm run test-admin-server`.
- Run `./scripts/codex-node.sh pnpm run build-admin-server` for build-impacting server changes.

### React Compiler Changes

- If you changed `babel-plugin-react-compiler`, `@rolldown/plugin-babel`, `reactCompilerPreset`, or Compiler options, run typecheck, lint, and build for both `org-management` and `user-management`.
- If a Compiler change affects either remote, also run `./scripts/codex-node.sh pnpm run build-admin-console` to verify the Module Federation host still consumes the remotes.
- If you add `"use memo"` to a new component or hook, check that manual memo removal did not cross provider, context, external-store, or package API boundaries.

### Shared Styling And Provider Usage

- For changes to theme consumption, app-level providers, global style, locale, or alias files, do not stop at a single test file.
- Run package builds for affected dashboard packages.
- If the desired change requires modifying Hugo UI tokens or component internals, move that work to the external design-system repository instead of editing through this repo.

### Cross-Package Changes

- If the change spans app packages, the BFF, and shared utilities, prefer root validation commands.
- Use `./scripts/codex-node.sh pnpm run typecheck`, `./scripts/codex-node.sh pnpm run test:all`, `./scripts/codex-node.sh pnpm run build:all`, or `./scripts/codex-node.sh pnpm run verify` when the impact surface is broad.

## Validation Failures And Stop Conditions

- If validation fails, first determine whether the failure was introduced by the current change or already existed.
- Do not fix unrelated pre-existing failures unless the user asked for broader repair.
- If a new failure is caused by the current patch, prefer shrinking the change over expanding into a broader refactor.
- If one high-risk change triggers multiple unrelated failures, stop widening the patch until the impact surface is understood.
- If reliable validation is not possible, report the unverified area explicitly instead of implying success.
- If runtime behavior, browser-specific behavior, or visual regressions cannot be confirmed locally, say so clearly in the final summary.
- If continuing would require guessing across package boundaries, hidden product intent, or unrelated infra, stop and report the blocker to the user.

## Common Commands

- Install dependencies: `./scripts/codex-node.sh pnpm install`
- Lint dashboard packages: `./scripts/codex-node.sh pnpm run lint`
- Typecheck dashboard packages: `./scripts/codex-node.sh pnpm run typecheck`
- Test server behavior: `./scripts/codex-node.sh pnpm run test-admin-server`
- Test all dashboard-owned tests: `./scripts/codex-node.sh pnpm run test:all`
- Build admin shared utilities: `./scripts/codex-node.sh pnpm run build-admin-shared`
- Build admin server: `./scripts/codex-node.sh pnpm run build-admin-server`
- Build Organization remote: `./scripts/codex-node.sh pnpm run build-org-management`
- Build User remote: `./scripts/codex-node.sh pnpm run build-user-management`
- Build admin shell: `./scripts/codex-node.sh pnpm run build-admin-console`
- Build all dashboard packages: `./scripts/codex-node.sh pnpm run build:all`
- Full repo verification: `./scripts/codex-node.sh pnpm run verify`
- Set up local Hugo UI link: `./scripts/codex-node.sh pnpm run setup:local-hugo-ui`

Codex command sessions may not inherit the interactive terminal's nvm PATH. When running Node.js, pnpm, or package scripts in this repository, use `./scripts/codex-node.sh <command>` so `.nvmrc` is loaded before the command runs.
Do not run `./scripts/codex-node.sh pnpm run dev:*` at the end of an implementation unless the user explicitly asks for a running local server.

## Package Notes

### `packages/admin-console`

- Browser shell and Module Federation host.
- Imports `@hugo-ui/mui` as an external design-system dependency.
- Verify host builds when remote exposure, shared singleton config, or cross-remote routing changes.

### `packages/admin-server`

- Local GraphQL BFF with Prisma and synthetic SQLite data.
- Owns Activity Log normalization, list query behavior, pagination/filter/sort execution, and seed data.
- Keep mock data synthetic and public-safe.

### `packages/admin-shared`

- Shared session and admin-shell UI utilities used by feature remotes.
- Keep APIs small and avoid feature-specific business behavior unless shared by multiple dashboard packages.

### `packages/org-management`

- Owns Organization Management routing, page composition, query state, navigation, list/detail views, and object-scoped Activity Log surfaces.
- Keep Organization-specific behavior out of generic UI components.

### `packages/user-management`

- Owns User Management routing, organization-scoped user workflows, detail views, and user Activity Log surfaces.
- Keep user-management scope lightweight unless the user explicitly asks for a complete IAM-style implementation.
