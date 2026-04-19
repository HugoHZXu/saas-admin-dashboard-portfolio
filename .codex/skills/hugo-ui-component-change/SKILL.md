---
name: hugo-ui-component-change
description: Guide implementation and verification for hugo-ui component changes. Use when adding or changing generic components, component props, exports, component tokens, tests, or Storybook stories in packages/hugo-ui.
---

# Hugo UI Component Change

Use this skill before editing `packages/hugo-ui` component code or immediately after inheriting a component patch.

## Step 1: Classify The Component Change

Decide whether the change is:

- new component
- component behavior change
- style/token-only change
- public prop/API change
- export-only change
- Storybook/test-only change

If props, exports, shared tokens, or theme behavior change, treat it as public surface.

## Step 2: Read Local Patterns First

Before editing:

- inspect a similar component under `packages/hugo-ui/src`
- inspect its `styles/*Tokens.ts`, `styles/*Styles.ts`, tests, and Storybook story
- prefer existing MUI, Emotion, provider, RTL, and token patterns

Do not import business concepts into `hugo-ui`. Components must stay generic.

## Step 3: Keep API And Responsibility Small

- Keep public props minimal and composable.
- Do not put Organization/User/Activity Log logic into generic components.
- Do not add table search/filter/query behavior to `Table`.
- Keep business state to visual tone mapping outside visual components like `StatusTag`.
- Use generic names such as `SearchBox`, `Toggle`, `ContentTemplate`, not domain-specific variants.

## Step 4: Use The Design System Layer

- Consume `theme.hugoUIColorRoles` first.
- Use `theme.hugoUIColors` only when no semantic role exists.
- Do not use `alpha(...)` for ordinary hover/selected/status colors when an existing token fits.
- Split component logic, token files, and style files.
- Add or update token files for reusable component-specific decisions.

If the task changes colors or roles, run `$design-token-audit`.

## Step 5: Required Follow-Through

For public or visible changes:

- add/update Jest tests
- add/update Storybook stories
- update package exports
- add/update changeset
- check consumer imports in `org-management` and `storybook-demo`

## Step 6: Validate

Prefer Node 22.12+:

```bash
PATH="$HOME/.nvm/versions/node/v22.12.0/bin:$PATH" npm -w packages/hugo-ui run typecheck
PATH="$HOME/.nvm/versions/node/v22.12.0/bin:$PATH" npm -w packages/hugo-ui run lint
PATH="$HOME/.nvm/versions/node/v22.12.0/bin:$PATH" npm -w packages/hugo-ui run test -- --runTestsByPath <changed-test-file>
PATH="$HOME/.nvm/versions/node/v22.12.0/bin:$PATH" npm run build-hugo-ui
```

Escalate to Storybook or root validation when exports, stories, theme, provider, or cross-package consumers changed.

Do not start a local dev server unless the user explicitly asks.
