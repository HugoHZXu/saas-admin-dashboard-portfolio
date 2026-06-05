# Local Hugo UI Linking

The design system is maintained as a separate repository:

- GitHub: [HugoHZXu/hugo-ui](https://github.com/HugoHZXu/hugo-ui)

This dashboard keeps npm-style imports such as `@hugo-ui/mui`. During local development, the
dashboard can consume the `mui` package from a local clone of `hugo-ui` directly through a
filesystem symlink instead of waiting for an npm publish.

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

Existing Vite, TypeScript, and pnpm workspace paths already resolve `@hugo-ui/mui` through that
root-level `hugo-ui/packages/mui` path, so no published npm package is required for local
development.

When `shareNodeModules` is enabled, the setup script also points the local `hugo-ui` clone at the
dashboard repo's `node_modules`. This keeps React, MUI, Emotion, and other shared dependency types
on a single dependency tree when dashboard packages import design-system source files directly. If
the design-system clone already has a generated `packages/mui/node_modules` directory, the script
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
