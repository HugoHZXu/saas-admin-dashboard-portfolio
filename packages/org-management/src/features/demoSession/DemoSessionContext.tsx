import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDemoSessionQuery } from './demoSessionApi';
import { DemoAccount, DemoSession } from './demoSessionTypes';
import { readStoredAccountId, writeStoredAccountId } from './demoSessionStorage';

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
  const [selectedUserId, setSelectedUserId] = useState<string | null>(() => readStoredAccountId());
  const { data, loading, error, refetch: refetchDemoSessionQuery } =
    useDemoSessionQuery(selectedUserId);
  const session = data?.demoSession ?? null;

  useEffect(() => {
    const resolvedAccountId = session?.currentAccount.id;

    if (resolvedAccountId && resolvedAccountId !== selectedUserId) {
      writeStoredAccountId(resolvedAccountId);
      setSelectedUserId(resolvedAccountId);
    }
  }, [selectedUserId, session?.currentAccount.id]);

  const selectAccount = useCallback((accountId: string) => {
    writeStoredAccountId(accountId);
    setSelectedUserId(accountId);
  }, []);

  const refetch = useCallback(async () => {
    const result = await refetchDemoSessionQuery({ selectedUserId: selectedUserId || null });

    return result.data?.demoSession;
  }, [refetchDemoSessionQuery, selectedUserId]);

  const value = useMemo<DemoSessionContextValue>(
    () => ({
      session,
      accounts: session?.accounts ?? [],
      currentAccount: session?.currentAccount ?? null,
      selectedUserId,
      loading,
      errorMessage: error?.message ?? null,
      selectAccount,
      refetch,
    }),
    [error, loading, refetch, selectAccount, selectedUserId, session]
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
