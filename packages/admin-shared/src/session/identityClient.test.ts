import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  DEMO_ACCOUNT_STORAGE_KEY,
  IDENTITY_ACCESS_TOKEN_STORAGE_KEY,
  type DemoAccount,
} from './types';
import {
  createDemoToken,
  fetchDemoAccounts,
  fetchIdentitySession,
  fetchIdentityUserInfo,
} from './identityClient';

const createAccount = (id: string, userManagement = true): DemoAccount => ({
  id,
  email: `${id}@example.test`,
  firstName: 'Demo',
  lastName: 'Admin',
  displayName: `Demo Admin ${id}`,
  accountStatus: 'Active',
  persona: 'Synthetic admin',
  memberships: [
    {
      membershipStatus: 'active',
      organization: {
        id: userManagement ? 'org-public' : 'org-platform',
        name: userManagement ? 'Public' : 'Platform Ops',
        kind: userManagement ? 'public' : 'internal',
        status: 'active',
      },
      roles: [
        {
          id: 'role-public-user-admin',
          key: userManagement ? 'public_user_admin' : 'platform_admin',
          name: userManagement ? 'Public User Administrator' : 'Platform Administrator',
        },
      ],
    },
  ],
  capabilities: {
    orgManagement: true,
    userManagement,
  },
  userManagementOrganizations: userManagement
    ? [
        {
          id: 'org-public',
          name: 'Public',
          kind: 'public',
          status: 'active',
        },
      ]
    : [],
  entitlementOrganizations: [],
});

const jsonResponse = (payload: unknown, status = 200) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      'content-type': 'application/json',
    },
  });

describe('identity client', () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it('loads demo accounts from identity-service', async () => {
    const fetchMock = vi.fn(async () =>
      jsonResponse({
        defaultAccountId: 'admin-1',
        accounts: [createAccount('admin-1')],
      })
    );

    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchDemoAccounts()).resolves.toMatchObject({
      defaultAccountId: 'admin-1',
      accounts: [
        expect.objectContaining({
          id: 'admin-1',
          userManagementOrganizations: [
            expect.objectContaining({
              kind: 'public',
            }),
          ],
        }),
      ],
    });
    expect(fetchMock).toHaveBeenCalledWith('http://127.0.0.1:4320/demo/accounts', {
      headers: {},
    });
  });

  it('requests demo token and userinfo with bearer auth', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({
          access_token: 'token-1',
          token_type: 'Bearer',
          expires_in: 3600,
          expires_at: '2099-01-01T00:00:00.000Z',
        })
      )
      .mockResolvedValueOnce(
        jsonResponse({
          sub: 'admin-1',
          email: 'admin-1@example.test',
          name: 'Demo Admin',
          accountStatus: 'Active',
          roles: ['platform_admin'],
          organizations: [],
          capabilities: {
            orgManagement: true,
            userManagement: false,
          },
          userManagementOrganizations: [],
          entitlementOrganizations: [],
        })
      );

    vi.stubGlobal('fetch', fetchMock);

    await expect(createDemoToken('admin-1')).resolves.toMatchObject({
      access_token: 'token-1',
      token_type: 'Bearer',
    });
    await expect(fetchIdentityUserInfo('token-1')).resolves.toMatchObject({
      sub: 'admin-1',
      roles: ['platform_admin'],
    });
    expect(fetchMock).toHaveBeenNthCalledWith(
      1,
      'http://127.0.0.1:4320/demo/token',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ userId: 'admin-1' }),
      })
    );
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      'http://127.0.0.1:4320/userinfo',
      expect.objectContaining({
        headers: {
          authorization: 'Bearer token-1',
        },
      })
    );
  });

  it('creates a session from accounts and persists account and token', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({
          defaultAccountId: 'admin-1',
          accounts: [createAccount('admin-1'), createAccount('admin-2', false)],
        })
      )
      .mockResolvedValueOnce(
        jsonResponse({
          access_token: 'admin-2-token',
          token_type: 'Bearer',
          expires_in: 3600,
          expires_at: '2099-01-01T00:00:00.000Z',
        })
      );

    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchIdentitySession({ selectedAccountId: 'admin-2' })).resolves.toMatchObject({
      currentAccount: {
        id: 'admin-2',
      },
      accessToken: 'admin-2-token',
    });
    expect(window.localStorage.getItem(DEMO_ACCOUNT_STORAGE_KEY)).toBe('admin-2');
    expect(window.localStorage.getItem(IDENTITY_ACCESS_TOKEN_STORAGE_KEY)).toBe('admin-2-token');
  });

  it('falls back to the default account when the stored account is unavailable', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        jsonResponse({
          defaultAccountId: 'admin-1',
          accounts: [createAccount('admin-1')],
        })
      )
      .mockResolvedValueOnce(
        jsonResponse({
          access_token: 'admin-1-token',
          token_type: 'Bearer',
          expires_in: 3600,
          expires_at: '2099-01-01T00:00:00.000Z',
        })
      );

    vi.stubGlobal('fetch', fetchMock);

    await expect(
      fetchIdentitySession({ selectedAccountId: 'missing-admin' })
    ).resolves.toMatchObject({
      currentAccount: {
        id: 'admin-1',
      },
    });
    expect(window.localStorage.getItem(DEMO_ACCOUNT_STORAGE_KEY)).toBe('admin-1');
  });
});
