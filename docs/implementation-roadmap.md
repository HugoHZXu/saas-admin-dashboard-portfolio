# Implementation Roadmap

## Current Phase

The project is in public-release polish after the core portfolio architecture has been
implemented.

Completed:

- workspace dependency and tooling baseline
- MUI-based `hugo-ui` component package with tests and Storybook coverage
- Tailwind/shadcn-style `hugo-ui-shadcn` component package
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
- Document local setup across the BFF, shell, remotes, and Storybook.
- Add public repository basics such as license, contribution guidance, and security reporting.
- Keep `hugo-ui` and `hugo-ui-shadcn` described as publish-shaped packages consumed through
  workspace links in this portfolio.
- Keep the desensitization statement visible in the README and supporting docs.
- Run tracked-file and git-history secret checks before publishing the GitHub repository.

Expected outcome:

- Visitors can understand the project purpose from the README first screen.
- The package map and local run commands match the actual workspace.
- Public docs do not imply this is an extracted production system or an already-published npm
  package suite.

## Dashboard Workflow Polish

Tasks:

- Keep Organization and User workflows focused on the portfolio story.
- Preserve BFF ownership of data aggregation, query behavior, and Activity Log normalization.
- Keep page-level search, filters, sort state, pagination state, and navigation out of shared
  generic components.
- Use `StatusTag`, `SearchBox`, `Toggle`, and `Table` through their public package APIs.
- Add screenshots or architecture diagrams only when they represent the implemented flows.

## Component Package Polish

Tasks:

- Keep `hugo-ui` component changes generic, tested, exported, and covered in Storybook.
- Keep `hugo-ui-shadcn` experiments separate from `hugo-ui` unless explicitly promoted.
- Preserve publish-shaped package metadata and npm-style imports while keeping actual publication
  out of scope for this portfolio.
- Continue using semantic theme roles and component-local tokens for public component styling.

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
