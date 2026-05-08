import { PrismaExecutor } from '../../db/types';
import { ORGANIZATION_KINDS, ROLE_KEYS } from '../../domain/adminConstants';
import { DomainError, createNotFoundError } from '../../shared/errors';
import { organizationRepository } from '../organization/organization.repository';
import { roleRepository } from './role.repository';

const availableRoleKeysByOrganizationKind: Record<string, string[]> = {
  [ORGANIZATION_KINDS.internal]: [
    ROLE_KEYS.platformAdmin,
    ROLE_KEYS.organizationAdmin,
    ROLE_KEYS.publicUserAdmin,
  ],
  [ORGANIZATION_KINDS.tenant]: [ROLE_KEYS.organizationAdmin, ROLE_KEYS.workspaceManager],
  [ORGANIZATION_KINDS.public]: [],
};

export const roleService = {
  async listAvailableRoles(prisma: PrismaExecutor, organizationId: string) {
    const organization = await organizationRepository.findById(prisma, organizationId);

    if (!organization) {
      throw createNotFoundError('Organization', organizationId);
    }

    const roleKeys = availableRoleKeysByOrganizationKind[organization.kind] ?? [];

    if (roleKeys.length === 0) {
      return [];
    }

    const roles = await roleRepository.listByKeys(prisma, roleKeys);
    const rolesByKey = new Map(roles.map((role) => [role.key, role]));
    const missingRoleKey = roleKeys.find((roleKey) => !rolesByKey.has(roleKey));

    if (missingRoleKey) {
      throw new DomainError('ROLE_NOT_FOUND', `Role ${missingRoleKey} was not found.`);
    }

    return roleKeys.map((roleKey) => rolesByKey.get(roleKey)!);
  },

  async getRequiredRoleByKey(prisma: PrismaExecutor, roleKey: string) {
    const role = await roleRepository.findByKey(prisma, roleKey);

    if (!role) {
      throw new DomainError('ROLE_NOT_FOUND', `Role ${roleKey} was not found.`);
    }

    return role;
  },

  async validateRoleIds(prisma: PrismaExecutor, roleIds: string[]) {
    const uniqueRoleIds = [...new Set(roleIds)];

    if (uniqueRoleIds.length === 0) {
      return [];
    }

    const roles = await roleRepository.listByIds(prisma, uniqueRoleIds);
    const foundRoleIds = new Set(roles.map((role) => role.id));
    const missingRoleIds = uniqueRoleIds.filter((roleId) => !foundRoleIds.has(roleId));

    if (missingRoleIds.length > 0) {
      throw new DomainError('ROLE_NOT_FOUND', `Role ${missingRoleIds[0]} was not found.`);
    }

    return roles;
  },
};
