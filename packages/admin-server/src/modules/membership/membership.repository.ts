import { randomUUID } from 'crypto';
import { Prisma } from '@prisma/client';
import { PrismaExecutor } from '../../db/types';

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
