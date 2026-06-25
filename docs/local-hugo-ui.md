# Local Hugo UI Linking

The design system is maintained as a separate repository:

- GitHub: [HugoHZXu/hugo-ui](https://github.com/HugoHZXu/hugo-ui)

Hugo SaaS Console keeps package-style imports such as `@hugo-ui/mui` and commits the dependency as
an npm package version. The optional local link is only a development convenience for using a
sibling Hugo UI checkout through Vite/Vitest source aliases.

For clean installs, CI, and deployment validation, pnpm resolves `@hugo-ui/mui` from the npm
registry. For local design-system development, prepare a separate `hugo-ui` clone and expose it to
this repository through the documented ignored `hugo-ui/` symlink.

## Version Model

- Dashboard package manifests use the committed npm version for `@hugo-ui/mui`.
- `config/hugo-ui.json` sets `mode: "npm"`, `expectedVersion`, and an optional local package path
  used only when the ignored symlink exists.
- A clean CI/deploy install does not need a local `hugo-ui` clone.
- `pnpm run verify:hugo-ui` fails if a dashboard package does not use the expected npm version. If
  the local symlink exists, it also checks the linked package name and version.
- A local source link is enabled only when `.local/hugo-ui.json` exists, the linked package exists,
  and the linked package version matches `config/hugo-ui.json`.
- Vite development and Vitest can use the local source aliases when that version check passes.
- Production builds intentionally use the package entry points instead of the local source aliases,
  so they stay close to the CI/deploy path.

## Public Workflow

Clone both repositories locally, preferably as sibling directories:

```text
workspace/
  admin-dashboard/
  hugo-ui/
```

Then create a local-only config file in `admin-dashboard`:

```bash
mkdir -p .local
```

Add this content to `.local/hugo-ui.json`:

```json
{
  "enabled": true,
  "root": "../hugo-ui",
  "linkPath": "hugo-ui",
  "repository": "https://github.com/HugoHZXu/hugo-ui",
  "shareNodeModules": true
}
```

If the repositories are not siblings, set `root` to your own absolute or relative path:

```json
{
  "enabled": true,
  "root": "/absolute/path/to/hugo-ui",
  "linkPath": "hugo-ui",
  "repository": "https://github.com/HugoHZXu/hugo-ui",
  "shareNodeModules": true
}
```

`.local/` is ignored by Git. Do not commit `.local/hugo-ui.json` because it may contain a
machine-specific path.

Then run:

```bash
./scripts/codex-node.sh pnpm run setup:local-hugo-ui
./scripts/codex-node.sh pnpm install
./scripts/codex-node.sh pnpm run setup:local-hugo-ui
```

The setup script creates a local symlink at the dashboard repo root:

```text
admin-dashboard/hugo-ui -> ../hugo-ui
```

Vite development and Vitest can then resolve `@hugo-ui/mui` source imports through that root-level
`hugo-ui/packages/mui` path. If the linked package version does not match `config/hugo-ui.json`,
the source alias is disabled, and `pnpm run verify:hugo-ui` reports the mismatch when the symlink is
present.

When `shareNodeModules` is enabled, the setup script also points the local `hugo-ui` clone at the
dashboard repo's `node_modules`. This keeps React, MUI, Emotion, Hugo UI runtime dependencies, and
shared dependency types on a single dependency tree when dashboard packages import design-system
source files directly. The committed dashboard dependency remains the npm package version.

If the design-system clone already has a generated `packages/mui/node_modules` directory, the script
moves it into `.local/hugo-ui-node-modules-backup-*` before creating the shared link.

## What Is Committed

Commit these files because they are reusable and do not contain machine-specific paths:

- `docs/local-hugo-ui.md`
- `scripts/setup-local-hugo-ui.mjs`
- `.codex/skills/local-hugo-ui-link/SKILL.md`
- `.codex/skills/local-hugo-ui-link/agents/openai.yaml`
- `.gitignore` entries for `.local/`, `.codex/local-context.md`, and `/hugo-ui`

Keep these files local-only:

- `.local/hugo-ui.json`
- `.codex/local-context.md`
- the generated `hugo-ui` symlink
- `.local/hugo-ui-node-modules-backup-*`

## AI-Assisted Setup

Agents should use `$local-hugo-ui-link` when setting up or repairing this workflow. The skill keeps
the repeatable instructions in Git and directs agents to write personal paths only into
`.local/hugo-ui.json`.

## Standalone Hugo UI Work

If you want to work in the `hugo-ui` repository as a standalone project again, remove the shared
`node_modules` symlink in the `hugo-ui` clone and reinstall dependencies there:

```bash
cd ../hugo-ui
rm node_modules
pnpm install
```

If a real `hugo-ui/` directory still exists inside `admin-dashboard`, the setup script leaves it
unchanged. Remove the in-repo copy only when the design-system split is complete, then rerun the
setup script.

## AI Context

For local AI-assisted work, `.codex/local-context.md` may point agents to the local design-system
clone and the public GitHub repository. That file is also ignored by Git.
