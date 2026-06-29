---
name: portfolio-desensitization-review
description: Review Hugo SaaS Console changes for public portfolio safety. Use before or after adding mock UI data, business copy, README/docs content, Activity Log UI examples, or code inspired by prior private projects.
---

# Portfolio Desensitization Review

Use this skill whenever a change could expose private implementation details or make the portfolio look like a direct copy of a prior product.

## Step 1: Identify Public Surface

Check all changed or proposed files that contain:

- mock data
- endpoint names, API client assumptions, or service names
- Activity Log UI examples
- README/docs copy
- route names, permissions, roles, and business rules
- visual tokens, class names, or component names adapted from reference projects

## Step 2: Block Private Assets

The change must not include:

- real company, product, tenant, customer, org, user, or domain names
- real endpoints, API keys, access tokens, PRNs, account ids, org ids, or production logs
- screenshots or data copied from private tools
- internal permission rules or operational policy details
- private token names, brand names, class names, icon strings, or design-system wording
- copied source from private projects

## Step 3: Preserve Only Generic Patterns

Allowed abstractions:

- Organization
- User
- Domain
- Admin
- Role
- Status
- Activity Log
- synthetic B2B SaaS plans, domains, users, and audit events

When adapting from prior experience, keep the capability pattern and rewrite the implementation, names, data, and copy.

## Step 4: Check Data Plausibility Without Identifiability

Mock data should be realistic enough for a B2B admin dashboard, but clearly synthetic.

- Prefer `.example` domains or obviously synthetic names.
- Avoid real customer-like combinations.
- Avoid production-looking identifiers unless they are synthetic and consistently namespaced.
- Keep role and status names generic.

## Step 5: Report

End with:

- `Reviewed surface:` files or areas checked
- `Findings:` private/sensitive risks found, or `none`
- `Required changes:` concrete edits needed before public use
- `Residual risk:` anything not inspected
