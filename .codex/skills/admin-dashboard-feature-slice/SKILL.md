---
name: admin-dashboard-feature-slice
description: Plan and implement Hugo SaaS Console frontend feature slices while preserving package, external Admin BFF, and external design-system boundaries. Use for Organization Table, Organization Detail, Activity Log UI, or User Management work.
---

# Hugo SaaS Console Feature Slice

Use this skill before building business features in `packages/org-management`, `packages/user-management`, or future dashboard apps.

## Step 1: Identify The Layer

Classify each part of the work:

- external `@hugo-ui/mui`: generic reusable component API consumed by the dashboard
- external Admin BFF contract: GraphQL schema and backend-owned data behavior in `/Users/xuhaoze/code-demo/hugo-saas-backend`
- frontend API client types: GraphQL client setup, query documents, and response mapping used by dashboard packages
- `org-management`: routing, page layout, toolbar state, navigation, UI composition
- `user-management`: routing, page layout, organization-scoped user workflows, UI composition
- page-level query state: search, filters, sort, pagination, loading, empty, and error handling

Do not put business behavior into `@hugo-ui/mui` for convenience. If the feature requires a component API change, call out that the implementation belongs in the external Hugo UI repository.

Do not change backend GraphQL contracts in this repository. Coordinate `/Users/xuhaoze/code-demo/hugo-saas-backend` first.

## Step 2: Respect Current Dashboard Decisions

- `org-management` is a standalone app for Organization workflows.
- Side nav contains Organizations and Activity Log only.
- Organization detail is reached from table rows, not a side-nav item.
- Search and Filter are mutually exclusive modes controlled by `Toggle`.
- The external Admin BFF owns list query behavior and Activity Log normalization.

## Step 3: Avoid Frontend-Only Query Completion Before Backend

If the feature involves new loading, error, empty, pagination, search, filter, or sorting behavior:

- inspect the external Admin BFF contract first
- keep page-local logic scoped to UI state and request variables
- do not locally reconstruct missing backend behavior
- prefer UI skeletons over fake production behavior until the backend contract exists

## Step 4: Define The Slice Contract

For each feature slice, state:

- route and entry point
- data required from the external backend
- owner of data transformation
- user actions
- empty/loading/error source
- tests and external design-system impact

For Activity Log UI, use `$activity-log-normalization`.
For public copy or examples, use `$portfolio-desensitization-review`.

## Step 5: Validate

Typical validation:

```bash
./scripts/codex-node.sh pnpm --filter org-management run typecheck
./scripts/codex-node.sh pnpm --filter org-management run lint
./scripts/codex-node.sh pnpm run build-org-management
```

Run the matching `user-management` or `admin-console` checks when the slice touches those packages. Run Hugo UI checks in the external design-system repository when a reusable component change is required.

Do not start a local dev server unless the user explicitly asks.
