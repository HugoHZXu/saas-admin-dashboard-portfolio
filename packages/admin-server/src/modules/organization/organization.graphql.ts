import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  createPageType,
  OrganizationKindType,
  OrganizationStatusType,
  PageInputFields,
} from '../../graphql/common';
import { RoleType } from '../role/role.graphql';

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

const OrganizationMemberUserType = new GraphQLObjectType({
  name: 'OrganizationMemberUser',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const OrganizationMemberType = new GraphQLObjectType({
  name: 'OrganizationMember',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    user: { type: new GraphQLNonNull(OrganizationMemberUserType) },
    status: { type: new GraphQLNonNull(GraphQLString) },
    roles: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RoleType))) },
  },
});

export const OrganizationType = new GraphQLObjectType({
  name: 'Organization',
  fields: {
    id: { type: GraphQLID },
    referenceId: { type: new GraphQLNonNull(GraphQLString) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    kind: { type: new GraphQLNonNull(OrganizationKindType) },
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
    memberships: {
      type: new GraphQLList(new GraphQLNonNull(OrganizationMemberType)),
    },
  },
});

export const OrganizationPageType = createPageType('OrganizationPage', OrganizationType);

export const OrganizationListInputType = new GraphQLInputObjectType({
  name: 'OrganizationListInput',
  fields: {
    ...PageInputFields,
    searchString: { type: GraphQLString },
    statuses: { type: new GraphQLList(new GraphQLNonNull(OrganizationStatusType)) },
    kinds: { type: new GraphQLList(new GraphQLNonNull(OrganizationKindType)) },
  },
});
