import { useAdminSessionStore, type DemoSession } from 'admin-shared';

export type AdminConsoleRemoteSessionSnapshot = {
  session: DemoSession | null;
  selectedAccountId?: string | null;
  selectedUserId?: string | null;
  loading?: boolean;
  errorMessage?: string | null;
};

export type AdminConsoleRemoteSessionStore = {
  getSnapshot: () => AdminConsoleRemoteSessionSnapshot;
  subscribe?: (listener: () => void) => () => void;
  switchAccount?: (accountId: string) => void;
  selectAccount?: (accountId: string) => void;
  refetch?: () => Promise<DemoSession | undefined>;
};

declare global {
  interface Window {
    __ADMIN_DASHBOARD_SESSION_STORE__?: AdminConsoleRemoteSessionStore;
  }
}

const switchSharedAccount = (accountId: string) => {
  void useAdminSessionStore.getState().switchAccount(accountId);
};

let cachedSnapshot: AdminConsoleRemoteSessionSnapshot | null = null;

const getCurrentSnapshot = () => {
  const state = useAdminSessionStore.getState();
  const nextSnapshot: AdminConsoleRemoteSessionSnapshot = {
    session: state.session,
    selectedAccountId: state.selectedAccountId,
    selectedUserId: state.selectedAccountId,
    loading: state.loading,
    errorMessage: state.errorMessage,
  };

  if (
    cachedSnapshot &&
    cachedSnapshot.session === nextSnapshot.session &&
    cachedSnapshot.selectedAccountId === nextSnapshot.selectedAccountId &&
    cachedSnapshot.selectedUserId === nextSnapshot.selectedUserId &&
    cachedSnapshot.loading === nextSnapshot.loading &&
    cachedSnapshot.errorMessage === nextSnapshot.errorMessage
  ) {
    return cachedSnapshot;
  }

  cachedSnapshot = nextSnapshot;

  return cachedSnapshot;
};

export const adminConsoleRemoteSessionStore: AdminConsoleRemoteSessionStore = {
  getSnapshot: getCurrentSnapshot,
  subscribe: (listener) => useAdminSessionStore.subscribe(listener),
  switchAccount: switchSharedAccount,
  selectAccount: switchSharedAccount,
  refetch: () => useAdminSessionStore.getState().refetch(),
};

export const attachAdminSessionRemoteStore = () => {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const previousStore = window.__ADMIN_DASHBOARD_SESSION_STORE__;
  window.__ADMIN_DASHBOARD_SESSION_STORE__ = adminConsoleRemoteSessionStore;

  return () => {
    if (window.__ADMIN_DASHBOARD_SESSION_STORE__ !== adminConsoleRemoteSessionStore) {
      return;
    }

    if (previousStore) {
      window.__ADMIN_DASHBOARD_SESSION_STORE__ = previousStore;
      return;
    }

    delete window.__ADMIN_DASHBOARD_SESSION_STORE__;
  };
};
