import { OrganizationKind, OrganizationStatus } from '../organization/organization.types';
import { Role } from '../role/role.types';

export type DemoCapabilities = {
  orgManagement: boolean;
  userManagement: boolean;
};

export type DemoOrganizationScope = {
  id: string;
  name: string;
  kind: OrganizationKind;
  status: OrganizationStatus;
};

export type DemoAccountMembership = {
  organization: DemoOrganizationScope;
  roles: Role[];
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
