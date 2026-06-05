import { create } from 'zustand';
import type { TableSort } from '@hugo-ui/mui';
import type { OrganizationStatus } from '@/api/types';

export type OrganizationTableControlMode = 'search' | 'filter';

type OrganizationListTableState = {
  controlMode: OrganizationTableControlMode;
  search: string;
  statusFilters: OrganizationStatus[];
  sort: TableSort;
  page: number;
  pageSize: number;
};

type OrganizationListTableActions = {
  setControlMode: (mode: OrganizationTableControlMode) => void;
  setSearch: (search: string) => void;
  setSort: (sort: TableSort) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  toggleStatusFilter: (status: OrganizationStatus) => void;
};

export const useOrganizationListTableStore = create<
  OrganizationListTableState & OrganizationListTableActions
>((set) => ({
  controlMode: 'search',
  search: '',
  statusFilters: [],
  sort: { columnId: 'name', direction: 'asc' },
  page: 0,
  pageSize: 5,
  setControlMode: (controlMode) =>
    set((state) => ({
      controlMode,
      page: 0,
      search: controlMode === 'filter' ? '' : state.search,
    })),
  setSearch: (search) => set({ search, page: 0 }),
  setSort: (sort) => set({ sort, page: 0 }),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 0 }),
  toggleStatusFilter: (status) =>
    set((state) => ({
      page: 0,
      statusFilters: state.statusFilters.includes(status)
        ? state.statusFilters.filter((item) => item !== status)
        : [...state.statusFilters, status],
    })),
}));
