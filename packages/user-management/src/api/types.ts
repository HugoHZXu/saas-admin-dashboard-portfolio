export type SortDirection = 'asc' | 'desc';

export type PageResponse<T> = {
  items: T[];
  totalPages: number;
  totalElements: number;
  isLastPage: boolean;
  isFirstPage: boolean;
  currentPage: number;
  pageSize: number;
};

export type MutationResult = {
  success: boolean;
  code: string;
  message: string;
};

export type OrganizationKind = 'INTERNAL' | 'TENANT' | 'PUBLIC';
export type OrganizationStatus = 'active' | 'inactive' | 'archived';

export type OrganizationScope = {
  id?: string | null;
  referenceId: string;
  name: string;
  kind: OrganizationKind;
  status: OrganizationStatus;
  userCount: number;
};

export type OrganizationListInput = {
  pageNumber?: number;
  pageSize?: number;
  sortField?: string;
  sortDirection?: SortDirection;
  searchString?: string;
  statuses?: OrganizationStatus[];
  kinds?: OrganizationKind[];
};

export type RoleKey =
  | 'platform_admin'
  | 'organization_admin'
  | 'workspace_manager'
  | 'public_user_admin';

export type Role = {
  id: string;
  key: RoleKey | string;
  name: string;
};

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

export type UserAccountStatus = 'Active' | 'Suspended' | 'Incomplete';

export type IdName = {
  id: string;
  name: string;
};

export type UserListItem = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  accountStatus: UserAccountStatus;
  lastSignedIn: string | null;
  dateRegistered: string;
  membershipId: string;
  organization: IdName;
  roles: Role[];
};

export type UserMembership = {
  id: string;
  organization: IdName;
  roles: Role[];
  createdAt: string;
};

export type UserDetail = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  accountStatus: UserAccountStatus;
  lastSignedIn: string | null;
  dateRegistered: string;
  memberships: UserMembership[];
};

export type UserListInput = {
  organizationId: string;
  pageNumber?: number;
  pageSize?: number;
  sortField?: string;
  sortDirection?: SortDirection;
  searchString?: string;
  accountStatuses?: UserAccountStatus[];
  roleKeys?: string[];
};

export type AddUserToOrganizationByEmailInput = {
  actorUserId?: string | null;
  email: string;
  organizationId: string;
  reason?: string | null;
};

export type ChangeUserRolesInput = {
  actorUserId?: string | null;
  userId: string;
  organizationId: string;
  roleIds: string[];
  reason?: string | null;
};

export type UserRef = {
  id: string;
  email: string;
  givenName: string;
  familyName: string;
  displayName: string;
  type: 'user' | 'system';
};

export type ActivityTarget = {
  type: string;
  id?: string | null;
  name?: string | null;
  email?: string | null;
};

export type ActivityOrganization = {
  id?: string | null;
  referenceId: string;
  name: string;
};

export type ActivityResult = 'success' | 'failed' | 'partial' | 'unknown';

export type LocalizedMessageValue = {
  key: string;
  value: string;
};

export type LocalizedMessage = {
  id: string;
  defaultMessage: string;
  values: LocalizedMessageValue[];
};

export type ActivityRecord = {
  id: string;
  actor: UserRef;
  target: ActivityTarget;
  organization?: ActivityOrganization | null;
  action: string;
  actionLabel: LocalizedMessage;
  summaryMessage: LocalizedMessage;
  summary: string;
  result: ActivityResult;
  eventTime: string;
};

export type ActivityLogListInput = {
  pageNumber?: number;
  pageSize?: number;
  sortField?: string;
  sortDirection?: SortDirection;
  targetUserId?: string;
  organizationId?: string;
  searchString?: string;
  results?: ActivityResult[];
  actions?: string[];
};
