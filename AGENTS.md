# AGENTS

## Repo Role

- This repository is an npm workspaces monorepo for UI component development.
- `packages/hugo-ui` is the primary component library and source of truth for shared components.
- `packages/myshadcn` is a secondary component package for shadcn-style and Tailwind-based implementations.
- `packages/storybook-demo` is the interactive verification surface for both libraries.

## Core Boundaries

- Prefer small, package-scoped changes. Avoid mixing unrelated edits across packages.
- Do not edit generated output in `dist`, `coverage`, `storybook-static`, or `node_modules`.
- Preserve user changes already present in the worktree. Do not revert unrelated edits.
- Keep `hugo-ui` and `myshadcn` responsibilities separate. Do not move experimental `myshadcn` implementations into `hugo-ui` unless the user explicitly asks for it.
- When touching shared infra such as providers, aliases, tokens, exports, or Storybook config, prefer the smallest viable change. Do not do opportunistic cleanup in the same patch.

## Plan Before Editing

- Make a brief plan first when the task changes package boundaries, touches shared infra, changes public APIs, or affects Storybook setup.
- Skip formal planning only for narrow, low-risk edits such as a focused component fix, a local test update, or a typo-level documentation change.
- If the change is likely to affect multiple packages or many stories, state the impact surface before editing.

## Investigation-Only Tasks

- For investigation-only tasks, prefer no-edit analysis first.
- Do not create speculative patches unless the user asked for implementation.
- For root cause analysis, API surveys, export graph mapping, Storybook audits, or migration planning, gather evidence before proposing code changes.
- If a task begins as investigation and later clearly requires implementation, state that transition before editing.

## High-Risk Changes

Treat these as high risk and call out the impact surface before making edits:

- Changes to `.storybook/main.ts` or `.storybook/preview.tsx`
- Changes to package exports, subpath exports, or root `index.ts` files
- Changes to providers, theme setup, aliases, tokens, or shared style infrastructure
- Changes to public component props or consumer-facing package APIs
- Changes that make `storybook-demo` depend on new behavior from `hugo-ui` or `myshadcn`

For high-risk changes:

- Prefer a minimal patch over a broad refactor.
- Validate more than the local file you changed.
- Mention likely downstream effects in the final summary.

## Frontend-Specific Risks

- If public props change, sync the implementation, tests, stories, and package exports.
- If exports change, check consumer import paths, README examples, and changeset needs.
- If aliases or provider wiring change, verify Storybook still resolves local package imports.
- If theme or token files change, assume cross-component blast radius until verified.
- If a story or docs page relies on locale, keep `preview.tsx` provider setup working for `en`, `zh`, and `ar`.
- Do not let `myshadcn` utility patterns or styling decisions silently leak into `hugo-ui`.

## Definition Of Done

- Component behavior changes in `packages/hugo-ui` or `packages/myshadcn` must include tests when behavior changed.
- Public-facing component changes must update or add Storybook stories in `packages/storybook-demo` when visible usage changed.
- Public API or consumer-visible package changes require a changeset unless the user explicitly waives it.
- Export changes must keep package entrypoints, consumer import paths, and relevant README examples aligned.
- Generated output must not be left behind in the worktree unless the user explicitly asked for build artifacts.
- Validation must follow the default ladder below unless the task is investigation-only or the user requested a narrower scope.

## Default Validation Ladder

- First: run the nearest unit, package, or file-scoped validation that matches the change.
- Then: run the affected package build for public component, export, or styling changes.
- Then: run Storybook build validation if shared UI surface, provider wiring, aliasing, docs rendering, or stories were affected.
- Finally: use root-level validation only for cross-package, shared infra, or broad-impact changes.

## Validation Routing

Follow the default validation ladder and expand only when risk or scope requires it.

### Component Implementation Changes

- If you only changed one `hugo-ui` component under `packages/hugo-ui/src/<Component>/`, run the closest package tests first.
- If the component has a matching story, update or verify the story in `packages/storybook-demo/src/stories/`.
- After a public component change, run `npm run build-hugo-ui`.

### `myshadcn` Component Changes

- For changes under `packages/myshadcn/src/components/ui/`, run `npm run test-myshadcn` first.
- If the component is used in Storybook, verify or update the relevant story.
- After a public component change, run `npm run build-myshadcn`.

### Export Surface Changes

- If you changed `packages/hugo-ui/src/index.ts`, package subpath exports, or `packages/myshadcn/src/index.ts`, check all affected exports compile and remain consumable.
- Review nearby README examples when consumer-facing imports changed.
- Check whether the change requires a changeset.

### Storybook And Demo Changes

- If you changed files under `packages/storybook-demo/src/stories/`, run the local validation that proves the story still compiles.
- If you changed `.storybook/main.ts`, `.storybook/preview.tsx`, decorators, aliases, or provider wiring, treat it as high risk and run Storybook build validation.
- If you changed story-only docs content with no runtime impact, typecheck may be enough.

### Shared Styling And Provider Changes

- For changes to theme, token, global style, provider, locale, or alias files, do not stop at a single test file.
- Run package builds for affected libraries.
- If Storybook consumes the changed surface, run Storybook build validation too.

### Cross-Package Changes

- If the change spans `hugo-ui`, `myshadcn`, and `storybook-demo`, prefer the root validation commands.
- Use `npm run typecheck`, `npm run test:all`, `npm run build:all`, or `npm run verify` when the impact surface is broad.

## Validation Failures And Stop Conditions

- If validation fails, first determine whether the failure was introduced by the current change or already existed.
- Do not fix unrelated pre-existing failures unless the user asked for broader repair.
- If a new failure is caused by the current patch, prefer shrinking the change over expanding into a broader refactor.
- If one high-risk change triggers multiple unrelated failures, stop widening the patch until the impact surface is understood.
- If reliable validation is not possible, report the unverified area explicitly instead of implying success.
- If Storybook runtime behavior, browser-specific behavior, or visual regressions cannot be confirmed locally, say so clearly in the final summary.
- If continuing would require guessing across package boundaries, hidden product intent, or unrelated infra, stop and report the blocker to the user.

## Common Commands

- Install dependencies: `npm install`
- Start Storybook: `npm run storybook`
- Lint all workspaces: `npm run lint`
- Typecheck all workspaces: `npm run typecheck`
- Test `hugo-ui`: `npm run test`
- Test `myshadcn`: `npm run test-myshadcn`
- Test all component packages: `npm run test:all`
- Build `hugo-ui`: `npm run build-hugo-ui`
- Build `myshadcn`: `npm run build-myshadcn`
- Build all packages and Storybook: `npm run build:all`
- Full repo verification: `npm run verify`
- Create a changeset: `npm run changeset`

## Package Notes

### `packages/hugo-ui`

- Uses React, TypeScript, Vite, Jest, and MUI-related peer dependencies.
- Main public exports live in `packages/hugo-ui/src/index.ts` and component `index.ts` files.
- When public APIs change, keep exports, tests, and README usage aligned.

### `packages/myshadcn`

- Uses React, TypeScript, Vite, Jest, Tailwind CSS v4, and shadcn-style primitives.
- Main public exports live in `packages/myshadcn/src/index.ts`.
- Keep stylesheet imports and Storybook aliases aligned when moving files or changing paths.

### `packages/storybook-demo`

- Storybook is the main interactive verification surface.
- Local package aliases are configured in `packages/storybook-demo/.storybook/main.ts`.
- Locale-aware examples depend on the provider setup in `packages/storybook-demo/.storybook/preview.tsx`.
- Story changes should reflect real package APIs rather than private implementation details.
