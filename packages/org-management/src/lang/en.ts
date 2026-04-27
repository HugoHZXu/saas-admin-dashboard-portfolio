const enMessages: Record<string, string> = {
  'orgManagement.activity.column.actor': 'Actor',
  'orgManagement.activity.column.activity': 'Activity',
  'orgManagement.activity.column.organization': 'Organization',
  'orgManagement.activity.column.result': 'Result',
  'orgManagement.activity.column.eventTime': 'Event time',
  'orgManagement.activity.emptyOrganization': 'No organization',

  'orgManagement.activity.result.success': 'Success',
  'orgManagement.activity.result.failed': 'Failed',
  'orgManagement.activity.result.partial': 'Partial',
  'orgManagement.activity.result.unknown': 'Unknown',

  'orgManagement.activity.action.organizationCreated': 'Created organization',
  'orgManagement.activity.action.organizationUpdated': 'Updated organization',
  'orgManagement.activity.action.organizationArchived': 'Archived organization',
  'orgManagement.activity.action.domainVerified': 'Verified domain',
  'orgManagement.activity.action.domainUpdated': 'Updated domain',
  'orgManagement.activity.action.adminAdded': 'Added admin',
  'orgManagement.activity.action.userDisabled': 'Disabled user',
  'orgManagement.activity.action.unknown': 'Unmapped activity',

  'orgManagement.activity.summary.organizationCreated':
    '{actorName} created the organization {targetName}.',
  'orgManagement.activity.summary.organizationUpdated':
    '{actorName} updated organization settings for {targetName}.',
  'orgManagement.activity.summary.organizationArchived':
    '{actorName} archived the organization {targetName}.',
  'orgManagement.activity.summary.domainVerified': '{actorName} verified domain {targetName}.',
  'orgManagement.activity.summary.domainUpdated':
    '{actorName} updated domain settings for {targetName}.',
  'orgManagement.activity.summary.domainUpdated.partial':
    '{actorName} partially updated domain settings for {targetName}.',
  'orgManagement.activity.summary.adminAdded':
    '{actorName} added {targetName} as an organization admin.',
  'orgManagement.activity.summary.userDisabled': '{actorName} disabled user {targetName}.',
  'orgManagement.activity.summary.userDisabled.failed':
    '{actorName} attempted to disable user {targetName}, but the request failed.',
  'orgManagement.activity.summary.unknown':
    '{actorName} performed an unmapped activity on {targetName}.',
  'orgManagement.activity.summary.unknown.failed':
    '{actorName} performed an unmapped activity on {targetName}, but the request failed.',
};

export default enMessages;
