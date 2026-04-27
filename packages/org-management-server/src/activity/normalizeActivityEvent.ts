import {
  ActivityActionKey,
  ActivityOrganizationRef,
  ActivityRecord,
  ActivityResult,
  ActivityTarget,
  LocalizedMessage,
  LocalizedMessageValue,
  Organization,
  UserRef,
} from '../domain/types';
import { RawAuditEvent, RawAuditTarget, RawUser } from '../upstream/types';

type ActivityDefinition = {
  action: ActivityActionKey;
  actionDefaultMessage: string;
  summaryDefaultMessage: string;
  failedSummaryDefaultMessage?: string;
  partialSummaryDefaultMessage?: string;
};

const UNKNOWN_ACTIVITY_DEFINITION: ActivityDefinition = {
  action: 'unknown',
  actionDefaultMessage: 'Unmapped activity',
  summaryDefaultMessage: '{actorName} performed an unmapped activity on {targetName}.',
  failedSummaryDefaultMessage:
    '{actorName} performed an unmapped activity on {targetName}, but the request failed.',
};

const activityDefinitionMap: Record<string, ActivityDefinition> = {
  'organization.created': {
    action: 'organizationCreated',
    actionDefaultMessage: 'Created organization',
    summaryDefaultMessage: '{actorName} created the organization {targetName}.',
  },
  'organization.updated': {
    action: 'organizationUpdated',
    actionDefaultMessage: 'Updated organization',
    summaryDefaultMessage: '{actorName} updated organization settings for {targetName}.',
  },
  'organization.archived': {
    action: 'organizationArchived',
    actionDefaultMessage: 'Archived organization',
    summaryDefaultMessage: '{actorName} archived the organization {targetName}.',
  },
  'domain.verified': {
    action: 'domainVerified',
    actionDefaultMessage: 'Verified domain',
    summaryDefaultMessage: '{actorName} verified domain {targetName}.',
  },
  'domain.updated': {
    action: 'domainUpdated',
    actionDefaultMessage: 'Updated domain',
    summaryDefaultMessage: '{actorName} updated domain settings for {targetName}.',
    partialSummaryDefaultMessage: '{actorName} partially updated domain settings for {targetName}.',
  },
  'admin.added': {
    action: 'adminAdded',
    actionDefaultMessage: 'Added admin',
    summaryDefaultMessage: '{actorName} added {targetName} as an organization admin.',
  },
  'user.disabled': {
    action: 'userDisabled',
    actionDefaultMessage: 'Disabled user',
    summaryDefaultMessage: '{actorName} disabled user {targetName}.',
    failedSummaryDefaultMessage:
      '{actorName} attempted to disable user {targetName}, but the request failed.',
  },
};

const createDisplayName = (user: RawUser) => `${user.givenName} ${user.familyName}`.trim();

const toUserRef = (user: RawUser | undefined): UserRef => {
  if (!user) {
    return {
      id: 'system',
      email: 'system@system.example',
      givenName: 'System',
      familyName: 'Automation',
      displayName: 'System Automation',
      type: 'system',
    };
  }

  return {
    id: user.id,
    email: user.email,
    givenName: user.givenName,
    familyName: user.familyName,
    displayName: createDisplayName(user),
    type: 'user',
  };
};

const getPrimaryTarget = (targets: RawAuditTarget[]) => targets[0];

const normalizeTarget = (target: RawAuditTarget | undefined): ActivityTarget => {
  if (!target) {
    return {
      type: 'unknown',
      name: 'Unknown target',
    };
  }

  if (target.userId || target.email) {
    return {
      type: 'user',
      id: target.userId,
      name: [target.givenName, target.familyName].filter(Boolean).join(' ') || target.email,
      email: target.email,
    };
  }

  if (target.domainId || target.domainName) {
    return {
      type: 'domain',
      id: target.domainId,
      name: target.domainName,
    };
  }

  if (target.orgId || target.orgName) {
    return {
      type: 'organization',
      id: target.orgId,
      name: target.orgName,
    };
  }

  return {
    type: 'unknown',
    name: 'Unknown target',
  };
};

const normalizeOrganization = (
  target: RawAuditTarget | undefined,
  organizationByReferenceId: Map<string, Organization>
): ActivityOrganizationRef | undefined => {
  if (!target?.orgReferenceId && !target?.orgName) {
    return undefined;
  }

  const organization = target.orgReferenceId
    ? organizationByReferenceId.get(target.orgReferenceId)
    : undefined;

  return {
    id: organization?.id ?? target.orgId,
    referenceId: organization?.referenceId ?? target.orgReferenceId ?? `org-ref-${target.orgId}`,
    name: organization?.name ?? target.orgName ?? 'Unknown organization',
  };
};

const hasPartialResult = (target: RawAuditTarget | undefined) => {
  const results = target?.resultDetails?.operationResults;

  if (!Array.isArray(results)) {
    return false;
  }

  const successValues = results
    .map((result) => result.successful)
    .filter((result): result is boolean => typeof result === 'boolean');

  return successValues.includes(true) && successValues.includes(false);
};

const normalizeResult = (event: RawAuditEvent, primaryTarget: RawAuditTarget | undefined) => {
  if (hasPartialResult(primaryTarget)) {
    return 'partial';
  }

  return event.successful ? 'success' : 'failed';
};

const createMessageValues = (
  actor: UserRef,
  target: ActivityTarget,
  organization: ActivityOrganizationRef | undefined
): LocalizedMessageValue[] => [
  { key: 'actorName', value: actor.displayName },
  { key: 'targetName', value: target.name ?? target.email ?? target.id ?? 'the selected object' },
  { key: 'organizationName', value: organization?.name ?? '' },
];

const valuesToRecord = (values: LocalizedMessageValue[]) =>
  values.reduce<Record<string, string>>((result, item) => {
    result[item.key] = item.value;
    return result;
  }, {});

const interpolateMessage = (message: LocalizedMessage) => {
  const values = valuesToRecord(message.values);

  return message.defaultMessage.replace(/\{([a-zA-Z0-9_]+)\}/g, (_match, key: string) => {
    return values[key] ?? '';
  });
};

const createActionLabel = (
  definition: ActivityDefinition,
  values: LocalizedMessageValue[]
): LocalizedMessage => ({
  id: `orgManagement.activity.action.${definition.action}`,
  defaultMessage: definition.actionDefaultMessage,
  values,
});

const getSummaryDefaultMessage = (definition: ActivityDefinition, result: ActivityResult) => {
  if (result === 'failed' && definition.failedSummaryDefaultMessage) {
    return definition.failedSummaryDefaultMessage;
  }

  if (result === 'partial' && definition.partialSummaryDefaultMessage) {
    return definition.partialSummaryDefaultMessage;
  }

  return definition.summaryDefaultMessage;
};

const createSummaryMessage = (
  definition: ActivityDefinition,
  result: ActivityResult,
  values: LocalizedMessageValue[]
): LocalizedMessage => {
  const resultSuffix =
    result === 'failed' && definition.failedSummaryDefaultMessage
      ? '.failed'
      : result === 'partial' && definition.partialSummaryDefaultMessage
        ? '.partial'
        : '';

  return {
    id: `orgManagement.activity.summary.${definition.action}${resultSuffix}`,
    defaultMessage: getSummaryDefaultMessage(definition, result),
    values,
  };
};

export const normalizeActivityEvent = (
  event: RawAuditEvent,
  organizations: Organization[]
): ActivityRecord => {
  const organizationByReferenceId = new Map(
    organizations.map((organization) => [organization.referenceId, organization])
  );
  const primaryTarget = getPrimaryTarget(event.targets);
  const actor = toUserRef(event.actor);
  const target = normalizeTarget(primaryTarget);
  const organization = normalizeOrganization(primaryTarget, organizationByReferenceId);
  const result = normalizeResult(event, primaryTarget);
  const definition = activityDefinitionMap[event.eventName] ?? UNKNOWN_ACTIVITY_DEFINITION;
  const values = createMessageValues(actor, target, organization);
  const actionLabel = createActionLabel(definition, values);
  const summaryMessage = createSummaryMessage(definition, result, values);

  return {
    id: event.id,
    actor,
    target,
    organization,
    action: definition.action,
    actionLabel,
    summaryMessage,
    summary: interpolateMessage(summaryMessage),
    result,
    eventTime: event.eventTime,
  };
};
