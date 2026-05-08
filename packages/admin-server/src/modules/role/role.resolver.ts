import { GraphQLFieldConfigMap, GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { RoleType } from './role.graphql';
import { roleService } from './role.service';

export const createRoleQueryFields = (
  prisma: PrismaClient
): GraphQLFieldConfigMap<unknown, unknown> => ({
  availableRoles: {
    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(RoleType))),
    args: {
      organizationId: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: (_source, args: { organizationId: string }) =>
      roleService.listAvailableRoles(prisma, args.organizationId),
  },
});
