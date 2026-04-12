import React from 'react';
import userEvent from '@testing-library/user-event';
import { HugoUITable, HugoUITableColumn, HugoUITableSort } from './Table';
import { render, screen } from '../utils/testUtils';

type Organization = {
  id: string;
  name: string;
  status: string;
  users: number;
};

const rows: Organization[] = [
  { id: 'org-1', name: 'Acme Cloud', status: 'Active', users: 48 },
  { id: 'org-2', name: 'Northstar Labs', status: 'Archived', users: 12 },
];

const columns: HugoUITableColumn<Organization>[] = [
  {
    id: 'name',
    header: 'Organization',
    sortable: true,
    render: (row) => row.name,
  },
  {
    id: 'status',
    header: 'Status',
    render: (row) => row.status,
  },
  {
    id: 'users',
    header: 'Users',
    align: 'right',
    render: (row) => row.users,
  },
];

const renderTable = (
  props: Partial<React.ComponentProps<typeof HugoUITable<Organization>>> = {}
) =>
  render(
    <HugoUITable
      ariaLabel="Organizations"
      columns={columns}
      rows={rows}
      getRowId={(row) => row.id}
      {...props}
    />
  );

describe('HugoUITable', () => {
  it('renders headers and row cells', () => {
    renderTable();

    expect(screen.getByRole('table', { name: 'Organizations' })).toBeInTheDocument();
    expect(screen.getByText('Organization')).toBeInTheDocument();
    expect(screen.getByText('Acme Cloud')).toBeInTheDocument();
    expect(screen.getByText('Northstar Labs')).toBeInTheDocument();
    expect(screen.getByText('48')).toBeInTheDocument();
  });

  it('renders design-system structure classes', () => {
    const { container } = renderTable({ selectedRowId: 'org-1', onSelectedRowIdChange: jest.fn() });

    expect(container.querySelector('.HugoUITable-root')).not.toBeNull();
    expect(container.querySelector('.HugoUITable-container')).not.toBeNull();
    expect(container.querySelector('.HugoUITable-headCell')).not.toBeNull();
    expect(container.querySelector('.HugoUITable-cell')).not.toBeNull();
    expect(container.querySelector('.HugoUITable-rowSelected')).not.toBeNull();
  });

  it('calls onSortChange with ascending sort for a sortable column', async () => {
    const user = userEvent.setup();
    const onSortChange = jest.fn();
    renderTable({ onSortChange });

    await user.click(screen.getByRole('button', { name: /organization/i }));

    expect(onSortChange).toHaveBeenCalledWith({ columnId: 'name', direction: 'asc' });
  });

  it('toggles sorted column from ascending to descending', async () => {
    const user = userEvent.setup();
    const sort: HugoUITableSort = { columnId: 'name', direction: 'asc' };
    const onSortChange = jest.fn();
    renderTable({ sort, onSortChange });

    await user.click(screen.getByRole('button', { name: /organization/i }));

    expect(onSortChange).toHaveBeenCalledWith({ columnId: 'name', direction: 'desc' });
  });

  it('renders pagination and calls pagination handlers', async () => {
    const user = userEvent.setup();
    const onPageChange = jest.fn();
    const onPageSizeChange = jest.fn();
    renderTable({
      pagination: {
        page: 0,
        pageSize: 10,
        total: 40,
        pageSizeOptions: [10, 25],
        onPageChange,
        onPageSizeChange,
      },
    });

    expect(document.querySelector('.HugoUITable-pagination')).not.toBeNull();
    expect(screen.getByRole('combobox', { name: /rows per page/i })).toHaveAttribute(
      'tabindex',
      '0'
    );

    await user.click(screen.getByLabelText(/go to next page/i));
    expect(onPageChange).toHaveBeenCalledWith(1);

    await user.click(screen.getByRole('combobox'));
    await user.click(screen.getByRole('option', { name: '25' }));
    expect(onPageSizeChange).toHaveBeenCalledWith(25);
  });

  it('renders loading skeletons instead of data rows', () => {
    const { container } = renderTable({ loading: true });

    expect(screen.queryByText('Acme Cloud')).not.toBeInTheDocument();
    expect(screen.getAllByLabelText('Loading row').length).toBeGreaterThan(0);
    expect(container.querySelector('.HugoUITable-loadingRow')).not.toBeNull();
  });

  it('renders empty state when there are no rows', () => {
    renderTable({ rows: [] });

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders custom empty state', () => {
    renderTable({ rows: [], empty: 'No organizations match your criteria.' });

    expect(screen.getByText('No organizations match your criteria.')).toBeInTheDocument();
  });

  it('renders error state before empty state', () => {
    renderTable({ rows: [], error: 'Unable to load organizations.' });

    expect(screen.getByText('Unable to load organizations.')).toBeInTheDocument();
    expect(screen.queryByText('No results found.')).not.toBeInTheDocument();
  });

  it('calls selection and row click handlers when a row is clicked', async () => {
    const user = userEvent.setup();
    const onSelectedRowIdChange = jest.fn();
    const onRowClick = jest.fn();
    renderTable({ onSelectedRowIdChange, onRowClick });

    await user.click(screen.getByText('Acme Cloud'));

    expect(onSelectedRowIdChange).toHaveBeenCalledWith('org-1', rows[0]);
    expect(onRowClick).toHaveBeenCalledWith(rows[0]);
  });

  it('marks the controlled selected row', () => {
    renderTable({ selectedRowId: 'org-2', onSelectedRowIdChange: jest.fn() });

    const selectedRow = screen.getByText('Northstar Labs').closest('tr');
    expect(selectedRow).toHaveAttribute('aria-selected', 'true');
    expect(selectedRow).toHaveClass('HugoUITable-rowSelected');
  });

  it('activates interactive rows with Enter and Space', async () => {
    const user = userEvent.setup();
    const onRowClick = jest.fn();
    renderTable({ onRowClick });

    const row = screen.getByText('Acme Cloud').closest('tr');
    expect(row).not.toBeNull();

    row?.focus();
    await user.keyboard('[Enter]');
    await user.keyboard('[Space]');

    expect(onRowClick).toHaveBeenCalledTimes(2);
    expect(onRowClick).toHaveBeenNthCalledWith(1, rows[0]);
    expect(onRowClick).toHaveBeenNthCalledWith(2, rows[0]);
  });
});
