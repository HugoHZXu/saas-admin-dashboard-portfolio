import { AddressInfo } from 'net';
import { Server } from 'http';
import { PrismaClient } from '@prisma/client';
import { createAdminServerApp } from '../app/createApp';
import { createTestDb } from '../testUtils/testDb';

type TestServer = {
  prisma: PrismaClient;
  server: Server;
  url: string;
  cleanup: () => Promise<void>;
};

const listen = async (): Promise<TestServer> => {
  const testDb = await createTestDb();
  const app = createAdminServerApp({ prisma: testDb.prisma });
  const server = app.listen(0);
  const { port } = server.address() as AddressInfo;

  return {
    prisma: testDb.prisma,
    server,
    url: `http://127.0.0.1:${port}`,
    cleanup: async () => {
      server.close();
      await testDb.cleanup();
    },
  };
};

const postGraphql = async (
  url: string,
  body: {
    query: string;
    variables?: Record<string, unknown>;
  }
) => {
  const response = await fetch(`${url}/graphql`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });

  return {
    response,
    payload: await response.json(),
  };
};

describe('admin-server GraphQL', () => {
  it('serves health checks', async () => {
    const { url, cleanup } = await listen();

    try {
      const response = await fetch(`${url}/healthz`);
      const payload = await response.json();

      expect(response.status).toBe(200);
      expect(payload).toEqual({
        status: 'ok',
        service: 'admin-server',
      });
    } finally {
      await cleanup();
    }
  });

  it('returns demo session accounts with computed admin capabilities', async () => {
    const { url, cleanup } = await listen();

    try {
      const { response, payload } = await postGraphql(url, {
        query: `
          query DemoSession($selectedUserId: ID) {
            demoSession(selectedUserId: $selectedUserId) {
              currentAccount {
                id
              }
              capabilities {
                orgManagement
                userManagement
              }
              userManagementOrganizations {
                id
                kind
              }
              accounts {
                id
                email
                displayName
                persona
                capabilities {
                  orgManagement
                  userManagement
                }
                userManagementOrganizations {
                  id
                  kind
                  status
                }
                memberships {
                  organization {
                    id
                    kind
                  }
                  roles {
                    key
                  }
                }
              }
            }
          }
        `,
        variables: {
          selectedUserId: 'user-multi-tenant-admin',
        },
      });

      expect(response.status).toBe(200);
      expect(payload.errors).toBeUndefined();
      expect(payload.data.demoSession.currentAccount.id).toBe('user-multi-tenant-admin');
      expect(payload.data.demoSession.capabilities).toEqual({
        orgManagement: false,
        userManagement: true,
      });
      expect(
        payload.data.demoSession.userManagementOrganizations.map(
          (organization: { id: string }) => organization.id
        )
      ).toEqual(['org-demo-002', 'org-demo-003']);

      const accountsById = new Map<
        string,
        {
          capabilities: { orgManagement: boolean; userManagement: boolean };
          userManagementOrganizations: { id: string; kind: string; status: string }[];
          memberships: { organization: { id: string; kind: string }; roles: { key: string }[] }[];
        }
      >(
        payload.data.demoSession.accounts.map(
          (account: {
            id: string;
            capabilities: { orgManagement: boolean; userManagement: boolean };
            userManagementOrganizations: { id: string; kind: string; status: string }[];
            memberships: { organization: { id: string; kind: string }; roles: { key: string }[] }[];
          }) => [account.id, account]
        )
      );

      expect([...accountsById.keys()]).toEqual([
        'user-platform-lead',
        'user-platform-support',
        'user-platform-public-admin',
        'user-tenant-admin',
        'user-multi-tenant-admin',
        'user-tenant-member',
      ]);
      expect(accountsById.get('user-platform-lead')?.capabilities).toEqual({
        orgManagement: true,
        userManagement: true,
      });
      expect(accountsById.get('user-platform-lead')?.userManagementOrganizations).toEqual([
        { id: 'org-platform-ops', kind: 'INTERNAL', status: 'active' },
      ]);
      expect(accountsById.get('user-platform-support')?.capabilities).toEqual({
        orgManagement: true,
        userManagement: false,
      });
      expect(accountsById.get('user-platform-support')?.userManagementOrganizations).toEqual([]);
      expect(accountsById.get('user-platform-public-admin')?.capabilities).toEqual({
        orgManagement: true,
        userManagement: true,
      });
      expect(accountsById.get('user-platform-public-admin')?.userManagementOrganizations).toEqual([
        { id: 'org-public', kind: 'PUBLIC', status: 'active' },
      ]);
      expect(accountsById.get('user-tenant-admin')?.capabilities).toEqual({
        orgManagement: false,
        userManagement: true,
      });
      expect(accountsById.get('user-tenant-admin')?.userManagementOrganizations).toEqual([
        { id: 'org-demo-001', kind: 'TENANT', status: 'active' },
      ]);
      expect(accountsById.get('user-multi-tenant-admin')?.capabilities).toEqual({
        orgManagement: false,
        userManagement: true,
      });
      expect(accountsById.get('user-multi-tenant-admin')?.userManagementOrganizations).toEqual([
        { id: 'org-demo-002', kind: 'TENANT', status: 'active' },
        { id: 'org-demo-003', kind: 'TENANT', status: 'inactive' },
      ]);
      expect(accountsById.get('user-tenant-member')?.capabilities).toEqual({
        orgManagement: false,
        userManagement: false,
      });
      expect(accountsById.get('user-tenant-member')?.userManagementOrganizations).toEqual([]);
    } finally {
      await cleanup();
    }
  });

  it('falls back to the default demo account for unknown selected users', async () => {
    const { url, cleanup } = await listen();

    try {
      const { payload } = await postGraphql(url, {
        query: `
          query DemoSession($selectedUserId: ID) {
            demoSession(selectedUserId: $selectedUserId) {
              currentAccount {
                id
              }
              capabilities {
                orgManagement
                userManagement
              }
            }
          }
        `,
        variables: {
          selectedUserId: 'missing-user',
        },
      });

      expect(payload.errors).toBeUndefined();
      expect(payload.data.demoSession.currentAccount.id).toBe('user-platform-lead');
      expect(payload.data.demoSession.capabilities).toEqual({
        orgManagement: true,
        userManagement: true,
      });
    } finally {
      await cleanup();
    }
  });

  it('does not grant User Management from workspace_manager alone', async () => {
    const { prisma, url, cleanup } = await listen();

    try {
      await prisma.membershipRoleAssignment.create({
        data: {
          id: 'assignment-acme-member-workspace-manager',
          membershipId: 'membership-acme-member',
          roleId: 'role-workspace-manager',
        },
      });

      const { payload } = await postGraphql(url, {
        query: `
          query DemoSession($selectedUserId: ID) {
            demoSession(selectedUserId: $selectedUserId) {
              currentAccount {
                id
                capabilities {
                  userManagement
                }
                userManagementOrganizations {
                  id
                }
                memberships {
                  organization {
                    id
                  }
                  roles {
                    key
                  }
                }
              }
            }
          }
        `,
        variables: {
          selectedUserId: 'user-tenant-member',
        },
      });

      expect(payload.errors).toBeUndefined();
      expect(payload.data.demoSession.currentAccount.id).toBe('user-tenant-member');
      expect(payload.data.demoSession.currentAccount.capabilities.userManagement).toBe(false);
      expect(payload.data.demoSession.currentAccount.userManagementOrganizations).toEqual([]);
      expect(payload.data.demoSession.currentAccount.memberships).toEqual([
        {
          organization: { id: 'org-demo-001' },
          roles: [{ key: 'workspace_manager' }],
        },
      ]);
    } finally {
      await cleanup();
    }
  });

  it('queries tenant organizations from Prisma seed data by default', async () => {
    const { url, cleanup } = await listen();

    try {
      const { response, payload } = await postGraphql(url, {
        query: `
          query Organizations($input: OrganizationListInput) {
            organizations(input: $input) {
              totalElements
              items {
                id
                referenceId
                name
                kind
                userCount
                domains {
                  name
                }
                admins {
                  email
                }
              }
            }
          }
        `,
        variables: {
          input: {
            pageSize: 10,
          },
        },
      });

      expect(response.status).toBe(200);
      expect(payload.errors).toBeUndefined();
      expect(payload.data.organizations.totalElements).toBe(3);
      expect(payload.data.organizations.items.map((item: { kind: string }) => item.kind)).toEqual([
        'TENANT',
        'TENANT',
        'TENANT',
      ]);
      expect(
        payload.data.organizations.items.map((item: { name: string }) => item.name)
      ).not.toContain('Demo Platform Operations');
      expect(
        payload.data.organizations.items.map((item: { name: string }) => item.name)
      ).not.toContain('Public');
      expect(payload.data.organizations.items[0]).toMatchObject({
        id: 'org-demo-001',
        referenceId: 'org-ref-001',
        name: 'Acme Cloud',
        kind: 'TENANT',
        userCount: 2,
        domains: [{ name: 'acme-cloud.example' }],
        admins: [{ email: 'mina.patel@acme-cloud.example' }],
      });
    } finally {
      await cleanup();
    }
  });

  it('queries the Public organization only when requested by kind', async () => {
    const { url, cleanup } = await listen();

    try {
      const { response, payload } = await postGraphql(url, {
        query: `
          query Organizations($input: OrganizationListInput) {
            organizations(input: $input) {
              totalElements
              items {
                id
                referenceId
                name
                kind
                userCount
                domains {
                  name
                }
                admins {
                  email
                }
              }
            }
          }
        `,
        variables: {
          input: {
            kinds: ['PUBLIC'],
            pageSize: 10,
          },
        },
      });

      expect(response.status).toBe(200);
      expect(payload.errors).toBeUndefined();
      expect(payload.data.organizations.totalElements).toBe(1);
      expect(payload.data.organizations.items).toEqual([
        expect.objectContaining({
          id: 'org-public',
          referenceId: 'org-ref-public',
          name: 'Public',
          kind: 'PUBLIC',
          userCount: 3,
          domains: [{ name: 'public-signups.example' }],
          admins: [],
        }),
      ]);
    } finally {
      await cleanup();
    }
  });

  it('queries the internal platform organization by id', async () => {
    const { url, cleanup } = await listen();

    try {
      const { payload } = await postGraphql(url, {
        query: `
          query Organization($id: ID!) {
            organization(id: $id) {
              id
              name
              kind
              userCount
              admins {
                email
              }
            }
          }
        `,
        variables: {
          id: 'org-platform-ops',
        },
      });

      expect(payload.errors).toBeUndefined();
      expect(payload.data.organization).toMatchObject({
        id: 'org-platform-ops',
        name: 'Demo Platform Operations',
        kind: 'INTERNAL',
        userCount: 3,
        admins: [{ email: 'casey.nolan@platform-ops.example' }],
      });
    } finally {
      await cleanup();
    }
  });

  it('queries tenant organization-scoped users with membership roles', async () => {
    const { url, cleanup } = await listen();

    try {
      const { payload } = await postGraphql(url, {
        query: `
          query Users($input: UserListInput!) {
            users(input: $input) {
              totalElements
              items {
                email
                organization {
                  id
                  name
                }
                roles {
                  key
                  name
                }
              }
            }
          }
        `,
        variables: {
          input: {
            organizationId: 'org-demo-001',
            pageSize: 10,
          },
        },
      });

      expect(payload.errors).toBeUndefined();
      expect(payload.data.users.totalElements).toBe(2);
      expect(payload.data.users.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            email: 'mina.patel@acme-cloud.example',
            organization: { id: 'org-demo-001', name: 'Acme Cloud' },
            roles: [{ key: 'organization_admin', name: 'Organization Administrator' }],
          }),
          expect.objectContaining({
            email: 'sam.rivera@acme-cloud.example',
            organization: { id: 'org-demo-001', name: 'Acme Cloud' },
            roles: [],
          }),
        ])
      );
    } finally {
      await cleanup();
    }
  });

  it('queries Public organization users with no role assignments', async () => {
    const { url, cleanup } = await listen();

    try {
      const { payload } = await postGraphql(url, {
        query: `
          query Users($input: UserListInput!) {
            users(input: $input) {
              totalElements
              items {
                email
                organization {
                  id
                  name
                }
                roles {
                  key
                }
              }
            }
          }
        `,
        variables: {
          input: {
            organizationId: 'org-public',
            pageSize: 10,
          },
        },
      });

      expect(payload.errors).toBeUndefined();
      expect(payload.data.users.totalElements).toBe(3);
      expect(payload.data.users.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            email: 'alex.kim@public-signups.example',
            organization: { id: 'org-public', name: 'Public' },
            roles: [],
          }),
          expect.objectContaining({
            email: 'jamie.ross@public-signups.example',
            organization: { id: 'org-public', name: 'Public' },
            roles: [],
          }),
          expect.objectContaining({
            email: 'quinn.parker@public-signups.example',
            organization: { id: 'org-public', name: 'Public' },
            roles: [],
          }),
        ])
      );
    } finally {
      await cleanup();
    }
  });

  it('returns available roles by organization kind', async () => {
    const { url, cleanup } = await listen();

    try {
      const query = `
        query AvailableRoles($organizationId: ID!) {
          availableRoles(organizationId: $organizationId) {
            key
            name
          }
        }
      `;

      const { payload: tenantPayload } = await postGraphql(url, {
        query,
        variables: {
          organizationId: 'org-demo-001',
        },
      });
      const { payload: internalPayload } = await postGraphql(url, {
        query,
        variables: {
          organizationId: 'org-platform-ops',
        },
      });
      const { payload: publicPayload } = await postGraphql(url, {
        query,
        variables: {
          organizationId: 'org-public',
        },
      });

      expect(tenantPayload.errors).toBeUndefined();
      expect(tenantPayload.data.availableRoles).toEqual([
        { key: 'organization_admin', name: 'Organization Administrator' },
        { key: 'workspace_manager', name: 'Workspace Manager' },
      ]);

      expect(internalPayload.errors).toBeUndefined();
      expect(internalPayload.data.availableRoles).toEqual([
        { key: 'platform_admin', name: 'Platform Administrator' },
        { key: 'organization_admin', name: 'Organization Administrator' },
        { key: 'public_user_admin', name: 'Public User Administrator' },
      ]);

      expect(publicPayload.errors).toBeUndefined();
      expect(publicPayload.data.availableRoles).toEqual([]);
    } finally {
      await cleanup();
    }
  });

  it('adds an organization user by email through GraphQL', async () => {
    const { prisma, url, cleanup } = await listen();

    try {
      const { response, payload } = await postGraphql(url, {
        query: `
          mutation AddUserToOrganizationByEmail($input: AddUserToOrganizationByEmailInput!) {
            addUserToOrganizationByEmail(input: $input) {
              success
              code
              message
            }
          }
        `,
        variables: {
          input: {
            actorUserId: 'user-tenant-admin',
            email: ' ALEX.KIM@PUBLIC-SIGNUPS.EXAMPLE ',
            organizationId: 'org-demo-001',
          },
        },
      });

      expect(response.status).toBe(200);
      expect(payload.errors).toBeUndefined();
      expect(payload.data.addUserToOrganizationByEmail).toEqual({
        success: true,
        code: 'OK',
        message: 'User was added to organization.',
      });

      const membership = await prisma.organizationMembership.findUnique({
        where: {
          userId_organizationId: {
            userId: 'user-public-new-001',
            organizationId: 'org-demo-001',
          },
        },
        include: {
          roleAssignments: {
            include: {
              role: true,
            },
          },
        },
      });

      expect(membership?.roleAssignments.map((assignment) => assignment.role.key)).toEqual([]);
      await expect(
        prisma.organizationMembership.findUnique({
          where: {
            userId_organizationId: {
              userId: 'user-public-new-001',
              organizationId: 'org-public',
            },
          },
        })
      ).resolves.toBeNull();

      await expect(
        prisma.activityEvent.count({
          where: {
            action: 'ADD_USER_TO_ORGANIZATION',
            targetUserId: 'user-public-new-001',
            organizationId: 'org-demo-001',
          },
        })
      ).resolves.toBe(1);
    } finally {
      await cleanup();
    }
  });

  it('changes user roles to an empty administrator set through GraphQL', async () => {
    const { prisma, url, cleanup } = await listen();

    try {
      await prisma.membershipRoleAssignment.create({
        data: {
          id: 'assignment-acme-member-workspace-manager',
          membershipId: 'membership-acme-member',
          roleId: 'role-workspace-manager',
        },
      });

      const { payload } = await postGraphql(url, {
        query: `
          mutation ChangeUserRoles($input: ChangeUserRolesInput!) {
            changeUserRoles(input: $input) {
              success
              code
              message
            }
          }
        `,
        variables: {
          input: {
            actorUserId: 'user-tenant-admin',
            userId: 'user-tenant-member',
            organizationId: 'org-demo-001',
            roleIds: [],
          },
        },
      });

      expect(payload.errors).toBeUndefined();
      expect(payload.data.changeUserRoles).toEqual({
        success: true,
        code: 'OK',
        message: 'User roles were changed.',
      });

      await expect(
        prisma.membershipRoleAssignment.findMany({
          where: {
            membershipId: 'membership-acme-member',
          },
        })
      ).resolves.toEqual([]);

      await expect(
        prisma.activityEvent.count({
          where: {
            action: 'CHANGE_USER_ROLES',
            targetUserId: 'user-tenant-member',
            organizationId: 'org-demo-001',
            metadataJson: {
              contains: '"nextRoleKeys":[]',
            },
          },
        })
      ).resolves.toBe(1);
    } finally {
      await cleanup();
    }
  });

  it('queries platform organization users with combined platform and user-management roles', async () => {
    const { url, cleanup } = await listen();

    try {
      const { payload } = await postGraphql(url, {
        query: `
          query Users($input: UserListInput!) {
            users(input: $input) {
              totalElements
              items {
                email
                roles {
                  key
                  name
                }
              }
            }
          }
        `,
        variables: {
          input: {
            organizationId: 'org-platform-ops',
            pageSize: 10,
          },
        },
      });

      expect(payload.errors).toBeUndefined();
      expect(payload.data.users.totalElements).toBe(3);
      expect(payload.data.users.items).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            email: 'jordan.lee@platform-ops.example',
            roles: [{ key: 'platform_admin', name: 'Platform Administrator' }],
          }),
          expect.objectContaining({
            email: 'avery.chen@platform-ops.example',
            roles: [
              { key: 'platform_admin', name: 'Platform Administrator' },
              { key: 'public_user_admin', name: 'Public User Administrator' },
            ],
          }),
          expect.objectContaining({
            email: 'casey.nolan@platform-ops.example',
            roles: [
              { key: 'organization_admin', name: 'Organization Administrator' },
              { key: 'platform_admin', name: 'Platform Administrator' },
            ],
          }),
        ])
      );
    } finally {
      await cleanup();
    }
  });

  it('queries user detail within the requested organization scope', async () => {
    const { url, cleanup } = await listen();

    try {
      const { payload } = await postGraphql(url, {
        query: `
          query User($id: ID!, $organizationId: ID!) {
            user(id: $id, organizationId: $organizationId) {
              email
              memberships {
                organization {
                  name
                }
                roles {
                  key
                }
              }
            }
          }
        `,
        variables: {
          id: 'user-multi-tenant-admin',
          organizationId: 'org-demo-002',
        },
      });

      expect(payload.errors).toBeUndefined();
      expect(payload.data.user.memberships).toHaveLength(1);
      expect(payload.data.user.memberships[0].organization.name).toBe('Northstar Labs');
      expect(payload.data.user.memberships[0].roles).toEqual([{ key: 'organization_admin' }]);

      const { payload: outOfScopePayload } = await postGraphql(url, {
        query: `
          query User($id: ID!, $organizationId: ID!) {
            user(id: $id, organizationId: $organizationId) {
              email
            }
          }
        `,
        variables: {
          id: 'user-multi-tenant-admin',
          organizationId: 'org-demo-001',
        },
      });

      expect(outOfScopePayload.errors).toBeUndefined();
      expect(outOfScopePayload.data.user).toBeNull();
    } finally {
      await cleanup();
    }
  });

  it('filters activity logs by user and organization scope', async () => {
    const { url, cleanup } = await listen();

    try {
      const { payload } = await postGraphql(url, {
        query: `
          query ActivityLogs($input: ActivityLogListInput) {
            activityLogs(input: $input) {
              totalElements
              items {
                action
                organization {
                  id
                }
                target {
                  id
                }
              }
            }
          }
        `,
        variables: {
          input: {
            organizationId: 'org-demo-001',
            targetUserId: 'user-tenant-member',
            pageSize: 10,
          },
        },
      });

      expect(payload.errors).toBeUndefined();
      expect(payload.data.activityLogs.totalElements).toBe(2);
      expect(
        payload.data.activityLogs.items.every(
          (item: { organization: { id: string }; target: { id: string } }) =>
            item.organization.id === 'org-demo-001' && item.target.id === 'user-tenant-member'
        )
      ).toBe(true);
    } finally {
      await cleanup();
    }
  });
});
