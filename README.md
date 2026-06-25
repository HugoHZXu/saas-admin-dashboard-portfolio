# Hugo SaaS 管理控制台

Hugo SaaS Console (`hugo-saas-console`) is a desensitized B2B SaaS management-console portfolio
built with React, TypeScript, pnpm workspaces, Module Federation, GraphQL, Prisma, and an external
design-system dependency.

This repository demonstrates practical frontend and BFF engineering for tenant operations,
organization/user administration, and audit-trail workflows. It is not a production SaaS platform,
a generic dashboard template, or a set of publishable npm packages owned by this portfolio.

The monorepo is a portfolio modeling choice, not the proposed end-state for a real product family.
In a production organization, different admin dashboards would likely be developed, deployed, and
maintained independently by different teams. Here, the workspace simulates independently owned apps
and business npm packages while keeping the demo runnable from one repository.

All organizations, users, emails, domains, roles, activity events, and audit records are
synthetic demo data.

## What It Shows

- Admin shell composition with Module Federation remotes.
- Organization and User Management workflows backed by a local GraphQL BFF.
- Activity Log normalization from raw audit-style events into UI-ready records.
- Consumption of the external `@hugo-ui/mui` design-system package through package-style imports.
- Targeted React Compiler adoption in the Organization and User Management remotes.
- Public AI-assisted engineering workflow through `AGENTS.md`, `.codex/skills/*`, and
  `docs/agent-workflow.md`.

## Screenshots

Captured from the local demo shell with synthetic `.example` data.

### Organization Management

| List                                                       | Detail                                                                    | Activity Log                                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| ![Organization list](docs/assets/screenshots/org-list.jpg) | ![Organization detail](docs/assets/screenshots/org-detail-acme-cloud.jpg) | ![Organization Activity Log](docs/assets/screenshots/org-activity-log.jpg) |

### User Management

| List                                                           | Detail                                                             | Activity Log                                                                   |
| -------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| ![User list](docs/assets/screenshots/user-list-acme-cloud.jpg) | ![User detail](docs/assets/screenshots/user-detail-mina-patel.jpg) | ![User Activity Log](docs/assets/screenshots/user-activity-log-acme-cloud.jpg) |

## Packages

| Package                    | Purpose                                                                                        |
| -------------------------- | ---------------------------------------------------------------------------------------------- |
| `packages/admin-console`   | Browser shell and Module Federation host for Hugo SaaS Console.                                |
| `packages/admin-server`    | Local GraphQL BFF with Prisma, SQLite, synthetic seed data, and Activity Log normalization.    |
| `packages/admin-shared`    | Shared session and admin-shell UI utilities used by feature remotes.                           |
| `packages/org-management`  | Organization Management remote, routes, list/detail views, and object-scoped activity surface. |
| `packages/user-management` | User Management remote, organization-scoped user workflows, and user activity surface.         |

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

## External Design System

Hugo SaaS Console consumes shared UI through the external
[HugoHZXu/hugo-ui](https://github.com/HugoHZXu/hugo-ui) repository. Application code keeps
package-style import paths such as:

```tsx
import { HugoUIProvider, Table } from '@hugo-ui/mui';
```

This repository uses local file mode for that package. Dashboard packages point at
`file:../../hugo-ui/packages/mui`, while `config/hugo-ui.json` records the expected Hugo UI package
version. Installs therefore resolve the separately cloned Hugo UI repository through the local
`hugo-ui/` link instead of any npm registry package.

Use the symlink workflow in [`docs/local-hugo-ui.md`](docs/local-hugo-ui.md). The local `hugo-ui/`
path is ignored by Git and points at a separately cloned design-system repository.

## React Compiler Adoption

`packages/org-management` and `packages/user-management` opt into React Compiler with
`compilationMode: "annotation"`. Only components and custom hooks marked with `"use memo"` are
compiled, which keeps the portfolio example explicit and limits the rollout surface.

This adoption is intentionally scoped to feature remotes. The external design system and admin
shell are not compiler-enabled by this repository, so package consumption and federated host
behavior remain easier to reason about independently.

The compiler-enabled code removes low-risk manual `useMemo` and `useCallback` wrappers from list,
detail, and Activity Log surfaces while keeping provider, context, and external-store boundaries
manually stabilized.

Useful checks:

```bash
pnpm run build-org-management
pnpm run build-user-management
pnpm run build-admin-console
```

React DevTools can also confirm compiled components through its compiler memo badge. See
`docs/react-compiler-adoption.md` for the scope and guardrails.

## AI-Assisted Workflow

The agent workflow is intentionally part of the Hugo SaaS Console public portfolio narrative. It
documents how AI-assisted development is routed, constrained, and verified:

- `AGENTS.md` defines repository-wide boundaries, validation routing, and implementation rules.
- `.codex/skills/*` contains reusable task workflows for dashboard feature slices, Activity Log
  normalization, local design-system linking, and desensitization review.
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
