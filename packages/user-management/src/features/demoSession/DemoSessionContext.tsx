import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DemoAccount, DemoCapabilities, DemoOrganizationScope, DemoSession } from '@/api/types';
import { useDemoSessionQuery } from './demoSessionApi';
import {
  DEMO_ACCOUNT_STORAGE_KEY,
  readStoredAccountId,
  writeStoredAccountId,
} from './demoSessionStorage';

type DemoSessionContextValue = {
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

const createValue = (
  session: DemoSession | undefined,
  loading: boolean,
  errorMessage: string | null,
  switchAccount: (accountId: string) => void,
  refetch: () => Promise<DemoSession | undefined>
): DemoSessionContextValue => ({
  accounts: session?.accounts ?? [],
  currentAccount: session?.currentAccount,
  capabilities: session?.capabilities ?? emptyCapabilities,
  userManagementOrganizations: session?.userManagementOrganizations ?? [],
  loading,
  errorMessage,
  switchAccount,
  refetch,
});

export function DemoSessionProvider({ children }: { children: React.ReactNode }) {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(readStoredAccountId);
  const demoSessionQuery = useDemoSessionQuery(selectedAccountId);
  const {
    data,
    loading,
    error,
    refetch: refetchDemoSessionQuery,
  } = demoSessionQuery;
  const session = data?.demoSession;

  const switchAccount = useCallback((accountId: string) => {
    writeStoredAccountId(accountId);
    setSelectedAccountId(accountId);
  }, []);

  const refetch = useCallback(async () => {
    const result = await refetchDemoSessionQuery({ selectedUserId: selectedAccountId });

    return result.data?.demoSession;
  }, [refetchDemoSessionQuery, selectedAccountId]);

  useEffect(() => {
    const currentAccountId = session?.currentAccount.id;

    if (!currentAccountId || currentAccountId === selectedAccountId) {
      return;
    }

    writeStoredAccountId(currentAccountId);
    setSelectedAccountId(currentAccountId);
  }, [selectedAccountId, session?.currentAccount.id]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== DEMO_ACCOUNT_STORAGE_KEY) {
        return;
      }

      setSelectedAccountId(event.newValue);
    };

    window.addEventListener('storage', handleStorage);

    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const value = useMemo(
    () =>
      createValue(
        session,
        loading,
        error?.message ?? null,
        switchAccount,
        refetch
      ),
    [error?.message, loading, refetch, session, switchAccount]
  );

  return <DemoSessionContext.Provider value={value}>{children}</DemoSessionContext.Provider>;
}

export const useDemoSession = () => {
  const context = useContext(DemoSessionContext);

  if (!context) {
    throw new Error('useDemoSession must be used inside DemoSessionProvider.');
  }

  return context;
};
