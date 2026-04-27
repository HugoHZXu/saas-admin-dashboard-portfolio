export type SortDirection = 'asc' | 'desc';

export type PageQuery = {
  pageNumber?: number | null;
  pageSize?: number | null;
  sortField?: string | null;
  sortDirection?: SortDirection | null;
};

export type PageResponse<T> = {
  items: T[];
  totalPages: number;
  totalElements: number;
  isLastPage: boolean;
  isFirstPage: boolean;
  currentPage: number;
  pageSize: number;
};

export type OrganizationStatus = 'active' | 'inactive' | 'archived';

export type OrganizationDomain = {
  name: string;
  userCount: number;
  status?: string;
};

export type OrganizationAdmin = {
  id?: string;
  referenceId?: string;
  firstName: string;
  lastName: string;
  email: string;
  disabled?: boolean;
};

export type Organization = {
  id?: string;
  referenceId: string;
  name: string;
  description?: string;
  address?: string;
  address2?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country: string;
  timezone?: string;
  domains: OrganizationDomain[];
  admins: OrganizationAdmin[];
  createdOn: string;
  lastUpdatedOn: string;
  userCount: number;
  adminCount?: number;
  status: OrganizationStatus;
};

export type OrganizationListQuery = PageQuery & {
  searchString?: string | null;
  statuses?: OrganizationStatus[] | null;
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
  id?: string;
  name?: string;
  email?: string;
};

export type ActivityOrganizationRef = {
  id?: string;
  referenceId: string;
  name: string;
};

export type ActivityResult = 'success' | 'failed' | 'partial' | 'unknown';

export type ActivityActionKey =
  | 'organizationCreated'
  | 'organizationUpdated'
  | 'organizationArchived'
  | 'domainVerified'
  | 'domainUpdated'
  | 'adminAdded'
  | 'userDisabled'
  | 'unknown';

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
  organization?: ActivityOrganizationRef;
  action: ActivityActionKey;
  actionLabel: LocalizedMessage;
  summaryMessage: LocalizedMessage;
  summary: string;
  result: ActivityResult;
  eventTime: string;
};

export type ActivityLogListQuery = PageQuery & {
  searchString?: string | null;
  results?: ActivityResult[] | null;
  actions?: string[] | null;
};
