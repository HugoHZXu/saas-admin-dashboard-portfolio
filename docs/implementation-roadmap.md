# Implementation Roadmap

## Current Phase

The project is in public-release polish after the core portfolio architecture has been
implemented.

Completed:

- workspace dependency and tooling baseline
- external `@hugo-ui/mui` consumption through a committed npm package version, a version check, and
  local-only symlink setup
- local GraphQL BFF in `admin-server`
- Prisma SQLite schema, migrations, reset script, and synthetic seed data
- Activity Log event normalization
- federated `admin-console` shell
- `org-management` and `user-management` remotes
- Organization/User list, detail, and Activity Log portfolio surfaces
- public AI-assisted workflow instructions and project-specific Skills

## Public Release Polish

Tasks:

- Keep the root README focused on the B2B SaaS admin dashboard portfolio audience.
- Document local setup across the BFF, shell, remotes, and external design-system link.
- Add public repository basics such as license, contribution guidance, and security reporting.
- Keep `@hugo-ui/mui` described as an external design-system dependency consumed through
  package-style imports, an npm package version, and a local-only symlink workflow.
- Keep the desensitization statement visible in the README and supporting docs.
- Run tracked-file and git-history secret checks before publishing the GitHub repository.

Expected outcome:

- Visitors can understand the project purpose from the README first screen.
- The package map and local run commands match the actual workspace.
- Public docs do not imply this is an extracted production system or a dashboard-owned package
  suite.

## Dashboard Workflow Polish

Tasks:

- Keep Organization and User workflows focused on the portfolio story.
- Preserve BFF ownership of data aggregation, query behavior, and Activity Log normalization.
- Keep page-level search, filters, sort state, pagination state, and navigation out of shared
  generic components.
- Use `StatusTag`, `SearchBox`, `Toggle`, and `Table` through their public package APIs.
- Add screenshots or architecture diagrams only when they represent the implemented flows.

## External Design-System Consumption

Tasks:

- Keep dashboard code on public `@hugo-ui/mui` imports instead of reaching into private component
  internals.
- Keep local symlink setup documented and ignored by Git.
- Move reusable component API, token, Storybook, changeset, and release/versioning work to the
  external Hugo UI repository.
- Continue using public theme roles and component APIs for dashboard styling.

## Not In Scope For Now

- complete user-management platform
- complete tenant-management platform
- advanced access-control modeling
- column resizing
- column configuration
- batch actions
- sticky table header
- real backend integration
- real authentication
- production deployment
