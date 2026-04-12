import React from 'react';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Skeleton from '@mui/material/Skeleton';
import { ThemeProvider, useTheme } from '@mui/material/styles';
import classnames from 'classnames';
import { TableRoot, createTableTheme } from './styles/tableStyles';
import { ROOT_PREFIX } from './styles/tableTokens';

export type HugoUITableSort = {
  columnId: string;
  direction: 'asc' | 'desc';
} | null;

export type HugoUITableColumn<T> = {
  id: string;
  header: React.ReactNode;
  render: (row: T) => React.ReactNode;
  sortable?: boolean;
  width?: React.CSSProperties['width'];
  minWidth?: React.CSSProperties['minWidth'];
  align?: 'left' | 'center' | 'right';
};

export type HugoUITablePagination = {
  page: number;
  pageSize: number;
  total: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
};

export type HugoUITableProps<T> = {
  columns: HugoUITableColumn<T>[];
  rows: T[];
  getRowId: (row: T) => string;
  ariaLabel: string;
  sort?: HugoUITableSort;
  onSortChange?: (sort: HugoUITableSort) => void;
  pagination?: HugoUITablePagination;
  selectedRowId?: string;
  onSelectedRowIdChange?: (rowId: string, row: T) => void;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  error?: React.ReactNode;
  empty?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

const DEFAULT_EMPTY_STATE = 'No results found.';

const getNextSort = (columnId: string, sort?: HugoUITableSort): HugoUITableSort => {
  if (sort?.columnId === columnId && sort.direction === 'asc') {
    return { columnId, direction: 'desc' };
  }
  return { columnId, direction: 'asc' };
};

export function HugoUITable<T>({
  columns,
  rows,
  getRowId,
  ariaLabel,
  sort = null,
  onSortChange,
  pagination,
  selectedRowId,
  onSelectedRowIdChange,
  onRowClick,
  loading = false,
  error,
  empty,
  className,
  style,
}: HugoUITableProps<T>) {
  const parentTheme = useTheme();
  const tableTheme = React.useMemo(() => createTableTheme(parentTheme), [parentTheme]);
  const isRowInteractive = Boolean(onSelectedRowIdChange || onRowClick);
  const stateColSpan = Math.max(columns.length, 1);
  const skeletonRows = Math.min(pagination?.pageSize ?? 5, 10);

  const activateRow = (row: T) => {
    const rowId = getRowId(row);
    onSelectedRowIdChange?.(rowId, row);
    onRowClick?.(row);
  };

  const handleRowKeyDown = (event: React.KeyboardEvent<HTMLTableRowElement>, row: T) => {
    if (!isRowInteractive || (event.key !== 'Enter' && event.key !== ' ')) {
      return;
    }
    event.preventDefault();
    activateRow(row);
  };

  const renderStateRow = (content: React.ReactNode, classNameSuffix: string) => (
    <TableRow className={`${ROOT_PREFIX}-${classNameSuffix}Row`}>
      <TableCell className={`${ROOT_PREFIX}-stateCell`} colSpan={stateColSpan}>
        <div className={`${ROOT_PREFIX}-stateContent`}>{content}</div>
      </TableCell>
    </TableRow>
  );

  return (
    <ThemeProvider theme={tableTheme}>
      <TableRoot className={classnames(`${ROOT_PREFIX}-root`, className)} style={style}>
        <TableContainer className={`${ROOT_PREFIX}-container`}>
          <MuiTable className={`${ROOT_PREFIX}-table`} aria-label={ariaLabel}>
            <TableHead>
              <TableRow>
                {columns.map((column) => {
                  const isSorted = sort?.columnId === column.id;
                  const align = column.align ?? 'left';
                  return (
                    <TableCell
                      key={column.id}
                      align={align}
                      className={`${ROOT_PREFIX}-headCell`}
                      sortDirection={isSorted ? sort.direction : false}
                      style={{ width: column.width, minWidth: column.minWidth }}
                    >
                      {column.sortable ? (
                        <TableSortLabel
                          active={isSorted}
                          direction={isSorted ? sort.direction : 'asc'}
                          onClick={() => onSortChange?.(getNextSort(column.id, sort))}
                          disabled={!onSortChange}
                        >
                          {column.header}
                        </TableSortLabel>
                      ) : (
                        column.header
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading &&
                Array.from({ length: skeletonRows }).map((_, rowIndex) => (
                  <TableRow key={`loading-${rowIndex}`} className={`${ROOT_PREFIX}-loadingRow`}>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align ?? 'left'}
                        className={`${ROOT_PREFIX}-cell`}
                      >
                        <Skeleton variant="text" aria-label="Loading row" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              {!loading && error && renderStateRow(error, 'error')}
              {!loading &&
                !error &&
                rows.length === 0 &&
                renderStateRow(empty ?? DEFAULT_EMPTY_STATE, 'empty')}
              {!loading &&
                !error &&
                rows.map((row) => {
                  const rowId = getRowId(row);
                  const isSelected = selectedRowId === rowId;
                  return (
                    <TableRow
                      key={rowId}
                      className={classnames(`${ROOT_PREFIX}-row`, {
                        [`${ROOT_PREFIX}-rowInteractive`]: isRowInteractive,
                        [`${ROOT_PREFIX}-rowSelected`]: isSelected,
                      })}
                      hover={isRowInteractive}
                      tabIndex={isRowInteractive ? 0 : undefined}
                      aria-selected={isSelected || undefined}
                      onClick={isRowInteractive ? () => activateRow(row) : undefined}
                      onKeyDown={(event) => handleRowKeyDown(event, row)}
                    >
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align ?? 'left'}
                          className={`${ROOT_PREFIX}-cell`}
                          style={{ width: column.width, minWidth: column.minWidth }}
                        >
                          {column.render(row)}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
            </TableBody>
          </MuiTable>
          {pagination && (
            <TablePagination
              className={`${ROOT_PREFIX}-pagination`}
              component="div"
              count={pagination.total}
              page={pagination.page}
              rowsPerPage={pagination.pageSize}
              rowsPerPageOptions={pagination.pageSizeOptions ?? [10, 25, 50]}
              slotProps={{
                select: {
                  SelectDisplayProps: {
                    'aria-label': 'Rows per page',
                    tabIndex: 0,
                  },
                },
              }}
              onPageChange={(_, page) => pagination.onPageChange(page)}
              onRowsPerPageChange={(event) =>
                pagination.onPageSizeChange?.(Number(event.target.value))
              }
            />
          )}
        </TableContainer>
      </TableRoot>
    </ThemeProvider>
  );
}
