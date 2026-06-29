import { createContext, type ReactNode, useCallback, useContext, useEffect, useMemo } from 'react';
import { useApolloClient } from '@apollo/client/react';
import {
  configureAdminSessionStore,
  fetchIdentitySession,
  useAdminSessionStore,
  type AdminSessionState,
} from 'admin-shared';
import { DemoAccount, DemoSession } from './demoSessionTypes';

export type DemoSessionContextValue = {
  session: DemoSession | null;
  accounts: DemoAccount[];
  currentAccount: DemoAccount | null;
  selectedUserId: string | null;
  loading: boolean;
  errorMessage: string | null;
  selectAccount: (accountId: string) => void;
  refetch: () => Promise<DemoSession | undefined>;
};

const DemoSessionContext = createContext<DemoSessionContextValue | null>(null);

type DemoSessionProviderProps = {
  children: ReactNode;
};

type DemoSessionValueProviderProps = {
  children: ReactNode;
  value: DemoSessionContextValue;
};

export function DemoSessionValueProvider({ children, value }: DemoSessionValueProviderProps) {
  return <DemoSessionContext.Provider value={value}>{children}</DemoSessionContext.Provider>;
}

export function DemoSessionProvider({ children }: DemoSessionProviderProps) {
  const apolloClient = useApolloClient();
  const session = useAdminSessionStore((state: AdminSessionState) => state.session);
  const selectedAccountId = useAdminSessionStore(
    (state: AdminSessionState) => state.selectedAccountId
  );
  const loading = useAdminSessionStore((state: AdminSessionState) => state.loading);
  const errorMessage = useAdminSessionStore((state: AdminSessionState) => state.errorMessage);
  const switchAccount = useAdminSessionStore((state: AdminSessionState) => state.switchAccount);
  const refetchSession = useAdminSessionStore((state: AdminSessionState) => state.refetch);

  useEffect(() => {
    configureAdminSessionStore(fetchIdentitySession);
    void useAdminSessionStore.getState().refetch();

    return () => configureAdminSessionStore(null);
  }, []);

  const selectAccount = useCallback(
    (accountId: string) => {
      const previousAccountId = useAdminSessionStore.getState().session?.currentAccount.id ?? null;

      void switchAccount(accountId).then((nextSession) => {
        if (previousAccountId && nextSession?.currentAccount.id !== previousAccountId) {
          void apolloClient.resetStore().catch(() => undefined);
        }
      });
    },
    [apolloClient, switchAccount]
  );

  const refetch = useCallback(async () => {
    return (await refetchSession()) as DemoSession | undefined;
  }, [refetchSession]);

  const value = useMemo<DemoSessionContextValue>(
    () => ({
      session: session as DemoSession | null,
      accounts: (session?.accounts ?? []) as DemoAccount[],
      currentAccount: (session?.currentAccount ?? null) as DemoAccount | null,
      selectedUserId: selectedAccountId,
      loading,
      errorMessage,
      selectAccount,
      refetch,
    }),
    [errorMessage, loading, refetch, selectAccount, selectedAccountId, session]
  );

  return <DemoSessionValueProvider value={value}>{children}</DemoSessionValueProvider>;
}

export function useDemoSession() {
  const context = useContext(DemoSessionContext);

  if (!context) {
    throw new Error('useDemoSession must be used within DemoSessionProvider.');
  }

  return context;
}
