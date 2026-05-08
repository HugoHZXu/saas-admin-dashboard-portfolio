export const ORGANIZATION_IDS = {
  public: 'org-public',
  platformOps: 'org-platform-ops',
} as const;

export const ORGANIZATION_KINDS = {
  internal: 'internal',
  tenant: 'tenant',
  public: 'public',
} as const;

export const ROLE_KEYS = {
  platformAdmin: 'platform_admin',
  organizationAdmin: 'organization_admin',
  workspaceManager: 'workspace_manager',
  publicUserAdmin: 'public_user_admin',
} as const;
