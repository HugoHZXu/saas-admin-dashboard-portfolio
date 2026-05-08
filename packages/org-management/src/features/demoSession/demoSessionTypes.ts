export const DEMO_ACCOUNT_STORAGE_KEY = 'adminDashboard.demoAccountUserId';

export type DemoOrganizationKind = 'INTERNAL' | 'TENANT' | 'PUBLIC';

export type DemoRole = {
  id?: string | null;
  key: string;
  name: string;
};

export type DemoOrganizationScope = {
  id: string;
  name: string;
  kind: DemoOrganizationKind;
  status: string;
};

export type DemoAccountMembership = {
  organization: DemoOrganizationScope;
  roles: DemoRole[];
};

export type DemoCapabilities = {
  orgManagement: boolean;
  userManagement: boolean;
};

export type DemoAccount = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  persona: string;
  memberships: DemoAccountMembership[];
  capabilities: DemoCapabilities;
  userManagementOrganizations: DemoOrganizationScope[];
};

export type DemoSession = {
  accounts: DemoAccount[];
  currentAccount: DemoAccount;
  capabilities: DemoCapabilities;
  userManagementOrganizations: DemoOrganizationScope[];
};
