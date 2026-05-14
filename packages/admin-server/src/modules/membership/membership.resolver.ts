import { GraphQLFieldConfigMap, GraphQLNonNull } from 'graphql';
import { PrismaClient } from '@prisma/client';
import {
  AddUserToOrganizationByEmailInput,
  ChangeUserRolesInput,
  RemoveUserFromOrganizationInput,
  UpdateOrganizationAdminsInput,
} from './membership.types';
import {
  AddUserToOrganizationByEmailInputType,
  ChangeUserRolesInputType,
  MutationResultType,
  RemoveUserFromOrganizationInputType,
  UpdateOrganizationAdminsInputType,
} from './membership.graphql';
import { createMembershipService } from './membership.service';

export const createMembershipMutationFields = (
  prisma: PrismaClient
): GraphQLFieldConfigMap<unknown, unknown> => {
  const membershipService = createMembershipService(prisma);

  return {
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
    updateOrganizationAdmins: {
      type: new GraphQLNonNull(MutationResultType),
      args: {
        input: { type: new GraphQLNonNull(UpdateOrganizationAdminsInputType) },
      },
      resolve: (_source, args: { input: UpdateOrganizationAdminsInput }) =>
        membershipService.updateOrganizationAdmins(args.input),
    },
  };
};
