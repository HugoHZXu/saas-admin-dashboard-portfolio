import {
  GraphQLBoolean,
  GraphQLEnumType,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql';
import { mockOrganizations } from '../mockData/organizations';

const MockOrganizationStatusType = new GraphQLEnumType({
  name: 'MockOrganizationStatus',
  values: {
    active: { value: 'active' },
    inactive: { value: 'inactive' },
    archived: { value: 'archived' },
  },
});

const MockOrganizationDomainType = new GraphQLObjectType({
  name: 'MockOrganizationDomain',
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    userCount: { type: new GraphQLNonNull(GraphQLInt) },
    status: { type: GraphQLString },
  },
});

const MockOrganizationAdminType = new GraphQLObjectType({
  name: 'MockOrganizationAdmin',
  fields: {
    id: { type: GraphQLID },
    referenceId: { type: GraphQLString },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    disabled: { type: GraphQLBoolean },
  },
});

const MockOrganizationType = new GraphQLObjectType({
  name: 'MockOrganization',
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
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(MockOrganizationDomainType))
      ),
    },
    admins: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MockOrganizationAdminType))),
    },
    createdOn: { type: new GraphQLNonNull(GraphQLString) },
    lastUpdatedOn: { type: new GraphQLNonNull(GraphQLString) },
    userCount: { type: new GraphQLNonNull(GraphQLInt) },
    adminCount: { type: GraphQLInt },
    status: { type: new GraphQLNonNull(MockOrganizationStatusType) },
  },
});

export const createMockOrgGraphqlSchema = () =>
  new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'MockOrgQuery',
      fields: {
        organizations: {
          type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MockOrganizationType))),
          resolve: () => mockOrganizations,
        },
        organization: {
          type: MockOrganizationType,
          args: {
            id: { type: new GraphQLNonNull(GraphQLID) },
          },
          resolve: (_source, args: { id: string }) =>
            mockOrganizations.find((organization) => organization.id === args.id),
        },
      },
    }),
  });
