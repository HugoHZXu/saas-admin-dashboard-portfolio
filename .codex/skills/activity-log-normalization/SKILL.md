---
name: activity-log-normalization
description: Review dashboard consumption of normalized Activity Log records. Use when implementing Activity Log UI surfaces, filters, empty/loading/error states, or frontend assumptions about backend-normalized records.
---

# Activity Log UI Consumption

Use this skill before implementing or reviewing Activity Log UI rendering in the dashboard repository.

Backend-owned raw event storage, normalization, seed data, and GraphQL contract changes belong in `/Users/xuhaoze/code-demo/hugo-saas-backend`.

## Step 1: Confirm The External Contract

Before changing UI assumptions, inspect the GraphQL query and generated/client-side types already used by the page.

Do not redefine:

- raw audit event shape
- normalization rules
- backend event taxonomy
- seed data
- Activity Log GraphQL schema

## Step 2: Keep UI Rendering Structured

Every rendered activity row or detail view should clearly show:

- actor
- timestamp
- affected object
- action or operation
- result status

Do not collapse structured backend fields into vague strings if the UI still needs filtering, sorting, badges, or detail layout.

## Step 3: Scope The Page Behavior

For each Activity Log surface, identify:

- global page or object-local panel
- object filter source
- event type filters
- pagination and sorting state
- empty/loading/error state source
- navigation or detail behavior, if any

## Step 4: Escalate Backend Gaps

If the UI requires a normalized field that the backend does not provide, stop and coordinate the backend repo first.

Dashboard code may adapt display labels, layout, and query state, but should not locally reconstruct backend normalization logic.

## Step 5: Validate

Run the affected frontend package checks. For Organization Activity Log work, typical validation is:

```bash
./scripts/codex-node.sh pnpm --filter org-management run typecheck
./scripts/codex-node.sh pnpm --filter org-management run lint
./scripts/codex-node.sh pnpm run build-org-management
```
