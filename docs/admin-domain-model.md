# Admin Domain Model

The Hugo SaaS Console backend models three organization contexts in one admin BFF.

- Org Management is platform-side customer organization management. Access is represented by
  `platform_admin` on the internal platform organization membership.
- User Management is organization-scoped user and membership management. Access is represented by
  at least one User Management scope.
- Internal User Management scope is represented by `organization_admin` on the internal platform
  organization membership.
- Public User Management scope is represented by `public_user_admin` on the internal platform
  organization membership. Public admins are not members of the Public organization.
- Tenant User Management scope is represented by `organization_admin` on the current tenant
  membership.
- Tenant business management scope is represented by `workspace_manager` on the current tenant
  membership. It is intentionally not a User Management scope.
- Baseline workspace membership is represented by the membership record itself, not by a
  persisted `workspace_member` role.

`organizations.kind` distinguishes the platform virtual organization from customer tenants:

- `internal`: the SaaS provider/platform organization, such as `Demo Platform Operations`.
- `tenant`: a customer organization.
- `public`: a virtual organization for self-registered users without tenant membership.

Roles remain membership-scoped through `membership_role_assignments`, not global user attributes.
The same user may have different roles in different organizations, and one membership may have
multiple roles. A membership with no role assignments is still a regular member.

Role compatibility in this demo is intentionally small:

- `platform_admin` is valid only in `internal` organizations.
- `workspace_manager` is valid only in `tenant` organizations.
- `organization_admin` is valid in both `internal` and `tenant` organizations.
- `public_user_admin` is valid only in `internal` organizations.
- `public` memberships do not receive role assignments.

This is a domain modeling invariant, not a full permission matrix or authorization system.
User detail is scoped by the selected organization and does not expose cross-organization
membership counts.
