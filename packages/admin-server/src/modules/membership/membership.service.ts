import { PrismaClient } from '@prisma/client';
import { prisma as defaultPrisma } from '../../db/client';
import { PrismaExecutor } from '../../db/types';
import { ORGANIZATION_KINDS, ROLE_KEYS } from '../../domain/adminConstants';
import { DomainError, createNotFoundError } from '../../shared/errors';
import { mutationSuccess, MutationResult } from '../../shared/result';
import { activityRepository } from '../activity-log/activity-log.repository';
import { organizationRepository } from '../organization/organization.repository';
import { roleService } from '../role/role.service';
import { userRepository } from '../user/user.repository';
import { membershipRepository } from './membership.repository';
import {
  AddUserToOrganizationByEmailInput,
  ChangeUserRolesInput,
  RemoveUserFromOrganizationInput,
  UpdateOrganizationAdminsInput,
} from './membership.types';

const createDisplayName = (firstName: string, lastName: string) =>
  `${firstName} ${lastName}`.trim();
const metadata = (value: Record<string, unknown>) => JSON.stringify(value);
const normalizeEmail = (email: string) => email.trim().toLowerCase();
const normalizeUserIds = (userIds: string[]) =>
  [...new Set(userIds.map((userId) => userId.trim()).filter(Boolean))];
const compatibleRoleKeysByOrganizationKind: Record<string, string[]> = {
  [ORGANIZATION_KINDS.internal]: [
    ROLE_KEYS.platformAdmin,
    ROLE_KEYS.organizationAdmin,
    ROLE_KEYS.publicUserAdmin,
  ],
  [ORGANIZATION_KINDS.tenant]: [ROLE_KEYS.organizationAdmin, ROLE_KEYS.workspaceManager],
  [ORGANIZATION_KINDS.public]: [],
};
const getDefaultRoleIdsForOrganization = async (tx: PrismaExecutor, organizationKind: string) => {
  if (organizationKind === ORGANIZATION_KINDS.internal) {
    const role = await roleService.getRequiredRoleByKey(tx, ROLE_KEYS.platformAdmin);

    return [role.id];
  }

  if (organizationKind === ORGANIZATION_KINDS.tenant) {
    return [];
  }

  throw new DomainError(
    'UNSUPPORTED_ORGANIZATION_KIND',
    `Organization kind ${organizationKind} is not supported for adding users.`
  );
};

const validateRoleCompatibility = (organizationKind: string, roles: { key: string }[]) => {
  if (organizationKind === ORGANIZATION_KINDS.public && roles.length > 0) {
    throw new DomainError(
      'ROLE_ORGANIZATION_KIND_MISMATCH',
      'public organizations do not accept role assignments.'
    );
  }

  const invalidPlatformRole = roles.find((role) => role.key === ROLE_KEYS.platformAdmin);
  if (invalidPlatformRole && organizationKind !== ORGANIZATION_KINDS.internal) {
    throw new DomainError(
      'ROLE_ORGANIZATION_KIND_MISMATCH',
      'platform_admin can only be assigned in an internal organization.'
    );
  }

  const invalidWorkspaceManagerRole = roles.find((role) => role.key === ROLE_KEYS.workspaceManager);
  if (invalidWorkspaceManagerRole && organizationKind !== ORGANIZATION_KINDS.tenant) {
    throw new DomainError(
      'ROLE_ORGANIZATION_KIND_MISMATCH',
      'workspace_manager can only be assigned in a tenant organization.'
    );
  }

  const invalidOrganizationAdminRole = roles.find(
    (role) => role.key === ROLE_KEYS.organizationAdmin
  );
  if (
    invalidOrganizationAdminRole &&
    organizationKind !== ORGANIZATION_KINDS.internal &&
    organizationKind !== ORGANIZATION_KINDS.tenant
  ) {
    throw new DomainError(
      'ROLE_ORGANIZATION_KIND_MISMATCH',
      'organization_admin can only be assigned in an internal or tenant organization.'
    );
  }

  const invalidPublicUserAdminRole = roles.find((role) => role.key === ROLE_KEYS.publicUserAdmin);
  if (invalidPublicUserAdminRole && organizationKind !== ORGANIZATION_KINDS.internal) {
    throw new DomainError(
      'ROLE_ORGANIZATION_KIND_MISMATCH',
      'public_user_admin can only be assigned in an internal organization.'
    );
  }

  const compatibleRoleKeys = compatibleRoleKeysByOrganizationKind[organizationKind] ?? [];
  const invalidRole = roles.find((role) => !compatibleRoleKeys.includes(role.key));

  if (invalidRole) {
    throw new DomainError(
      'ROLE_ORGANIZATION_KIND_MISMATCH',
      `${invalidRole.key} cannot be assigned in an organization of kind ${organizationKind}.`
    );
  }
};

const removePublicMembershipIfPresent = async (
  tx: PrismaExecutor,
  userId: string,
  targetOrganizationKind: string
) => {
  if (targetOrganizationKind === ORGANIZATION_KINDS.public) {
    return;
  }

  const publicMembership = await membershipRepository.findByUserAndOrganizationKind(
    tx,
    userId,
    ORGANIZATION_KINDS.public
  );

  if (publicMembership) {
    await membershipRepository.deleteMembership(tx, publicMembership.id);
  }
};

export type MembershipService = {
  addUserToOrganizationByEmail: (
    input: AddUserToOrganizationByEmailInput
  ) => Promise<MutationResult>;
  changeUserRoles: (input: ChangeUserRolesInput) => Promise<MutationResult>;
  removeUserFromOrganization: (input: RemoveUserFromOrganizationInput) => Promise<MutationResult>;
  updateOrganizationAdmins: (input: UpdateOrganizationAdminsInput) => Promise<MutationResult>;
};

type AddUserToOrganizationWithRolesInput = {
  actorUserId?: string | null;
  userId: string;
  organizationId: string;
  roleIds: string[];
  reason?: string | null;
};

const addUserToOrganizationWithRoles = async (
  tx: PrismaExecutor,
  input: AddUserToOrganizationWithRolesInput
): Promise<MutationResult> => {
  const [user, organization, roles] = await Promise.all([
    userRepository.findById(tx, input.userId),
    organizationRepository.findById(tx, input.organizationId),
    roleService.validateRoleIds(tx, input.roleIds),
  ]);

  if (!user) {
    throw createNotFoundError('User', input.userId);
  }

  if (!organization) {
    throw createNotFoundError('Organization', input.organizationId);
  }

  if (organization.kind === ORGANIZATION_KINDS.public) {
    throw new DomainError(
      'PUBLIC_TARGET_UNSUPPORTED',
      'Public users must be added to an internal or tenant organization.'
    );
  }

  validateRoleCompatibility(organization.kind, roles);

  const existingMembership = await membershipRepository.findByUserAndOrganization(
    tx,
    input.userId,
    input.organizationId
  );

  if (existingMembership) {
    throw new DomainError('DUPLICATE_MEMBERSHIP', 'User is already a member of this organization.');
  }

  const roleIds = roles.map((role) => role.id);
  await membershipRepository.createWithRoles(tx, input.userId, input.organizationId, roleIds);
  await removePublicMembershipIfPresent(tx, input.userId, organization.kind);
  await userRepository.updateFlaggedForDeletion(tx, input.userId, false);

  await activityRepository.create(tx, {
    actorUserId: input.actorUserId,
    targetUserId: user.id,
    organizationId: organization.id,
    action: 'ADD_USER_TO_ORGANIZATION',
    message: `${createDisplayName(user.firstName, user.lastName)} was added to ${organization.name}.`,
    metadataJson: metadata({
      nextRoleKeys: roles.map((role) => role.key),
      reason: input.reason ?? undefined,
    }),
  });

  return mutationSuccess('User was added to organization.');
};

const hasOrganizationAdminRole = (membership: {
  roleAssignments: { role: { key: string } }[];
}) =>
  membership.roleAssignments.some(
    (assignment) => assignment.role.key === ROLE_KEYS.organizationAdmin
  );

export const createMembershipService = (
  prisma: PrismaClient = defaultPrisma
): MembershipService => ({
  async addUserToOrganizationByEmail(input) {
    return prisma.$transaction(async (tx) => {
      const email = normalizeEmail(input.email);

      if (!email) {
        throw new DomainError('EMAIL_REQUIRED', 'Email is required.');
      }

      const [user, organization] = await Promise.all([
        userRepository.findByEmail(tx, email),
        organizationRepository.findById(tx, input.organizationId),
      ]);

      if (!user) {
        throw new DomainError('USER_NOT_FOUND_BY_EMAIL', `User ${email} was not found.`);
      }

      if (!organization) {
        throw createNotFoundError('Organization', input.organizationId);
      }

      if (organization.kind === ORGANIZATION_KINDS.public) {
        throw new DomainError(
          'PUBLIC_TARGET_UNSUPPORTED',
          'Public users must be added to an internal or tenant organization.'
        );
      }

      const roleIds = await getDefaultRoleIdsForOrganization(tx, organization.kind);

      return addUserToOrganizationWithRoles(tx, {
        actorUserId: input.actorUserId,
        userId: user.id,
        organizationId: organization.id,
        roleIds,
        reason: input.reason,
      });
    });
  },

  async changeUserRoles(input) {
    return prisma.$transaction(async (tx) => {
      const [user, organization, roles] = await Promise.all([
        userRepository.findById(tx, input.userId),
        organizationRepository.findById(tx, input.organizationId),
        roleService.validateRoleIds(tx, input.roleIds),
      ]);

      if (!user) {
        throw createNotFoundError('User', input.userId);
      }

      if (!organization) {
        throw createNotFoundError('Organization', input.organizationId);
      }

      validateRoleCompatibility(organization.kind, roles);

      const membership = await membershipRepository.findByUserAndOrganization(
        tx,
        input.userId,
        input.organizationId
      );

      if (!membership) {
        throw new DomainError('MEMBERSHIP_NOT_FOUND', 'User is not a member of this organization.');
      }

      const previousRoleKeys = membership.roleAssignments.map((assignment) => assignment.role.key);
      const nextRoleIds = roles.map((role) => role.id);
      const nextRoleKeys = roles.map((role) => role.key);
      const isRemovingOwnOrganizationAdminRole =
        input.actorUserId === input.userId &&
        previousRoleKeys.includes(ROLE_KEYS.organizationAdmin) &&
        !nextRoleKeys.includes(ROLE_KEYS.organizationAdmin);

      if (isRemovingOwnOrganizationAdminRole) {
        throw new DomainError(
          'SELF_ORGANIZATION_ADMIN_ROLE_REQUIRED',
          'Organization administrators cannot remove their own Organization Administrator role.'
        );
      }

      await membershipRepository.replaceRoles(tx, membership.id, nextRoleIds);

      await activityRepository.create(tx, {
        actorUserId: input.actorUserId,
        targetUserId: user.id,
        organizationId: organization.id,
        action: 'CHANGE_USER_ROLES',
        message: `${createDisplayName(user.firstName, user.lastName)} roles were changed in ${organization.name}.`,
        metadataJson: metadata({
          previousRoleKeys,
          nextRoleKeys,
          reason: input.reason ?? undefined,
        }),
      });

      return mutationSuccess('User roles were changed.');
    });
  },

  async removeUserFromOrganization(input) {
    return prisma.$transaction(async (tx) => {
      const membership = await membershipRepository.findByUserAndOrganization(
        tx,
        input.userId,
        input.organizationId
      );

      if (!membership) {
        throw new DomainError('MEMBERSHIP_NOT_FOUND', 'User is not a member of this organization.');
      }

      if (membership.organization.kind === ORGANIZATION_KINDS.public) {
        throw new DomainError(
          'PUBLIC_MEMBERSHIP_REMOVE_UNSUPPORTED',
          'Public memberships cannot be removed from an organization.'
        );
      }

      if (membership.organization.kind !== ORGANIZATION_KINDS.tenant) {
        throw new DomainError(
          'TENANT_MEMBERSHIP_REQUIRED',
          'Only tenant memberships can be removed from an organization.'
        );
      }

      if (input.actorUserId === input.userId) {
        throw new DomainError(
          'SELF_MEMBERSHIP_REMOVE_UNSUPPORTED',
          'Users cannot remove themselves from an organization.'
        );
      }

      const removedRoleKeys = membership.roleAssignments.map((assignment) => assignment.role.key);

      await membershipRepository.deleteMembership(tx, membership.id);

      const remainingTenantMembershipCount = await membershipRepository.countTenantMemberships(
        tx,
        input.userId
      );

      if (remainingTenantMembershipCount === 0) {
        await membershipRepository.ensurePublicMembership(tx, input.userId);
        await userRepository.updateFlaggedForDeletion(tx, input.userId, true);
      }

      await activityRepository.create(tx, {
        actorUserId: input.actorUserId,
        targetUserId: membership.user.id,
        organizationId: membership.organization.id,
        action: 'REMOVE_USER_FROM_ORGANIZATION',
        message: `${createDisplayName(membership.user.firstName, membership.user.lastName)} was removed from ${membership.organization.name}.`,
        metadataJson: metadata({
          removedRoleKeys,
          reason: input.reason ?? undefined,
        }),
      });

      return mutationSuccess('User was removed from organization.');
    });
  },

  async updateOrganizationAdmins(input) {
    return prisma.$transaction(async (tx) => {
      const addUserIds = normalizeUserIds(input.addUserIds);
      const removeUserIds = normalizeUserIds(input.removeUserIds);
      const removeUserIdSet = new Set(removeUserIds);
      const conflictingUserId = addUserIds.find((userId) => removeUserIdSet.has(userId));

      if (conflictingUserId) {
        throw new DomainError(
          'ORG_ADMIN_UPDATE_CONFLICT',
          'A user cannot be added and removed as an organization administrator in the same request.'
        );
      }

      const [organization, organizationAdminRole] = await Promise.all([
        organizationRepository.findById(tx, input.organizationId),
        roleService.getRequiredRoleByKey(tx, ROLE_KEYS.organizationAdmin),
      ]);

      if (!organization) {
        throw createNotFoundError('Organization', input.organizationId);
      }

      if (organization.kind === ORGANIZATION_KINDS.public) {
        throw new DomainError(
          'PUBLIC_ORGANIZATION_ADMIN_UNSUPPORTED',
          'Public organizations do not support organization administrators.'
        );
      }

      const membershipByUserId = new Map(
        organization.memberships.map((membership) => [membership.user.id, membership])
      );
      const targetUserIds = [...new Set([...addUserIds, ...removeUserIds])];
      const missingUserId = targetUserIds.find((userId) => !membershipByUserId.has(userId));

      if (missingUserId) {
        throw new DomainError(
          'MEMBERSHIP_NOT_FOUND',
          'User is not a member of this organization.'
        );
      }

      const isRemovingOwnOrganizationAdminRole = Boolean(
        input.actorUserId &&
          removeUserIdSet.has(input.actorUserId) &&
          hasOrganizationAdminRole(membershipByUserId.get(input.actorUserId)!)
      );

      if (isRemovingOwnOrganizationAdminRole) {
        throw new DomainError(
          'SELF_ORGANIZATION_ADMIN_ROLE_REQUIRED',
          'Organization administrators cannot remove their own Organization Administrator role.'
        );
      }

      const membershipsToAdd = addUserIds
        .map((userId) => membershipByUserId.get(userId)!)
        .filter((membership) => !hasOrganizationAdminRole(membership));
      const membershipsToRemove = removeUserIds
        .map((userId) => membershipByUserId.get(userId)!)
        .filter(hasOrganizationAdminRole);

      for (const membership of membershipsToAdd) {
        await membershipRepository.addRoleAssignment(tx, membership.id, organizationAdminRole.id);
        await activityRepository.create(tx, {
          actorUserId: input.actorUserId,
          targetUserId: membership.user.id,
          organizationId: organization.id,
          action: 'ADD_ORGANIZATION_ADMIN',
          message: `${createDisplayName(membership.user.firstName, membership.user.lastName)} was made an Organization Administrator in ${organization.name}.`,
          metadataJson: metadata({
            roleKey: ROLE_KEYS.organizationAdmin,
            operation: 'add',
            reason: input.reason ?? undefined,
          }),
        });
      }

      for (const membership of membershipsToRemove) {
        await membershipRepository.removeRoleAssignment(tx, membership.id, organizationAdminRole.id);
        await activityRepository.create(tx, {
          actorUserId: input.actorUserId,
          targetUserId: membership.user.id,
          organizationId: organization.id,
          action: 'REMOVE_ORGANIZATION_ADMIN',
          message: `${createDisplayName(membership.user.firstName, membership.user.lastName)} was removed as an Organization Administrator in ${organization.name}.`,
          metadataJson: metadata({
            roleKey: ROLE_KEYS.organizationAdmin,
            operation: 'remove',
            reason: input.reason ?? undefined,
          }),
        });
      }

      return mutationSuccess('Organization administrators were updated.');
    });
  },
});
