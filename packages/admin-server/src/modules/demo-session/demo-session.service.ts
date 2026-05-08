import { PrismaClient } from '@prisma/client';
import { prisma as defaultPrisma } from '../../db/client';
import { ORGANIZATION_KINDS, ROLE_KEYS } from '../../domain/adminConstants';
import { Role } from '../role/role.types';
import {
  DemoAccount,
  DemoAccountMembership,
  DemoCapabilities,
  DemoOrganizationScope,
  DemoSession,
} from './demo-session.types';
import {
  defaultDemoAccountId,
  demoAccountPersonas,
  DemoAccountRecord,
  demoSessionRepository,
} from './demo-session.repository';

const createDisplayName = (firstName: string, lastName: string) =>
  `${firstName} ${lastName}`.trim();

const mapRole = (role: { id: string; key: string; name: string }): Role => ({
  id: role.id,
  key: role.key,
  name: role.name,
});

const mapOrganizationScope = (
  organization: Pick<
    DemoAccountRecord['memberships'][number]['organization'],
    'id' | 'name' | 'kind' | 'status'
  >
): DemoOrganizationScope => ({
  id: organization.id,
  name: organization.name,
  kind: organization.kind as DemoOrganizationScope['kind'],
  status: organization.status as DemoOrganizationScope['status'],
});

const mapRoles = (membership: DemoAccountRecord['memberships'][number]) =>
  membership.roleAssignments
    .map((assignment) => mapRole(assignment.role))
    .sort((first, second) => first.name.localeCompare(second.name));

const mapMembership = (
  membership: DemoAccountRecord['memberships'][number]
): DemoAccountMembership => ({
  organization: mapOrganizationScope(membership.organization),
  roles: mapRoles(membership),
});

const getCapabilities = (
  userManagementOrganizations: DemoOrganizationScope[],
  memberships: DemoAccountMembership[]
): DemoCapabilities => {
  const orgManagement = memberships.some(
    (membership) =>
      membership.organization.kind === ORGANIZATION_KINDS.internal &&
      membership.roles.some((role) => role.key === ROLE_KEYS.platformAdmin)
  );
  const userManagement = userManagementOrganizations.length > 0;

  return {
    orgManagement,
    userManagement,
  };
};

const getUserManagementOrganizations = (
  memberships: DemoAccountMembership[],
  publicOrganization: DemoOrganizationScope | null
): DemoOrganizationScope[] => {
  const scopesById = new Map<string, DemoOrganizationScope>();

  for (const membership of memberships) {
    if (membership.roles.some((role) => role.key === ROLE_KEYS.organizationAdmin)) {
      scopesById.set(membership.organization.id, membership.organization);
    }

    if (
      membership.organization.kind === ORGANIZATION_KINDS.internal &&
      membership.roles.some((role) => role.key === ROLE_KEYS.publicUserAdmin) &&
      publicOrganization
    ) {
      scopesById.set(publicOrganization.id, publicOrganization);
    }
  }

  return [...scopesById.values()].sort((first, second) => {
    if (first.kind !== second.kind) {
      return first.kind.localeCompare(second.kind);
    }

    return first.name.localeCompare(second.name);
  });
};

const mapDemoAccount = (
  account: DemoAccountRecord,
  publicOrganization: DemoOrganizationScope | null
): DemoAccount => {
  const memberships = account.memberships
    .map(mapMembership)
    .sort((first, second) => first.organization.name.localeCompare(second.organization.name));
  const userManagementOrganizations = getUserManagementOrganizations(
    memberships,
    publicOrganization
  );
  const capabilities = getCapabilities(userManagementOrganizations, memberships);

  return {
    id: account.id,
    email: account.email,
    firstName: account.firstName,
    lastName: account.lastName,
    displayName: createDisplayName(account.firstName, account.lastName),
    persona: demoAccountPersonas[account.id as keyof typeof demoAccountPersonas] ?? 'Demo account',
    memberships,
    capabilities,
    userManagementOrganizations,
  };
};

export type DemoSessionService = {
  getDemoSession: (selectedUserId?: string | null) => Promise<DemoSession>;
};

export const createDemoSessionService = (
  prisma: PrismaClient = defaultPrisma
): DemoSessionService => ({
  async getDemoSession(selectedUserId) {
    const publicOrganization = await demoSessionRepository.findPublicOrganization(prisma);
    const publicOrganizationScope = publicOrganization
      ? mapOrganizationScope(publicOrganization)
      : null;
    const accounts = (await demoSessionRepository.listDemoAccounts(prisma)).map((account) =>
      mapDemoAccount(account, publicOrganizationScope)
    );
    const currentAccount =
      accounts.find((account) => account.id === selectedUserId) ??
      accounts.find((account) => account.id === defaultDemoAccountId) ??
      accounts[0];

    if (!currentAccount) {
      throw new Error('Demo session seed data is missing.');
    }

    return {
      accounts,
      currentAccount,
      capabilities: currentAccount.capabilities,
      userManagementOrganizations: currentAccount.userManagementOrganizations,
    };
  },
});
