# Implementation Roadmap

## Current Phase

The project is currently in the component-library foundation phase.

Completed:

- workspace dependency upgrade
- current React/MUI/Storybook/TypeScript/Jest/Vite baseline
- `Table` public component in `hugo-ui`
- `StatusTag` public component in `hugo-ui`
- Storybook coverage for `Table` and `StatusTag`
- tests for `Table` and `StatusTag`

## Next Phase: Mock Domain And BFF

Build the data foundation before adding dashboard pages.

Tasks:

- Define shared Organization, User, Domain, Admin, Status, Role, and Activity Log types.
- Create fully synthetic mock data.
- Model multiple source shapes internally to simulate separate organization/user and activity-event sources.
- Expose a single frontend-facing API shape.
- Normalize low-level activity events into readable activity records.
- Keep raw event complexity inside the BFF/mock service layer.

Expected outcome:

- Frontend page code consumes one stable API.
- Activity Log rendering does not need to understand raw event source details.
- Organization data and activity records can be queried together for detail pages.

## Next Phase: Organization Table Page

Build the first real dashboard workflow around the shared `Table`.

Tasks:

- Add a dashboard app surface or page route.
- Add page-level toolbar with search and filters.
- Use controlled sort state from `Table`.
- Use controlled pagination state from `Table`.
- Fetch or derive rows from the mock BFF layer.
- Render status with `StatusTag`.
- Navigate from a row to Organization detail.

Keep inside page code:

- search state
- filter state
- query params
- sorting data behavior
- pagination data behavior
- navigation

Keep inside `Table`:

- structure
- display states
- sortable header UI
- pagination UI
- row activation

## Next Phase: Organization And User Detail

Tasks:

- Organization detail layout
- basic information section
- status and plan summary
- domains section
- associated users section
- admins section
- object-scoped Activity Log section
- small set of key actions such as archive, restore, edit, enable, and disable

Avoid building a complete tenant-management system. Mock only enough relationships to support realistic admin flows.

## Next Phase: Activity Log

Tasks:

- global Activity Log page
- object-scoped Activity Log section
- event-to-display normalization
- actor, target, action, result, and timestamp rendering
- basic filters that support the portfolio story

Activity records should answer:

- who acted
- when it happened
- what object changed
- what action happened
- whether the result succeeded or failed

## Final Phase: Public Narrative

Do this after the dashboard workflows are implemented.

Tasks:

- rewrite README for the portfolio audience
- add architecture explanation
- add BFF rationale
- add component-library rationale
- add desensitization statement
- add AI-assisted development workflow statement
- add screenshots or Storybook references if useful

## Not In Scope For Now

- complete user-management platform
- advanced access-control modeling
- column resizing
- column configuration
- batch actions
- sticky table header
- real backend integration
- real authentication
- production deployment
