import { PrismaClient } from '@prisma/client';
import {
  seedActivityEvents,
  seedMemberships,
  seedOrganizations,
  seedRoleAssignments,
  seedRoles,
  seedUsers,
} from './seedData';

export const seedDatabase = async (prisma: PrismaClient) => {
  await prisma.activityEvent.deleteMany();
  await prisma.membershipRoleAssignment.deleteMany();
  await prisma.organizationMembership.deleteMany();
  await prisma.role.deleteMany();
  await prisma.organization.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.createMany({ data: seedUsers });
  await prisma.organization.createMany({ data: seedOrganizations });
  await prisma.role.createMany({ data: seedRoles });
  await prisma.organizationMembership.createMany({ data: seedMemberships });
  await prisma.membershipRoleAssignment.createMany({ data: seedRoleAssignments });
  await prisma.activityEvent.createMany({ data: seedActivityEvents });
};
