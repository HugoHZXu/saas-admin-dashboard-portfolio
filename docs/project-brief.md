# Project Brief

> Languages: English | [简体中文](./project-brief.zh-CN.md)

## Overview

Hugo SaaS Console is a B2B SaaS admin dashboard frontend portfolio. It demonstrates practical patterns for building micro-frontend admin interfaces — including reusable UI composition, dense data workflows, activity log views, and GraphQL client integration — using only synthetic demo data without exposing any proprietary code or real business information.

The project is intentionally kept small and focused, designed to showcase:

- Composing admin UIs with an external design system package
- High-density table and detail-page interactions
- Activity log UI patterns
- GraphQL client integration against a local BFF
- Module Federation architecture with clear package boundaries

## Current state

The project is a working monorepo with:

- A Module Federation host shell (`admin-console`)
- Two feature remotes: Organization Management and User Management
- Design system components consumed via npm package imports (`@hugo-ui/mui`)
- GraphQL clients pointing to an external Admin BFF service

The backend BFF, database schema, and seed data live in the separate [hugo-saas-backend](https://github.com/HugoHZXu/hugo-saas-backend) repository. The dashboard connects to it via the `VITE_ADMIN_BFF_GRAPHQL_URL` environment variable.

### What's implemented

- pnpm workspace setup with React, TypeScript, Vite, Vitest, and GraphQL clients
- `@hugo-ui/mui` design system consumption via standard package imports
- `admin-console` Module Federation host shell
- `org-management` and `user-management` remotes with list, detail, and activity log views
- Frontend GraphQL clients configured for the external Admin BFF
- Activity log UI that consumes normalized records from the backend

### Intentionally lightweight areas

- Authentication is simulated with demo session state from the backend (no real IdP integration)
- Deployment documentation is illustrative, not production-ready infrastructure guidance
- User Management supports organization-scoped workflows but is not a full IAM platform
- Advanced table features (column resizing, sticky headers, bulk selection, column configuration) are out of scope

## Product scope

The portfolio focuses on three well-polished modules:

1. **Organization Table** — dense list with sorting, pagination, and navigation
2. **Organization / User Detail** — detail views with membership and role management
3. **Activity Log** — normalized audit trail display for both organizations and users

UI components from the design system are kept generic at the dashboard boundary; page-level code handles search, filters, query state, data transformation, and navigation. Backend query logic and data normalization belong in the [hugo-saas-backend](https://github.com/HugoHZXu/hugo-saas-backend) repository.
