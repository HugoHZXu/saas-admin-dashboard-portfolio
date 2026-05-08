import { GraphQLFieldConfigMap, GraphQLID, GraphQLNonNull } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { createDemoSessionService } from './demo-session.service';
import { DemoSessionType } from './demo-session.graphql';

export const createDemoSessionQueryFields = (
  prisma: PrismaClient
): GraphQLFieldConfigMap<unknown, unknown> => {
  const demoSessionService = createDemoSessionService(prisma);

  return {
    demoSession: {
      type: new GraphQLNonNull(DemoSessionType),
      args: {
        selectedUserId: { type: GraphQLID },
      },
      resolve: (_source, args: { selectedUserId?: string | null }) =>
        demoSessionService.getDemoSession(args.selectedUserId),
    },
  };
};
