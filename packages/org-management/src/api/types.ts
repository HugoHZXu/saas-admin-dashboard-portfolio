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

export type OrganizationStatus = 'active' | 'inactive' | 'archived';

export type OrganizationDomain = {
  name: string;
  userCount: number;
  status?: string | null;
};

export type OrganizationAdmin = {
  id?: string | null;
  referenceId?: string | null;
  firstName: string;
  lastName: string;
  email: string;
  disabled?: boolean | null;
};

export type Role = {
  id: string;
  key: string;
  name: string;
};

export type OrganizationMemberUser = {
  id: string;
  name: string;
  email: string;
};

export type OrganizationMember = {
  id: string;
  user: OrganizationMemberUser;
  status: string;
  roles: Role[];
};

export type Organization = {
  id?: string | null;
  referenceId: string;
  name: string;
  description?: string | null;
  address?: string | null;
  address2?: string | null;
  city?: string | null;
  region?: string | null;
  postalCode?: string | null;
  country: string;
  timezone?: string | null;
  domains: OrganizationDomain[];
  admins: OrganizationAdmin[];
  memberships?: OrganizationMember[] | null;
  createdOn: string;
  lastUpdatedOn: string;
  userCount: number;
  adminCount?: number | null;
  status: OrganizationStatus;
};

export type OrganizationListInput = {
  pageNumber?: number;
  pageSize?: number;
  sortField?: string;
  sortDirection?: SortDirection;
  searchString?: string;
  statuses?: OrganizationStatus[];
};

export type UpdateOrganizationAdminsInput = {
  actorUserId?: string | null;
  organizationId: string;
  addUserIds: string[];
  removeUserIds: string[];
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
  searchString?: string;
  results?: ActivityResult[];
  actions?: string[];
};
