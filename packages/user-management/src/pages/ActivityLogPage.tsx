import { useEffect, useState } from 'react';
import { ContentTemplate, SearchBox, Table, TableSort } from '@hugo-ui/mui';
import { ActivityLogListInput } from '@/api/types';
import { useActivityLogsQuery } from '@/api/userManagementApi';
import { useActivityColumns } from '@/features/activity/activityDisplay';
import { useOrganizationScope } from '@/features/scope/OrganizationScopeContext';
import {
  ActivityCountText,
  ActivitySearchContainer,
  ActivityToolbar,
  PageRoot,
} from './pageStyles';

export function ActivityLogPage() {
  'use memo';

  const activityColumns = useActivityColumns();
  const {
    selectedOrganization,
    selectedOrganizationId,
    loading: scopeLoading,
  } = useOrganizationScope();
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<TableSort>({ columnId: 'eventTime', direction: 'desc' });
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    setPage(0);
  }, [selectedOrganizationId]);

  const queryInput: ActivityLogListInput | null = selectedOrganizationId
    ? {
        organizationId: selectedOrganizationId,
        pageNumber: page,
        pageSize,
        sortField: sort?.columnId ?? undefined,
        sortDirection: sort?.direction ?? undefined,
        searchString: search.trim() || undefined,
      }
    : null;

  const activityLogsQuery = useActivityLogsQuery(queryInput);
  const activityPage = activityLogsQuery.data?.activityLogs ?? null;

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(0);
  };

  const handleSortChange = (nextSort: TableSort) => {
    setSort(nextSort);
    setPage(0);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
    setPage(0);
  };

  return (
    <ContentTemplate
      type="table"
      pageTitle="Activity Log"
      titleInfo={
        selectedOrganization
          ? `Audit records scoped to ${selectedOrganization.name}.`
          : 'Select an organization scope to inspect activity records.'
      }
    >
      <PageRoot>
        <ActivityToolbar>
          <ActivitySearchContainer>
            <SearchBox
              aria-label="Search activity logs"
              placeholder="Search activity logs"
              value={search}
              onChange={handleSearchChange}
              onSearch={handleSearchChange}
            />
          </ActivitySearchContainer>
          <ActivityCountText>{activityPage?.totalElements ?? 0} activity records</ActivityCountText>
        </ActivityToolbar>

        <Table
          ariaLabel="Activity Log"
          columns={activityColumns}
          rows={activityPage?.items ?? []}
          getRowId={(row) => row.id}
          sort={sort}
          onSortChange={handleSortChange}
          loading={scopeLoading || activityLogsQuery.loading}
          error={activityLogsQuery.error?.message ?? null}
          empty="No activity records match the current scope."
          pagination={{
            page: activityPage?.currentPage ?? page,
            pageSize,
            total: activityPage?.totalElements ?? 0,
            pageSizeOptions: [10, 25, 50],
            onPageChange: setPage,
            onPageSizeChange: handlePageSizeChange,
          }}
        />
      </PageRoot>
    </ContentTemplate>
  );
}
