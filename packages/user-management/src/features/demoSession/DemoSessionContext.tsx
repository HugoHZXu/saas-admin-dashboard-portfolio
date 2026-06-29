import React, { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { useApolloClient } from '@apollo/client/react';
import {
  configureAdminSessionStore,
  fetchIdentitySession,
  useAdminSessionStore,
  type AdminSessionState,
} from 'admin-shared';
import { DemoAccount, DemoCapabilities, DemoOrganizationScope, DemoSession } from '@/api/types';

export type DemoSessionContextValue = {
  accounts: DemoAccount[];
  currentAccount?: DemoAccount;
  capabilities: DemoCapabilities;
  userManagementOrganizations: DemoOrganizationScope[];
  loading: boolean;
  errorMessage: string | null;
  switchAccount: (accountId: string) => void;
  refetch: () => Promise<DemoSession | undefined>;
};

const emptyCapabilities: DemoCapabilities = {
  orgManagement: false,
  userManagement: false,
};

const DemoSessionContext = createContext<DemoSessionContextValue | null>(null);

type DemoSessionValueProviderProps = {
  children: React.ReactNode;
  value: DemoSessionContextValue;
};

export function DemoSessionValueProvider({ children, value }: DemoSessionValueProviderProps) {
  return <DemoSessionContext.Provider value={value}>{children}</DemoSessionContext.Provider>;
}

export function DemoSessionProvider({ children }: { children: React.ReactNode }) {
  const apolloClient = useApolloClient();
  const session = useAdminSessionStore((state: AdminSessionState) => state.session);
  const loading = useAdminSessionStore((state: AdminSessionState) => state.loading);
  const errorMessage = useAdminSessionStore((state: AdminSessionState) => state.errorMessage);
  const switchSharedAccount = useAdminSessionStore(
    (state: AdminSessionState) => state.switchAccount
  );
  const refetchSession = useAdminSessionStore((state: AdminSessionState) => state.refetch);

  useEffect(() => {
    configureAdminSessionStore(fetchIdentitySession);
    void useAdminSessionStore.getState().refetch();

    return () => configureAdminSessionStore(null);
  }, []);

  const switchAccount = useCallback(
    (accountId: string) => {
      const previousAccountId = useAdminSessionStore.getState().session?.currentAccount.id ?? null;

      void switchSharedAccount(accountId).then((nextSession) => {
        if (previousAccountId && nextSession?.currentAccount.id !== previousAccountId) {
          void apolloClient.resetStore().catch(() => undefined);
        }
      });
    },
    [apolloClient, switchSharedAccount]
  );

  const refetch = useCallback(async () => {
    return (await refetchSession()) as DemoSession | undefined;
  }, [refetchSession]);

  const value = useMemo<DemoSessionContextValue>(
    () => ({
      accounts: (session?.accounts ?? []) as DemoAccount[],
      currentAccount: session?.currentAccount as DemoAccount | undefined,
      capabilities: session?.capabilities ?? emptyCapabilities,
      userManagementOrganizations: (session?.userManagementOrganizations ??
        []) as DemoOrganizationScope[],
      loading,
      errorMessage,
      switchAccount,
      refetch,
    }),
    [errorMessage, loading, refetch, session, switchAccount]
  );

  return <DemoSessionValueProvider value={value}>{children}</DemoSessionValueProvider>;
}

export const useDemoSession = () => {
  const context = useContext(DemoSessionContext);

  if (!context) {
    throw new Error('useDemoSession must be used inside DemoSessionProvider.');
  }

  return context;
};
