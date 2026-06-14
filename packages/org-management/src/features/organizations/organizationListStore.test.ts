import { beforeEach, describe, expect, it } from 'vitest';
import { useOrganizationListTableStore } from './organizationListStore';

const resetStore = () => {
  useOrganizationListTableStore.setState({
    controlMode: 'search',
    search: '',
    statusFilters: [],
    sort: { columnId: 'name', direction: 'asc' },
    page: 0,
    pageSize: 5,
  });
};

describe('organization list table store', () => {
  beforeEach(() => {
    resetStore();
  });

  it('resets paging when search or sorting changes', () => {
    useOrganizationListTableStore.getState().setPage(3);
    useOrganizationListTableStore.getState().setSearch('north');

    expect(useOrganizationListTableStore.getState().search).toBe('north');
    expect(useOrganizationListTableStore.getState().page).toBe(0);

    useOrganizationListTableStore.getState().setPage(2);
    useOrganizationListTableStore
      .getState()
      .setSort({ columnId: 'createdOn', direction: 'desc' });

    expect(useOrganizationListTableStore.getState().sort).toEqual({
      columnId: 'createdOn',
      direction: 'desc',
    });
    expect(useOrganizationListTableStore.getState().page).toBe(0);
  });

  it('clears search when switching to filter mode', () => {
    useOrganizationListTableStore.getState().setSearch('atlas');
    useOrganizationListTableStore.getState().setPage(4);
    useOrganizationListTableStore.getState().setControlMode('filter');

    expect(useOrganizationListTableStore.getState().controlMode).toBe('filter');
    expect(useOrganizationListTableStore.getState().search).toBe('');
    expect(useOrganizationListTableStore.getState().page).toBe(0);
  });

  it('toggles status filters and resets paging', () => {
    useOrganizationListTableStore.getState().setPage(1);
    useOrganizationListTableStore.getState().toggleStatusFilter('active');

    expect(useOrganizationListTableStore.getState().statusFilters).toEqual(['active']);
    expect(useOrganizationListTableStore.getState().page).toBe(0);

    useOrganizationListTableStore.getState().toggleStatusFilter('active');

    expect(useOrganizationListTableStore.getState().statusFilters).toEqual([]);
  });
});
