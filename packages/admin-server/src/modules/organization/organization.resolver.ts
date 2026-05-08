import { GraphQLFieldConfigMap, GraphQLID, GraphQLNonNull } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { OrganizationListQuery } from './organization.types';
import { OrganizationListInputType, OrganizationPageType, OrganizationType } from './organization.graphql';
import { createOrganizationService } from './organization.service';

export const createOrganizationQueryFields = (
  prisma: PrismaClient
): GraphQLFieldConfigMap<unknown, unknown> => {
  const organizationService = createOrganizationService(prisma);

  return {
    organizations: {
      type: new GraphQLNonNull(OrganizationPageType),
      args: {
        input: { type: OrganizationListInputType },
      },
      resolve: (_source, args: { input?: OrganizationListQuery | null }) =>
        organizationService.listOrganizations(args.input),
    },
    organization: {
      type: OrganizationType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: (_source, args: { id: string }) =>
        organizationService.getOrganizationDetail(args.id),
    },
  };
};
