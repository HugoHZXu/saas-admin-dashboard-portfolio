# SaaS Admin Dashboard Portfolio

Desensitized B2B SaaS admin dashboard portfolio built with React, TypeScript, pnpm
workspaces, Module Federation, GraphQL, Prisma, Storybook, and publish-shaped UI packages.

This repository demonstrates practical frontend and BFF engineering for dense internal admin
tools. It is not a production SaaS platform, a generic dashboard template, or a set of npm
packages that are currently published from this portfolio.

All organizations, users, emails, domains, roles, activity events, and audit records are
synthetic demo data.

## What It Shows

- Admin shell composition with Module Federation remotes.
- Organization and User Management workflows backed by a local GraphQL BFF.
- Activity Log normalization from raw audit-style events into UI-ready records.
- Reusable admin UI components in `hugo-ui` and Tailwind/shadcn-style variants in
  `hugo-ui-shadcn`.
- Storybook coverage for shared UI components and visual states.
- Public AI-assisted engineering workflow through `AGENTS.md`, `.codex/skills/*`, and
  `docs/agent-workflow.md`.

## Packages

| Package | Purpose |
| --- | --- |
| `packages/admin-console` | Browser shell and Module Federation host for the admin portfolio. |
| `packages/admin-server` | Local GraphQL BFF with Prisma, SQLite, synthetic seed data, and Activity Log normalization. |
| `packages/admin-shared` | Shared session and admin-shell UI utilities used by feature remotes. |
| `packages/org-management` | Organization Management remote, routes, list/detail views, and object-scoped activity surface. |
| `packages/user-management` | User Management remote, organization-scoped user workflows, and user activity surface. |
| `packages/hugo-ui` | MUI-based publish-shaped design-system package for shared admin components. |
| `packages/hugo-ui-shadcn` | Tailwind/shadcn-style publish-shaped component package. |
| `packages/storybook-demo` | Storybook verification surface for shared UI packages. |

## Local Development

Install dependencies:

```bash
pnpm install
```

Reset and seed the local demo database:

```bash
pnpm run db:reset-admin
```

Start the local GraphQL BFF:

```bash
pnpm run dev:admin-server
```

In separate terminals, start the feature remotes and shell:

```bash
pnpm run dev:org-management
pnpm run dev:user-management
pnpm run dev:admin-console
```

Open `http://127.0.0.1:5173` for the admin shell. The default local endpoints are:

- Admin shell: `http://127.0.0.1:5173`
- Organization Management remote: `http://127.0.0.1:5174`
- User Management remote: `http://127.0.0.1:5175`
- GraphQL BFF: `http://127.0.0.1:4010/graphql`

Run Storybook separately when reviewing shared UI components:

```bash
pnpm run storybook
```

Open `http://localhost:6006` to view stories.

## Publishable Package Design

`hugo-ui` and `hugo-ui-shadcn` are structured like publishable npm packages: they have package
entrypoints, exports, type declarations, build scripts, and npm-style import paths such as:

```tsx
import { HugoUIProvider, Table } from 'hugo-ui';
import { Button } from 'hugo-ui-shadcn';
```

Inside this portfolio, those packages are consumed through `pnpm` workspace links such as
`"hugo-ui": "workspace:*"`. Actual npm publication is intentionally out of scope for this
repository, so package manifests remain `private: true`.

## AI-Assisted Workflow

The agent workflow is intentionally part of the public portfolio. It documents how AI-assisted
development is routed, constrained, and verified:

- `AGENTS.md` defines repository-wide boundaries, validation routing, and implementation rules.
- `.codex/skills/*` contains reusable task workflows for component changes, dashboard feature
  slices, Activity Log normalization, token audits, and desensitization review.
- `docs/agent-workflow.md` summarizes how those instructions fit into the engineering process.

## Desensitization

This project preserves generic B2B SaaS admin patterns only. It does not include real customer
data, private endpoints, production logs, private screenshots, private business rules, or copied
private implementation assets.

See `docs/desensitization-rules.md` for the public-safety rules used when adding mock data,
business copy, documentation, examples, or AI-assisted changes.

## Validation

```bash
pnpm run typecheck
pnpm run test:all
pnpm run build:all
pnpm run verify
```

Codex command sessions in this repository should use the wrapper documented in `AGENTS.md`, for
example:

```bash
./scripts/codex-node.sh pnpm run typecheck
```

## Chromatic

Chromatic is optional. Copy `.env.example` to `.env` and provide your token:

```bash
CHROMATIC_PROJECT_TOKEN=your_token_here
```

Then run:

```bash
pnpm --filter storybook-demo run chromatic
```
