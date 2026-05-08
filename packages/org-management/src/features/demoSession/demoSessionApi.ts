import { gql, type TypedDocumentNode } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { DemoSession } from './demoSessionTypes';

type DemoSessionQueryData = {
  demoSession: DemoSession;
};

type DemoSessionQueryVariables = {
  selectedUserId?: string | null;
};

const DEMO_ORGANIZATION_SCOPE_FIELDS = gql`
  fragment DemoOrganizationScopeFields on DemoOrganizationScope {
    id
    name
    kind
    status
  }
`;

const DEMO_ACCOUNT_FIELDS = gql`
  fragment DemoAccountFields on DemoAccount {
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
      ...DemoOrganizationScopeFields
    }
    memberships {
      organization {
        ...DemoOrganizationScopeFields
      }
      roles {
        id
        key
        name
      }
    }
  }
`;

export const DEMO_SESSION_QUERY = gql`
  query DemoSession($selectedUserId: ID) {
    demoSession(selectedUserId: $selectedUserId) {
      capabilities {
        orgManagement
        userManagement
      }
      userManagementOrganizations {
        ...DemoOrganizationScopeFields
      }
      currentAccount {
        ...DemoAccountFields
      }
      accounts {
        ...DemoAccountFields
      }
    }
  }
  ${DEMO_ORGANIZATION_SCOPE_FIELDS}
  ${DEMO_ACCOUNT_FIELDS}
` as TypedDocumentNode<DemoSessionQueryData, DemoSessionQueryVariables>;

export const useDemoSessionQuery = (selectedUserId?: string | null) =>
  useQuery(DEMO_SESSION_QUERY, {
    variables: { selectedUserId: selectedUserId || null },
    fetchPolicy: 'cache-and-network',
  });
