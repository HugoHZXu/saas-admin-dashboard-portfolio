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
import { getOrganizationDetailPath } from '@/routes/paths';
import { Organization, OrganizationStatus, organizations } from './mockOrganizations';
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
  TableToolbar,
} from './OrganizationListPage.styles';

type TableControlMode = 'search' | 'filter';

const statusToneMap: Record<OrganizationStatus, StatusTagTone> = {
  Active: 'success',
  Paused: 'warning',
  Archived: 'neutral',
};

const sortOrganizations = (rows: Organization[], sort: TableSort) => {
  if (!sort) {
    return rows;
  }

  return [...rows].sort((first, second) => {
    const direction = sort.direction === 'asc' ? 1 : -1;

    switch (sort.columnId) {
      case 'name':
        return first.name.localeCompare(second.name) * direction;
      case 'status':
        return first.status.localeCompare(second.status) * direction;
      case 'users':
        return (first.users - second.users) * direction;
      case 'domains':
        return (first.domains - second.domains) * direction;
      default:
        return 0;
    }
  });
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
        <OrganizationDomain>{row.primaryDomain}</OrganizationDomain>
      </OrganizationCell>
    ),
  },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    minWidth: 120,
    render: (row) => <StatusTag tone={statusToneMap[row.status]}>{row.status}</StatusTag>,
  },
  {
    id: 'plan',
    header: 'Plan',
    minWidth: 140,
    render: (row) => row.plan,
  },
  {
    id: 'users',
    header: 'Users',
    sortable: true,
    align: 'right',
    width: 120,
    render: (row) => row.users,
  },
  {
    id: 'domains',
    header: 'Domains',
    sortable: true,
    align: 'right',
    width: 120,
    render: (row) => row.domains,
  },
  {
    id: 'lastActivity',
    header: 'Last activity',
    minWidth: 160,
    render: (row) => row.lastActivity,
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

  const visibleOrganizations = useMemo(() => {
    const query = controlMode === 'search' ? search.trim().toLowerCase() : '';
    const filteredRows = query
      ? organizations.filter((organization) =>
          [organization.name, organization.primaryDomain, organization.plan, organization.status]
            .join(' ')
            .toLowerCase()
            .includes(query)
        )
      : organizations;

    return sortOrganizations(filteredRows, sort);
  }, [controlMode, search, sort]);

  const summary = useMemo(
    () => ({
      active: organizations.filter((organization) => organization.status === 'Active').length,
      users: organizations.reduce((total, organization) => total + organization.users, 0),
      domains: organizations.reduce((total, organization) => total + organization.domains, 0),
    }),
    []
  );

  const openOrganizationDetail = (organization: Organization) => {
    navigate(getOrganizationDetailPath(organization.id));
  };

  const handleControlModeChange = (mode: TableControlMode) => {
    setControlMode(mode);
    if (mode === 'filter') {
      setSearch('');
    }
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
            <SummaryLabel>Active organizations</SummaryLabel>
            <SummaryValue>{summary.active}</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Managed users</SummaryLabel>
            <SummaryValue>{summary.users}</SummaryValue>
          </SummaryCard>
          <SummaryCard>
            <SummaryLabel>Verified domains</SummaryLabel>
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
                onChange={setSearch}
                onSearch={setSearch}
              />
            </SearchFieldContainer>
          ) : (
            <FilterModePanel aria-label="Organization filters">
              <StatusTag tone="success">Active</StatusTag>
              <StatusTag tone="warning">Paused</StatusTag>
              <StatusTag tone="neutral">Archived</StatusTag>
            </FilterModePanel>
          )}
        </TableToolbar>

        <Table
          ariaLabel="Organizations"
          columns={organizationColumns}
          rows={visibleOrganizations}
          getRowId={(row) => row.id}
          sort={sort}
          onSortChange={setSort}
          onRowClick={openOrganizationDetail}
          empty="No organizations match the current filters."
          pagination={{
            page: 0,
            pageSize: visibleOrganizations.length || 5,
            total: visibleOrganizations.length,
            pageSizeOptions: [5, 10, 25],
            onPageChange: () => undefined,
            onPageSizeChange: () => undefined,
          }}
        />
      </OrganizationPageRoot>
    </ContentTemplate>
  );
}
