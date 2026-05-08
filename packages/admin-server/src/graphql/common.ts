import {
  GraphQLEnumType,
  GraphQLBoolean,
  GraphQLInputFieldConfigMap,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const SortDirectionType = new GraphQLEnumType({
  name: 'SortDirection',
  values: {
    asc: { value: 'asc' },
    desc: { value: 'desc' },
  },
});

export const OrganizationStatusType = new GraphQLEnumType({
  name: 'OrganizationStatus',
  values: {
    active: { value: 'active' },
    inactive: { value: 'inactive' },
    archived: { value: 'archived' },
  },
});

export const OrganizationKindType = new GraphQLEnumType({
  name: 'OrganizationKind',
  values: {
    INTERNAL: { value: 'internal' },
    TENANT: { value: 'tenant' },
    PUBLIC: { value: 'public' },
  },
});

export const UserAccountStatusType = new GraphQLEnumType({
  name: 'UserAccountStatus',
  values: {
    Active: { value: 'Active' },
    Suspended: { value: 'Suspended' },
    Incomplete: { value: 'Incomplete' },
  },
});

export const ActivityResultType = new GraphQLEnumType({
  name: 'ActivityResult',
  values: {
    success: { value: 'success' },
    failed: { value: 'failed' },
    partial: { value: 'partial' },
    unknown: { value: 'unknown' },
  },
});

export const PageInputFields: GraphQLInputFieldConfigMap = {
  pageNumber: { type: GraphQLInt },
  pageSize: { type: GraphQLInt },
  sortField: { type: GraphQLString },
  sortDirection: { type: SortDirectionType },
};

export const createPageType = <T extends GraphQLObjectType>(name: string, itemType: T) =>
  new GraphQLObjectType({
    name,
    fields: {
      items: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(itemType))) },
      totalPages: { type: new GraphQLNonNull(GraphQLInt) },
      totalElements: { type: new GraphQLNonNull(GraphQLInt) },
      isLastPage: { type: new GraphQLNonNull(GraphQLBoolean) },
      isFirstPage: { type: new GraphQLNonNull(GraphQLBoolean) },
      currentPage: { type: new GraphQLNonNull(GraphQLInt) },
      pageSize: { type: new GraphQLNonNull(GraphQLInt) },
    },
  });
