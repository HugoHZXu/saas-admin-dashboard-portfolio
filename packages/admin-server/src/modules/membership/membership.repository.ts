import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';
import { PrismaExecutor } from '../../db/types';
import { ORGANIZATION_IDS, ORGANIZATION_KINDS } from '../../domain/adminConstants';

export const membershipWithRolesInclude = {
  user: true,
  organization: true,
  roleAssignments: {
    include: {
      role: true,
    },
  },
} satisfies Prisma.OrganizationMembershipInclude;

export type MembershipWithRolesRecord = Prisma.OrganizationMembershipGetPayload<{
  include: typeof membershipWithRolesInclude;
}>;

const createId = (prefix: string) => `${prefix}-${randomUUID()}`;

export const membershipRepository = {
  findByUserAndOrganization(prisma: PrismaExecutor, userId: string, organizationId: string) {
    return prisma.organizationMembership.findUnique({
      where: {
        userId_organizationId: {
          userId,
          organizationId,
        },
      },
      include: membershipWithRolesInclude,
    });
  },

  findByUserAndOrganizationKind(prisma: PrismaExecutor, userId: string, organizationKind: string) {
    return prisma.organizationMembership.findFirst({
      where: {
        userId,
        organization: {
          kind: organizationKind,
        },
      },
      include: membershipWithRolesInclude,
    });
  },

  countTenantMemberships(prisma: PrismaExecutor, userId: string) {
    return prisma.organizationMembership.count({
      where: {
        userId,
        organization: {
          kind: ORGANIZATION_KINDS.tenant,
        },
      },
    });
  },

  createWithRoles(
    prisma: PrismaExecutor,
    userId: string,
    organizationId: string,
    roleIds: string[]
  ) {
    return prisma.organizationMembership.create({
      data: {
        id: createId('membership'),
        userId,
        organizationId,
        membershipStatus: 'active',
        roleAssignments: {
          create: roleIds.map((roleId) => ({
            id: createId('assignment'),
            roleId,
          })),
        },
      },
      include: membershipWithRolesInclude,
    });
  },

  ensurePublicMembership(prisma: PrismaExecutor, userId: string) {
    return prisma.organizationMembership.upsert({
      where: {
        userId_organizationId: {
          userId,
          organizationId: ORGANIZATION_IDS.public,
        },
      },
      update: {},
      create: {
        id: createId('membership'),
        userId,
        organizationId: ORGANIZATION_IDS.public,
        membershipStatus: 'active',
      },
      include: membershipWithRolesInclude,
    });
  },

  async replaceRoles(prisma: PrismaExecutor, membershipId: string, roleIds: string[]) {
    await prisma.membershipRoleAssignment.deleteMany({
      where: {
        membershipId,
      },
    });

    if (roleIds.length === 0) {
      return;
    }

    await prisma.membershipRoleAssignment.createMany({
      data: roleIds.map((roleId) => ({
        id: createId('assignment'),
        membershipId,
        roleId,
      })),
    });
  },

  async deleteMembership(prisma: PrismaExecutor, membershipId: string) {
    await prisma.membershipRoleAssignment.deleteMany({
      where: {
        membershipId,
      },
    });

    await prisma.organizationMembership.delete({
      where: {
        id: membershipId,
      },
    });
  },
};
