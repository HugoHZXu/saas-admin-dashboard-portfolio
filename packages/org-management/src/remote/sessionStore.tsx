import { type ReactNode, useCallback, useMemo, useSyncExternalStore } from 'react';
import {
  DemoSessionValueProvider,
  type DemoSessionContextValue,
} from '@/features/demoSession/DemoSessionContext';
import { type DemoSession } from '@/features/demoSession/demoSessionTypes';
import {
  readStoredAccountId,
  writeStoredAccountId,
} from '@/features/demoSession/demoSessionStorage';

export type OrgManagementRemoteSessionSnapshot = {
  session: DemoSession | null;
  selectedUserId?: string | null;
  loading?: boolean;
  errorMessage?: string | null;
};

export type OrgManagementRemoteSessionStore = {
  getSnapshot: () => OrgManagementRemoteSessionSnapshot;
  subscribe?: (listener: () => void) => () => void;
  selectAccount?: (accountId: string) => void;
  refetch?: () => Promise<DemoSession | undefined>;
};

type OrgManagementRemoteWindow = Window & {
  __ADMIN_DASHBOARD_SESSION_STORE__?: OrgManagementRemoteSessionStore;
};

type OrgManagementRemoteSessionProviderProps = {
  children: ReactNode;
  sessionStore?: OrgManagementRemoteSessionStore;
};

const missingSessionSnapshot: OrgManagementRemoteSessionSnapshot = {
  session: null,
  loading: false,
  errorMessage: 'Shared session store is not available.',
};

const noopUnsubscribe = () => undefined;

const getGlobalSessionStore = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return (window as OrgManagementRemoteWindow).__ADMIN_DASHBOARD_SESSION_STORE__;
};

const getMissingSessionSnapshot = () => missingSessionSnapshot;

export function OrgManagementRemoteSessionProvider({
  children,
  sessionStore,
}: OrgManagementRemoteSessionProviderProps) {
  const resolvedSessionStore = sessionStore ?? getGlobalSessionStore();
  const subscribe = useCallback(
    (listener: () => void) => resolvedSessionStore?.subscribe?.(listener) ?? noopUnsubscribe,
    [resolvedSessionStore]
  );
  const getSnapshot = useCallback(
    () => resolvedSessionStore?.getSnapshot() ?? missingSessionSnapshot,
    [resolvedSessionStore]
  );
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getMissingSessionSnapshot);
  const session = snapshot.session ?? null;

  const selectAccount = useCallback(
    (accountId: string) => {
      writeStoredAccountId(accountId);
      resolvedSessionStore?.selectAccount?.(accountId);
    },
    [resolvedSessionStore]
  );

  const refetch = useCallback(async () => {
    if (resolvedSessionStore?.refetch) {
      return resolvedSessionStore.refetch();
    }

    return session ?? undefined;
  }, [resolvedSessionStore, session]);

  const value = useMemo<DemoSessionContextValue>(
    () => ({
      session,
      accounts: session?.accounts ?? [],
      currentAccount: session?.currentAccount ?? null,
      selectedUserId:
        snapshot.selectedUserId ?? session?.currentAccount.id ?? readStoredAccountId(),
      loading: snapshot.loading ?? false,
      errorMessage: snapshot.errorMessage ?? null,
      selectAccount,
      refetch,
    }),
    [
      refetch,
      selectAccount,
      session,
      snapshot.errorMessage,
      snapshot.loading,
      snapshot.selectedUserId,
    ]
  );

  return <DemoSessionValueProvider value={value}>{children}</DemoSessionValueProvider>;
}
