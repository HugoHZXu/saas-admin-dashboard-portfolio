# Project Brief

## Purpose

Hugo SaaS Console is a desensitized B2B SaaS management-console portfolio. It demonstrates
practical frontend, BFF, and external design-system consumption for tenant operations,
organization/user administration, and audit-trail workflows without exposing private product code,
company assets, customer data, endpoints, or business-specific rules.

The project is not intended to become a complete SaaS platform. The goal is to build a focused,
high-quality portfolio that supports discussion around:

- reusable admin UI composition through an external design-system package
- dense table and detail-page workflows
- Activity Log and audit-trail modeling
- BFF-style data aggregation and field normalization
- Module Federation and dashboard package boundaries
- responsible AI-assisted development

## Current State

The current implementation is a working Hugo SaaS Console monorepo with a local GraphQL BFF, a
federated admin shell, Organization/User Management remotes, and a local link to an external
design-system repository.

The monorepo is intentionally a portfolio modeling device rather than a claim about the final
operating model for this product family. In a real organization, different admin dashboards would
likely be developed, deployed, and maintained by separate teams; this workspace simulates those
independent apps and business npm packages in one runnable repository.

Implemented foundations:

- workspace dependency and tooling baseline for React, MUI, TypeScript, Jest, Vite, GraphQL,
  Prisma, and pnpm workspaces
- `@hugo-ui/mui` consumption through a committed npm package version, with a local-only symlink
  workflow for version-matched design-system source development
- `admin-server` local GraphQL BFF backed by Prisma and SQLite
- synthetic Organization, User, Role, Membership, and Activity Log seed data
- Activity Log event normalization into UI-friendly records
- `admin-console` Module Federation shell
- `org-management` and `user-management` feature remotes with list/detail/activity surfaces
- public AI-assisted engineering workflow through `AGENTS.md`, `.codex/skills/*`, and
  `docs/agent-workflow.md`

Still intentionally lightweight:

- authentication is represented through demo session state rather than a real identity provider
- deployment notes are illustrative, not production infrastructure
- user management supports the Hugo SaaS Console flows and is not a complete IAM product
- additional architecture diagrams can be added later after public release polish
- advanced table features such as resizing, sticky headers, bulk actions, and column
  configuration remain out of scope

## Product Scope

Focus on three high-completion modules:

1. Organization Table
2. Organization / User Detail
3. Activity Log

User management should stay lightweight and support the Organization scenarios. Avoid expanding it
into a full user-management platform unless explicitly requested.

## Component Boundary

`Table` is provided by the external design system. It should remain generic and
composition-friendly at the dashboard boundary.

Table owns:

- table structure
- columns and cell rendering
- sortable header UI
- controlled pagination UI
- loading, empty, and error states
- row click and keyboard activation
- controlled single-row highlight
- design-system styling

Table does not own:

- search input
- filter controls
- filter chips
- batch actions
- column configuration
- data fetching
- client-side filtering
- client-side pagination
- client-side sorting
- route navigation
- Organization-specific business rules

Search, filters, query state, data transformation, and navigation belong to page-level code or the
BFF layer.

## Public Portfolio Priorities

The next release-oriented work should be:

1. Keep the public README aligned with the implemented shell, remotes, BFF, package map, external
   design-system boundary, and desensitization boundary.
2. Keep mock data obviously synthetic and documented as synthetic.
3. Keep docs clear that `@hugo-ui/mui` is consumed from the separate Hugo UI repository, not owned
   by this dashboard repository.
4. Add architecture diagrams only after the core public narrative stays accurate.
5. Run validation and git-history secret review before making the GitHub repository public.
