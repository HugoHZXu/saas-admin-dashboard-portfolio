import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  configureAdminSessionStore,
  getCurrentOrRefreshIdentityAccessToken,
  readCurrentIdentityAccessToken,
  resetAdminSessionStore,
  selectAdminSessionCapabilities,
  useAdminSessionStore,
} from './adminSessionStore';
import {
  DEMO_ACCOUNT_STORAGE_KEY,
  IDENTITY_ACCESS_TOKEN_STORAGE_KEY,
  type DemoAccount,
  type DemoSession,
} from './types';

const createAccount = (id: string): DemoAccount => ({
  id,
  email: `${id}@example.test`,
  firstName: 'Demo',
  lastName: 'Admin',
  displayName: `Demo Admin ${id}`,
  accountStatus: 'Active',
  persona: 'Synthetic admin',
  memberships: [],
  capabilities: {
    orgManagement: true,
    userManagement: false,
  },
  userManagementOrganizations: [],
  entitlementOrganizations: [],
});

const createSession = (accountId: string): DemoSession => {
  const currentAccount = createAccount(accountId);

  return {
    accounts: [currentAccount],
    currentAccount,
    capabilities: currentAccount.capabilities,
    userManagementOrganizations: [],
    entitlementOrganizations: [],
    accessToken: `${accountId}-token`,
    tokenType: 'Bearer',
    expiresAt: new Date(Date.now() + 3600_000).toISOString(),
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
    expect(window.localStorage.getItem(IDENTITY_ACCESS_TOKEN_STORAGE_KEY)).toBe('admin-1-token');
    expect(readCurrentIdentityAccessToken()).toBe('admin-1-token');
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

  it('refreshes the identity token when the stored session token is expired', async () => {
    const expiredSession = {
      ...createSession('admin-1'),
      accessToken: 'expired-token',
      expiresAt: '2000-01-01T00:00:00.000Z',
    };
    const refreshedSession = createSession('admin-1');
    const fetcher = vi.fn(async () => refreshedSession);

    configureAdminSessionStore(fetcher);
    useAdminSessionStore.getState().setSessionState({
      session: expiredSession,
      selectedAccountId: 'admin-1',
    });

    await expect(getCurrentOrRefreshIdentityAccessToken()).resolves.toBe('admin-1-token');
    expect(fetcher).toHaveBeenCalledWith({ selectedAccountId: 'admin-1' });
  });
});
