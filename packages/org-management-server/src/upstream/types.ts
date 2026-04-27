export type RawUser = {
  id: string;
  email: string;
  givenName: string;
  familyName: string;
};

export type RawAuditOperationResult = {
  name: string;
  successful: boolean;
};

export type RawAuditResultDetails = {
  changedFields?: string[];
  failureReason?: string;
  operationResults?: RawAuditOperationResult[];
};

export type RawAuditTarget = {
  userId?: string;
  email?: string;
  givenName?: string;
  familyName?: string;
  orgId?: string;
  orgReferenceId?: string;
  orgName?: string;
  domainId?: string;
  domainName?: string;
  resultDetails?: RawAuditResultDetails;
};

export type RawAuditEvent = {
  id: string;
  i18n: string;
  actor?: RawUser;
  eventTime: string;
  eventType?: string;
  eventSource: string;
  eventName: string;
  successful: boolean;
  targets: RawAuditTarget[];
};
