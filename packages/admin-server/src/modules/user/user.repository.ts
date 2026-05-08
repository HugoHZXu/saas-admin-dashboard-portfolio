import { Prisma } from '@prisma/client';
import { PrismaExecutor } from '../../db/types';
import { normalizePageNumber, normalizePageSize } from '../../shared/pagination';
import { UserListQuery } from './user.types';

export const userMembershipInclude = {
  user: true,
  organization: true,
  roleAssignments: {
    include: {
      role: true,
    },
  },
} satisfies Prisma.OrganizationMembershipInclude;

export type UserMembershipRecord = Prisma.OrganizationMembershipGetPayload<{
  include: typeof userMembershipInclude;
}>;

export const userDetailInclude = {
  memberships: {
    include: {
      organization: true,
      roleAssignments: {
        include: {
          role: true,
        },
      },
    },
  },
} satisfies Prisma.UserInclude;

export type UserDetailRecord = Prisma.UserGetPayload<{
  include: typeof userDetailInclude;
}>;

const createUserSearchWhere = (searchString?: string | null): Prisma.UserWhereInput | undefined => {
  const query = searchString?.trim();

  if (!query) {
    return undefined;
  }

  return {
    OR: [
      { firstName: { contains: query } },
      { lastName: { contains: query } },
      { email: { contains: query } },
    ],
  };
};

const createUserListWhere = (query: UserListQuery): Prisma.OrganizationMembershipWhereInput => ({
  organizationId: query.organizationId,
  user: {
    AND: [
      createUserSearchWhere(query.searchString),
      query.accountStatuses?.length ? { accountStatus: { in: query.accountStatuses } } : undefined,
    ].filter((item): item is Prisma.UserWhereInput => Boolean(item)),
  },
  ...(query.roleKeys?.length
    ? {
        roleAssignments: {
          some: {
            role: {
              key: {
                in: query.roleKeys,
              },
            },
          },
        },
      }
    : {}),
});

const createUserListOrderBy = (
  sortField: string | null | undefined,
  sortDirection: Prisma.SortOrder
): Prisma.OrganizationMembershipOrderByWithRelationInput => {
  switch (sortField) {
    case 'lastName':
      return { user: { lastName: sortDirection } };
    case 'email':
      return { user: { email: sortDirection } };
    case 'accountStatus':
      return { user: { accountStatus: sortDirection } };
    case 'dateRegistered':
      return { user: { createdAt: sortDirection } };
    case 'lastSignedIn':
      return { user: { lastSignedIn: sortDirection } };
    case 'firstName':
    default:
      return { user: { firstName: sortDirection } };
  }
};

export const userRepository = {
  findById(prisma: PrismaExecutor, id: string) {
    return prisma.user.findUnique({ where: { id } });
  },

  findByEmail(prisma: PrismaExecutor, email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  findDetailByIdInOrganization(prisma: PrismaExecutor, id: string, organizationId: string) {
    return prisma.user.findFirst({
      where: {
        id,
        memberships: {
          some: {
            organizationId,
          },
        },
      },
      include: {
        memberships: {
          where: {
            organizationId,
          },
          include: userDetailInclude.memberships.include,
        },
      },
    });
  },

  countUsersInOrganization(prisma: PrismaExecutor, query: UserListQuery) {
    return prisma.organizationMembership.count({
      where: createUserListWhere(query),
    });
  },

  listUsersInOrganization(prisma: PrismaExecutor, query: UserListQuery) {
    const pageNumber = normalizePageNumber(query.pageNumber);
    const pageSize = normalizePageSize(query.pageSize);
    const sortDirection = query.sortDirection === 'desc' ? 'desc' : 'asc';

    return prisma.organizationMembership.findMany({
      where: createUserListWhere(query),
      include: userMembershipInclude,
      orderBy: createUserListOrderBy(query.sortField, sortDirection),
      skip: pageNumber * pageSize,
      take: pageSize,
    });
  },

  updateAccountStatus(prisma: PrismaExecutor, userId: string, accountStatus: string) {
    return prisma.user.update({
      where: { id: userId },
      data: {
        accountStatus,
      },
    });
  },
};
