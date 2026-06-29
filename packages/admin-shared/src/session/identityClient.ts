import type { DemoAccount, DemoSession } from './types';
import {
  clearStoredAccountId,
  clearStoredIdentityToken,
  readStoredAccountId,
  writeStoredAccountId,
  writeStoredIdentityToken,
} from './storage';

const DEFAULT_IDENTITY_SERVICE_URL = 'http://127.0.0.1:4320';

type DemoAccountsResponse = {
  defaultAccountId: string;
  accounts: DemoAccount[];
};

type DemoTokenResponse = {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  expires_at: string;
};

export type IdentityUserInfo = {
  sub: string;
  email: string;
  name: string;
  accountStatus: string;
  roles: string[];
  organizations: Array<{
    id: string;
    name: string;
    kind: string;
    status: string;
    membershipStatus: string;
    roles: string[];
  }>;
  capabilities: DemoAccount['capabilities'];
  userManagementOrganizations: DemoAccount['userManagementOrganizations'];
  entitlementOrganizations: DemoAccount['entitlementOrganizations'];
};

export class IdentityServiceError extends Error {
  readonly status: number;
  readonly code: string | null;

  constructor({
    status,
    code,
    message,
  }: {
    status: number;
    code?: string | null;
    message: string;
  }) {
    super(message);
    this.name = 'IdentityServiceError';
    this.status = status;
    this.code = code ?? null;
  }
}

export type FetchIdentitySessionInput = {
  selectedAccountId?: string | null;
};

const trimTrailingSlash = (url: string) => url.replace(/\/+$/, '');

export const getIdentityServiceUrl = () =>
  trimTrailingSlash(import.meta.env.VITE_IDENTITY_SERVICE_URL ?? DEFAULT_IDENTITY_SERVICE_URL);

const getErrorPayload = async (response: Response) => {
  try {
    return (await response.json()) as { error?: string; message?: string };
  } catch {
    return {};
  }
};

const requestJson = async <T>(
  path: string,
  options: RequestInit = {},
  identityServiceUrl = getIdentityServiceUrl()
) => {
  const response = await fetch(`${identityServiceUrl}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { 'content-type': 'application/json' } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const payload = await getErrorPayload(response);

    throw new IdentityServiceError({
      status: response.status,
      code: payload.error,
      message: payload.message ?? 'Identity service request failed.',
    });
  }

  return (await response.json()) as T;
};

export const fetchDemoAccounts = () => requestJson<DemoAccountsResponse>('/demo/accounts');

export const createDemoToken = (userId: string) =>
  requestJson<DemoTokenResponse>('/demo/token', {
    method: 'POST',
    body: JSON.stringify({ userId }),
  });

export const fetchIdentityUserInfo = (accessToken: string) =>
  requestJson<IdentityUserInfo>('/userinfo', {
    headers: {
      authorization: `Bearer ${accessToken}`,
    },
  });

const resolveAccount = ({
  accounts,
  defaultAccountId,
  selectedAccountId,
}: DemoAccountsResponse & { selectedAccountId?: string | null }) => {
  const storedAccountId = selectedAccountId ?? readStoredAccountId();

  return (
    accounts.find((account) => account.id === storedAccountId) ??
    accounts.find((account) => account.id === defaultAccountId) ??
    accounts[0] ??
    null
  );
};

const persistSession = (session: DemoSession) => {
  writeStoredAccountId(session.currentAccount.id);
  writeStoredIdentityToken({
    accessToken: session.accessToken,
    expiresAt: session.expiresAt,
  });
};

const createSession = ({
  accounts,
  currentAccount,
  token,
}: {
  accounts: DemoAccount[];
  currentAccount: DemoAccount;
  token: DemoTokenResponse;
}): DemoSession => ({
  accounts,
  currentAccount,
  capabilities: currentAccount.capabilities,
  userManagementOrganizations: currentAccount.userManagementOrganizations,
  entitlementOrganizations: currentAccount.entitlementOrganizations,
  accessToken: token.access_token,
  tokenType: token.token_type,
  expiresAt: token.expires_at,
});

export const fetchIdentitySession = async ({
  selectedAccountId = null,
}: FetchIdentitySessionInput = {}) => {
  const accountsResponse = await fetchDemoAccounts();
  const currentAccount = resolveAccount({ ...accountsResponse, selectedAccountId });

  if (!currentAccount) {
    clearStoredAccountId();
    clearStoredIdentityToken();
    throw new IdentityServiceError({
      status: 500,
      code: 'DEMO_ACCOUNT_LIST_EMPTY',
      message: 'Identity service did not return any demo accounts.',
    });
  }

  try {
    const token = await createDemoToken(currentAccount.id);
    const session = createSession({
      accounts: accountsResponse.accounts,
      currentAccount,
      token,
    });

    persistSession(session);

    return session;
  } catch (error) {
    if (
      error instanceof IdentityServiceError &&
      error.code === 'DEMO_ACCOUNT_NOT_FOUND' &&
      currentAccount.id !== accountsResponse.defaultAccountId
    ) {
      clearStoredAccountId();
      const fallbackAccount =
        accountsResponse.accounts.find(
          (account) => account.id === accountsResponse.defaultAccountId
        ) ?? accountsResponse.accounts[0];

      if (fallbackAccount) {
        const token = await createDemoToken(fallbackAccount.id);
        const session = createSession({
          accounts: accountsResponse.accounts,
          currentAccount: fallbackAccount,
          token,
        });

        persistSession(session);

        return session;
      }
    }

    clearStoredIdentityToken();
    throw error;
  }
};
