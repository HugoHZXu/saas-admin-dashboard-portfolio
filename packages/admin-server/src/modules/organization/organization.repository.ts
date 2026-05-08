import { Prisma } from '@prisma/client';
import { PrismaExecutor } from '../../db/types';
import { normalizePageNumber, normalizePageSize } from '../../shared/pagination';
import { OrganizationListQuery } from './organization.types';

export const organizationInclude = {
  memberships: {
    include: {
      user: true,
      roleAssignments: {
        include: {
          role: true,
        },
      },
    },
  },
  _count: {
    select: {
      memberships: true,
    },
  },
} satisfies Prisma.OrganizationInclude;

export type OrganizationRecord = Prisma.OrganizationGetPayload<{
  include: typeof organizationInclude;
}>;

const createOrganizationWhere = (
  query: OrganizationListQuery = {}
): Prisma.OrganizationWhereInput => {
  const searchString = query.searchString?.trim();
  const kinds = query.kinds?.length ? query.kinds : ['tenant'];

  return {
    kind: { in: kinds },
    ...(searchString
      ? {
          OR: [
            { name: { contains: searchString } },
            { referenceId: { contains: searchString } },
            { description: { contains: searchString } },
            { city: { contains: searchString } },
            { region: { contains: searchString } },
            { country: { contains: searchString } },
            { domainName: { contains: searchString } },
          ],
        }
      : {}),
    ...(query.statuses?.length ? { status: { in: query.statuses } } : {}),
  };
};

const createOrganizationOrderBy = (
  sortField: string | null | undefined,
  sortDirection: Prisma.SortOrder
): Prisma.OrganizationOrderByWithRelationInput => {
  switch (sortField) {
    case 'status':
      return { status: sortDirection };
    case 'userCount':
    case 'users':
      return { memberships: { _count: sortDirection } };
    case 'createdOn':
    case 'createdAt':
      return { createdAt: sortDirection };
    case 'lastUpdatedOn':
    case 'updatedAt':
      return { updatedAt: sortDirection };
    case 'name':
    default:
      return { name: sortDirection };
  }
};

export const organizationRepository = {
  findById(prisma: PrismaExecutor, id: string) {
    return prisma.organization.findUnique({
      where: { id },
      include: organizationInclude,
    });
  },

  count(prisma: PrismaExecutor, query: OrganizationListQuery = {}) {
    return prisma.organization.count({
      where: createOrganizationWhere(query),
    });
  },

  list(prisma: PrismaExecutor, query: OrganizationListQuery = {}) {
    const pageNumber = normalizePageNumber(query.pageNumber);
    const pageSize = normalizePageSize(query.pageSize);
    const sortDirection = query.sortDirection === 'desc' ? 'desc' : 'asc';

    return prisma.organization.findMany({
      where: createOrganizationWhere(query),
      include: organizationInclude,
      orderBy: createOrganizationOrderBy(query.sortField, sortDirection),
      skip: pageNumber * pageSize,
      take: pageSize,
    });
  },
};
