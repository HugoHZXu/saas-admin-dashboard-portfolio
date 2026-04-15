export const PATH_PARAMS = {
  ORGANIZATION_DETAIL: 'organizations/detail/:organizationId',
  ACTIVITY_LOG: 'activity-log',
} as const;

export const getOrganizationDetailPath = (organizationId: string) =>
  `organizations/detail/${organizationId}`;
