# Dependency Upgrade Notes

Date: 2026-04-05

## Scope

This upgrade modernizes the `hugo-saas-console` workspace baseline before Hugo SaaS Console feature
work. It covers the root tooling and dashboard-owned frontend packages. Design-system package,
Storybook, changeset, and release/versioning upgrades belong to the separate Hugo UI repository.

## Environment

- Verified runtime: Node.js `26.4.0`, pnpm `11.7.0`.
- Removed the repository `.nvmrc`; validation uses the active local Node runtime or nvm default through `scripts/codex-node.sh`.
- Updated root `engines` metadata for Node/pnpm.

Note: the workspace now targets the local Node 26.4 runtime, so the earlier Node 22.12 engine-warning workaround no longer applies.

## Major Version Targets

| Area       | Before    | After     |
| ---------- | --------- | --------- |
| React      | 18.x      | `19.2.6`  |
| MUI        | `5.15.14` | `9.0.1`   |
| Emotion    | 11.11.x   | `11.14.x` |
| react-intl | `6.6.4`   | `10.1.9`  |
| Vite       | `5.2.10`  | `8.0.14`  |
| TypeScript | `5.4.5`   | `6.0.3`   |
| Jest       | `29.7.0`  | `30.4.x`  |
| ESLint     | `8.57.0`  | `10.4.0`  |

## Migration Work

- Replaced the previous ESLint `.eslintrc.cjs` setup with `eslint.config.mjs` flat config.
- Migrated dashboard MUI usage for v9 and kept shared UI consumption on public `@hugo-ui/mui`
  imports.
- Adjusted React 19 typings where `ReactElement` props are now stricter.
- Updated Jest config for TypeScript 6 and ESM-only `react-intl@10`.
- Added TypeScript `ignoreDeprecations: "6.0"` for existing `baseUrl` usage while keeping the
  current alias layout intact.

## Validation

The following command passes:

```bash
pnpm run verify
```

It runs:

- `pnpm run lint`
- `pnpm run typecheck`
- `pnpm run test:all`
- `pnpm run build:all`

Latest successful dashboard-owned results after the pnpm migration and backend extraction:

- frontend package tests passed through `test:frontend`.
- dashboard package builds passed for the feature remotes, shared utilities, and admin shell.

Design-system test, Storybook, and release validation should be tracked in the Hugo UI
repository.
