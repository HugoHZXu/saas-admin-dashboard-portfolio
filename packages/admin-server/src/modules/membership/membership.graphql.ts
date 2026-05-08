import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export const MutationResultType = new GraphQLObjectType({
  name: 'MutationResult',
  fields: {
    success: { type: new GraphQLNonNull(GraphQLBoolean) },
    code: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
  },
});

export const AddUserToOrganizationInputType = new GraphQLInputObjectType({
  name: 'AddUserToOrganizationInput',
  fields: {
    actorUserId: { type: GraphQLID },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    organizationId: { type: new GraphQLNonNull(GraphQLID) },
    roleIds: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
    reason: { type: GraphQLString },
  },
});

export const AddUserToOrganizationByEmailInputType = new GraphQLInputObjectType({
  name: 'AddUserToOrganizationByEmailInput',
  fields: {
    actorUserId: { type: GraphQLID },
    email: { type: new GraphQLNonNull(GraphQLString) },
    organizationId: { type: new GraphQLNonNull(GraphQLID) },
    reason: { type: GraphQLString },
  },
});

export const ChangeUserRolesInputType = new GraphQLInputObjectType({
  name: 'ChangeUserRolesInput',
  fields: {
    actorUserId: { type: GraphQLID },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    organizationId: { type: new GraphQLNonNull(GraphQLID) },
    roleIds: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(GraphQLID))) },
    reason: { type: GraphQLString },
  },
});

export const RemoveUserFromOrganizationInputType = new GraphQLInputObjectType({
  name: 'RemoveUserFromOrganizationInput',
  fields: {
    actorUserId: { type: GraphQLID },
    userId: { type: new GraphQLNonNull(GraphQLID) },
    organizationId: { type: new GraphQLNonNull(GraphQLID) },
    reason: { type: GraphQLString },
  },
});
