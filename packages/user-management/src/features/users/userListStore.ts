import { create } from 'zustand';
import type { TableSort } from '@hugo-ui/mui';
import type { UserAccountStatus } from '@/api/types';

export type UserTableControlMode = 'search' | 'filter';

type UserListTableState = {
  activeOrganizationId?: string;
  controlMode: UserTableControlMode;
  search: string;
  statusFilters: UserAccountStatus[];
  roleFilters: string[];
  sort: TableSort;
  page: number;
  pageSize: number;
};

type UserListTableActions = {
  setActiveOrganizationId: (organizationId?: string) => void;
  setControlMode: (mode: UserTableControlMode) => void;
  setSearch: (search: string) => void;
  setStatusFilters: (statusFilters: UserAccountStatus[]) => void;
  setRoleFilters: (roleFilters: string[]) => void;
  setSort: (sort: TableSort) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  toggleStatusFilter: (status: UserAccountStatus) => void;
  toggleRoleFilter: (roleKey: string) => void;
};

const createDefaultState = (): UserListTableState => ({
  activeOrganizationId: undefined,
  controlMode: 'search',
  search: '',
  statusFilters: [],
  roleFilters: [],
  sort: { columnId: 'name', direction: 'asc' },
  page: 0,
  pageSize: 5,
});

export const useUserListTableStore = create<UserListTableState & UserListTableActions>((set) => ({
  ...createDefaultState(),
  setActiveOrganizationId: (organizationId) =>
    set((state) =>
      state.activeOrganizationId === organizationId
        ? state
        : {
            ...createDefaultState(),
            activeOrganizationId: organizationId,
          }
    ),
  setControlMode: (controlMode) =>
    set((state) => ({
      controlMode,
      page: 0,
      search: controlMode === 'filter' ? '' : state.search,
    })),
  setSearch: (search) => set({ search, page: 0 }),
  setStatusFilters: (statusFilters) => set({ statusFilters, page: 0 }),
  setRoleFilters: (roleFilters) => set({ roleFilters }),
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
  toggleRoleFilter: (roleKey) =>
    set((state) => ({
      page: 0,
      roleFilters: state.roleFilters.includes(roleKey)
        ? state.roleFilters.filter((item) => item !== roleKey)
        : [...state.roleFilters, roleKey],
    })),
}));
