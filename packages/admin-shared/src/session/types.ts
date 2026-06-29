export const DEMO_ACCOUNT_STORAGE_KEY = 'adminDashboard.demoAccountUserId';
export const IDENTITY_ACCESS_TOKEN_STORAGE_KEY = 'adminDashboard.identityAccessToken';
export const IDENTITY_ACCESS_TOKEN_EXPIRES_AT_STORAGE_KEY =
  'adminDashboard.identityAccessTokenExpiresAt';

export type DemoOrganizationKind = 'internal' | 'tenant' | 'public';
export type DemoOrganizationStatus = 'active' | 'inactive' | 'archived';

export type OrganizationKind = DemoOrganizationKind;
export type OrganizationStatus = DemoOrganizationStatus;

export type DemoRole = {
  id?: string | null;
  key: string;
  name: string;
};

export type DemoCapabilities = {
  orgManagement: boolean;
  userManagement: boolean;
};

export type DemoOrganizationScope = {
  id: string;
  name: string;
  kind: DemoOrganizationKind;
  status: DemoOrganizationStatus;
};

export type DemoAccountMembership = {
  organization: DemoOrganizationScope;
  membershipStatus: string;
  roles: DemoRole[];
};

export type DemoAccount = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  accountStatus: string;
  persona: string;
  memberships: DemoAccountMembership[];
  capabilities: DemoCapabilities;
  userManagementOrganizations: DemoOrganizationScope[];
  entitlementOrganizations: DemoOrganizationScope[];
};

export type DemoSession = {
  accounts: DemoAccount[];
  currentAccount: DemoAccount;
  capabilities: DemoCapabilities;
  userManagementOrganizations: DemoOrganizationScope[];
  entitlementOrganizations: DemoOrganizationScope[];
  accessToken: string;
  tokenType: 'Bearer';
  expiresAt: string;
};
