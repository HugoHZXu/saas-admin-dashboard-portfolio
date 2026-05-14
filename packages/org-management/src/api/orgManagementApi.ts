import { gql, type TypedDocumentNode } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';
import {
  ActivityLogListInput,
  ActivityRecord,
  MutationResult,
  Organization,
  OrganizationListInput,
  PageResponse,
  UpdateOrganizationAdminsInput,
} from './types';

type OrganizationsQueryData = {
  organizations: PageResponse<Organization>;
};

type OrganizationsQueryVariables = {
  input: OrganizationListInput;
};

type OrganizationQueryData = {
  organization: Organization | null;
};

type OrganizationQueryVariables = {
  id: string;
};

type ActivityLogsQueryData = {
  activityLogs: PageResponse<ActivityRecord>;
};

type ActivityLogsQueryVariables = {
  input: ActivityLogListInput;
};

type OrganizationActivityLogsQueryData = {
  organizationActivityLogs: PageResponse<ActivityRecord>;
};

type OrganizationActivityLogsQueryVariables = {
  organizationId: string;
  input: ActivityLogListInput;
};

type UpdateOrganizationAdminsMutationData = {
  updateOrganizationAdmins: MutationResult;
};

type UpdateOrganizationAdminsMutationVariables = {
  input: UpdateOrganizationAdminsInput;
};

const ORGANIZATION_FIELDS = gql`
  fragment OrganizationFields on Organization {
    id
    referenceId
    name
    description
    address
    address2
    city
    region
    postalCode
    country
    timezone
    createdOn
    lastUpdatedOn
    userCount
    adminCount
    status
    domains {
      name
      userCount
      status
    }
    admins {
      id
      referenceId
      firstName
      lastName
      email
      disabled
    }
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

export const ORGANIZATIONS_QUERY = gql`
  query Organizations($input: OrganizationListInput) {
    organizations(input: $input) {
      totalPages
      totalElements
      isLastPage
      isFirstPage
      currentPage
      pageSize
      items {
        ...OrganizationFields
      }
    }
  }
  ${ORGANIZATION_FIELDS}
` as TypedDocumentNode<OrganizationsQueryData, OrganizationsQueryVariables>;

export const ORGANIZATION_QUERY = gql`
  query Organization($id: ID!) {
    organization(id: $id) {
      ...OrganizationFields
      memberships {
        id
        status
        user {
          id
          name
          email
        }
        roles {
          id
          key
          name
        }
      }
    }
  }
  ${ORGANIZATION_FIELDS}
` as TypedDocumentNode<OrganizationQueryData, OrganizationQueryVariables>;

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

export const ORGANIZATION_ACTIVITY_LOGS_QUERY = gql`
  query OrganizationActivityLogs($organizationId: ID!, $input: ActivityLogListInput) {
    organizationActivityLogs(organizationId: $organizationId, input: $input) {
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
` as TypedDocumentNode<OrganizationActivityLogsQueryData, OrganizationActivityLogsQueryVariables>;

export const UPDATE_ORGANIZATION_ADMINS_MUTATION = gql`
  mutation UpdateOrganizationAdmins($input: UpdateOrganizationAdminsInput!) {
    updateOrganizationAdmins(input: $input) {
      success
      code
      message
    }
  }
` as TypedDocumentNode<
  UpdateOrganizationAdminsMutationData,
  UpdateOrganizationAdminsMutationVariables
>;

export const useOrganizationsQuery = (input: OrganizationListInput) =>
  useQuery(ORGANIZATIONS_QUERY, {
    variables: { input },
    fetchPolicy: 'cache-and-network',
  });

export const useOrganizationQuery = (id: string | undefined) =>
  useQuery(ORGANIZATION_QUERY, {
    variables: { id: id ?? '' },
    skip: !id,
  });

export const useActivityLogsQuery = (input: ActivityLogListInput) =>
  useQuery(ACTIVITY_LOGS_QUERY, {
    variables: { input },
  });

export const useOrganizationActivityLogsQuery = (
  organizationId: string | undefined,
  input: ActivityLogListInput
) =>
  useQuery(ORGANIZATION_ACTIVITY_LOGS_QUERY, {
    variables: { organizationId: organizationId ?? '', input },
    skip: !organizationId,
  });

export const useUpdateOrganizationAdminsMutation = () =>
  useMutation(UPDATE_ORGANIZATION_ADMINS_MUTATION);
