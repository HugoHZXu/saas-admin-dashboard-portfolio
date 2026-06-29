import { useEffect, type ReactNode } from 'react';
import { useApolloClient } from '@apollo/client/react';
import { fetchIdentitySession, useAdminSessionStore } from 'admin-shared';
import { attachAdminSessionRemoteStore } from './adminSessionRemoteStore';

type AdminSessionBridgeProps = {
  children: ReactNode;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Identity session unavailable.';
};

export function AdminSessionBridge({ children }: AdminSessionBridgeProps) {
  const apolloClient = useApolloClient();

  useEffect(() => {
    let active = true;
    let latestRequestId = 0;
    const detachRemoteStore = attachAdminSessionRemoteStore();

    const refetch = async () => {
      const requestId = latestRequestId + 1;
      latestRequestId = requestId;
      const store = useAdminSessionStore.getState();
      const selectedAccountId = store.selectedAccountId;
      const previousAccountId = store.session?.currentAccount.id ?? null;

      store.setSessionState({ loading: true, errorMessage: null, refetch });

      try {
        const session = await fetchIdentitySession({ selectedAccountId });

        if (!active || requestId !== latestRequestId) {
          return session;
        }

        useAdminSessionStore.getState().setSessionState({
          session,
          selectedAccountId: session.currentAccount.id,
          loading: false,
          errorMessage: null,
          refetch,
        });

        if (previousAccountId && previousAccountId !== session.currentAccount.id) {
          await apolloClient.resetStore().catch(() => undefined);
        }

        return session;
      } catch (error) {
        if (active && requestId === latestRequestId) {
          useAdminSessionStore.getState().setSessionState({
            loading: false,
            errorMessage: getErrorMessage(error),
            refetch,
          });
        }

        return undefined;
      }
    };

    useAdminSessionStore.getState().setSessionState({
      refetch,
    });
    void refetch();

    return () => {
      active = false;
      detachRemoteStore();
    };
  }, [apolloClient]);

  return <>{children}</>;
}
