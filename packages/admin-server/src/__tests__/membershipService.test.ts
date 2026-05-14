import { createTestDb } from '../testUtils/testDb';
import { createMembershipService } from '../modules/membership/membership.service';

const getRoleKeys = async (prisma: Awaited<ReturnType<typeof createTestDb>>['prisma']) => {
  const roles = await prisma.role.findMany({ orderBy: { key: 'asc' } });
  return roles.map((role) => role.key);
};

const findMembershipRoleKeys = async (
  prisma: Awaited<ReturnType<typeof createTestDb>>['prisma'],
  userId: string,
  organizationId: string
) => {
  const membership = await prisma.organizationMembership.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
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

  return membership?.roleAssignments.map((assignment) => assignment.role.key).sort() ?? [];
};

const findMembership = (
  prisma: Awaited<ReturnType<typeof createTestDb>>['prisma'],
  userId: string,
  organizationId: string
) =>
  prisma.organizationMembership.findUnique({
    where: {
      userId_organizationId: {
        userId,
        organizationId,
      },
    },
  });

describe('membership service transactions', () => {
  it('seeds only the allowed role keys and kind-compatible assignments', async () => {
    const { prisma, cleanup } = await createTestDb();

    try {
      await expect(getRoleKeys(prisma)).resolves.toEqual([
        'organization_admin',
        'platform_admin',
        'public_user_admin',
        'workspace_manager',
      ]);

      const memberships = await prisma.organizationMembership.findMany({
        include: {
          organization: true,
          roleAssignments: {
            include: {
              role: true,
            },
          },
        },
      });

      for (const membership of memberships) {
        const roleKeys = membership.roleAssignments.map((assignment) => assignment.role.key);

        if (membership.organization.kind === 'internal') {
          expect(
            roleKeys.every((roleKey) =>
              ['organization_admin', 'platform_admin', 'public_user_admin'].includes(roleKey)
            )
          ).toBe(true);
        }

        if (membership.organization.kind === 'tenant') {
          expect(
            roleKeys.every((roleKey) =>
              ['organization_admin', 'workspace_manager'].includes(roleKey)
            )
          ).toBe(true);
        }

        if (membership.organization.kind === 'public') {
          expect(roleKeys).toEqual([]);
        }
      }
    } finally {
      await cleanup();
    }
  });

  it('adds a public user by email to a tenant organization and removes Public membership', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      await expect(
        service.addUserToOrganizationByEmail({
          actorUserId: 'user-tenant-admin',
          email: ' ALEX.KIM@PUBLIC-SIGNUPS.EXAMPLE ',
          organizationId: 'org-demo-001',
        })
      ).resolves.toMatchObject({
        success: true,
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-public-new-001', 'org-demo-001')
      ).resolves.toEqual([]);
      await expect(findMembership(prisma, 'user-public-new-001', 'org-public')).resolves.toBeNull();
      await expect(
        prisma.user.findUnique({
          where: { id: 'user-public-new-001' },
          select: { flaggedForDeletion: true },
        })
      ).resolves.toEqual({ flaggedForDeletion: false });
    } finally {
      await cleanup();
    }
  });

  it('clears flaggedForDeletion when a flagged Public user is added by email to a tenant organization', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      await expect(
        service.addUserToOrganizationByEmail({
          actorUserId: 'user-tenant-admin',
          email: 'morgan.gray@public-signups.example',
          organizationId: 'org-demo-001',
        })
      ).resolves.toMatchObject({
        success: true,
      });

      await expect(
        findMembership(prisma, 'user-public-flagged-001', 'org-public')
      ).resolves.toBeNull();
      await expect(
        prisma.user.findUnique({
          where: { id: 'user-public-flagged-001' },
          select: { flaggedForDeletion: true },
        })
      ).resolves.toEqual({ flaggedForDeletion: false });
    } finally {
      await cleanup();
    }
  });

  it('adds a user by email to an internal organization with the platform admin role', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      await expect(
        service.addUserToOrganizationByEmail({
          actorUserId: 'user-platform-lead',
          email: 'sam.rivera@acme-cloud.example',
          organizationId: 'org-platform-ops',
        })
      ).resolves.toMatchObject({
        success: true,
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-tenant-member', 'org-platform-ops')
      ).resolves.toEqual(['platform_admin']);
    } finally {
      await cleanup();
    }
  });

  it('rejects duplicate memberships when adding by email without removing Public membership', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      await prisma.organizationMembership.create({
        data: {
          id: 'membership-public-new-001-acme',
          userId: 'user-public-new-001',
          organizationId: 'org-demo-001',
          membershipStatus: 'active',
        },
      });

      const beforeCount = await prisma.activityEvent.count();

      await expect(
        service.addUserToOrganizationByEmail({
          actorUserId: 'user-tenant-admin',
          email: 'alex.kim@public-signups.example',
          organizationId: 'org-demo-001',
        })
      ).rejects.toMatchObject({
        code: 'DUPLICATE_MEMBERSHIP',
      });

      await expect(prisma.activityEvent.count()).resolves.toBe(beforeCount);
      await expect(
        findMembership(prisma, 'user-public-new-001', 'org-public')
      ).resolves.toMatchObject({
        id: 'membership-public-new-001',
      });
    } finally {
      await cleanup();
    }
  });

  it('rejects unknown email when adding by email', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      const beforeCount = await prisma.activityEvent.count();

      await expect(
        service.addUserToOrganizationByEmail({
          actorUserId: 'user-tenant-admin',
          email: 'missing.user@example.com',
          organizationId: 'org-demo-001',
        })
      ).rejects.toMatchObject({
        code: 'USER_NOT_FOUND_BY_EMAIL',
      });

      await expect(prisma.activityEvent.count()).resolves.toBe(beforeCount);
      await expect(
        prisma.organizationMembership.count({ where: { organizationId: 'org-public' } })
      ).resolves.toBe(4);
    } finally {
      await cleanup();
    }
  });

  it('rejects Public as an add-by-email target without removing Public membership', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      const beforeCount = await prisma.activityEvent.count();

      await expect(
        service.addUserToOrganizationByEmail({
          actorUserId: 'user-platform-public-admin',
          email: 'alex.kim@public-signups.example',
          organizationId: 'org-public',
        })
      ).rejects.toMatchObject({
        code: 'PUBLIC_TARGET_UNSUPPORTED',
      });

      await expect(prisma.activityEvent.count()).resolves.toBe(beforeCount);
      await expect(
        findMembership(prisma, 'user-public-new-001', 'org-public')
      ).resolves.toMatchObject({
        id: 'membership-public-new-001',
      });
    } finally {
      await cleanup();
    }
  });

  it('adds a public user by email to a tenant organization and writes activity in one transaction', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      await expect(
        service.addUserToOrganizationByEmail({
          actorUserId: 'user-tenant-admin',
          email: 'jamie.ross@public-signups.example',
          organizationId: 'org-demo-001',
        })
      ).resolves.toMatchObject({
        success: true,
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-public-new-002', 'org-demo-001')
      ).resolves.toEqual([]);
      await expect(findMembership(prisma, 'user-public-new-002', 'org-public')).resolves.toBeNull();

      const activity = await prisma.activityEvent.findFirst({
        where: {
          action: 'ADD_USER_TO_ORGANIZATION',
          targetUserId: 'user-public-new-002',
          organizationId: 'org-demo-001',
        },
      });

      expect(activity?.metadataJson).toContain('"nextRoleKeys":[]');
    } finally {
      await cleanup();
    }
  });

  it('replaces tenant roles and writes role change metadata', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      await expect(
        service.changeUserRoles({
          actorUserId: 'user-tenant-admin',
          userId: 'user-tenant-member',
          organizationId: 'org-demo-001',
          roleIds: ['role-organization-admin', 'role-workspace-manager'],
        })
      ).resolves.toMatchObject({
        success: true,
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-tenant-member', 'org-demo-001')
      ).resolves.toEqual(['organization_admin', 'workspace_manager']);

      const activity = await prisma.activityEvent.findFirst({
        where: {
          action: 'CHANGE_USER_ROLES',
          targetUserId: 'user-tenant-member',
          organizationId: 'org-demo-001',
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      expect(activity?.metadataJson).toContain('previousRoleKeys');
      expect(activity?.metadataJson).toContain('nextRoleKeys');
    } finally {
      await cleanup();
    }
  });

  it('adds organization_admin without replacing existing membership roles', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      await expect(
        service.updateOrganizationAdmins({
          actorUserId: 'user-tenant-admin',
          organizationId: 'org-demo-001',
          addUserIds: ['user-acme-workspace-manager'],
          removeUserIds: [],
        })
      ).resolves.toMatchObject({
        success: true,
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-acme-workspace-manager', 'org-demo-001')
      ).resolves.toEqual(['organization_admin', 'workspace_manager']);

      const activity = await prisma.activityEvent.findFirst({
        where: {
          action: 'ADD_ORGANIZATION_ADMIN',
          targetUserId: 'user-acme-workspace-manager',
          organizationId: 'org-demo-001',
        },
      });

      expect(activity?.metadataJson).toContain('"roleKey":"organization_admin"');
      expect(activity?.metadataJson).toContain('"operation":"add"');
    } finally {
      await cleanup();
    }
  });

  it('removes organization_admin without removing membership or other roles', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      await prisma.membershipRoleAssignment.create({
        data: {
          id: 'assignment-acme-workspace-manager-org-admin',
          membershipId: 'membership-acme-workspace-manager',
          roleId: 'role-organization-admin',
        },
      });

      await expect(
        service.updateOrganizationAdmins({
          actorUserId: 'user-tenant-admin',
          organizationId: 'org-demo-001',
          addUserIds: [],
          removeUserIds: ['user-acme-workspace-manager'],
        })
      ).resolves.toMatchObject({
        success: true,
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-acme-workspace-manager', 'org-demo-001')
      ).resolves.toEqual(['workspace_manager']);
      await expect(
        findMembership(prisma, 'user-acme-workspace-manager', 'org-demo-001')
      ).resolves.toMatchObject({
        id: 'membership-acme-workspace-manager',
      });

      const activity = await prisma.activityEvent.findFirst({
        where: {
          action: 'REMOVE_ORGANIZATION_ADMIN',
          targetUserId: 'user-acme-workspace-manager',
          organizationId: 'org-demo-001',
        },
      });

      expect(activity?.metadataJson).toContain('"roleKey":"organization_admin"');
      expect(activity?.metadataJson).toContain('"operation":"remove"');
    } finally {
      await cleanup();
    }
  });

  it('does not write activity for no-op organization admin updates', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      const beforeActivityCount = await prisma.activityEvent.count({
        where: {
          action: 'ADD_ORGANIZATION_ADMIN',
          targetUserId: 'user-tenant-admin',
          organizationId: 'org-demo-001',
        },
      });

      await expect(
        service.updateOrganizationAdmins({
          actorUserId: 'user-platform-lead',
          organizationId: 'org-demo-001',
          addUserIds: ['user-tenant-admin'],
          removeUserIds: [],
        })
      ).resolves.toMatchObject({
        success: true,
      });

      await expect(
        prisma.activityEvent.count({
          where: {
            action: 'ADD_ORGANIZATION_ADMIN',
            targetUserId: 'user-tenant-admin',
            organizationId: 'org-demo-001',
          },
        })
      ).resolves.toBe(beforeActivityCount);
    } finally {
      await cleanup();
    }
  });

  it('rejects organization admin updates for users outside the organization', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      const beforeActivityCount = await prisma.activityEvent.count();

      await expect(
        service.updateOrganizationAdmins({
          actorUserId: 'user-tenant-admin',
          organizationId: 'org-demo-001',
          addUserIds: ['user-vertex-member'],
          removeUserIds: [],
        })
      ).rejects.toMatchObject({
        code: 'MEMBERSHIP_NOT_FOUND',
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-vertex-member', 'org-demo-003')
      ).resolves.toEqual([]);
      await expect(prisma.activityEvent.count()).resolves.toBe(beforeActivityCount);
    } finally {
      await cleanup();
    }
  });

  it('rejects organization admin updates for public organizations', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      const beforeActivityCount = await prisma.activityEvent.count();

      await expect(
        service.updateOrganizationAdmins({
          actorUserId: 'user-platform-public-admin',
          organizationId: 'org-public',
          addUserIds: ['user-public-new-001'],
          removeUserIds: [],
        })
      ).rejects.toMatchObject({
        code: 'PUBLIC_ORGANIZATION_ADMIN_UNSUPPORTED',
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-public-new-001', 'org-public')
      ).resolves.toEqual([]);
      await expect(prisma.activityEvent.count()).resolves.toBe(beforeActivityCount);
    } finally {
      await cleanup();
    }
  });

  it('rejects adding and removing the same organization admin in one request', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      const beforeActivityCount = await prisma.activityEvent.count();

      await expect(
        service.updateOrganizationAdmins({
          actorUserId: 'user-tenant-admin',
          organizationId: 'org-demo-001',
          addUserIds: ['user-tenant-member'],
          removeUserIds: ['user-tenant-member'],
        })
      ).rejects.toMatchObject({
        code: 'ORG_ADMIN_UPDATE_CONFLICT',
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-tenant-member', 'org-demo-001')
      ).resolves.toEqual([]);
      await expect(prisma.activityEvent.count()).resolves.toBe(beforeActivityCount);
    } finally {
      await cleanup();
    }
  });

  it('rejects removing the actor own organization_admin role without writing activity', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      const beforeActivityCount = await prisma.activityEvent.count();

      await expect(
        service.updateOrganizationAdmins({
          actorUserId: 'user-tenant-admin',
          organizationId: 'org-demo-001',
          addUserIds: [],
          removeUserIds: ['user-tenant-admin'],
        })
      ).rejects.toMatchObject({
        code: 'SELF_ORGANIZATION_ADMIN_ROLE_REQUIRED',
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-tenant-admin', 'org-demo-001')
      ).resolves.toEqual(['organization_admin']);
      await expect(prisma.activityEvent.count()).resolves.toBe(beforeActivityCount);
    } finally {
      await cleanup();
    }
  });

  it('allows workspace_manager in a tenant organization', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      await expect(
        service.changeUserRoles({
          actorUserId: 'user-tenant-admin',
          userId: 'user-tenant-member',
          organizationId: 'org-demo-001',
          roleIds: ['role-workspace-manager'],
        })
      ).resolves.toMatchObject({
        success: true,
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-tenant-member', 'org-demo-001')
      ).resolves.toEqual(['workspace_manager']);
    } finally {
      await cleanup();
    }
  });

  it('accepts empty roleIds when removing all tenant admin roles', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      await service.changeUserRoles({
        actorUserId: 'user-tenant-admin',
        userId: 'user-tenant-member',
        organizationId: 'org-demo-001',
        roleIds: ['role-workspace-manager'],
      });

      await expect(
        service.changeUserRoles({
          actorUserId: 'user-tenant-admin',
          userId: 'user-tenant-member',
          organizationId: 'org-demo-001',
          roleIds: [],
        })
      ).resolves.toMatchObject({
        success: true,
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-tenant-member', 'org-demo-001')
      ).resolves.toEqual([]);

      const activity = await prisma.activityEvent.findFirst({
        where: {
          action: 'CHANGE_USER_ROLES',
          targetUserId: 'user-tenant-member',
          organizationId: 'org-demo-001',
          metadataJson: {
            contains: '"nextRoleKeys":[]',
          },
        },
      });

      expect(activity?.metadataJson).toContain('"previousRoleKeys":["workspace_manager"]');
      expect(activity?.metadataJson).toContain('"nextRoleKeys":[]');
    } finally {
      await cleanup();
    }
  });

  it('rolls back role changes and activity when a role id is missing', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      const beforeActivityCount = await prisma.activityEvent.count({
        where: {
          action: 'CHANGE_USER_ROLES',
          targetUserId: 'user-tenant-member',
          organizationId: 'org-demo-001',
        },
      });

      await expect(
        service.changeUserRoles({
          actorUserId: 'user-tenant-admin',
          userId: 'user-tenant-member',
          organizationId: 'org-demo-001',
          roleIds: ['missing-role'],
        })
      ).rejects.toMatchObject({
        code: 'ROLE_NOT_FOUND',
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-tenant-member', 'org-demo-001')
      ).resolves.toEqual([]);

      await expect(
        prisma.activityEvent.count({
          where: {
            action: 'CHANGE_USER_ROLES',
            targetUserId: 'user-tenant-member',
            organizationId: 'org-demo-001',
          },
        })
      ).resolves.toBe(beforeActivityCount);
    } finally {
      await cleanup();
    }
  });

  it('rejects platform_admin in a tenant organization without writing activity', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      const beforeActivityCount = await prisma.activityEvent.count();

      await expect(
        service.changeUserRoles({
          actorUserId: 'user-tenant-admin',
          userId: 'user-tenant-member',
          organizationId: 'org-demo-001',
          roleIds: ['role-platform-admin'],
        })
      ).rejects.toMatchObject({
        code: 'ROLE_ORGANIZATION_KIND_MISMATCH',
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-tenant-member', 'org-demo-001')
      ).resolves.toEqual([]);
      await expect(prisma.activityEvent.count()).resolves.toBe(beforeActivityCount);
    } finally {
      await cleanup();
    }
  });

  it('rejects workspace_manager in an internal organization without writing activity', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      const beforeActivityCount = await prisma.activityEvent.count();

      await expect(
        service.changeUserRoles({
          actorUserId: 'user-platform-lead',
          userId: 'user-platform-support',
          organizationId: 'org-platform-ops',
          roleIds: ['role-workspace-manager'],
        })
      ).rejects.toMatchObject({
        code: 'ROLE_ORGANIZATION_KIND_MISMATCH',
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-platform-support', 'org-platform-ops')
      ).resolves.toEqual(['platform_admin']);
      await expect(prisma.activityEvent.count()).resolves.toBe(beforeActivityCount);
    } finally {
      await cleanup();
    }
  });

  it('rejects workspace_manager in a public organization without writing activity', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      const beforeActivityCount = await prisma.activityEvent.count();

      await expect(
        service.changeUserRoles({
          actorUserId: 'user-platform-public-admin',
          userId: 'user-public-new-001',
          organizationId: 'org-public',
          roleIds: ['role-workspace-manager'],
        })
      ).rejects.toMatchObject({
        code: 'ROLE_ORGANIZATION_KIND_MISMATCH',
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-public-new-001', 'org-public')
      ).resolves.toEqual([]);
      await expect(prisma.activityEvent.count()).resolves.toBe(beforeActivityCount);
    } finally {
      await cleanup();
    }
  });

  it('rejects public_user_admin in a tenant organization without writing activity', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      const beforeActivityCount = await prisma.activityEvent.count();

      await expect(
        service.changeUserRoles({
          actorUserId: 'user-tenant-admin',
          userId: 'user-tenant-member',
          organizationId: 'org-demo-001',
          roleIds: ['role-public-user-admin'],
        })
      ).rejects.toMatchObject({
        code: 'ROLE_ORGANIZATION_KIND_MISMATCH',
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-tenant-member', 'org-demo-001')
      ).resolves.toEqual([]);
      await expect(prisma.activityEvent.count()).resolves.toBe(beforeActivityCount);
    } finally {
      await cleanup();
    }
  });

  it('allows platform_admin and organization_admin together in an internal organization', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      await expect(
        service.changeUserRoles({
          actorUserId: 'user-platform-lead',
          userId: 'user-platform-support',
          organizationId: 'org-platform-ops',
          roleIds: ['role-platform-admin', 'role-organization-admin'],
        })
      ).resolves.toMatchObject({
        success: true,
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-platform-support', 'org-platform-ops')
      ).resolves.toEqual(['organization_admin', 'platform_admin']);
    } finally {
      await cleanup();
    }
  });

  it('removes one tenant membership without changing Public or deletion flag when another tenant remains', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      await expect(
        service.removeUserFromOrganization({
          actorUserId: 'user-platform-lead',
          userId: 'user-multi-tenant-admin',
          organizationId: 'org-demo-003',
        })
      ).resolves.toMatchObject({
        success: true,
      });

      await expect(
        findMembership(prisma, 'user-multi-tenant-admin', 'org-demo-003')
      ).resolves.toBeNull();
      await expect(
        findMembership(prisma, 'user-multi-tenant-admin', 'org-demo-002')
      ).resolves.toMatchObject({
        id: 'membership-northstar-admin',
      });
      await expect(
        findMembership(prisma, 'user-multi-tenant-admin', 'org-public')
      ).resolves.toBeNull();
      await expect(
        prisma.user.findUnique({
          where: { id: 'user-multi-tenant-admin' },
          select: { flaggedForDeletion: true },
        })
      ).resolves.toEqual({ flaggedForDeletion: false });
    } finally {
      await cleanup();
    }
  });

  it('falls back to Public membership and flags the user after removing the last tenant membership', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      await expect(
        service.removeUserFromOrganization({
          actorUserId: 'user-tenant-admin',
          userId: 'user-tenant-member',
          organizationId: 'org-demo-001',
        })
      ).resolves.toMatchObject({
        success: true,
      });

      await expect(findMembership(prisma, 'user-tenant-member', 'org-demo-001')).resolves.toBeNull();
      await expect(findMembership(prisma, 'user-tenant-member', 'org-public')).resolves.toMatchObject(
        {
          userId: 'user-tenant-member',
          organizationId: 'org-public',
        }
      );
      await expect(
        prisma.user.findUnique({
          where: { id: 'user-tenant-member' },
          select: { flaggedForDeletion: true },
        })
      ).resolves.toEqual({ flaggedForDeletion: true });
    } finally {
      await cleanup();
    }
  });

  it('rejects removing Public, self, or missing memberships without writing activity', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      const beforeActivityCount = await prisma.activityEvent.count();

      await expect(
        service.removeUserFromOrganization({
          actorUserId: 'user-platform-public-admin',
          userId: 'user-public-new-001',
          organizationId: 'org-public',
        })
      ).rejects.toMatchObject({
        code: 'PUBLIC_MEMBERSHIP_REMOVE_UNSUPPORTED',
      });

      await expect(
        service.removeUserFromOrganization({
          actorUserId: 'user-tenant-admin',
          userId: 'user-tenant-admin',
          organizationId: 'org-demo-001',
        })
      ).rejects.toMatchObject({
        code: 'SELF_MEMBERSHIP_REMOVE_UNSUPPORTED',
      });

      await expect(
        service.removeUserFromOrganization({
          actorUserId: 'user-tenant-admin',
          userId: 'user-tenant-member',
          organizationId: 'org-demo-002',
        })
      ).rejects.toMatchObject({
        code: 'MEMBERSHIP_NOT_FOUND',
      });

      await expect(prisma.activityEvent.count()).resolves.toBe(beforeActivityCount);
      await expect(
        findMembership(prisma, 'user-public-new-001', 'org-public')
      ).resolves.toMatchObject({
        id: 'membership-public-new-001',
      });
      await expect(findMembership(prisma, 'user-tenant-admin', 'org-demo-001')).resolves.toMatchObject(
        {
          id: 'membership-acme-admin',
        }
      );
    } finally {
      await cleanup();
    }
  });

  it('rejects removing the actor own organization_admin role without writing activity', async () => {
    const { prisma, cleanup } = await createTestDb();
    const service = createMembershipService(prisma);

    try {
      const beforeActivityCount = await prisma.activityEvent.count();

      await expect(
        service.changeUserRoles({
          actorUserId: 'user-tenant-admin',
          userId: 'user-tenant-admin',
          organizationId: 'org-demo-001',
          roleIds: [],
        })
      ).rejects.toMatchObject({
        code: 'SELF_ORGANIZATION_ADMIN_ROLE_REQUIRED',
      });

      await expect(
        findMembershipRoleKeys(prisma, 'user-tenant-admin', 'org-demo-001')
      ).resolves.toEqual(['organization_admin']);
      await expect(prisma.activityEvent.count()).resolves.toBe(beforeActivityCount);
    } finally {
      await cleanup();
    }
  });
});
