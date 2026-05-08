import { GraphQLFieldConfigMap, GraphQLID, GraphQLNonNull } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { UserDetailQuery, UserListQuery, SuspendUserInput } from './user.types';
import {
  SuspendUserInputType,
  UserDetailType,
  UserListInputType,
  UserPageType,
} from './user.graphql';
import { createUserService } from './user.service';
import { MutationResultType } from '../membership/membership.graphql';

export const createUserQueryFields = (
  prisma: PrismaClient
): GraphQLFieldConfigMap<unknown, unknown> => {
  const userService = createUserService(prisma);

  return {
    users: {
      type: new GraphQLNonNull(UserPageType),
      args: {
        input: { type: new GraphQLNonNull(UserListInputType) },
      },
      resolve: (_source, args: { input: UserListQuery }) => userService.listUsers(args.input),
    },
    user: {
      type: UserDetailType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        organizationId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_source, args: UserDetailQuery) => userService.getUserDetail(args),
    },
  };
};

export const createUserMutationFields = (
  prisma: PrismaClient
): GraphQLFieldConfigMap<unknown, unknown> => {
  const userService = createUserService(prisma);

  return {
    suspendUser: {
      type: new GraphQLNonNull(MutationResultType),
      args: {
        input: { type: new GraphQLNonNull(SuspendUserInputType) },
      },
      resolve: (_source, args: { input: SuspendUserInput }) => userService.suspendUser(args.input),
    },
  };
};
