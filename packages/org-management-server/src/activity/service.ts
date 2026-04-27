import {
  ActivityLogListQuery,
  ActivityRecord,
  ActivityResult,
  Organization,
  PageResponse,
  SortDirection,
} from '../domain/types';
import { paginate } from '../domain/pagination';
import { AuditServiceClient, createMockAuditServiceClient } from '../upstream/auditServiceClient';
import { OrgServiceClient, createMockOrgServiceClient } from '../upstream/orgServiceClient';
import { RawAuditEvent } from '../upstream/types';
import { normalizeActivityEvent } from './normalizeActivityEvent';

const DEFAULT_ACTIVITY_SORT_FIELD = 'eventTime';
const DEFAULT_SORT_DIRECTION: SortDirection = 'desc';

export type ActivityService = {
  listActivityLogs: (query?: ActivityLogListQuery | null) => Promise<PageResponse<ActivityRecord>>;
  listOrganizationActivityLogs: (
    organizationId: string,
    query?: ActivityLogListQuery | null
  ) => Promise<PageResponse<ActivityRecord>>;
};

const matchesSearch = (activity: ActivityRecord, searchString?: string | null) => {
  const query = searchString?.trim().toLowerCase();

  if (!query) {
    return true;
  }

  return [
    activity.summary,
    activity.actor.displayName,
    activity.actor.email,
    activity.organization?.name,
    activity.target.name,
    activity.target.email,
    activity.action,
    activity.result,
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .includes(query);
};

const matchesFilters = (activity: ActivityRecord, query?: ActivityLogListQuery | null) => {
  const results = new Set<ActivityResult>(query?.results ?? []);
  const actions = new Set(query?.actions ?? []);

  if (results.size > 0 && !results.has(activity.result)) {
    return false;
  }

  if (actions.size > 0 && !actions.has(activity.action)) {
    return false;
  }

  return matchesSearch(activity, query?.searchString);
};

const getSortValue = (activity: ActivityRecord, sortField?: string | null) => {
  switch (sortField ?? DEFAULT_ACTIVITY_SORT_FIELD) {
    case 'actor':
      return activity.actor.displayName;
    case 'organization':
      return activity.organization?.name ?? '';
    case 'result':
      return activity.result;
    case 'action':
      return activity.action;
    case 'eventTime':
    default:
      return activity.eventTime;
  }
};

const compareValues = (first: string, second: string) => first.localeCompare(second);

const sortActivities = (activities: ActivityRecord[], query?: ActivityLogListQuery | null) => {
  const sortDirection = query?.sortDirection ?? DEFAULT_SORT_DIRECTION;
  const direction = sortDirection === 'desc' ? -1 : 1;

  return [...activities].sort(
    (first, second) =>
      compareValues(getSortValue(first, query?.sortField), getSortValue(second, query?.sortField)) *
      direction
  );
};

const hasOrganizationTarget = (event: RawAuditEvent, organization: Organization) =>
  event.targets.some(
    (target) =>
      target.orgId === organization.id || target.orgReferenceId === organization.referenceId
  );

export const createActivityService = (
  auditClient: AuditServiceClient = createMockAuditServiceClient(),
  orgClient: OrgServiceClient = createMockOrgServiceClient()
): ActivityService => {
  const normalizeEvents = async (events: RawAuditEvent[]) => {
    const organizations = await orgClient.listOrganizations();

    return events.map((event) => normalizeActivityEvent(event, organizations));
  };

  return {
    async listActivityLogs(query = {}) {
      const events = await auditClient.listAuditEvents();
      const activities = await normalizeEvents(events);
      const filteredActivities = activities.filter((activity) => matchesFilters(activity, query));

      return paginate(sortActivities(filteredActivities, query), query ?? {});
    },

    async listOrganizationActivityLogs(organizationId, query = {}) {
      const organization = await orgClient.getOrganizationById(organizationId);

      if (!organization) {
        return paginate([], query ?? {});
      }

      const events = await auditClient.listAuditEvents();
      const scopedEvents = events.filter((event) => hasOrganizationTarget(event, organization));
      const activities = await normalizeEvents(scopedEvents);
      const filteredActivities = activities.filter((activity) => matchesFilters(activity, query));

      return paginate(sortActivities(filteredActivities, query), query ?? {});
    },
  };
};
