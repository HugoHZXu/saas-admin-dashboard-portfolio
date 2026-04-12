# Project Brief

## Purpose

This repository is evolving into a desensitized B2B SaaS admin dashboard portfolio. It should demonstrate practical frontend engineering for complex internal tools without exposing private product code, company assets, customer data, endpoints, or business-specific rules.

The project is not intended to become a complete SaaS platform. The goal is to build a focused, high-quality portfolio that supports discussion around:

- reusable admin UI components
- dense table and detail-page workflows
- Activity Log and audit-trail modeling
- BFF-style data aggregation and field normalization
- monorepo package boundaries
- responsible AI-assisted development

## Current State

The current implementation is still in the component-library foundation stage.

Completed foundations:

- dependency and tooling upgrade for the workspace
- `hugo-ui` component-library baseline on current React, MUI, Storybook, TypeScript, Jest, and Vite
- clean-room `Table` component
- `StatusTag` component for status pills
- Storybook examples for the new components

Not yet implemented:

- dashboard app shell
- BFF mock API
- Organization table page
- Organization detail page
- User detail and lightweight user operations
- Activity Log global and object-scoped views
- final public README and architecture narrative

## Product Scope

Focus on three high-completion modules:

1. Organization Table
2. Organization / User Detail
3. Activity Log

User management should stay lightweight and support the Organization scenarios. Avoid expanding it into a full user-management platform unless explicitly requested.

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

Search, filters, query state, data transformation, and navigation belong to page-level code or the BFF layer.

## Near-Term Priority

The next implementation phase should be:

1. Define shared mock domain types and synthetic data.
2. Build a BFF-style mock API layer that combines Organization/User data with Activity Log data.
3. Normalize low-level activity events into frontend-friendly activity records.
4. Build the Organization table page using the shared `Table` and `StatusTag` components.
5. Add page-level search, filters, sorting query state, pagination query state, and detail navigation.

## Deferred Work

Defer the following until core dashboard flows work:

- final public README
- polished architecture diagrams
- AI workflow narrative
- portfolio screenshots
- deployment documentation
- advanced table capabilities such as column resizing, sticky headers, bulk actions, and column configuration
