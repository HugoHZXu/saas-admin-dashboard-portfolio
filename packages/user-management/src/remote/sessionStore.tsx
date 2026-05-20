import { type ReactNode, useCallback, useMemo, useSyncExternalStore } from 'react';
import { type DemoSession } from '@/api/types';
import {
  DemoSessionValueProvider,
  type DemoSessionContextValue,
} from '@/features/demoSession/DemoSessionContext';
import { writeStoredAccountId } from '@/features/demoSession/demoSessionStorage';

export type UserManagementRemoteSessionSnapshot = {
  session: DemoSession | null;
  loading?: boolean;
  errorMessage?: string | null;
};

export type UserManagementRemoteSessionStore = {
  getSnapshot: () => UserManagementRemoteSessionSnapshot;
  subscribe?: (listener: () => void) => () => void;
  switchAccount?: (accountId: string) => void;
  refetch?: () => Promise<DemoSession | undefined>;
};

type UserManagementRemoteWindow = Window & {
  __ADMIN_DASHBOARD_SESSION_STORE__?: UserManagementRemoteSessionStore;
};

type UserManagementRemoteSessionProviderProps = {
  children: ReactNode;
  sessionStore?: UserManagementRemoteSessionStore;
};

const emptyCapabilities = {
  orgManagement: false,
  userManagement: false,
};

const missingSessionSnapshot: UserManagementRemoteSessionSnapshot = {
  session: null,
  loading: false,
  errorMessage: 'Shared session store is not available.',
};

const noopUnsubscribe = () => undefined;

const getGlobalSessionStore = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  return (window as UserManagementRemoteWindow).__ADMIN_DASHBOARD_SESSION_STORE__;
};

const getMissingSessionSnapshot = () => missingSessionSnapshot;

export function UserManagementRemoteSessionProvider({
  children,
  sessionStore,
}: UserManagementRemoteSessionProviderProps) {
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
  const session = snapshot.session ?? undefined;

  const switchAccount = useCallback(
    (accountId: string) => {
      writeStoredAccountId(accountId);
      resolvedSessionStore?.switchAccount?.(accountId);
    },
    [resolvedSessionStore]
  );

  const refetch = useCallback(async () => {
    if (resolvedSessionStore?.refetch) {
      return resolvedSessionStore.refetch();
    }

    return session;
  }, [resolvedSessionStore, session]);

  const value = useMemo<DemoSessionContextValue>(
    () => ({
      accounts: session?.accounts ?? [],
      currentAccount: session?.currentAccount,
      capabilities: session?.capabilities ?? emptyCapabilities,
      userManagementOrganizations: session?.userManagementOrganizations ?? [],
      loading: snapshot.loading ?? false,
      errorMessage: snapshot.errorMessage ?? null,
      switchAccount,
      refetch,
    }),
    [refetch, session, snapshot.errorMessage, snapshot.loading, switchAccount]
  );

  return <DemoSessionValueProvider value={value}>{children}</DemoSessionValueProvider>;
}
