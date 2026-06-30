# Local Hugo UI Registry

The design system is maintained as a separate repository:

- GitHub: [HugoHZXu/hugo-ui](https://github.com/HugoHZXu/hugo-ui)

Hugo SaaS Console keeps package-style imports such as `@hugo-ui/mui`. The dashboard does not
consume Hugo UI through `file:` dependencies, a root-level `hugo-ui/` symlink, or Vite/Vitest source
aliases.

## Version Model

- Dashboard package manifests install `@hugo-ui/mui` as an exact npm package version.
- Local unpublished Hugo UI builds are published to a local npm-compatible registry.
- The current local tag is `@hugo-ui/mui@local`.
- The current resolved package version is `1.0.3-local.1782760446428`.
- The current registry endpoint is `http://localhost:4873`.
- The root `.npmrc` maps only the `@hugo-ui` scope to that local registry.

## Install Or Refresh

After publishing a Hugo UI package build to the local registry, install the local tag into each
dashboard package that consumes `@hugo-ui/mui`:

```bash
./scripts/codex-node.sh pnpm --filter admin-console add @hugo-ui/mui@local --save-exact --registry http://localhost:4873
./scripts/codex-node.sh pnpm --filter admin-shared add @hugo-ui/mui@local --save-exact --registry http://localhost:4873
./scripts/codex-node.sh pnpm --filter org-management add @hugo-ui/mui@local --save-exact --registry http://localhost:4873
./scripts/codex-node.sh pnpm --filter user-management add @hugo-ui/mui@local --save-exact --registry http://localhost:4873
```

The package manifests should contain the resolved exact version, not the `local` tag and not a
`file:` specifier.

## Validation

Confirm the installed dependency no longer resolves to a file path:

```bash
./scripts/codex-node.sh pnpm list @hugo-ui/mui --depth 0 --recursive
```

Then run the usual dashboard validation for the changed surface. Because Hugo UI is shared through
Module Federation, dependency updates should include the remote builds and host build:

```bash
./scripts/codex-node.sh pnpm run build-org-management
./scripts/codex-node.sh pnpm run build-user-management
./scripts/codex-node.sh pnpm run build-admin-console
```
