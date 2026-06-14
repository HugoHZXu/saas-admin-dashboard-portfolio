# Agent Workflow

## Purpose

This document is a lightweight operating guide for AI-assisted work in this repository. It explains when to use the project-specific Skills and how they relate to the broader dashboard architecture.

The workflow itself is intentionally public and part of the portfolio: it shows how agent-assisted
development is constrained, routed, reviewed, and validated in a desensitized codebase.

Keep this document short. Detailed step-by-step instructions live in `AGENTS.md` and `.codex/skills/*/SKILL.md`.

## Core Principles

- This repository is a desensitized B2B SaaS admin dashboard portfolio, not an open-source copy of a private product.
- AI may help with code reading, task breakdown, boilerplate, tests, event-case enumeration, and documentation drafts.
- Engineers still own architecture boundaries, desensitization decisions, component APIs, code review, and validation.
- Do not provide AI tools with private company code, customer data, production logs, credentials, private endpoints, or internal design-system documentation.
- Do not start local dev servers after implementation unless the user explicitly asks for one.

## Where Instructions Live

- `AGENTS.md`: long-lived project rules, package boundaries, validation routing, and default stop conditions.
- `.codex/skills/*/SKILL.md`: reusable task workflows for common project work.
- `docs/desensitization-rules.md`: public-safety and synthetic-data rules.
- `docs/implementation-roadmap.md`: current implementation sequence.
- `docs/project-brief.md`: portfolio positioning and product scope.
- `docs/react-compiler-adoption.md`: scoped React Compiler rollout and validation notes.

## Skill Usage

Use these Skills when the task matches the scenario. Do not use all Skills for every task.

| Skill                               | Use When                                                                                                            | Primary Goal                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `$portfolio-desensitization-review` | Adding mock data, business copy, docs, README content, BFF examples, or code adapted from prior experience.         | Keep the portfolio public-safe and synthetic.                                       |
| `$admin-dashboard-feature-slice`    | Implementing Organization Table, Organization Detail, Activity Log, BFF mock work, or User Management feature work. | Keep business features in the right app/BFF/shared-type/component layer.            |
| `$activity-log-normalization`       | Designing raw audit events, normalized Activity Log records, global Activity Log pages, or object-local logs.       | Keep event translation in the BFF/mock layer and preserve a structured audit trail. |
| `$local-hugo-ui-link`               | Setting up or repairing local symlink-based source aliases for the external Hugo UI repository.                     | Keep local `@hugo-ui/mui` development repeatable while committed deps use npm.      |

## Practical Routing

- If the work touches dashboard business pages, start with `$admin-dashboard-feature-slice`.
- If the work adds public-facing examples or synthetic records, include `$portfolio-desensitization-review`.
- If the work touches Activity Log data shape or rendering semantics, include `$activity-log-normalization`.
- If the work needs local unpublished `@hugo-ui/mui` changes, use `$local-hugo-ui-link` for the
  dashboard side and make component-library edits in the external Hugo UI repository.

## React Compiler Work

React Compiler is a scoped portfolio capability in this repository. It is enabled only in
`packages/org-management` and `packages/user-management` with annotation mode.

For Compiler-related work:

- Check the official React Compiler docs before changing configuration.
- Add `"use memo"` only to components or custom hooks that should be compiled.
- Prefer removing page-local manual `useMemo` and `useCallback` wrappers after a component opts in.
- Keep manual memoization at provider, context, external-store, and module-federation session boundaries.
- Do not enable Compiler in the external design system or the admin shell unless explicitly requested.
- Validate both feature remotes and the `admin-console` host build.

## Architecture Boundaries

- The external Hugo UI repository owns generic components, design-system tokens, theme roles,
  Storybook coverage, changesets, and release/versioning.
- `packages/org-management` owns Organization Management routing, page composition, navigation, and dashboard workflow state.
- `packages/user-management` owns User Management routing, page composition, organization-scoped user workflows, and dashboard workflow state.
- `packages/admin-server` owns local BFF behavior: data aggregation, Organization/User contracts, list query behavior, pagination/filter/sort execution, and Activity Log normalization.
- Shared types should be introduced only when they clarify the app-to-BFF/mock contract.

## Validation Expectations

Choose validation based on the changed surface:

- Documentation-only changes: run formatting/sanity checks such as `git diff --check`.
- `org-management` feature changes: run package typecheck/lint/build.
- React Compiler changes in feature remotes: run both affected remote builds and the admin shell build.
- Shared provider, routing, BFF, or Module Federation changes: expand validation to affected consumers.

Use Node.js `22.12.0` or newer for validation. Codex command sessions should use the repository wrapper so `.nvmrc` is loaded before Node.js or pnpm commands run:

```bash
./scripts/codex-node.sh pnpm run verify
```

## Reporting Format

When handing off work, include:

- what changed
- which package or doc areas were affected
- which Skill guidance was relevant
- what validation ran
- what remains intentionally deferred
