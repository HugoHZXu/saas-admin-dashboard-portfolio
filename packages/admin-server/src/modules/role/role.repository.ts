import { PrismaExecutor } from '../../db/types';

export const roleRepository = {
  findByKey(prisma: PrismaExecutor, roleKey: string) {
    return prisma.role.findUnique({
      where: {
        key: roleKey,
      },
    });
  },

  listByIds(prisma: PrismaExecutor, roleIds: string[]) {
    return prisma.role.findMany({
      where: {
        id: {
          in: roleIds,
        },
      },
    });
  },

  listByKeys(prisma: PrismaExecutor, roleKeys: string[]) {
    return prisma.role.findMany({
      where: {
        key: {
          in: roleKeys,
        },
      },
    });
  },
};
