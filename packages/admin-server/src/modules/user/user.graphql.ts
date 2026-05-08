import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import {
  createPageType,
  PageInputFields,
  UserAccountStatusType,
} from '../../graphql/common';
import { RoleType } from '../role/role.graphql';

const IdNameType = new GraphQLObjectType({
  name: 'IdName',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

const UserMembershipType = new GraphQLObjectType({
  name: 'UserMembership',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    organization: { type: new GraphQLNonNull(IdNameType) },
    roles: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RoleType))) },
    createdAt: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const UserListItemType = new GraphQLObjectType({
  name: 'UserListItem',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    accountStatus: { type: new GraphQLNonNull(UserAccountStatusType) },
    lastSignedIn: { type: GraphQLString },
    dateRegistered: { type: new GraphQLNonNull(GraphQLString) },
    membershipId: { type: new GraphQLNonNull(GraphQLID) },
    organization: { type: new GraphQLNonNull(IdNameType) },
    roles: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RoleType))) },
  },
});

export const UserDetailType = new GraphQLObjectType({
  name: 'UserDetail',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    displayName: { type: new GraphQLNonNull(GraphQLString) },
    accountStatus: { type: new GraphQLNonNull(UserAccountStatusType) },
    lastSignedIn: { type: GraphQLString },
    dateRegistered: { type: new GraphQLNonNull(GraphQLString) },
    memberships: {
      type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(UserMembershipType))),
    },
  },
});

export const UserPageType = createPageType('UserPage', UserListItemType);

export const UserListInputType = new GraphQLInputObjectType({
  name: 'UserListInput',
  fields: {
    ...PageInputFields,
    organizationId: { type: new GraphQLNonNull(GraphQLID) },
    searchString: { type: GraphQLString },
    accountStatuses: { type: new GraphQLList(new GraphQLNonNull(UserAccountStatusType)) },
    roleKeys: { type: new GraphQLList(new GraphQLNonNull(GraphQLString)) },
  },
});

export const SuspendUserInputType = new GraphQLInputObjectType({
  name: 'SuspendUserInput',
  fields: {
    actorUserId: { type: GraphQLID },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    reason: { type: GraphQLString },
  },
});
