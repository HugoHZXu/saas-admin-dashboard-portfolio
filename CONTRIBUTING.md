# Contributing

This repository is a desensitized B2B SaaS admin dashboard portfolio. Contributions should preserve
the portfolio scope, package boundaries, and public-safety rules.

## Contribution Scope

Good contributions include:

- focused fixes to shared UI components, tests, or Storybook examples
- documentation updates that clarify the portfolio architecture or local setup
- synthetic demo data improvements that stay generic and public-safe
- small dashboard workflow refinements that preserve the existing package boundaries

Out of scope:

- real customer data, screenshots, logs, private endpoints, or production credentials
- copied private implementation assets or internal business rules
- broad rewrites that mix unrelated package responsibilities
- turning the portfolio into a complete production SaaS platform

## Desensitization Rules

Before opening a pull request, check `docs/desensitization-rules.md`.

All organizations, users, emails, domains, roles, activity events, and audit records must be
synthetic demo data. Prefer `.example` domains and generic B2B SaaS concepts such as Organization,
User, Role, Status, Domain, and Activity Log.

## Local Setup

Install dependencies:

```bash
pnpm install
```

Reset and seed the local demo database:

```bash
pnpm run db:reset-admin
```

Run the relevant local app or validation command for your change. Codex command sessions should use
the repository wrapper from `AGENTS.md`, for example:

```bash
./scripts/codex-node.sh pnpm run typecheck
```

## Validation

Choose the smallest validation path that proves your change:

- documentation-only changes: `git diff --check`
- component changes: nearest tests, package build, and Storybook checks when stories changed
- dashboard app changes: affected package typecheck/build
- broad shared changes: `pnpm run verify`

Do not leave generated output such as `dist`, `coverage`, `storybook-static`, local SQLite
databases, or `.env` files in the working tree.

## Pull Request Expectations

- Keep changes package-scoped and avoid unrelated cleanup.
- Preserve `hugo-ui` and `hugo-ui-shadcn` as separate package surfaces.
- Keep `hugo-ui` and `hugo-ui-shadcn` publish-shaped but private in this portfolio.
- Mention which validation commands ran.
- Call out any intentionally unverified area.
