# Project Brief

## Purpose

This repository is a desensitized B2B SaaS admin dashboard portfolio. It demonstrates practical
frontend, component-library, and BFF engineering for complex internal tools without exposing
private product code, company assets, customer data, endpoints, or business-specific rules.

The project is not intended to become a complete SaaS platform. The goal is to build a focused,
high-quality portfolio that supports discussion around:

- reusable admin UI components
- dense table and detail-page workflows
- Activity Log and audit-trail modeling
- BFF-style data aggregation and field normalization
- Module Federation and monorepo package boundaries
- responsible AI-assisted development

## Current State

The current implementation is a working portfolio monorepo with shared UI packages, a local
GraphQL BFF, a federated admin shell, and Organization/User Management remotes.

Implemented foundations:

- workspace dependency and tooling baseline for React, MUI, Storybook, TypeScript, Jest, Vite,
  GraphQL, Prisma, and pnpm workspaces
- `hugo-ui` component-library baseline with reusable admin components such as `Table`,
  `StatusTag`, `SearchBox`, `Toggle`, templates, modal, inputs, and supporting theme roles
- `hugo-ui-shadcn` package for Tailwind/shadcn-style component experiments
- Storybook examples for the shared component packages
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
- user management supports the portfolio flows and is not a complete IAM product
- screenshots and architecture diagrams can be added later after public release polish
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

`Table` is a shared UI component. It should remain generic and composition-friendly.

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

1. Keep the public README aligned with the implemented shell, remotes, BFF, package map, and
   desensitization boundary.
2. Keep mock data obviously synthetic and documented as synthetic.
3. Keep package README files clear that `hugo-ui` and `hugo-ui-shadcn` are publish-shaped but
   consumed through workspace links in this portfolio.
4. Add screenshots or architecture diagrams only after the core public narrative stays accurate.
5. Run validation and git-history secret review before making the GitHub repository public.
