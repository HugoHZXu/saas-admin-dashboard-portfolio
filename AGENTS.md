# AGENTS

## Repo Overview

- This repository is an npm workspaces monorepo for UI component development.
- `packages/hugo-ui` is the primary component library and source of truth for shared components.
- `packages/myshadcn` is a secondary component package used for shadcn-style experiments and local integration.
- `packages/storybook-demo` is the demo and verification surface for both libraries.

## Working Rules

- Prefer small, package-scoped changes. Avoid mixing unrelated edits across packages.
- Do not edit generated output in `dist`, `coverage`, `storybook-static`, or `node_modules`.
- Treat `packages/myshadcn/.git` as an intentional nested repository unless the user explicitly asks to remove or flatten it.
- Preserve user changes already present in the worktree. Do not revert unrelated edits.

## Definition Of Done

- Component behavior changes in `packages/hugo-ui` should include tests.
- Public-facing component changes should include or update Storybook stories in `packages/storybook-demo`.
- Public API or package-consumer changes should add a changeset unless the user says otherwise.
- Run the smallest relevant validation before finishing. Prefer package-scoped checks first, then broader repo checks if the change spans packages.

## Common Commands

- Install dependencies: `npm install`
- Start Storybook: `npm run storybook`
- Lint all workspaces: `npm run lint`
- Test `hugo-ui`: `npm run test`
- Test `myshadcn`: `npm run test-myshadcn`
- Build `hugo-ui`: `npm run build-hugo-ui`
- Build `myshadcn`: `npm run build-myshadcn`
- Create a changeset: `npm run changeset`

## Package Notes

### `packages/hugo-ui`

- Uses React, TypeScript, Vite, Jest, and MUI-related peer dependencies.
- Keep exports, tests, and README usage aligned when public APIs change.

### `packages/myshadcn`

- Uses React, TypeScript, Vite, Jest, Tailwind CSS v4, and shadcn-style primitives.
- Keep stories and stylesheet imports aligned with Storybook aliases.

### `packages/storybook-demo`

- Storybook is the main interactive verification surface.
- Local package aliases are configured in `.storybook/main.ts`; preserve them when moving files or imports.
- Locale-aware examples should continue to work with the provider setup in `.storybook/preview.tsx`.
