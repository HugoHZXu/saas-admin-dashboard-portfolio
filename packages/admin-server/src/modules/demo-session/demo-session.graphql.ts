import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  OrganizationKindType,
  OrganizationStatusType,
} from '../../graphql/common';
import { RoleType } from '../role/role.graphql';

export const DemoCapabilitiesType = new GraphQLObjectType({
  name: 'DemoCapabilities',
  fields: {
    orgManagement: { type: new GraphQLNonNull(GraphQLBoolean) },
    userManagement: { type: new GraphQLNonNull(GraphQLBoolean) },
  },
});

export const DemoOrganizationScopeType = new GraphQLObjectType({
  name: 'DemoOrganizationScope',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    kind: { type: new GraphQLNonNull(OrganizationKindType) },
    status: { type: new GraphQLNonNull(OrganizationStatusType) },
  },
});

export const DemoAccountMembershipType = new GraphQLObjectType({
  name: 'DemoAccountMembership',
  fields: {
    organization: { type: new GraphQLNonNull(DemoOrganizationScopeType) },
    roles: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RoleType))),
    },
  },
});

export const DemoAccountType = new GraphQLObjectType({
  name: 'DemoAccount',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    persona: { type: new GraphQLNonNull(GraphQLString) },
    memberships: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(DemoAccountMembershipType))
      ),
    },
    capabilities: { type: new GraphQLNonNull(DemoCapabilitiesType) },
    userManagementOrganizations: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(DemoOrganizationScopeType))
      ),
    },
  },
});

export const DemoSessionType = new GraphQLObjectType({
  name: 'DemoSession',
  fields: {
    accounts: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(DemoAccountType))),
    },
    currentAccount: { type: new GraphQLNonNull(DemoAccountType) },
    capabilities: { type: new GraphQLNonNull(DemoCapabilitiesType) },
    userManagementOrganizations: {
      type: new GraphQLNonNull(
        new GraphQLList(new GraphQLNonNull(DemoOrganizationScopeType))
      ),
    },
  },
});
