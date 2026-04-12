# Desensitization Rules

## Core Rule

This repository must only contain public-safe, synthetic, portfolio-oriented code and data.

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

Reusable components should use `hugo-ui` theme roles and component-local tokens.

Prefer:

- `theme.hugoUIColorRoles`
- `theme.hugoUITypography`
- `theme.hugoUIColors` only when a semantic role is not specific enough
- component-scoped token files such as `tableTokens.ts` and `statusTagTokens.ts`

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
- Shared UI uses local `hugo-ui` theme roles and component tokens.
- README or docs do not imply this is an extracted production system.
