import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { createActivityService } from '../activity/service';
import { ActivityLogListQuery, OrganizationListQuery } from '../domain/types';
import { createOrganizationService } from '../organizations/service';

const SortDirectionType = new GraphQLEnumType({
  name: 'SortDirection',
  values: {
    asc: { value: 'asc' },
    desc: { value: 'desc' },
  },
});

const OrganizationStatusType = new GraphQLEnumType({
  name: 'OrganizationStatus',
  values: {
    active: { value: 'active' },
    inactive: { value: 'inactive' },
    archived: { value: 'archived' },
  },
});

const ActivityResultType = new GraphQLEnumType({
  name: 'ActivityResult',
  values: {
    success: { value: 'success' },
    failed: { value: 'failed' },
    partial: { value: 'partial' },
    unknown: { value: 'unknown' },
  },
});

const OrganizationDomainType = new GraphQLObjectType({
  name: 'OrganizationDomain',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    userCount: { type: new GraphQLNonNull(GraphQLInt) },
    status: { type: GraphQLString },
  },
});

const OrganizationAdminType = new GraphQLObjectType({
  name: 'OrganizationAdmin',
  fields: {
    id: { type: GraphQLID },
    referenceId: { type: GraphQLString },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    disabled: { type: GraphQLBoolean },
  },
});

const OrganizationType = new GraphQLObjectType({
  name: 'Organization',
  fields: {
    id: { type: GraphQLID },
    referenceId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    description: { type: GraphQLString },
    address: { type: GraphQLString },
    address2: { type: GraphQLString },
    city: { type: GraphQLString },
    region: { type: GraphQLString },
    postalCode: { type: GraphQLString },
    country: { type: new GraphQLNonNull(GraphQLString) },
    timezone: { type: GraphQLString },
    domains: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(OrganizationDomainType))),
    },
    admins: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(OrganizationAdminType))),
    },
    createdOn: { type: new GraphQLNonNull(GraphQLString) },
    lastUpdatedOn: { type: new GraphQLNonNull(GraphQLString) },
    userCount: { type: new GraphQLNonNull(GraphQLInt) },
    adminCount: { type: GraphQLInt },
    status: { type: new GraphQLNonNull(OrganizationStatusType) },
  },
});

const UserRefType = new GraphQLObjectType({
  name: 'UserRef',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    givenName: { type: new GraphQLNonNull(GraphQLString) },
    familyName: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    type: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const ActivityTargetType = new GraphQLObjectType({
  name: 'ActivityTarget',
  fields: {
    type: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
  },
});

const ActivityOrganizationType = new GraphQLObjectType({
  name: 'ActivityOrganization',
  fields: {
    id: { type: GraphQLID },
    referenceId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const LocalizedMessageValueType = new GraphQLObjectType({
  name: 'LocalizedMessageValue',
  fields: {
    key: { type: new GraphQLNonNull(GraphQLString) },
    value: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const LocalizedMessageType = new GraphQLObjectType({
  name: 'LocalizedMessage',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    defaultMessage: { type: new GraphQLNonNull(GraphQLString) },
    values: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(LocalizedMessageValueType))),
    },
  },
});

const ActivityRecordType = new GraphQLObjectType({
  name: 'ActivityRecord',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    actor: { type: new GraphQLNonNull(UserRefType) },
    target: { type: new GraphQLNonNull(ActivityTargetType) },
    organization: { type: ActivityOrganizationType },
    action: { type: new GraphQLNonNull(GraphQLString) },
    actionLabel: { type: new GraphQLNonNull(LocalizedMessageType) },
    summaryMessage: { type: new GraphQLNonNull(LocalizedMessageType) },
    summary: { type: new GraphQLNonNull(GraphQLString) },
    result: { type: new GraphQLNonNull(ActivityResultType) },
    eventTime: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const OrganizationPageType = new GraphQLObjectType({
  name: 'OrganizationPage',
  fields: {
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(OrganizationType))) },
    totalPages: { type: new GraphQLNonNull(GraphQLInt) },
    totalElements: { type: new GraphQLNonNull(GraphQLInt) },
    isLastPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    isFirstPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    currentPage: { type: new GraphQLNonNull(GraphQLInt) },
    pageSize: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const ActivityRecordPageType = new GraphQLObjectType({
  name: 'ActivityRecordPage',
  fields: {
    items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ActivityRecordType))) },
    totalPages: { type: new GraphQLNonNull(GraphQLInt) },
    totalElements: { type: new GraphQLNonNull(GraphQLInt) },
    isLastPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    isFirstPage: { type: new GraphQLNonNull(GraphQLBoolean) },
    currentPage: { type: new GraphQLNonNull(GraphQLInt) },
    pageSize: { type: new GraphQLNonNull(GraphQLInt) },
  },
});

const OrganizationListInputType = new GraphQLInputObjectType({
  name: 'OrganizationListInput',
  fields: {
    pageNumber: { type: GraphQLInt },
    pageSize: { type: GraphQLInt },
    sortField: { type: GraphQLString },
    sortDirection: { type: SortDirectionType },
    searchString: { type: GraphQLString },
    statuses: { type: new GraphQLList(new GraphQLNonNull(OrganizationStatusType)) },
  },
});

const ActivityLogListInputType = new GraphQLInputObjectType({
  name: 'ActivityLogListInput',
  fields: {
    pageNumber: { type: GraphQLInt },
    pageSize: { type: GraphQLInt },
    sortField: { type: GraphQLString },
    sortDirection: { type: SortDirectionType },
    searchString: { type: GraphQLString },
    results: { type: new GraphQLList(new GraphQLNonNull(ActivityResultType)) },
    actions: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
  },
});

export const createOrgManagementSchema = () => {
  const organizationService = createOrganizationService();
  const activityService = createActivityService();

  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        organizations: {
          type: new GraphQLNonNull(OrganizationPageType),
          args: {
            input: { type: OrganizationListInputType },
          },
          resolve: (_source, args: { input?: OrganizationListQuery | null }) =>
            organizationService.listOrganizations(args.input),
        },
        organization: {
          type: OrganizationType,
          args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
          },
          resolve: (_source, args: { id: string }) =>
            organizationService.getOrganizationDetail(args.id),
        },
        activityLogs: {
          type: new GraphQLNonNull(ActivityRecordPageType),
          args: {
            input: { type: ActivityLogListInputType },
          },
          resolve: (_source, args: { input?: ActivityLogListQuery | null }) =>
            activityService.listActivityLogs(args.input),
        },
        organizationActivityLogs: {
          type: new GraphQLNonNull(ActivityRecordPageType),
          args: {
            organizationId: { type: new GraphQLNonNull(GraphQLID) },
            input: { type: ActivityLogListInputType },
          },
          resolve: (
            _source,
            args: { organizationId: string; input?: ActivityLogListQuery | null }
          ) => activityService.listOrganizationActivityLogs(args.organizationId, args.input),
        },
      },
    }),
  });
};
