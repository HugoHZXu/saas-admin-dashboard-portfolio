import { Prisma } from '@prisma/client';
import { PrismaExecutor } from '../../db/types';
import { ORGANIZATION_IDS } from '../../domain/adminConstants';

export const defaultDemoAccountId = 'user-platform-lead';

export const demoAccountIds = [
  'user-platform-lead',
  'user-platform-support',
  'user-platform-public-admin',
  'user-tenant-admin',
  'user-multi-tenant-admin',
  'user-tenant-member',
] as const;

export const demoAccountPersonas: Record<(typeof demoAccountIds)[number], string> = {
  'user-platform-lead': 'Platform and internal admin',
  'user-platform-support': 'Platform-only admin',
  'user-platform-public-admin': 'Platform and public user admin',
  'user-tenant-admin': 'Single-organization admin',
  'user-multi-tenant-admin': 'Multi-organization admin',
  'user-tenant-member': 'Workspace member',
};

export const demoAccountInclude = {
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

export type DemoAccountRecord = Prisma.UserGetPayload<{
  include: typeof demoAccountInclude;
}>;

const accountOrder = new Map<string, number>(demoAccountIds.map((id, index) => [id, index]));

export const demoSessionRepository = {
  async listDemoAccounts(prisma: PrismaExecutor) {
    const accounts = await prisma.user.findMany({
      where: {
        id: {
          in: [...demoAccountIds],
        },
      },
      include: demoAccountInclude,
    });

    return accounts.sort(
      (first, second) =>
        (accountOrder.get(first.id) ?? Number.MAX_SAFE_INTEGER) -
        (accountOrder.get(second.id) ?? Number.MAX_SAFE_INTEGER)
    );
  },

  findPublicOrganization(prisma: PrismaExecutor) {
    return prisma.organization.findUnique({
      where: {
        id: ORGANIZATION_IDS.public,
      },
    });
  },
};
