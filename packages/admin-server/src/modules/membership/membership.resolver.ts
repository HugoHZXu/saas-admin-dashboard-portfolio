import { GraphQLFieldConfigMap, GraphQLNonNull } from 'graphql';
import { PrismaClient } from '@prisma/client';
import {
  AddUserToOrganizationByEmailInput,
  AddUserToOrganizationInput,
  ChangeUserRolesInput,
  RemoveUserFromOrganizationInput,
} from './membership.types';
import {
  AddUserToOrganizationByEmailInputType,
  AddUserToOrganizationInputType,
  ChangeUserRolesInputType,
  MutationResultType,
  RemoveUserFromOrganizationInputType,
} from './membership.graphql';
import { createMembershipService } from './membership.service';

export const createMembershipMutationFields = (
  prisma: PrismaClient
): GraphQLFieldConfigMap<unknown, unknown> => {
  const membershipService = createMembershipService(prisma);

  return {
    addUserToOrganization: {
      type: new GraphQLNonNull(MutationResultType),
      args: {
        input: { type: new GraphQLNonNull(AddUserToOrganizationInputType) },
      },
      resolve: (_source, args: { input: AddUserToOrganizationInput }) =>
        membershipService.addUserToOrganization(args.input),
    },
    addUserToOrganizationByEmail: {
      type: new GraphQLNonNull(MutationResultType),
      args: {
        input: { type: new GraphQLNonNull(AddUserToOrganizationByEmailInputType) },
      },
      resolve: (_source, args: { input: AddUserToOrganizationByEmailInput }) =>
        membershipService.addUserToOrganizationByEmail(args.input),
    },
    changeUserRoles: {
      type: new GraphQLNonNull(MutationResultType),
      args: {
        input: { type: new GraphQLNonNull(ChangeUserRolesInputType) },
      },
      resolve: (_source, args: { input: ChangeUserRolesInput }) =>
        membershipService.changeUserRoles(args.input),
    },
    removeUserFromOrganization: {
      type: new GraphQLNonNull(MutationResultType),
      args: {
        input: { type: new GraphQLNonNull(RemoveUserFromOrganizationInputType) },
      },
      resolve: (_source, args: { input: RemoveUserFromOrganizationInput }) =>
        membershipService.removeUserFromOrganization(args.input),
    },
  };
};
