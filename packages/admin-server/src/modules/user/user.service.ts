import { PrismaClient } from '@prisma/client';
import { prisma as defaultPrisma } from '../../db/client';
import { createNotFoundError } from '../../shared/errors';
import { createPageResponse } from '../../shared/pagination';
import { mutationSuccess, PageResponse } from '../../shared/result';
import { activityRepository } from '../activity-log/activity-log.repository';
import { organizationRepository } from '../organization/organization.repository';
import { Role } from '../role/role.types';
import {
  SuspendUserInput,
  UserDetail,
  UserDetailQuery,
  UserListItem,
  UserListQuery,
  UserMembership,
} from './user.types';
import { UserDetailRecord, UserMembershipRecord, userRepository } from './user.repository';

const formatDate = (value: Date) => value.toISOString();
const formatOptionalDate = (value: Date | null) => value?.toISOString() ?? null;
const createDisplayName = (firstName: string, lastName: string) => `${firstName} ${lastName}`.trim();
const metadata = (value: Record<string, unknown>) => JSON.stringify(value);

const mapRole = (role: { id: string; key: string; name: string }): Role => ({
  id: role.id,
  key: role.key,
  name: role.name,
});

const mapMembershipRoles = (membership: {
  roleAssignments: { role: { id: string; key: string; name: string } }[];
}) =>
  membership.roleAssignments
    .map((assignment) => mapRole(assignment.role))
    .sort((first, second) => first.name.localeCompare(second.name));

const mapUserListItem = (membership: UserMembershipRecord): UserListItem => ({
  id: membership.user.id,
  email: membership.user.email,
  firstName: membership.user.firstName,
  lastName: membership.user.lastName,
  displayName: createDisplayName(membership.user.firstName, membership.user.lastName),
  accountStatus: membership.user.accountStatus as UserListItem['accountStatus'],
  lastSignedIn: formatOptionalDate(membership.user.lastSignedIn),
  dateRegistered: formatDate(membership.user.createdAt),
  membershipId: membership.id,
  organization: {
    id: membership.organization.id,
    name: membership.organization.name,
  },
  roles: mapMembershipRoles(membership),
});

const mapUserMembership = (membership: UserDetailRecord['memberships'][number]): UserMembership => ({
  id: membership.id,
  organization: {
    id: membership.organization.id,
    name: membership.organization.name,
  },
  roles: mapMembershipRoles(membership),
  createdAt: formatDate(membership.createdAt),
});

const mapUserDetail = (user: UserDetailRecord): UserDetail => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  displayName: createDisplayName(user.firstName, user.lastName),
  accountStatus: user.accountStatus as UserDetail['accountStatus'],
  lastSignedIn: formatOptionalDate(user.lastSignedIn),
  dateRegistered: formatDate(user.createdAt),
  memberships: user.memberships.map(mapUserMembership),
});

export type UserService = {
  listUsers: (query: UserListQuery) => Promise<PageResponse<UserListItem>>;
  getUserDetail: (query: UserDetailQuery) => Promise<UserDetail | undefined>;
  suspendUser: (input: SuspendUserInput) => Promise<ReturnType<typeof mutationSuccess>>;
};

export const createUserService = (prisma: PrismaClient = defaultPrisma): UserService => ({
  async listUsers(query) {
    const organization = await organizationRepository.findById(prisma, query.organizationId);

    if (!organization) {
      throw createNotFoundError('Organization', query.organizationId);
    }

    const [items, totalElements] = await Promise.all([
      userRepository.listUsersInOrganization(prisma, query),
      userRepository.countUsersInOrganization(prisma, query),
    ]);

    return createPageResponse(items.map(mapUserListItem), totalElements, query);
  },

  async getUserDetail(query) {
    const user = await userRepository.findDetailByIdInOrganization(
      prisma,
      query.id,
      query.organizationId
    );

    if (!user) {
      return undefined;
    }

    return mapUserDetail(user);
  },

  async suspendUser(input) {
    return prisma.$transaction(async (tx) => {
      const user = await userRepository.findById(tx, input.userId);

      if (!user) {
        throw createNotFoundError('User', input.userId);
      }

      await userRepository.updateAccountStatus(tx, input.userId, 'Suspended');

      await activityRepository.create(tx, {
        actorUserId: input.actorUserId,
        targetUserId: input.userId,
        action: 'SUSPEND_USER',
        message: `${createDisplayName(user.firstName, user.lastName)} was suspended.`,
        metadataJson: metadata({
          reason: input.reason ?? undefined,
        }),
      });

      return mutationSuccess('User was suspended.');
    });
  },
});
