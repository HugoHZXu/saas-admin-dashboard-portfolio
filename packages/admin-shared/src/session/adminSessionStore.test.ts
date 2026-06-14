import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  configureAdminSessionStore,
  resetAdminSessionStore,
  selectAdminSessionCapabilities,
  useAdminSessionStore,
} from './adminSessionStore';
import { DEMO_ACCOUNT_STORAGE_KEY, type DemoAccount, type DemoSession } from './types';

const createAccount = (id: string): DemoAccount => ({
  id,
  email: `${id}@example.test`,
  firstName: 'Demo',
  lastName: 'Admin',
  displayName: `Demo Admin ${id}`,
  persona: 'Synthetic admin',
  memberships: [],
  capabilities: {
    orgManagement: true,
    userManagement: false,
  },
  userManagementOrganizations: [],
});

const createSession = (accountId: string): DemoSession => {
  const currentAccount = createAccount(accountId);

  return {
    accounts: [currentAccount],
    currentAccount,
    capabilities: currentAccount.capabilities,
    userManagementOrganizations: [],
  };
};

describe('admin session store', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetAdminSessionStore();
  });

  it('persists the resolved account after refetching a session', async () => {
    const session = createSession('admin-1');
    const fetcher = vi.fn(async () => session);

    configureAdminSessionStore(fetcher);

    await expect(useAdminSessionStore.getState().refetch()).resolves.toBe(session);

    expect(fetcher).toHaveBeenCalledWith({ selectedAccountId: null });
    expect(useAdminSessionStore.getState().session).toBe(session);
    expect(useAdminSessionStore.getState().selectedAccountId).toBe('admin-1');
    expect(window.localStorage.getItem(DEMO_ACCOUNT_STORAGE_KEY)).toBe('admin-1');
  });

  it('uses the selected account id when switching accounts', async () => {
    const fetcher = vi.fn(async ({ selectedAccountId }) =>
      createSession(selectedAccountId ?? 'fallback')
    );

    configureAdminSessionStore(fetcher);

    await useAdminSessionStore.getState().switchAccount('admin-2');

    expect(fetcher).toHaveBeenCalledWith({ selectedAccountId: 'admin-2' });
    expect(useAdminSessionStore.getState().session?.currentAccount.id).toBe('admin-2');
    expect(window.localStorage.getItem(DEMO_ACCOUNT_STORAGE_KEY)).toBe('admin-2');
  });

  it('returns empty capabilities when no session is loaded', () => {
    expect(selectAdminSessionCapabilities(useAdminSessionStore.getState())).toEqual({
      orgManagement: false,
      userManagement: false,
    });
  });
});
