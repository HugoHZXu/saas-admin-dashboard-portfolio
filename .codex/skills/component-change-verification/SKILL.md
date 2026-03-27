---
name: component-change-verification
description: Validate component-library code changes in local repositories, especially React/Storybook monorepos. Use when Codex changes components, props, exports, stories, providers, aliases, theme tokens, or package wiring and needs to choose the smallest sufficient local verification path, check for missing tests/stories/changesets, and report verified versus unverified risk clearly.
---

# Component Change Verification

Use this skill after making component-related edits in this repository, or when asked what should be verified before finishing a patch.

This repository has three important roles:

- `packages/hugo-ui`: primary component library and source of truth
- `packages/myshadcn`: experimental or parallel shadcn-style package that should not silently drive `hugo-ui` decisions
- `packages/storybook-demo`: demo and verification surface for both libraries, not the source of truth for component behavior

Prefer the smallest reliable validation path. Expand only when the change touches shared surfaces or high-risk files.
Prefer scripts already defined in this repository's `package.json` files over guessed commands.

## Step 1: Classify the Change

Classify the patch before running commands.

- `component-local`: one component implementation, test, or story changed
- `public-api`: props, exports, entrypoints, consumer imports, or README usage changed
- `storybook-surface`: stories, decorators, preview, main config, provider wiring, aliasing, or docs rendering changed
- `shared-style`: tokens, theme, provider, global styles, locale, or shared hooks changed
- `cross-package`: changes span multiple packages or package boundaries
- `investigation-only`: the user asked for analysis, root cause, audit, or planning without asking for code changes

Use these priority rules when a patch could fit multiple buckets:

- Prefer `storybook-surface` for `.storybook/main.ts`, `.storybook/preview.tsx`, decorators, aliasing, docs rendering, or provider wiring that is specific to Storybook composition
- Prefer `shared-style` for theme, tokens, global styles, locale, or shared hooks even if Storybook also consumes them
- Prefer `public-api` when exports, props, or consumer imports changed, even if local component files also changed
- Prefer `cross-package` when the patch materially changes more than one package boundary

If the task is `investigation-only`, do not run edit-oriented validation by default. Instead:

- inspect the changed files, entrypoints, stories, and config involved
- identify the likely impact surface
- suggest the smallest future validation set if implementation follows
- avoid claiming verification success without actually running checks

## Step 2: Check Required Follow-Through

Before running validation, check whether the patch created follow-up obligations.

- Behavior changed: require tests
- Public-facing usage changed: require stories
- Consumer-visible package change: require changeset unless explicitly waived
- Export change: require entrypoint alignment and import-path review
- Docs or README examples affected: require example sync

If one of these is missing, call it out and fix it before broadening validation.

## Step 3: Use the Validation Ladder

Run validation in this default order.

1. Nearest unit or package-scoped validation
2. Affected package build
3. Storybook build when shared UI surface is affected
4. Root-level verification only for cross-package or infra-heavy changes

Do not jump straight to the broadest command unless the patch genuinely crosses package or infrastructure boundaries.

## Step 4: Choose Commands By Change Type

Map the change class to the smallest command set that gives confidence.

Use repository-defined scripts when they exist. In this repo, prefer:

- `npm run test`
- `npm run test-myshadcn`
- `npm run build-hugo-ui`
- `npm run build-myshadcn`
- `npm run build-storybook`
- `npm run typecheck`
- `npm run test:all`
- `npm run build:all`
- `npm run verify`

If a named command does not exist in the current repo state, use the nearest existing package-scoped equivalent from `package.json` instead of inventing a new command.

### `component-local`

- Run the nearest relevant tests first
- If the component has a story, verify or update that story
- Run the package build if the change affects exported behavior or styling visible to consumers

Typical examples:

- `packages/hugo-ui/src/<Component>/...`: `npm run test`, then `npm run build-hugo-ui` if public behavior changed
- `packages/myshadcn/src/components/ui/...`: `npm run test-myshadcn`, then `npm run build-myshadcn` if public behavior changed
- If a `myshadcn` change suggests a broader `hugo-ui` redesign, do not apply that redesign unless the user explicitly asked for it

### `public-api`

- Verify tests for changed behavior
- Verify stories for visible usage changes
- Run the affected package build
- Review package entrypoints and README examples
- Check whether a changeset is required
- For `hugo-ui`, treat public API changes as source-of-truth changes that may require Storybook updates in `storybook-demo`

### `storybook-surface`

- Treat `.storybook/main.ts`, `.storybook/preview.tsx`, decorators, alias changes, and provider wiring as high risk
- Run type-level validation if the change is docs-only
- Run Storybook build when runtime composition, aliasing, provider setup, or shared rendering behavior changed
- If locale or provider behavior changed in Storybook, keep `en`, `zh`, and `ar` assumptions intact unless the user asked to change locale behavior

### `shared-style`

- Assume broad blast radius until proven otherwise
- Run affected package builds
- Run Storybook build if stories consume the changed styling surface
- Treat locale, theme, token, and provider changes as repo-wide UX risks even when the code diff is small

### `cross-package`

- Start with the closest package checks if they are cheap and informative
- Then escalate to root commands such as `npm run typecheck`, `npm run test:all`, `npm run build:all`, or `npm run verify`
- If `storybook-demo` conflicts with library behavior, prefer library truth over demo convenience unless the user explicitly wants demo-driven behavior

## Step 5: Handle Failures Conservatively

If validation fails, do not immediately widen the patch.

- First decide whether the failure predated the current change
- Do not fix unrelated failures unless the user asked for broader repair
- If the patch introduced the failure, prefer shrinking the patch over adding more refactors
- If one change triggers multiple unrelated failures, stop and reassess the impact surface
- If reliable validation is impossible, report the gap instead of implying success

Use failure handling as a stop condition, not an invitation to keep patching everything nearby.

## Step 6: Report Outcome Clearly

End with a compact verification summary using this structure when practical:

- `Change class:` the primary bucket used for routing
- `Required follow-through:` tests, stories, changeset, README, exports, or none
- `Commands run:` only the commands actually executed
- `Commands intentionally skipped:` checks not run and why
- `Remaining risks:` anything still unverified, especially runtime or visual behavior

Good examples:

- `Change class: public-api`
  `Required follow-through: tests, story update, export review`
  `Commands run: npm run test, npm run build-hugo-ui`
  `Commands intentionally skipped: npm run verify because the patch stayed in hugoUI`
  `Remaining risks: Storybook browser runtime not manually checked`

- `Change class: storybook-surface`
  `Required follow-through: provider and locale verification`
  `Commands run: npm run build-storybook`
  `Commands intentionally skipped: full repo verify because library code did not change`
  `Remaining risks: visual regressions remain unverified without browser inspection`

## Guardrails

- Prefer evidence over ceremony
- Prefer package-local confidence before repo-wide validation
- Prefer reporting an unverified risk over pretending the patch is fully validated
- Prefer a smaller patch over a larger repair when validation exposes drift
