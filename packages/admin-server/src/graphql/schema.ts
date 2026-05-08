import { GraphQLError, GraphQLFieldConfigMap, GraphQLObjectType, GraphQLSchema } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { prisma as defaultPrisma } from '../db/client';
import { DomainError } from '../shared/errors';
import { createActivityLogQueryFields } from '../modules/activity-log/activity-log.resolver';
import { createDemoSessionQueryFields } from '../modules/demo-session/demo-session.resolver';
import { createMembershipMutationFields } from '../modules/membership/membership.resolver';
import { createOrganizationQueryFields } from '../modules/organization/organization.resolver';
import { createRoleQueryFields } from '../modules/role/role.resolver';
import { createUserMutationFields, createUserQueryFields } from '../modules/user/user.resolver';

const toGraphQLError = (error: unknown) => {
  if (error instanceof DomainError) {
    return new GraphQLError(error.message, {
      extensions: {
        code: error.code,
      },
    });
  }

  return error;
};

const wrapDomainErrors = (
  fields: GraphQLFieldConfigMap<unknown, unknown>
): GraphQLFieldConfigMap<unknown, unknown> =>
  Object.fromEntries(
    Object.entries(fields).map(([fieldName, field]) => [
      fieldName,
      {
        ...field,
        resolve: async (source, args, context, info) => {
          try {
            return await field.resolve?.(source, args, context, info);
          } catch (error) {
            throw toGraphQLError(error);
          }
        },
      },
    ])
  );

export const createAdminSchema = (prisma: PrismaClient = defaultPrisma) => {
  const queryFields = wrapDomainErrors({
    ...createDemoSessionQueryFields(prisma),
    ...createOrganizationQueryFields(prisma),
    ...createRoleQueryFields(prisma),
    ...createUserQueryFields(prisma),
    ...createActivityLogQueryFields(prisma),
  });
  const mutationFields = wrapDomainErrors({
    ...createMembershipMutationFields(prisma),
    ...createUserMutationFields(prisma),
  });

  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: queryFields,
    }),
    mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: mutationFields,
    }),
  });
};
