const enMessages: Record<string, string> = {
  'userManagement.activity.column.actor': 'Actor',
  'userManagement.activity.column.activity': 'Activity',
  'userManagement.activity.column.organization': 'Organization',
  'userManagement.activity.column.result': 'Result',
  'userManagement.activity.column.eventTime': 'Event time',
  'userManagement.activity.emptyOrganization': 'No organization',

  'userManagement.activity.result.success': 'Success',
  'userManagement.activity.result.failed': 'Failed',
  'userManagement.activity.result.partial': 'Partial',
  'userManagement.activity.result.unknown': 'Unknown',

  'userManagement.activity.action.ADD_USER_TO_ORGANIZATION': 'Added user to organization',
  'userManagement.activity.action.CHANGE_USER_ROLES': 'Changed user roles',
  'userManagement.activity.action.REMOVE_USER_FROM_ORGANIZATION': 'Removed user from organization',
  'userManagement.activity.action.SUSPEND_USER': 'Suspended user',
  'userManagement.activity.action.ORGANIZATION_CREATED': 'Created organization',
  'userManagement.activity.action.ORGANIZATION_UPDATED': 'Updated organization',
  'userManagement.activity.action.DOMAIN_VERIFIED': 'Verified domain',
  'userManagement.activity.action.UNKNOWN': 'Unmapped activity',

  'userManagement.activity.summary.ADD_USER_TO_ORGANIZATION':
    '{actorName} added {targetName} to {organizationName}.',
  'userManagement.activity.summary.CHANGE_USER_ROLES':
    '{actorName} changed roles for {targetName} in {organizationName}.',
  'userManagement.activity.summary.REMOVE_USER_FROM_ORGANIZATION':
    '{actorName} removed {targetName} from {organizationName}.',
  'userManagement.activity.summary.SUSPEND_USER': '{actorName} suspended {targetName}.',
  'userManagement.activity.summary.ORGANIZATION_CREATED': '{actorName} created {organizationName}.',
  'userManagement.activity.summary.ORGANIZATION_UPDATED':
    '{actorName} updated organization settings for {organizationName}.',
  'userManagement.activity.summary.DOMAIN_VERIFIED':
    '{actorName} verified a domain for {organizationName}.',
  'userManagement.activity.summary.UNKNOWN':
    '{actorName} recorded an unmapped activity for {targetName}.',
};

export default enMessages;
