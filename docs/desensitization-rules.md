# Desensitization Rules

## Core Rule

Hugo SaaS Console must only contain public-safe, synthetic, portfolio-oriented code and data.

Do not add private company code, product names, endpoints, customer data, access tokens, screenshots, logs, internal permission rules, or proprietary implementation details.

## Do Not Include

- real company names
- real product names
- real customer names
- real user names, emails, domains, IDs, or logs
- real API endpoints
- real GraphQL operations from private systems
- real API keys, tokens, credentials, or project secrets
- production logs or audit records
- private screenshots or design files
- internal permission rules or escalation policies
- copied private component code, token names, style code, comments, or documentation text

## Allowed Abstractions

It is acceptable to model generic B2B SaaS admin patterns such as:

- Organization
- User
- Domain
- Admin
- Role
- Status
- Activity Log
- Audit Event
- Plan
- Subscription

Use synthetic names such as:

- Acme Cloud
- Northstar Labs
- Vertex Systems
- Summit Works
- Brightlane Studio

Synthetic data should be plausible enough to support UI behavior, but it must not resemble real customer records.

## Design-System Guidance

Reusable dashboard UI should use public `@hugo-ui/mui` theme roles and component APIs.

Prefer:

- `theme.hugoUIColorRoles`
- `theme.hugoUITypography`
- `theme.hugoUIColors` only when a semantic role is not specific enough
- documented design-system tokens exposed through the public Hugo UI package

Avoid:

- copying private token names
- copying private color palettes
- copying private class names
- hardcoding business-specific colors in stories or pages
- duplicating styling rules from non-public components

## AI-Assisted Development Guardrails

AI-assisted work may use only public-safe context from this repository and intentionally synthetic examples.

Do not provide AI tools with:

- private company code
- customer data
- production logs
- API keys
- non-public endpoint schemas
- internal design-system documentation

AI output must be reviewed by an engineer and validated through the local checks that match the change.

## Review Checklist

Before considering a change public-safe, check:

- No private names or identifying data were introduced.
- No endpoint, token, credential, or secret was introduced.
- Mock data is synthetic and generic.
- Business concepts are generic B2B SaaS admin concepts.
- Shared UI uses public `@hugo-ui/mui` theme roles and component APIs.
- README or docs do not imply this is an extracted production system.

## Public Release Checklist

Before making the GitHub repository public, check:

- Root README states that all organizations, users, emails, domains, and activity records are
  synthetic demo data.
- Tracked files do not include `.env`, SQLite databases, screenshots, logs, HAR files, certificates,
  private keys, or other local artifacts.
- Git history has been scanned for secrets or private data, not just the current working tree.
- Docs do not imply Hugo UI packages are owned or published from this dashboard repository.
- `AGENTS.md` and `.codex/skills/*` remain public-safe because they are part of the portfolio
  workflow narrative.
