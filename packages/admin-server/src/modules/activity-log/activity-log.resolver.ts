import { GraphQLFieldConfigMap, GraphQLID, GraphQLNonNull } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { ActivityLogListInputType, ActivityLogPageType } from './activity-log.graphql';
import { ActivityLogListQuery } from './activity-log.types';
import { createActivityLogService } from './activity-log.service';

export const createActivityLogQueryFields = (
  prisma: PrismaClient
): GraphQLFieldConfigMap<unknown, unknown> => {
  const activityLogService = createActivityLogService(prisma);

  return {
    activityLogs: {
      type: new GraphQLNonNull(ActivityLogPageType),
      args: {
        input: { type: ActivityLogListInputType },
      },
      resolve: (_source, args: { input?: ActivityLogListQuery | null }) =>
        activityLogService.listActivityLogs(args.input),
    },
    organizationActivityLogs: {
      type: new GraphQLNonNull(ActivityLogPageType),
      args: {
        organizationId: { type: new GraphQLNonNull(GraphQLID) },
        input: { type: ActivityLogListInputType },
      },
      resolve: (
        _source,
        args: { organizationId: string; input?: ActivityLogListQuery | null }
      ) =>
        activityLogService.listActivityLogs({
          ...(args.input ?? {}),
          organizationId: args.organizationId,
        }),
    },
  };
};
