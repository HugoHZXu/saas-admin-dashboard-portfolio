# React Compiler Adoption

## Purpose

This portfolio uses React Compiler to demonstrate modern React build-time optimization in a
controlled way. The goal is to show practical knowledge of compiler adoption, not to claim a
blanket performance win across the whole monorepo.

## Scope

Enabled packages:

- `packages/org-management`
- `packages/user-management`

Not enabled by default:

- external `@hugo-ui/mui` design-system source
- `packages/admin-console`

The feature remotes use `compilationMode: "annotation"`, so only functions marked with
`"use memo"` are compiled.

## What Was Simplified

Compiler opt-in components and hooks remove low-risk manual `useMemo` and `useCallback` wrappers
from:

- list query input construction
- page summary calculations
- table row mapping
- Activity Log column construction
- local account menu sorting
- local modal button object construction
- local modal open, close, and toggle callbacks

These are page-local calculations or event handlers where compiler-generated memoization is a good
fit.

## What Stays Manual

Manual memoization remains in provider and shared-state boundaries:

- `DemoSessionContext`
- `OrganizationScopeContext`
- remote session store adapters built around `useSyncExternalStore`

Those values cross context, store, or module-federation boundaries. Keeping explicit stable
references there makes the runtime contract clearer and avoids using the compiler as a substitute
for state architecture.

## Validation

Run the affected remote checks first:

```bash
./scripts/codex-node.sh pnpm --filter org-management run typecheck
./scripts/codex-node.sh pnpm --filter user-management run typecheck
./scripts/codex-node.sh pnpm --filter org-management run lint
./scripts/codex-node.sh pnpm --filter user-management run lint
./scripts/codex-node.sh pnpm run build-org-management
./scripts/codex-node.sh pnpm run build-user-management
```

Because the remotes are consumed through Module Federation, also verify the host build:

```bash
./scripts/codex-node.sh pnpm run build-admin-console
```

React DevTools can confirm compiler output by showing the compiler memo badge on optimized
components. Build output should include compiler-generated memo cache code in annotated functions.
With `target: "19"`, compiler output uses React's `react/compiler-runtime`; because the optimized
remotes are rendered by the Module Federation host, that runtime must be shared as a singleton
alongside `react` so memo-cache reads use the host renderer's React dispatcher.

## References

- React Compiler installation: https://react.dev/learn/react-compiler/installation
- Incremental adoption: https://react.dev/learn/react-compiler/incremental-adoption
- Compiler configuration: https://react.dev/reference/react-compiler/configuration
