import { useMemo, useState } from 'react';
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

type TableControlMode = 'search' | 'filter';

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

const tableControlOptions: ToggleOption<TableControlMode>[] = [
  { value: 'search', label: 'Search', icon: <SearchIcon /> },
  { value: 'filter', label: 'Filter', icon: <FilterListIcon /> },
];

export function OrganizationListPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [controlMode, setControlMode] = useState<TableControlMode>('search');
  const [sort, setSort] = useState<TableSort>({ columnId: 'name', direction: 'asc' });
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [statusFilters, setStatusFilters] = useState<OrganizationStatus[]>([]);

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

  const handleControlModeChange = (mode: TableControlMode) => {
    setControlMode(mode);
    setPage(0);
    if (mode === 'filter') {
      setSearch('');
    }
  };

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

  const toggleStatusFilter = (status: OrganizationStatus) => {
    setPage(0);
    setStatusFilters((currentFilters) =>
      currentFilters.includes(status)
        ? currentFilters.filter((item) => item !== status)
        : [...currentFilters, status]
    );
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
          loading={organizationsQuery.loading}
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
