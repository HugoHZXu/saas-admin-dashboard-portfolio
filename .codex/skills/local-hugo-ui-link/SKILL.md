---
name: local-hugo-ui-link
description: Set up or repair admin-dashboard local development against a separately cloned hugo-ui repository through the reusable symlink workflow. Use when the user asks to link admin-dashboard to local hugo-ui without npm publishing, configure cross-repo local UI imports, create .local/hugo-ui.json, troubleshoot the hugo-ui symlink, or verify @hugo-ui/mui resolves from a local clone.
---

# Local Hugo UI Link

Use this skill to connect `admin-dashboard` to a local `hugo-ui` clone without publishing npm
packages. Keep the reusable script generic; put machine-specific paths only in ignored local config.

## Rules

- Do not hardcode a personal path in `scripts/setup-local-hugo-ui.mjs`.
- Do not commit `.local/hugo-ui.json`, `.codex/local-context.md`, the generated `hugo-ui` symlink, or `.local/*` backups.
- Prefer a sibling clone layout:

```text
<WORKSPACE_ROOT>/
  admin-dashboard/
  hugo-ui/
```

- Use `../hugo-ui` as the default config value when the sibling clone exists.
- If the `hugo-ui` clone is elsewhere, write that absolute or relative path only to `.local/hugo-ui.json`.
- Do not start dev servers unless the user explicitly asks.

## Workflow

1. Confirm the current repo is `admin-dashboard`.
2. Check whether `../hugo-ui` exists and contains `packages/mui/src/index.ts`.
3. If no local `hugo-ui` clone can be found, ask the user for `<HUGO_UI_ROOT>` instead of guessing.
4. Create `.local/hugo-ui.json` with this shape:

```json
{
  "enabled": true,
  "root": "<HUGO_UI_ROOT>",
  "linkPath": "hugo-ui",
  "repository": "https://github.com/HugoHZXu/hugo-ui",
  "shareNodeModules": true
}
```

5. Run:

```bash
./scripts/codex-node.sh pnpm run setup:local-hugo-ui
./scripts/codex-node.sh pnpm install
./scripts/codex-node.sh pnpm run setup:local-hugo-ui
```

6. Verify:

```bash
readlink hugo-ui
git check-ignore -v hugo-ui .local/hugo-ui.json
./scripts/codex-node.sh pnpm run verify:hugo-ui
./scripts/codex-node.sh pnpm --filter admin-console list @hugo-ui/mui --depth 0
./scripts/codex-node.sh pnpm --filter org-management list @hugo-ui/mui --depth 0
./scripts/codex-node.sh pnpm --filter user-management list @hugo-ui/mui --depth 0
```

The committed package manifests should keep `@hugo-ui/mui` on the npm version recorded in
`config/hugo-ui.json`. The local `hugo-ui/` symlink and `.local/hugo-ui.json` are ignored by Git and
only enable version-matched Vite/Vitest source aliases.

## Repair Notes

- If `admin-dashboard/hugo-ui` is a real directory, do not overwrite it. Report that the in-repo
  directory must be removed or moved before the symlink can be created.
- If `admin-dashboard/hugo-ui` is a symlink to the wrong target, remove only that symlink and rerun
  setup.
- When `shareNodeModules` is enabled, the setup script may move existing `hugo-ui` `node_modules`
  directories into `.local/hugo-ui-node-modules-backup-*`. This keeps React and MUI type resolution
  on one dependency tree for source imports.
- To return the `hugo-ui` clone to standalone work, remove its shared `node_modules` symlink and run
  `pnpm install` inside the `hugo-ui` repository.

## Documentation

Keep public human-facing instructions aligned with `docs/local-hugo-ui.md` whenever this workflow
changes.
