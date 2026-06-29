import { create } from 'zustand';
import type { DemoAccount, DemoCapabilities, DemoSession } from './types';
import {
  clearStoredAccountId,
  clearStoredIdentityToken,
  readStoredIdentityAccessToken,
  readStoredAccountId,
  writeStoredAccountId,
  writeStoredIdentityToken,
} from './storage';

export type AdminSessionFetchInput = {
  selectedAccountId: string | null;
};

export type AdminSessionFetcher = (
  input: AdminSessionFetchInput
) => Promise<DemoSession | null | undefined>;

export type AdminSessionStoreSnapshot = {
  session: DemoSession | null;
  loading: boolean;
  errorMessage: string | null;
  selectedAccountId: string | null;
};

export type AdminSessionRefetch = () => Promise<DemoSession | undefined>;

export type AdminSessionStatePatch = Partial<AdminSessionStoreSnapshot> & {
  refetch?: AdminSessionRefetch;
};

export type AdminSessionSetState =
  | AdminSessionStatePatch
  | ((state: AdminSessionStoreSnapshot) => AdminSessionStatePatch);

export type AdminSessionStore = AdminSessionStoreSnapshot & {
  refetch: AdminSessionRefetch;
  switchAccount: (accountId: string) => Promise<DemoSession | undefined>;
  setSelectedAccountId: (accountId: string | null) => void;
  setSessionState: (nextState: AdminSessionSetState) => void;
  reset: () => void;
};

export type AdminSessionState = AdminSessionStore;

const emptyCapabilities: DemoCapabilities = {
  orgManagement: false,
  userManagement: false,
};

let adminSessionFetcher: AdminSessionFetcher | null = null;
let latestRefetchRequestId = 0;

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Admin session unavailable.';
};

const hasOwn = (value: object, key: keyof AdminSessionStatePatch) =>
  Object.prototype.hasOwnProperty.call(value, key);

const persistSelectedAccountId = (accountId: string | null) => {
  if (accountId) {
    writeStoredAccountId(accountId);
    return;
  }

  clearStoredAccountId();
};

const isTokenExpired = (expiresAt: string) => {
  const expiresAtTime = Date.parse(expiresAt);

  return Number.isNaN(expiresAtTime) || expiresAtTime <= Date.now();
};

const persistSessionToken = (session: DemoSession | null) => {
  if (!session) {
    clearStoredIdentityToken();
    return;
  }

  writeStoredIdentityToken({
    accessToken: session.accessToken,
    expiresAt: session.expiresAt,
  });
};

const toSnapshot = (state: AdminSessionStore): AdminSessionStoreSnapshot => ({
  session: state.session,
  loading: state.loading,
  errorMessage: state.errorMessage,
  selectedAccountId: state.selectedAccountId,
});

const createPatch = (
  state: AdminSessionStore,
  nextState: AdminSessionSetState
): Partial<AdminSessionStore> => {
  const patch = typeof nextState === 'function' ? nextState(toSnapshot(state)) : nextState;
  const hasSessionPatch = hasOwn(patch, 'session');
  const session = hasSessionPatch ? (patch.session ?? null) : state.session;
  const selectedAccountId = hasOwn(patch, 'selectedAccountId')
    ? (patch.selectedAccountId ?? null)
    : hasSessionPatch
      ? (session?.currentAccount.id ?? state.selectedAccountId)
      : state.selectedAccountId;

  persistSelectedAccountId(selectedAccountId);
  if (hasSessionPatch) {
    persistSessionToken(session);
  }

  return {
    session,
    loading: hasOwn(patch, 'loading') ? (patch.loading ?? false) : state.loading,
    errorMessage: hasOwn(patch, 'errorMessage') ? (patch.errorMessage ?? null) : state.errorMessage,
    selectedAccountId,
    ...(patch.refetch ? { refetch: patch.refetch } : {}),
  };
};

const setResolvedSession = (
  set: (patch: Partial<AdminSessionStore>) => void,
  session: DemoSession | null,
  fallbackAccountId: string | null
) => {
  const selectedAccountId = session?.currentAccount.id ?? fallbackAccountId;

  persistSelectedAccountId(selectedAccountId);
  persistSessionToken(session);
  set({
    session,
    loading: false,
    errorMessage: null,
    selectedAccountId,
  });
};

type AdminSessionSet = (
  patch: Partial<AdminSessionStore> | ((state: AdminSessionStore) => Partial<AdminSessionStore>)
) => void;
type AdminSessionGet = () => AdminSessionStore;

const createRefetchAction =
  (set: AdminSessionSet, get: AdminSessionGet): AdminSessionRefetch =>
  async () => {
    const fetcher = adminSessionFetcher;

    if (!fetcher) {
      return get().session ?? undefined;
    }

    const requestId = latestRefetchRequestId + 1;
    latestRefetchRequestId = requestId;
    const selectedAccountId = get().selectedAccountId;

    set({ loading: true, errorMessage: null });

    try {
      const session = (await fetcher({ selectedAccountId })) ?? null;

      if (requestId !== latestRefetchRequestId) {
        return session ?? undefined;
      }

      setResolvedSession(set, session, selectedAccountId);

      return session ?? undefined;
    } catch (error) {
      if (requestId === latestRefetchRequestId) {
        set({
          loading: false,
          errorMessage: getErrorMessage(error),
        });
      }

      return undefined;
    }
  };

export const useAdminSessionStore = create<AdminSessionStore>((set, get) => {
  const refetch = createRefetchAction(set, get);

  return {
    session: null,
    loading: false,
    errorMessage: null,
    selectedAccountId: readStoredAccountId(),
    refetch,
    switchAccount: async (accountId) => {
      persistSelectedAccountId(accountId);
      set({ selectedAccountId: accountId });

      return get().refetch();
    },
    setSelectedAccountId: (accountId) => {
      persistSelectedAccountId(accountId);
      set({ selectedAccountId: accountId });
    },
    setSessionState: (nextState) => set((state) => createPatch(state, nextState)),
    reset: () => {
      adminSessionFetcher = null;
      latestRefetchRequestId = 0;
      clearStoredAccountId();
      clearStoredIdentityToken();
      set({
        session: null,
        loading: false,
        errorMessage: null,
        selectedAccountId: null,
        refetch,
      });
    },
  };
});

export const configureAdminSessionStore = (fetcher: AdminSessionFetcher | null) => {
  adminSessionFetcher = fetcher;
};

export const resetAdminSessionStore = () => {
  useAdminSessionStore.getState().reset();
};

export const selectAdminSessionAccounts = (state: AdminSessionStore): DemoAccount[] =>
  state.session?.accounts ?? [];

export const selectAdminSessionCurrentAccount = (state: AdminSessionStore): DemoAccount | null =>
  state.session?.currentAccount ?? null;

export const selectAdminSessionCapabilities = (state: AdminSessionStore): DemoCapabilities =>
  state.session?.capabilities ?? emptyCapabilities;

export const readCurrentIdentityAccessToken = () => {
  const session = useAdminSessionStore.getState().session;

  if (session?.accessToken && !isTokenExpired(session.expiresAt)) {
    return session.accessToken;
  }

  return readStoredIdentityAccessToken();
};

export const getCurrentOrRefreshIdentityAccessToken = async () => {
  const accessToken = readCurrentIdentityAccessToken();

  if (accessToken) {
    return accessToken;
  }

  const session = await useAdminSessionStore.getState().refetch();

  return session?.accessToken ?? readStoredIdentityAccessToken();
};
