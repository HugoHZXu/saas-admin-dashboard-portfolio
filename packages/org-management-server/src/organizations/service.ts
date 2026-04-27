import {
  Organization,
  OrganizationListQuery,
  OrganizationStatus,
  PageResponse,
  SortDirection,
} from '../domain/types';
import { paginate } from '../domain/pagination';
import { OrgServiceClient, createMockOrgServiceClient } from '../upstream/orgServiceClient';

const DEFAULT_ORGANIZATION_SORT_FIELD = 'name';
const DEFAULT_SORT_DIRECTION: SortDirection = 'asc';

export type OrganizationService = {
  listOrganizations: (query?: OrganizationListQuery | null) => Promise<PageResponse<Organization>>;
  getOrganizationDetail: (id: string) => Promise<Organization | undefined>;
};

const normalizeStatuses = (statuses?: OrganizationStatus[] | null) =>
  new Set((statuses ?? []).filter(Boolean));

const matchesSearch = (organization: Organization, searchString?: string | null) => {
  const query = searchString?.trim().toLowerCase();

  if (!query) {
    return true;
  }

  return [
    organization.name,
    organization.referenceId,
    organization.description,
    organization.city,
    organization.region,
    organization.country,
    organization.status,
    ...organization.domains.map((domain) => domain.name),
    ...organization.admins.map((admin) => `${admin.firstName} ${admin.lastName} ${admin.email}`),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .includes(query);
};

const getSortValue = (organization: Organization, sortField?: string | null) => {
  switch (sortField ?? DEFAULT_ORGANIZATION_SORT_FIELD) {
    case 'status':
      return organization.status;
    case 'userCount':
      return organization.userCount;
    case 'adminCount':
      return organization.adminCount ?? organization.admins.length;
    case 'domainCount':
      return organization.domains.length;
    case 'createdOn':
      return organization.createdOn;
    case 'lastUpdatedOn':
      return organization.lastUpdatedOn;
    case 'name':
    default:
      return organization.name;
  }
};

const compareValues = (first: string | number, second: string | number) => {
  if (typeof first === 'number' && typeof second === 'number') {
    return first - second;
  }

  return String(first).localeCompare(String(second));
};

export const createOrganizationService = (
  orgClient: OrgServiceClient = createMockOrgServiceClient()
): OrganizationService => ({
  async listOrganizations(query = {}) {
    const organizations = await orgClient.listOrganizations();
    const statuses = normalizeStatuses(query?.statuses);
    const sortDirection = query?.sortDirection ?? DEFAULT_SORT_DIRECTION;
    const direction = sortDirection === 'desc' ? -1 : 1;

    const filteredOrganizations = organizations.filter((organization) => {
      if (statuses.size > 0 && !statuses.has(organization.status)) {
        return false;
      }

      return matchesSearch(organization, query?.searchString);
    });

    const sortedOrganizations = [...filteredOrganizations].sort((first, second) => {
      const firstValue = getSortValue(first, query?.sortField);
      const secondValue = getSortValue(second, query?.sortField);

      return compareValues(firstValue, secondValue) * direction;
    });

    return paginate(sortedOrganizations, query ?? {});
  },

  async getOrganizationDetail(id) {
    return orgClient.getOrganizationById(id);
  },
});
