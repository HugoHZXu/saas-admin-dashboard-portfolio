import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ContentTemplate, StatusTag, StatusTagTone, Table, TableSort } from 'hugo-ui';
import {
  useOrganizationActivityLogsQuery,
  useOrganizationQuery,
} from '@/api/orgManagementApi';
import { ActivityLogListInput, OrganizationStatus } from '@/api/types';
import { useActivityColumns } from '@/features/activity/activityDisplay';
import {
  DefinitionItem,
  DefinitionLabel,
  DefinitionList,
  DefinitionValue,
  DetailCard,
  DetailCardWide,
  DetailGrid,
  PanelHeading,
  PanelText,
} from './pageStyles';

const statusToneMap: Record<OrganizationStatus, StatusTagTone> = {
  active: 'success',
  inactive: 'warning',
  archived: 'neutral',
};

const statusLabelMap: Record<OrganizationStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  archived: 'Archived',
};

export function OrganizationDetailPage() {
  const navigate = useNavigate();
  const { organizationId } = useParams();
  const activityColumns = useActivityColumns();
  const [activitySort, setActivitySort] = useState<TableSort>({
    columnId: 'eventTime',
    direction: 'desc',
  });
  const [activityPageNumber, setActivityPageNumber] = useState(0);

  const activityInput = useMemo<ActivityLogListInput>(
    () => ({
      pageNumber: activityPageNumber,
      pageSize: 5,
      sortField: activitySort?.columnId ?? undefined,
      sortDirection: activitySort?.direction ?? undefined,
    }),
    [activityPageNumber, activitySort]
  );
  const organizationQuery = useOrganizationQuery(organizationId);
  const activityQuery = useOrganizationActivityLogsQuery(organizationId, activityInput);
  const organization = organizationQuery.data?.organization ?? null;
  const activityPage = activityQuery.data?.organizationActivityLogs ?? null;
  const detailError = !organizationId
    ? 'The selected organization route is missing an id.'
    : (organizationQuery.error?.message ?? null);

  if (organizationQuery.loading && !organization) {
    return (
      <ContentTemplate type="card" pageTitle="Loading organization" onBack={() => navigate(-1)}>
        <DetailCard>
          <PanelHeading>Loading</PanelHeading>
          <PanelText>Loading organization details from the BFF server.</PanelText>
        </DetailCard>
      </ContentTemplate>
    );
  }

  if (detailError || !organization) {
    return (
      <ContentTemplate
        type="error"
        pageTitle="Organization not found"
        errorMessage={
          detailError ?? 'The selected organization does not exist in the BFF data set.'
        }
        onBack={() => navigate(-1)}
      />
    );
  }

  const handleActivitySortChange = (nextSort: TableSort) => {
    setActivitySort(nextSort);
    setActivityPageNumber(0);
  };

  return (
    <ContentTemplate
      type="card"
      pageTitle={organization.name}
      titleInfo="Organization detail from the BFF server with scoped normalized activity."
      onBack={() => navigate(-1)}
    >
      <DetailGrid>
        <DetailCard aria-label="Basic information">
          <PanelHeading>Basic information</PanelHeading>
          <DefinitionList>
            <DefinitionItem>
              <DefinitionLabel>Status</DefinitionLabel>
              <DefinitionValue>
                <StatusTag tone={statusToneMap[organization.status]}>
                  {statusLabelMap[organization.status]}
                </StatusTag>
              </DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Location</DefinitionLabel>
              <DefinitionValue>
                {[organization.city, organization.region, organization.country]
                  .filter(Boolean)
                  .join(', ')}
              </DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Primary domain</DefinitionLabel>
              <DefinitionValue>{organization.domains[0]?.name ?? 'No domain'}</DefinitionValue>
            </DefinitionItem>
          </DefinitionList>
        </DetailCard>

        <DetailCard aria-label="Relationship summary">
          <PanelHeading>Relationship summary</PanelHeading>
          <DefinitionList>
            <DefinitionItem>
              <DefinitionLabel>Users</DefinitionLabel>
              <DefinitionValue>{organization.userCount}</DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Admins</DefinitionLabel>
              <DefinitionValue>
                {organization.adminCount ?? organization.admins.length}
              </DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Domains</DefinitionLabel>
              <DefinitionValue>{organization.domains.length}</DefinitionValue>
            </DefinitionItem>
            <DefinitionItem>
              <DefinitionLabel>Last updated</DefinitionLabel>
              <DefinitionValue>
                {new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(
                  new Date(organization.lastUpdatedOn)
                )}
              </DefinitionValue>
            </DefinitionItem>
          </DefinitionList>
        </DetailCard>

        <DetailCardWide aria-label="Scoped activity">
          <PanelHeading>Scoped Activity Log</PanelHeading>
          <Table
            ariaLabel="Scoped organization activity"
            columns={activityColumns}
            rows={activityPage?.items ?? []}
            getRowId={(row) => row.id}
            sort={activitySort}
            onSortChange={handleActivitySortChange}
            loading={activityQuery.loading}
            error={activityQuery.error?.message ?? null}
            empty="No scoped activity records found."
            pagination={{
              page: activityPage?.currentPage ?? activityPageNumber,
              pageSize: activityPage?.pageSize ?? 5,
              total: activityPage?.totalElements ?? 0,
              pageSizeOptions: [5],
              onPageChange: setActivityPageNumber,
            }}
          />
        </DetailCardWide>
      </DetailGrid>
    </ContentTemplate>
  );
}
