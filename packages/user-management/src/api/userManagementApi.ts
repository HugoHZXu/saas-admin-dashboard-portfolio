import { gql, type TypedDocumentNode } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  ActivityLogListInput,
  ActivityRecord,
  AddUserToOrganizationByEmailInput,
  ChangeUserRolesInput,
  MutationResult,
  OrganizationListInput,
  OrganizationScope,
  PageResponse,
  Role,
  UserDetail,
  UserListInput,
  UserListItem,
} from './types';

type OrganizationScopesQueryData = {
  organizations: PageResponse<OrganizationScope>;
};

type OrganizationScopesQueryVariables = {
  input: OrganizationListInput;
};

type UsersQueryData = {
  users: PageResponse<UserListItem>;
};

type UsersQueryVariables = {
  input: UserListInput;
};

type UserQueryData = {
  user: UserDetail | null;
};

type UserQueryVariables = {
  id: string;
  organizationId: string;
};

type AvailableRolesQueryData = {
  availableRoles: Role[];
};

type AvailableRolesQueryVariables = {
  organizationId: string;
};

type ActivityLogsQueryData = {
  activityLogs: PageResponse<ActivityRecord>;
};

type ActivityLogsQueryVariables = {
  input: ActivityLogListInput;
};

type AddUserToOrganizationByEmailMutationData = {
  addUserToOrganizationByEmail: MutationResult;
};

type AddUserToOrganizationByEmailMutationVariables = {
  input: AddUserToOrganizationByEmailInput;
};

type ChangeUserRolesMutationData = {
  changeUserRoles: MutationResult;
};

type ChangeUserRolesMutationVariables = {
  input: ChangeUserRolesInput;
};

const ROLE_FIELDS = gql`
  fragment RoleFields on Role {
    id
    key
    name
  }
`;

const ACTIVITY_FIELDS = gql`
  fragment ActivityFields on ActivityRecord {
    id
    action
    actionLabel {
      id
      defaultMessage
      values {
        key
        value
      }
    }
    summary
    summaryMessage {
      id
      defaultMessage
      values {
        key
        value
      }
    }
    result
    eventTime
    actor {
      id
      email
      givenName
      familyName
      displayName
      type
    }
    target {
      type
      id
      name
      email
    }
    organization {
      id
      referenceId
      name
    }
  }
`;

export const ORGANIZATION_SCOPES_QUERY = gql`
  query OrganizationScopes($input: OrganizationListInput) {
    organizations(input: $input) {
      totalPages
      totalElements
      isLastPage
      isFirstPage
      currentPage
      pageSize
      items {
        id
        referenceId
        name
        kind
        status
        userCount
      }
    }
  }
` as TypedDocumentNode<OrganizationScopesQueryData, OrganizationScopesQueryVariables>;

export const USERS_QUERY = gql`
  query Users($input: UserListInput!) {
    users(input: $input) {
      totalPages
      totalElements
      isLastPage
      isFirstPage
      currentPage
      pageSize
      items {
        id
        email
        firstName
        lastName
        displayName
        accountStatus
        lastSignedIn
        dateRegistered
        membershipId
        organization {
          id
          name
        }
        roles {
          ...RoleFields
        }
      }
    }
  }
  ${ROLE_FIELDS}
` as TypedDocumentNode<UsersQueryData, UsersQueryVariables>;

export const USER_QUERY = gql`
  query User($id: ID!, $organizationId: ID!) {
    user(id: $id, organizationId: $organizationId) {
      id
      email
      firstName
      lastName
      displayName
      accountStatus
      lastSignedIn
      dateRegistered
      memberships {
        id
        createdAt
        organization {
          id
          name
        }
        roles {
          ...RoleFields
        }
      }
    }
  }
  ${ROLE_FIELDS}
` as TypedDocumentNode<UserQueryData, UserQueryVariables>;

export const AVAILABLE_ROLES_QUERY = gql`
  query AvailableRoles($organizationId: ID!) {
    availableRoles(organizationId: $organizationId) {
      ...RoleFields
    }
  }
  ${ROLE_FIELDS}
` as TypedDocumentNode<AvailableRolesQueryData, AvailableRolesQueryVariables>;

export const ACTIVITY_LOGS_QUERY = gql`
  query ActivityLogs($input: ActivityLogListInput) {
    activityLogs(input: $input) {
      totalPages
      totalElements
      isLastPage
      isFirstPage
      currentPage
      pageSize
      items {
        ...ActivityFields
      }
    }
  }
  ${ACTIVITY_FIELDS}
` as TypedDocumentNode<ActivityLogsQueryData, ActivityLogsQueryVariables>;

export const ADD_USER_TO_ORGANIZATION_BY_EMAIL_MUTATION = gql`
  mutation AddUserToOrganizationByEmail($input: AddUserToOrganizationByEmailInput!) {
    addUserToOrganizationByEmail(input: $input) {
      success
      code
      message
    }
  }
` as TypedDocumentNode<
  AddUserToOrganizationByEmailMutationData,
  AddUserToOrganizationByEmailMutationVariables
>;

export const CHANGE_USER_ROLES_MUTATION = gql`
  mutation ChangeUserRoles($input: ChangeUserRolesInput!) {
    changeUserRoles(input: $input) {
      success
      code
      message
    }
  }
` as TypedDocumentNode<ChangeUserRolesMutationData, ChangeUserRolesMutationVariables>;

export const useOrganizationScopesQuery = () =>
  useQuery(ORGANIZATION_SCOPES_QUERY, {
    variables: {
      input: {
        pageNumber: 0,
        pageSize: 50,
        sortField: 'name',
        sortDirection: 'asc',
        kinds: ['INTERNAL', 'TENANT', 'PUBLIC'],
      },
    },
  });

export const useUsersQuery = (input: UserListInput | null) =>
  useQuery(USERS_QUERY, {
    variables: { input: input ?? ({ organizationId: '' } as UserListInput) },
    skip: !input,
    fetchPolicy: 'cache-and-network',
  });

export const useUserQuery = (id: string | undefined, organizationId: string | undefined) =>
  useQuery(USER_QUERY, {
    variables: { id: id ?? '', organizationId: organizationId ?? '' },
    skip: !id || !organizationId,
  });

export const useAvailableRolesQuery = (organizationId: string | undefined) =>
  useQuery(AVAILABLE_ROLES_QUERY, {
    variables: { organizationId: organizationId ?? '' },
    skip: !organizationId,
  });

export const useActivityLogsQuery = (input: ActivityLogListInput | null) =>
  useQuery(ACTIVITY_LOGS_QUERY, {
    variables: { input: input ?? {} },
    skip: !input,
  });

export const useAddUserToOrganizationByEmailMutation = () =>
  useMutation(ADD_USER_TO_ORGANIZATION_BY_EMAIL_MUTATION);

export const useChangeUserRolesMutation = () => useMutation(CHANGE_USER_ROLES_MUTATION);
