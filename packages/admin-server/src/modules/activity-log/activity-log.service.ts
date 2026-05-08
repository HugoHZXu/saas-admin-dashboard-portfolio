import { PrismaClient } from '@prisma/client';
import { prisma as defaultPrisma } from '../../db/client';
import { createPageResponse } from '../../shared/pagination';
import { PageResponse } from '../../shared/result';
import { activityRepository } from './activity-log.repository';
import { ActivityLogListQuery, ActivityRecord } from './activity-log.types';
import { normalizeActivityEvent } from './normalizeActivityEvent';

export type ActivityLogService = {
  listActivityLogs: (query?: ActivityLogListQuery | null) => Promise<PageResponse<ActivityRecord>>;
};

export const createActivityLogService = (
  prisma: PrismaClient = defaultPrisma
): ActivityLogService => ({
  async listActivityLogs(query = {}) {
    const normalizedQuery = query ?? {};
    const [events, totalElements] = await Promise.all([
      activityRepository.list(prisma, normalizedQuery),
      activityRepository.count(prisma, normalizedQuery),
    ]);

    return createPageResponse(events.map(normalizeActivityEvent), totalElements, normalizedQuery);
  },
});
