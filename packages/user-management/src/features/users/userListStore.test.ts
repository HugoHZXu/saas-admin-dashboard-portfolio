import { beforeEach, describe, expect, it } from 'vitest';
import { useUserListTableStore } from './userListStore';

const resetStore = () => {
  useUserListTableStore.setState({
    activeOrganizationId: undefined,
    controlMode: 'search',
    search: '',
    statusFilters: [],
    roleFilters: [],
    sort: { columnId: 'name', direction: 'asc' },
    page: 0,
    pageSize: 5,
  });
};

describe('user list table store', () => {
  beforeEach(() => {
    resetStore();
  });

  it('resets table state when the active organization changes', () => {
    useUserListTableStore.getState().setSearch('lee');
    useUserListTableStore.getState().toggleStatusFilter('Suspended');
    useUserListTableStore.getState().toggleRoleFilter('organization_admin');
    useUserListTableStore.getState().setPage(4);

    useUserListTableStore.getState().setActiveOrganizationId('org-1');

    expect(useUserListTableStore.getState()).toMatchObject({
      activeOrganizationId: 'org-1',
      controlMode: 'search',
      search: '',
      statusFilters: [],
      roleFilters: [],
      page: 0,
      pageSize: 5,
    });
  });

  it('clears search when switching to filter mode', () => {
    useUserListTableStore.getState().setSearch('sato');
    useUserListTableStore.getState().setPage(2);
    useUserListTableStore.getState().setControlMode('filter');

    expect(useUserListTableStore.getState().controlMode).toBe('filter');
    expect(useUserListTableStore.getState().search).toBe('');
    expect(useUserListTableStore.getState().page).toBe(0);
  });

  it('toggles status and role filters with paging reset', () => {
    useUserListTableStore.getState().setPage(3);
    useUserListTableStore.getState().toggleStatusFilter('Active');
    useUserListTableStore.getState().toggleRoleFilter('workspace_manager');

    expect(useUserListTableStore.getState().statusFilters).toEqual(['Active']);
    expect(useUserListTableStore.getState().roleFilters).toEqual(['workspace_manager']);
    expect(useUserListTableStore.getState().page).toBe(0);

    useUserListTableStore.getState().toggleStatusFilter('Active');
    useUserListTableStore.getState().toggleRoleFilter('workspace_manager');

    expect(useUserListTableStore.getState().statusFilters).toEqual([]);
    expect(useUserListTableStore.getState().roleFilters).toEqual([]);
  });
});
