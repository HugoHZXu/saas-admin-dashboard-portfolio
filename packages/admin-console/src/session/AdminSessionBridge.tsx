import { useEffect, type ReactNode } from 'react';
import { gql, type TypedDocumentNode } from '@apollo/client';
import { useApolloClient } from '@apollo/client/react';
import { useAdminSessionStore, type DemoSession } from 'admin-shared';
import { attachAdminSessionRemoteStore } from './adminSessionRemoteStore';

type DemoSessionQueryData = {
  demoSession: DemoSession;
};

type DemoSessionQueryVariables = {
  selectedUserId?: string | null;
};

const DEMO_ORGANIZATION_SCOPE_FIELDS = gql`
  fragment AdminConsoleDemoOrganizationScopeFields on DemoOrganizationScope {
    id
    name
    kind
    status
  }
`;

const DEMO_ACCOUNT_FIELDS = gql`
  fragment AdminConsoleDemoAccountFields on DemoAccount {
    id
    email
    firstName
    lastName
    displayName
    persona
    capabilities {
      orgManagement
      userManagement
    }
    userManagementOrganizations {
      ...AdminConsoleDemoOrganizationScopeFields
    }
    memberships {
      organization {
        ...AdminConsoleDemoOrganizationScopeFields
      }
      roles {
        id
        key
        name
      }
    }
  }
  ${DEMO_ORGANIZATION_SCOPE_FIELDS}
`;

const DEMO_SESSION_QUERY = gql`
  query AdminConsoleDemoSession($selectedUserId: ID) {
    demoSession(selectedUserId: $selectedUserId) {
      capabilities {
        orgManagement
        userManagement
      }
      userManagementOrganizations {
        ...AdminConsoleDemoOrganizationScopeFields
      }
      currentAccount {
        ...AdminConsoleDemoAccountFields
      }
      accounts {
        ...AdminConsoleDemoAccountFields
      }
    }
  }
  ${DEMO_ACCOUNT_FIELDS}
` as TypedDocumentNode<DemoSessionQueryData, DemoSessionQueryVariables>;

type AdminSessionBridgeProps = {
  children: ReactNode;
};

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Admin session unavailable.';
};

export function AdminSessionBridge({ children }: AdminSessionBridgeProps) {
  const apolloClient = useApolloClient();

  useEffect(() => {
    let active = true;
    let latestRequestId = 0;
    const detachRemoteStore = attachAdminSessionRemoteStore();

    const fetchSession = async (selectedAccountId: string | null) => {
      const result = await apolloClient.query({
        query: DEMO_SESSION_QUERY,
        variables: { selectedUserId: selectedAccountId },
        fetchPolicy: 'network-only',
      });

      return result.data?.demoSession ?? null;
    };

    const refetch = async () => {
      const requestId = latestRequestId + 1;
      latestRequestId = requestId;
      const store = useAdminSessionStore.getState();
      const selectedAccountId = store.selectedAccountId;

      store.setSessionState({ loading: true, errorMessage: null, refetch });

      try {
        const session = await fetchSession(selectedAccountId);

        if (!active || requestId !== latestRequestId) {
          return session ?? undefined;
        }

        useAdminSessionStore.getState().setSessionState({
          session,
          selectedAccountId: session?.currentAccount.id ?? selectedAccountId,
          loading: false,
          errorMessage: null,
          refetch,
        });

        return session ?? undefined;
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

    useAdminSessionStore.getState().setSessionState({ refetch });
    void refetch();

    return () => {
      active = false;
      detachRemoteStore();
    };
  }, [apolloClient]);

  return <>{children}</>;
}
