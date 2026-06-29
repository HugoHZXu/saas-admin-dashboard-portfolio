import { ApolloLink, Observable, execute, gql } from '@apollo/client';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  resetAdminSessionStore,
  useAdminSessionStore,
  type DemoAccount,
  type DemoSession,
} from 'admin-shared';
import { createIdentityAuthLink } from './apolloClient';

const createSession = (): DemoSession => {
  const currentAccount: DemoAccount = {
    id: 'admin-1',
    email: 'admin-1@example.test',
    firstName: 'Demo',
    lastName: 'Admin',
    displayName: 'Demo Admin',
    accountStatus: 'Active',
    persona: 'Synthetic admin',
    memberships: [],
    capabilities: {
      orgManagement: true,
      userManagement: true,
    },
    userManagementOrganizations: [],
    entitlementOrganizations: [],
  };

  return {
    accounts: [currentAccount],
    currentAccount,
    capabilities: currentAccount.capabilities,
    userManagementOrganizations: [],
    entitlementOrganizations: [],
    accessToken: 'identity-token',
    tokenType: 'Bearer',
    expiresAt: '2099-01-01T00:00:00.000Z',
  };
};

describe('admin console Apollo client auth link', () => {
  beforeEach(() => {
    window.localStorage.clear();
    resetAdminSessionStore();
  });

  it('adds the latest identity token to GraphQL requests', async () => {
    useAdminSessionStore.getState().setSessionState({
      session: createSession(),
      selectedAccountId: 'admin-1',
    });
    let headers: Record<string, string> | undefined;
    const terminalLink = new ApolloLink((operation) => {
      headers = operation.getContext().headers;

      return new Observable((observer) => {
        observer.next({ data: { ok: true } });
        observer.complete();
      });
    });

    await new Promise<void>((resolve, reject) => {
      execute(
        createIdentityAuthLink().concat(terminalLink),
        {
          query: gql`
            query TestAuthLink {
              ok
            }
          `,
        },
        { client: {} as never }
      ).subscribe({
        error: reject,
        complete: resolve,
      });
    });

    expect(headers).toEqual({
      authorization: 'Bearer identity-token',
    });
  });
});
