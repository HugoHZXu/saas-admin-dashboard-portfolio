import {
  ActivityAction,
  ActivityRecord,
  ActivityResult,
  ActivityTarget,
  LocalizedMessage,
  LocalizedMessageValue,
  UserRef,
} from './activity-log.types';
import { ActivityEventRecord } from './activity-log.repository';

type ActivityDefinition = {
  action: ActivityAction;
  actionDefaultMessage: string;
  summaryDefaultMessage: string;
};

const activityDefinitions: Record<string, ActivityDefinition> = {
  ADD_USER_TO_ORGANIZATION: {
    action: 'ADD_USER_TO_ORGANIZATION',
    actionDefaultMessage: 'Added user to organization',
    summaryDefaultMessage: '{actorName} added {targetName} to {organizationName}.',
  },
  CHANGE_USER_ROLES: {
    action: 'CHANGE_USER_ROLES',
    actionDefaultMessage: 'Changed user roles',
    summaryDefaultMessage: '{actorName} changed roles for {targetName} in {organizationName}.',
  },
  REMOVE_USER_FROM_ORGANIZATION: {
    action: 'REMOVE_USER_FROM_ORGANIZATION',
    actionDefaultMessage: 'Removed user from organization',
    summaryDefaultMessage: '{actorName} removed {targetName} from {organizationName}.',
  },
  SUSPEND_USER: {
    action: 'SUSPEND_USER',
    actionDefaultMessage: 'Suspended user',
    summaryDefaultMessage: '{actorName} suspended {targetName}.',
  },
  ORGANIZATION_UPDATED: {
    action: 'ORGANIZATION_UPDATED',
    actionDefaultMessage: 'Updated organization',
    summaryDefaultMessage: '{actorName} updated organization settings for {organizationName}.',
  },
  ORGANIZATION_CREATED: {
    action: 'ORGANIZATION_CREATED',
    actionDefaultMessage: 'Created organization',
    summaryDefaultMessage: '{actorName} created {organizationName}.',
  },
  DOMAIN_VERIFIED: {
    action: 'DOMAIN_VERIFIED',
    actionDefaultMessage: 'Verified domain',
    summaryDefaultMessage: '{actorName} verified a domain for {organizationName}.',
  },
};

const unknownDefinition: ActivityDefinition = {
  action: 'UNKNOWN',
  actionDefaultMessage: 'Unmapped activity',
  summaryDefaultMessage: '{actorName} recorded an unmapped activity for {targetName}.',
};

const createDisplayName = (firstName: string, lastName: string) => `${firstName} ${lastName}`.trim();

const toUserRef = (user: ActivityEventRecord['actor']): UserRef => {
  if (!user) {
    return {
      id: 'system',
      email: 'system@portfolio.example',
      givenName: 'System',
      familyName: 'Automation',
      displayName: 'System Automation',
      type: 'system',
    };
  }

  return {
    id: user.id,
    email: user.email,
    givenName: user.firstName,
    familyName: user.lastName,
    displayName: createDisplayName(user.firstName, user.lastName),
    type: 'user',
  };
};

const toTarget = (event: ActivityEventRecord): ActivityTarget => {
  if (event.targetUser) {
    return {
      type: 'user',
      id: event.targetUser.id,
      name: createDisplayName(event.targetUser.firstName, event.targetUser.lastName),
      email: event.targetUser.email,
    };
  }

  if (event.organization) {
    return {
      type: 'organization',
      id: event.organization.id,
      name: event.organization.name,
    };
  }

  return {
    type: 'unknown',
    name: 'Unknown target',
  };
};

const createValues = (
  actor: UserRef,
  target: ActivityTarget,
  organization: ActivityEventRecord['organization']
): LocalizedMessageValue[] => [
  { key: 'actorName', value: actor.displayName },
  { key: 'targetName', value: target.name ?? target.email ?? 'the selected object' },
  { key: 'organizationName', value: organization?.name ?? 'the selected organization' },
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
  id: `admin.activity.action.${definition.action}`,
  defaultMessage: definition.actionDefaultMessage,
  values,
});

const createSummaryMessage = (
  definition: ActivityDefinition,
  values: LocalizedMessageValue[]
): LocalizedMessage => ({
  id: `admin.activity.summary.${definition.action}`,
  defaultMessage: definition.summaryDefaultMessage,
  values,
});

export const normalizeActivityEvent = (event: ActivityEventRecord): ActivityRecord => {
  const definition = activityDefinitions[event.action] ?? unknownDefinition;
  const actor = toUserRef(event.actor);
  const target = toTarget(event);
  const values = createValues(actor, target, event.organization);
  const actionLabel = createActionLabel(definition, values);
  const summaryMessage = createSummaryMessage(definition, values);

  return {
    id: event.id,
    actor,
    target,
    organization: event.organization
      ? {
          id: event.organization.id,
          referenceId: event.organization.referenceId,
          name: event.organization.name,
        }
      : null,
    action: definition.action,
    actionLabel,
    summaryMessage,
    summary: event.message || interpolateMessage(summaryMessage),
    result: event.result as ActivityResult,
    eventTime: event.createdAt.toISOString(),
  };
};
