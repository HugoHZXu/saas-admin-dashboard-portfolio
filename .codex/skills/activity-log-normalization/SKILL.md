---
name: activity-log-normalization
description: Design and review Activity Log BFF normalization. Use when implementing raw audit events, normalized activity view models, global Activity Log pages, or object-local Activity Log slices.
---

# Activity Log Normalization

Use this skill before implementing Activity Log data contracts, normalization, or UI rendering.

## Step 1: Keep Raw Events Away From UI

The frontend should not understand raw audit-service shapes. The BFF/mock service owns translation from raw event data to a view model.

Use separate concepts:

- raw event: synthetic service-like audit record
- normalized activity: frontend-friendly model
- rendered row/detail: UI presentation

## Step 2: Normalize To Human Meaning

Every normalized activity record should answer:

- who performed the action
- when it happened
- what object was affected
- what changed or what operation was attempted
- whether it succeeded, failed, or is pending

Do not collapse events into vague text-only strings if structured fields are needed for filtering, sorting, or detail pages.

## Step 3: Preserve Desensitization

Use synthetic actors, object ids, object names, domains, and event names. Do not copy real audit event names, endpoint names, permission names, or production payload structure.

Run `$portfolio-desensitization-review` when adding examples.

## Step 4: Define Page Usage

For each Activity Log slice, identify:

- global page or object-local panel
- object filter source
- event type filters
- pagination and sorting owner
- empty/loading/error state source
- drill-in or detail behavior, if any

## Step 5: Test Cases

Cover at least:

- success event
- failed event
- event with actor
- system event without normal user actor
- object-local filtering
- unknown event fallback

Keep tests on the normalization layer separate from UI rendering tests.
