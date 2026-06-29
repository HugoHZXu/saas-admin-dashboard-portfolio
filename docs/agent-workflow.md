# Agent Workflow

## Purpose

This document is a lightweight operating guide for AI-assisted work in this frontend repository. It explains when to use the project-specific Skills and how they relate to dashboard architecture.

Detailed step-by-step instructions live in `AGENTS.md` and `.codex/skills/*/SKILL.md`.

## Core Principles

- Hugo SaaS Console is a desensitized B2B SaaS management-console frontend portfolio, not an open-source copy of a private product.
- AI may help with code reading, task breakdown, boilerplate, tests, UI state enumeration, and documentation drafts.
- Engineers still own architecture boundaries, desensitization decisions, component APIs, code review, and validation.
- Do not provide AI tools with private company code, customer data, production logs, credentials, private endpoints, or internal design-system documentation.
- Do not start local dev servers after implementation unless the user explicitly asks for one.

## Where Instructions Live

- `AGENTS.md`: long-lived project rules, package boundaries, validation routing, and default stop conditions.
- `.codex/skills/*/SKILL.md`: reusable task workflows for common dashboard work.
- `docs/desensitization-rules.md`: public-safety and synthetic-data rules.
- `docs/implementation-roadmap.md`: current implementation sequence.
- `docs/project-brief.md`: Hugo SaaS Console positioning and frontend scope.
- `docs/react-compiler-adoption.md`: scoped React Compiler rollout and validation notes.
- `/Users/xuhaoze/code-demo/hugo-saas-backend/AGENTS.md`: backend package boundaries and validation routing.

## Skill Usage

Use these Skills when the task matches the scenario. Do not use all Skills for every task.

| Skill                               | Use When                                                                                                      | Primary Goal                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `$portfolio-desensitization-review` | Adding mock UI data, business copy, docs, README content, or code adapted from prior experience.              | Keep the portfolio public-safe and synthetic.                       |
| `$admin-dashboard-feature-slice`    | Implementing Organization Table, Organization Detail, Activity Log UI, or User Management feature work.       | Keep business features in the right app/client/component layer.     |
| `$activity-log-normalization`       | Reviewing dashboard consumption of already-normalized Activity Log records.                                   | Keep UI assumptions aligned with the external backend contract.     |
| `$local-hugo-ui-link`               | Setting up or repairing local symlink-based source aliases for the external Hugo UI repository.               | Keep local `@hugo-ui/mui` development repeatable.                  |

## Practical Routing

- If the work touches dashboard business pages, start with `$admin-dashboard-feature-slice`.
- If the work adds public-facing examples or synthetic UI copy, include `$portfolio-desensitization-review`.
- If the work touches Activity Log UI rendering semantics, include `$activity-log-normalization`.
- If the work needs local unpublished `@hugo-ui/mui` changes, use `$local-hugo-ui-link` for the dashboard side and make component-library edits in the external Hugo UI repository.
- If the work requires a backend contract, seed, or normalization change, coordinate `/Users/xuhaoze/code-demo/hugo-saas-backend` first.

## Architecture Boundaries

- The external Hugo UI repository owns generic components, design-system tokens, theme roles, Storybook coverage, changesets, and release/versioning.
- `packages/admin-console` owns the browser shell and Module Federation host.
- `packages/org-management` owns Organization Management routing, page composition, navigation, and dashboard workflow state.
- `packages/user-management` owns User Management routing, page composition, organization-scoped user workflows, and dashboard workflow state.
- `packages/admin-shared` owns shared session and admin-shell UI utilities.
- The external backend owns Organization/User contracts, list query behavior, pagination/filter/sort execution, seed data, and Activity Log normalization.

## Validation Expectations

Choose validation based on the changed surface:

- Documentation-only changes: run formatting/sanity checks such as `git diff --check`.
- `org-management` feature changes: run package typecheck/lint/build.
- `user-management` feature changes: run package typecheck/lint/build.
- React Compiler changes in feature remotes: run both affected remote builds and the admin shell build.
- Shared provider, routing, GraphQL client, or Module Federation changes: expand validation to affected consumers.

Use Node.js `26.4.0` or newer for validation. Codex command sessions should use the repository wrapper so the local Node/pnpm runtime is selected consistently:

```bash
./scripts/codex-node.sh pnpm run verify
```
