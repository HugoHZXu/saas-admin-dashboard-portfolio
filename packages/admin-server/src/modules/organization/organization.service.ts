import { PrismaClient } from '@prisma/client';
import { prisma as defaultPrisma } from '../../db/client';
import { createPageResponse } from '../../shared/pagination';
import { PageResponse } from '../../shared/result';
import { Role } from '../role/role.types';
import {
  Organization,
  OrganizationAdmin,
  OrganizationListQuery,
  OrganizationMember,
} from './organization.types';
import { OrganizationRecord, organizationRepository } from './organization.repository';

const formatDate = (value: Date) => value.toISOString();
const createDisplayName = (firstName: string, lastName: string) => `${firstName} ${lastName}`.trim();

const mapRole = (role: { id: string; key: string; name: string }): Role => ({
  id: role.id,
  key: role.key,
  name: role.name,
});

const getMembershipRoles = (membership: OrganizationRecord['memberships'][number]) =>
  membership.roleAssignments
    .map((assignment) => mapRole(assignment.role))
    .sort((first, second) => first.name.localeCompare(second.name));

const mapAdmin = (membership: OrganizationRecord['memberships'][number]): OrganizationAdmin => ({
  id: membership.user.id,
  referenceId: membership.user.id,
  firstName: membership.user.firstName,
  lastName: membership.user.lastName,
  email: membership.user.email,
  disabled: membership.user.accountStatus === 'Suspended',
});

const mapMember = (membership: OrganizationRecord['memberships'][number]): OrganizationMember => ({
  id: membership.id,
  user: {
    id: membership.user.id,
    name: createDisplayName(membership.user.firstName, membership.user.lastName),
    email: membership.user.email,
  },
  status: membership.membershipStatus,
  roles: getMembershipRoles(membership),
});

const mapOrganization = (organization: OrganizationRecord): Organization => {
  const adminMemberships = organization.memberships.filter((membership) =>
    membership.roleAssignments.some((assignment) => assignment.role.key === 'organization_admin')
  );

  return {
    id: organization.id,
    referenceId: organization.referenceId,
    name: organization.name,
    kind: organization.kind as Organization['kind'],
    description: organization.description,
    address: organization.address,
    address2: organization.address2,
    city: organization.city,
    region: organization.region,
    postalCode: organization.postalCode,
    country: organization.country,
    timezone: organization.timezone,
    domains: [
      {
        name: organization.domainName,
        userCount: organization._count.memberships,
        status: 'verified',
      },
    ],
    admins: adminMemberships.map(mapAdmin),
    createdOn: formatDate(organization.createdAt),
    lastUpdatedOn: formatDate(organization.updatedAt),
    userCount: organization._count.memberships,
    adminCount: adminMemberships.length,
    status: organization.status as Organization['status'],
    memberships: organization.memberships.map(mapMember),
  };
};

export type OrganizationService = {
  listOrganizations: (query?: OrganizationListQuery | null) => Promise<PageResponse<Organization>>;
  getOrganizationDetail: (id: string) => Promise<Organization | undefined>;
};

export const createOrganizationService = (
  prisma: PrismaClient = defaultPrisma
): OrganizationService => ({
  async listOrganizations(query = {}) {
    const normalizedQuery = query ?? {};
    const [items, totalElements] = await Promise.all([
      organizationRepository.list(prisma, normalizedQuery),
      organizationRepository.count(prisma, normalizedQuery),
    ]);

    return createPageResponse(items.map(mapOrganization), totalElements, normalizedQuery);
  },

  async getOrganizationDetail(id) {
    const organization = await organizationRepository.findById(prisma, id);

    return organization ? mapOrganization(organization) : undefined;
  },
});
