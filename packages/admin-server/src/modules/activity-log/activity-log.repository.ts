import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';
import { PrismaExecutor } from '../../db/types';
import { normalizePageNumber, normalizePageSize } from '../../shared/pagination';
import { ActivityLogListQuery } from './activity-log.types';

export const activityEventInclude = {
  actor: true,
  targetUser: true,
  organization: true,
} satisfies Prisma.ActivityEventInclude;

export type ActivityEventRecord = Prisma.ActivityEventGetPayload<{
  include: typeof activityEventInclude;
}>;

const createId = (prefix: string) => `${prefix}-${randomUUID()}`;

const createActivityWhere = (
  query: ActivityLogListQuery = {}
): Prisma.ActivityEventWhereInput => {
  const searchString = query.searchString?.trim();

  return {
    ...(query.targetUserId ? { targetUserId: query.targetUserId } : {}),
    ...(query.organizationId ? { organizationId: query.organizationId } : {}),
    ...(query.results?.length ? { result: { in: query.results } } : {}),
    ...(query.actions?.length ? { action: { in: query.actions } } : {}),
    ...(searchString
      ? {
          OR: [
            { action: { contains: searchString } },
            { message: { contains: searchString } },
            { actor: { email: { contains: searchString } } },
            { targetUser: { email: { contains: searchString } } },
            { organization: { name: { contains: searchString } } },
          ],
        }
      : {}),
  };
};

const createActivityOrderBy = (
  sortField: string | null | undefined,
  sortDirection: Prisma.SortOrder
): Prisma.ActivityEventOrderByWithRelationInput => {
  switch (sortField) {
    case 'action':
      return { action: sortDirection };
    case 'result':
      return { result: sortDirection };
    case 'eventTime':
    case 'createdAt':
    default:
      return { createdAt: sortDirection };
  }
};

export type CreateActivityEventInput = {
  actorUserId?: string | null;
  targetUserId?: string | null;
  organizationId?: string | null;
  action: string;
  result?: string;
  message: string;
  metadataJson?: string | null;
};

export const activityRepository = {
  create(prisma: PrismaExecutor, input: CreateActivityEventInput) {
    return prisma.activityEvent.create({
      data: {
        id: createId('activity'),
        actorUserId: input.actorUserId ?? null,
        targetUserId: input.targetUserId ?? null,
        organizationId: input.organizationId ?? null,
        action: input.action,
        result: input.result ?? 'success',
        message: input.message,
        metadataJson: input.metadataJson ?? null,
      },
    });
  },

  count(prisma: PrismaExecutor, query: ActivityLogListQuery = {}) {
    return prisma.activityEvent.count({
      where: createActivityWhere(query),
    });
  },

  list(prisma: PrismaExecutor, query: ActivityLogListQuery = {}) {
    const pageNumber = normalizePageNumber(query.pageNumber);
    const pageSize = normalizePageSize(query.pageSize);
    const sortDirection = query.sortDirection ?? 'desc';

    return prisma.activityEvent.findMany({
      where: createActivityWhere(query),
      include: activityEventInclude,
      orderBy: createActivityOrderBy(query.sortField, sortDirection),
      skip: pageNumber * pageSize,
      take: pageSize,
    });
  },
};
