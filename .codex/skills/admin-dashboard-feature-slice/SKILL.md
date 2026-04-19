---
name: admin-dashboard-feature-slice
description: Plan and implement admin-dashboard feature slices while preserving package and BFF boundaries. Use for Organization Table, Organization Detail, Activity Log, BFF mock, or future User Management work.
---

# Admin Dashboard Feature Slice

Use this skill before building business features in `packages/org-management` or future dashboard apps.

## Step 1: Identify The Layer

Classify each part of the work:

- `hugo-ui`: generic reusable component or design-system token
- `storybook-demo`: component demos only
- `org-management`: routing, page layout, toolbar state, navigation, UI composition
- BFF/mock service: data contracts, aggregation, filtering, sorting, pagination, Activity Log normalization
- shared type: contract used by both app and BFF/mock service

Do not put business behavior into `hugo-ui` for convenience.

## Step 2: Respect Current Dashboard Decisions

- `org-management` is a standalone app for Organization workflows.
- Side nav contains Organizations and Activity Log only.
- Organization detail is reached from table rows, not a side-nav item.
- Search and Filter are mutually exclusive modes controlled by `Toggle`.
- BFF should own list query behavior once implemented.

## Step 3: Avoid Frontend-Only Query Completion Before BFF

If the feature involves loading, error, empty, pagination, search, filter, or sorting:

- define or inspect the BFF/mock contract first
- keep page-local logic temporary and clearly scoped
- do not build a complete local data/query layer that will be thrown away
- prefer UI skeletons over fake production behavior until the BFF contract exists

## Step 4: Define The Slice Contract

For each feature slice, state:

- route and entry point
- data required
- owner of data transformation
- user actions
- empty/loading/error source
- tests and Storybook impact

For Activity Log, use `$activity-log-normalization`.
For mock data or public copy, use `$portfolio-desensitization-review`.

## Step 5: Validate

Typical validation:

```bash
PATH="$HOME/.nvm/versions/node/v22.12.0/bin:$PATH" npm -w packages/org-management run typecheck
PATH="$HOME/.nvm/versions/node/v22.12.0/bin:$PATH" npm -w packages/org-management run lint
PATH="$HOME/.nvm/versions/node/v22.12.0/bin:$PATH" npm -w packages/org-management run build
```

Run `hugo-ui` and Storybook checks when shared components or stories changed.

Do not start a local dev server unless the user explicitly asks.
