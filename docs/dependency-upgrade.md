# Dependency Upgrade Notes

Date: 2026-04-05

## Scope

This upgrade modernizes the `admin-dashboard` workspace baseline before portfolio feature work.
It covers the root tooling, `packages/hugo-ui`, `packages/hugo-ui-shadcn`, and
`packages/storybook-demo`.

## Environment

- Verified runtime: Node.js `22.12.0`, npm `10.9.0`.
- Added `.nvmrc` with `22.12.0`.
- Added root `engines` metadata for Node/npm.

Note: the latest ESLint/Changesets dependency tree currently emits npm `EBADENGINE`
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
| Storybook  | `7.6.17`  | `10.4.1`  |
| Vite       | `5.2.10`  | `8.0.14`  |
| TypeScript | `5.4.5`   | `6.0.3`   |
| Jest       | `29.7.0`  | `30.4.x`  |
| ESLint     | `8.57.0`  | `10.4.0`  |
| Tailwind   | `4.2.1`   | `4.3.0`   |

## Migration Work

- Replaced the previous ESLint `.eslintrc.cjs` setup with `eslint.config.mjs` flat config.
- Migrated Storybook config to Storybook 10:
  - Switched docs block imports to `@storybook/addon-docs/blocks`.
  - Switched interaction/action helpers to `storybook/test` and `storybook/actions`.
  - Removed deprecated `@storybook/addons`, `@storybook/core-events`, essentials/interactions
    package usage.
  - Updated `.storybook/main.ts` to ESM-safe `import.meta.url` path resolution.
- Migrated MUI usage for v9:
  - `TextField` MUI v5 compatibility props `InputProps`, `inputProps`, and `InputLabelProps` are internally
    mapped to `slotProps`.
  - `Dialog` transition now uses `slots.transition`.
  - Button style overrides no longer rely on removed composed icon-size override keys.
  - Updated removed icon import from `ErrorOutline` to `ErrorOutlineOutlined`.
- Adjusted React 19 typings where `ReactElement` props are now stricter.
- Updated Jest config for TypeScript 6 and ESM-only `react-intl@10`.
- Added explicit `lodash` dependency because `hugo-ui` imports lodash helpers directly.
- Removed unused `@fontsource-variable/geist` from `hugo-ui-shadcn`; its Tailwind font stack did
  not use Geist and the CSS import caused Storybook/Vite asset warnings.
- Added TypeScript `ignoreDeprecations: "6.0"` for existing `baseUrl` usage while keeping the
  current alias layout intact.

## Validation

The following command passes:

```bash
npm run verify
```

It runs:

- `npm run lint`
- `npm run typecheck`
- `npm run test:all`
- `npm run build:all`

Latest successful results:

- `hugo-ui`: 18 Jest suites, 151 tests passed.
- `hugo-ui-shadcn`: 2 Jest suites, 11 tests passed.
- `hugo-ui` and `hugo-ui-shadcn` library builds passed.
- Storybook static build passed on Storybook `10.4.1`.

Storybook still prints a Vite chunk-size warning for the generated preview bundle. This is a
non-blocking production build warning and can be handled later with Storybook/code-splitting
tuning if it becomes important.
