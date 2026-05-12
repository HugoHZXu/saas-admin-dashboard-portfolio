import { PageQuery } from '../../shared/result';

export type ActivityResult = 'success' | 'failed' | 'partial' | 'unknown';

export type ActivityAction =
  | 'ADD_USER_TO_ORGANIZATION'
  | 'CHANGE_USER_ROLES'
  | 'REMOVE_USER_FROM_ORGANIZATION'
  | 'SUSPEND_USER'
  | 'ACTIVATE_USER'
  | 'ORGANIZATION_CREATED'
  | 'ORGANIZATION_UPDATED'
  | 'ORGANIZATION_ARCHIVED'
  | 'DOMAIN_VERIFIED'
  | 'UNKNOWN';

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

export type ActivityOrganizationRef = {
  id?: string | null;
  referenceId: string;
  name: string;
};

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
  organization?: ActivityOrganizationRef | null;
  action: ActivityAction;
  actionLabel: LocalizedMessage;
  summaryMessage: LocalizedMessage;
  summary: string;
  result: ActivityResult;
  eventTime: string;
};

export type ActivityLogListQuery = PageQuery & {
  targetUserId?: string | null;
  organizationId?: string | null;
  searchString?: string | null;
  results?: ActivityResult[] | null;
  actions?: string[] | null;
};
