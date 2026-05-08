import { useMemo } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import {
  ContentTemplate,
  SearchBox,
  StatusTag,
  StatusTagTone,
  Table,
  TableColumn,
  TableSort,
  Toggle,
  ToggleOption,
} from 'hugo-ui';
import { useOrganizationsQuery } from '@/api/orgManagementApi';
import { Organization, OrganizationListInput, OrganizationStatus } from '@/api/types';
import { getOrganizationDetailPath } from '@/routes/paths';
import {
  useOrganizationListTableStore,
  type OrganizationTableControlMode,
} from './organizationListStore';
import {
  FilterModePanel,
  OrganizationCell,
  OrganizationDomain,
  OrganizationName,
  OrganizationPageRoot,
  SearchFieldContainer,
  SummaryCard,
  SummaryGrid,
  SummaryLabel,
  SummaryValue,
  StatusFilterButton,
  TableToolbar,
} from './OrganizationListPage.styles';

const statusToneMap: Record<OrganizationStatus, StatusTagTone> = {
  active: 'success',
  inactive: 'warning',
  archived: 'neutral',
};

const statusOptions: { value: OrganizationStatus; label: string }[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'archived', label: 'Archived' },
];

const sortFieldMap: Record<string, string> = {
  name: 'name',
  status: 'status',
  users: 'userCount',
  admins: 'adminCount',
  domains: 'domainCount',
  lastUpdatedOn: 'lastUpdatedOn',
};

const formatStatusLabel = (status: OrganizationStatus) => {
  const option = statusOptions.find((item) => item.value === status);

  return option?.label ?? status;
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
  }).format(new Date(value));
};

const organizationColumns: TableColumn<Organization>[] = [
  {
    id: 'name',
    header: 'Organization',
    sortable: true,
    minWidth: 220,
    render: (row) => (
      <OrganizationCell>
        <OrganizationName>{row.name}</OrganizationName>
        <OrganizationDomain>{row.domains[0]?.name ?? 'No domain'}</OrganizationDomain>
      </OrganizationCell>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    minWidth: 120,
    render: (row) => (
      <StatusTag tone={statusToneMap[row.status]}>{formatStatusLabel(row.status)}</StatusTag>
    ),
  },
  {
    id: 'country',
    header: 'Country',
    minWidth: 120,
    render: (row) => row.country,
  },
  {
    id: 'users',
    header: 'Users',
    sortable: true,
    align: 'right',
    width: 120,
    render: (row) => row.userCount,
  },
  {
    id: 'admins',
    header: 'Admins',
    sortable: true,
    align: 'right',
    width: 120,
    render: (row) => row.adminCount ?? row.admins.length,
  },
  {
    id: 'domains',
    header: 'Domains',
    sortable: true,
    align: 'right',
    width: 120,
    render: (row) => row.domains.length,
  },
  {
    id: 'lastUpdatedOn',
    header: 'Last updated',
    sortable: true,
    minWidth: 160,
    render: (row) => formatDate(row.lastUpdatedOn),
  },
];

const tableControlOptions: ToggleOption<OrganizationTableControlMode>[] = [
  { value: 'search', label: 'Search', icon: <SearchIcon /> },
  { value: 'filter', label: 'Filter', icon: <FilterListIcon /> },
];

export function OrganizationListPage() {
  const navigate = useNavigate();
  const search = useOrganizationListTableStore((state) => state.search);
  const controlMode = useOrganizationListTableStore((state) => state.controlMode);
  const sort = useOrganizationListTableStore((state) => state.sort);
  const page = useOrganizationListTableStore((state) => state.page);
  const pageSize = useOrganizationListTableStore((state) => state.pageSize);
  const statusFilters = useOrganizationListTableStore((state) => state.statusFilters);
  const setControlMode = useOrganizationListTableStore((state) => state.setControlMode);
  const setSearch = useOrganizationListTableStore((state) => state.setSearch);
  const setSort = useOrganizationListTableStore((state) => state.setSort);
  const setPage = useOrganizationListTableStore((state) => state.setPage);
  const setPageSize = useOrganizationListTableStore((state) => state.setPageSize);
  const toggleStoredStatusFilter = useOrganizationListTableStore(
    (state) => state.toggleStatusFilter
  );

  const queryInput = useMemo<OrganizationListInput>(
    () => ({
      pageNumber: page,
      pageSize,
      sortField: sort?.columnId ? sortFieldMap[sort.columnId] : undefined,
      sortDirection: sort?.direction ?? undefined,
      searchString: controlMode === 'search' ? search.trim() || undefined : undefined,
      statuses: controlMode === 'filter' && statusFilters.length > 0 ? statusFilters : undefined,
    }),
    [controlMode, page, pageSize, search, sort, statusFilters]
  );

  const organizationsQuery = useOrganizationsQuery(queryInput);
  const organizationPage = organizationsQuery.data?.organizations ?? null;
  const tableLoading = organizationsQuery.loading && !organizationPage;

  const visibleOrganizations = organizationPage?.items ?? [];

  const summary = useMemo(
    () => ({
      matching: organizationPage?.totalElements ?? 0,
      users: visibleOrganizations.reduce(
        (total, organization) => total + organization.userCount,
        0
      ),
      domains: visibleOrganizations.reduce(
        (total, organization) => total + organization.domains.length,
        0
      ),
    }),
    [organizationPage?.totalElements, visibleOrganizations]
  );

  const openOrganizationDetail = (organization: Organization) => {
    if (organization.id) {
      navigate(getOrganizationDetailPath(organization.id));
    }
  };

  const handleControlModeChange = (mode: OrganizationTableControlMode) => {
    setControlMode(mode);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSortChange = (nextSort: TableSort) => {
    setSort(nextSort);
  };

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize);
  };

  const toggleStatusFilter = (status: OrganizationStatus) => {
    toggleStoredStatusFilter(status);
  };

  return (
    <ContentTemplate
      type="table"
      pageTitle="Organizations"
      titleInfo="Search, filter, sort, and inspect synthetic organization records."
    >
      <OrganizationPageRoot>
        <SummaryGrid aria-label="Organization summary">
          <SummaryCard>
            <SummaryLabel>Matching organizations</SummaryLabel>
            <SummaryValue>{summary.matching}</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Users on page</SummaryLabel>
            <SummaryValue>{summary.users}</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Domains on page</SummaryLabel>
            <SummaryValue>{summary.domains}</SummaryValue>
          </SummaryCard>
        </SummaryGrid>

        <TableToolbar>
          <Toggle
            ariaLabel="Organization table control mode"
            value={controlMode}
            options={tableControlOptions}
            onChange={handleControlModeChange}
          />
          {controlMode === 'search' ? (
            <SearchFieldContainer>
              <SearchBox
                aria-label="Search organizations"
                placeholder="Search organizations"
                value={search}
                onChange={handleSearchChange}
                onSearch={handleSearchChange}
              />
            </SearchFieldContainer>
          ) : (
            <FilterModePanel aria-label="Organization filters">
              {statusOptions.map((option) => (
                <StatusFilterButton
                  key={option.value}
                  type="button"
                  aria-pressed={statusFilters.includes(option.value)}
                  onClick={() => toggleStatusFilter(option.value)}
                >
                  <StatusTag tone={statusToneMap[option.value]}>{option.label}</StatusTag>
                </StatusFilterButton>
              ))}
            </FilterModePanel>
          )}
        </TableToolbar>

        <Table
          ariaLabel="Organizations"
          columns={organizationColumns}
          rows={visibleOrganizations}
          getRowId={(row) => row.id ?? row.referenceId}
          sort={sort}
          onSortChange={handleSortChange}
          onRowClick={openOrganizationDetail}
          loading={tableLoading}
          error={organizationsQuery.error?.message ?? null}
          empty="No organizations match the current filters."
          pagination={{
            page: organizationPage?.currentPage ?? page,
            pageSize,
            total: organizationPage?.totalElements ?? 0,
            pageSizeOptions: [5, 10, 25],
            onPageChange: setPage,
            onPageSizeChange: handlePageSizeChange,
          }}
        />
      </OrganizationPageRoot>
    </ContentTemplate>
  );
}
