import { gql, type TypedDocumentNode } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import { DemoSession } from '@/api/types';

type DemoSessionQueryData = {
  demoSession: DemoSession;
};

type DemoSessionQueryVariables = {
  selectedUserId?: string | null;
};

const DEMO_CAPABILITY_FIELDS = gql`
  fragment DemoCapabilityFields on DemoCapabilities {
    orgManagement
    userManagement
  }
`;

const DEMO_ROLE_FIELDS = gql`
  fragment DemoRoleFields on Role {
    id
    key
    name
  }
`;

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
      ...DemoCapabilityFields
    }
    userManagementOrganizations {
      ...DemoOrganizationScopeFields
    }
    memberships {
      organization {
        ...DemoOrganizationScopeFields
      }
      roles {
        ...DemoRoleFields
      }
    }
  }
  ${DEMO_CAPABILITY_FIELDS}
  ${DEMO_ORGANIZATION_SCOPE_FIELDS}
  ${DEMO_ROLE_FIELDS}
`;

export const DEMO_SESSION_QUERY = gql`
  query DemoSession($selectedUserId: ID) {
    demoSession(selectedUserId: $selectedUserId) {
      accounts {
        ...DemoAccountFields
      }
      currentAccount {
        ...DemoAccountFields
      }
      capabilities {
        ...DemoCapabilityFields
      }
      userManagementOrganizations {
        ...DemoOrganizationScopeFields
      }
    }
  }
  ${DEMO_ACCOUNT_FIELDS}
  ${DEMO_CAPABILITY_FIELDS}
  ${DEMO_ORGANIZATION_SCOPE_FIELDS}
` as TypedDocumentNode<DemoSessionQueryData, DemoSessionQueryVariables>;

export const useDemoSessionQuery = (selectedUserId: string | null) =>
  useQuery(DEMO_SESSION_QUERY, {
    variables: { selectedUserId },
  });
