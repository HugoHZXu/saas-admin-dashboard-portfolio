import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { action } from 'storybook/actions';
import { expect, userEvent, within } from 'storybook/test';
import { StatusTag, StatusTagTone, Table, TableColumn, TableSort } from 'hugo-ui';

type Organization = {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Archived';
  plan: string;
  users: number;
  domains: number;
};

const organizations: Organization[] = [
  { id: 'org-1', name: 'Acme Cloud', status: 'Active', plan: 'Enterprise', users: 48, domains: 6 },
  {
    id: 'org-2',
    name: 'Northstar Labs',
    status: 'Paused',
    plan: 'Business',
    users: 24,
    domains: 3,
  },
  {
    id: 'org-3',
    name: 'Vertex Systems',
    status: 'Active',
    plan: 'Enterprise',
    users: 72,
    domains: 9,
  },
  {
    id: 'org-4',
    name: 'Summit Works',
    status: 'Archived',
    plan: 'Starter',
    users: 8,
    domains: 1,
  },
  {
    id: 'org-5',
    name: 'Brightlane Studio',
    status: 'Active',
    plan: 'Business',
    users: 19,
    domains: 2,
  },
];

const statusToneMap: Record<Organization['status'], StatusTagTone> = {
  Active: 'success',
  Paused: 'warning',
  Archived: 'neutral',
};

const OrganizationStatusTag = ({ status }: { status: Organization['status'] }) => (
  <StatusTag tone={statusToneMap[status]}>{status}</StatusTag>
);

const TablePreview = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      width: 'min(100%, 1120px)',
      display: 'grid',
      gap: 2,
      padding: 3,
      background: (theme) => theme.hugoUIColorRoles.surface.subtle,
    }}
  >
    {children}
  </Box>
);

const organizationColumns: TableColumn<Organization>[] = [
  {
    id: 'name',
    header: 'Organization',
    sortable: true,
    minWidth: 220,
    render: (row) => row.name,
  },
  {
    id: 'status',
    header: 'Status',
    sortable: true,
    minWidth: 120,
    render: (row) => <OrganizationStatusTag status={row.status} />,
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
    align: 'right',
    width: 120,
    render: (row) => row.domains,
  },
];

const meta = {
  title: 'HugoUI/Molecules/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <TablePreview>
      <Table
        ariaLabel="Organizations"
        columns={organizationColumns}
        rows={organizations}
        getRowId={(row) => row.id}
      />
    </TablePreview>
  ),
};

export const Sortable: Story = {
  render: function SortableTable() {
    const [sort, setSort] = useState<TableSort>(null);
    return (
      <TablePreview>
        <Table
          ariaLabel="Sortable organizations"
          columns={organizationColumns}
          rows={organizations}
          getRowId={(row) => row.id}
          sort={sort}
          onSortChange={setSort}
        />
      </TablePreview>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <TablePreview>
      <Table
        ariaLabel="Loading organizations"
        columns={organizationColumns}
        rows={[]}
        getRowId={(row) => row.id}
        loading
        pagination={{
          page: 0,
          pageSize: 5,
          total: 50,
          pageSizeOptions: [5, 10],
          onPageChange: action('page changed'),
        }}
      />
    </TablePreview>
  ),
};

export const Empty: Story = {
  render: () => (
    <TablePreview>
      <Table
        ariaLabel="Empty organizations"
        columns={organizationColumns}
        rows={[]}
        getRowId={(row) => row.id}
        empty="No organizations match the current view."
      />
    </TablePreview>
  ),
};

export const Error: Story = {
  render: () => (
    <TablePreview>
      <Table
        ariaLabel="Error organizations"
        columns={organizationColumns}
        rows={[]}
        getRowId={(row) => row.id}
        error="Unable to load organizations. Try refreshing the page."
      />
    </TablePreview>
  ),
};

export const Paginated: Story = {
  render: function PaginatedTable() {
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(2);
    const visibleRows = organizations.slice(page * pageSize, page * pageSize + pageSize);

    return (
      <TablePreview>
        <Table
          ariaLabel="Paginated organizations"
          columns={organizationColumns}
          rows={visibleRows}
          getRowId={(row) => row.id}
          pagination={{
            page,
            pageSize,
            total: organizations.length,
            pageSizeOptions: [2, 5],
            onPageChange: setPage,
            onPageSizeChange: (nextPageSize) => {
              setPage(0);
              setPageSize(nextPageSize);
            },
          }}
        />
      </TablePreview>
    );
  },
};

export const SingleSelectedRow: Story = {
  render: function SingleSelectedRowTable() {
    const [selectedRowId, setSelectedRowId] = useState('org-2');
    return (
      <TablePreview>
        <Table
          ariaLabel="Selectable organizations"
          columns={organizationColumns}
          rows={organizations}
          getRowId={(row) => row.id}
          selectedRowId={selectedRowId}
          onSelectedRowIdChange={setSelectedRowId}
        />
      </TablePreview>
    );
  },
};

export const RowClickKeyboardActivation: Story = {
  render: function RowClickKeyboardActivationTable() {
    const [selectedName, setSelectedName] = useState('None');
    return (
      <TablePreview>
        <Box aria-live="polite">Selected row: {selectedName}</Box>
        <Table
          ariaLabel="Interactive organizations"
          columns={organizationColumns}
          rows={organizations}
          getRowId={(row) => row.id}
          onRowClick={(row) => setSelectedName(row.name)}
        />
      </TablePreview>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const row = canvas.getByText('Acme Cloud').closest('tr');
    expect(row).not.toBeNull();
    row?.focus();
    await userEvent.keyboard('[Enter]');
    await expect(canvas.getByText('Selected row: Acme Cloud')).toBeInTheDocument();
  },
};
