# Dependency Upgrade Notes

Date: 2026-04-05

## Scope

This upgrade modernizes the `admin-dashboard` workspace baseline before portfolio feature work.
It covers the root tooling and dashboard-owned packages. Design-system package, Storybook,
changeset, and release/versioning upgrades belong to the separate Hugo UI repository.

## Environment

- Verified runtime: Node.js `22.12.0`, pnpm `10.34.1`.
- Added `.nvmrc` with `22.12.0`.
- Added root `engines` metadata for Node/pnpm.

Note: the latest ESLint/Changesets dependency tree can emit package-manager `EBADENGINE`
warnings on Node `22.12.0` because some transitive packages request `22.13+` or newer.
The workspace scripts pass on `22.12.0`; use Node `22.22.2+` or Node `24+` if you want a
warning-free install with the latest dev tooling.

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

Latest successful dashboard-owned results after the pnpm migration:

- `admin-server`: Jest suites passed.
- dashboard package builds passed for the BFF, feature remotes, shared utilities, and admin shell.

Design-system test, Storybook, and release validation should be tracked in the Hugo UI
repository.
