import { randomInt } from 'crypto';
import { Prisma, PrismaClient } from '@prisma/client';
import { ORGANIZATION_IDS, ORGANIZATION_KINDS } from '../domain/adminConstants';

export const PUBLIC_USER_ORGANIZATION_ID = ORGANIZATION_IDS.public;
export const DEFAULT_PUBLIC_USER_COUNT = 10;
export const MAX_PUBLIC_USER_COUNT = 500;

const PUBLIC_USER_DOMAIN = 'public-signups.example';

const PUBLIC_USER_ORGANIZATION = {
  id: PUBLIC_USER_ORGANIZATION_ID,
  referenceId: 'org-ref-public',
  name: 'Public',
  kind: ORGANIZATION_KINDS.public,
  description:
    'Synthetic virtual organization for self-registered users without tenant membership.',
  address: 'Public Signup Pool',
  city: 'Remote',
  region: 'NA',
  postalCode: '00000',
  country: 'US',
  timezone: 'UTC',
  domainName: PUBLIC_USER_DOMAIN,
  status: 'active',
};

const FIRST_NAMES = [
  'Avery',
  'Blair',
  'Cameron',
  'Drew',
  'Emerson',
  'Finley',
  'Harper',
  'Jamie',
  'Kendall',
  'Logan',
  'Morgan',
  'Quinn',
  'Reese',
  'Skyler',
  'Taylor',
];

const LAST_NAMES = [
  'Adams',
  'Brooks',
  'Chen',
  'Diaz',
  'Ellis',
  'Foster',
  'Gray',
  'Hayes',
  'Irwin',
  'Jones',
  'Kim',
  'Lane',
  'Morris',
  'Nolan',
  'Owens',
];

export type GeneratePublicUsersOptions = {
  count?: number;
};

export type GeneratedPublicUser = {
  id: string;
  email: string;
  membershipId: string;
};

type PublicUserDraft = {
  user: Prisma.UserCreateInput;
  membership: Prisma.OrganizationMembershipUncheckedCreateInput;
};

export const parsePublicUserGenerationArgs = (
  args: string[]
): Required<GeneratePublicUsersOptions> => {
  let count = DEFAULT_PUBLIC_USER_COUNT;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg === '--') {
      continue;
    }

    if (arg === '--count' || arg === '-c') {
      const nextArg = args[index + 1];

      if (nextArg === undefined) {
        throw new Error('Expected a numeric value after --count.');
      }

      count = parseCount(nextArg);
      index += 1;
      continue;
    }

    if (arg.startsWith('--count=')) {
      count = parseCount(arg.slice('--count='.length));
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return { count };
};

export const generatePublicUsers = async (
  prisma: PrismaClient,
  options: GeneratePublicUsersOptions = {}
): Promise<GeneratedPublicUser[]> => {
  const count = validateCount(options.count ?? DEFAULT_PUBLIC_USER_COUNT);
  const now = new Date();

  return prisma.$transaction(async (transaction) => {
    await ensurePublicOrganization(transaction, now);

    const generatedUsers: GeneratedPublicUser[] = [];

    for (let index = 0; index < count; index += 1) {
      const draft = createPublicUserDraft(index, now);

      await transaction.user.create({ data: draft.user });
      await transaction.organizationMembership.create({ data: draft.membership });

      generatedUsers.push({
        id: draft.user.id,
        email: draft.user.email,
        membershipId: draft.membership.id,
      });
    }

    return generatedUsers;
  });
};

const ensurePublicOrganization = async (prisma: Prisma.TransactionClient, now: Date) => {
  await prisma.organization.upsert({
    where: { id: PUBLIC_USER_ORGANIZATION.id },
    update: {
      referenceId: PUBLIC_USER_ORGANIZATION.referenceId,
      name: PUBLIC_USER_ORGANIZATION.name,
      kind: PUBLIC_USER_ORGANIZATION.kind,
      description: PUBLIC_USER_ORGANIZATION.description,
      address: PUBLIC_USER_ORGANIZATION.address,
      city: PUBLIC_USER_ORGANIZATION.city,
      region: PUBLIC_USER_ORGANIZATION.region,
      postalCode: PUBLIC_USER_ORGANIZATION.postalCode,
      country: PUBLIC_USER_ORGANIZATION.country,
      timezone: PUBLIC_USER_ORGANIZATION.timezone,
      domainName: PUBLIC_USER_ORGANIZATION.domainName,
      status: PUBLIC_USER_ORGANIZATION.status,
      updatedAt: now,
    },
    create: {
      ...PUBLIC_USER_ORGANIZATION,
      createdAt: now,
      updatedAt: now,
    },
  });
};

const createPublicUserDraft = (index: number, now: Date): PublicUserDraft => {
  const firstName = pickRandom(FIRST_NAMES);
  const lastName = pickRandom(LAST_NAMES);
  const suffix = createPublicUserSuffix(index, now);
  const userId = `user-public-${suffix}`;
  const membershipId = `membership-public-${suffix}`;
  const createdAt = randomPastDate(now, 180);
  const accountStatus = randomInt(0, 5) === 0 ? 'Incomplete' : 'Active';
  const lastSignedIn =
    accountStatus === 'Active' && randomInt(0, 4) > 0 ? randomPastDate(now, 45) : null;

  return {
    user: {
      id: userId,
      email: `${slugify(firstName)}.${slugify(lastName)}.${suffix}@${PUBLIC_USER_DOMAIN}`,
      firstName,
      lastName,
      accountStatus,
      lastSignedIn,
      createdAt,
      updatedAt: lastSignedIn ?? createdAt,
    },
    membership: {
      id: membershipId,
      userId,
      organizationId: PUBLIC_USER_ORGANIZATION_ID,
      membershipStatus: 'active',
      createdAt,
      updatedAt: createdAt,
    },
  };
};

const createPublicUserSuffix = (index: number, now: Date) =>
  [
    now.getTime().toString(36),
    index.toString(36).padStart(2, '0'),
    randomInt(0, 36 ** 4)
      .toString(36)
      .padStart(4, '0'),
  ].join('-');

const pickRandom = <T>(values: readonly T[]) => values[randomInt(0, values.length)];

const randomPastDate = (now: Date, maxAgeDays: number) => {
  const maxAgeMs = maxAgeDays * 24 * 60 * 60 * 1000;
  return new Date(now.getTime() - randomInt(0, maxAgeMs));
};

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-');

const parseCount = (value: string) => validateCount(Number(value));

const validateCount = (count: number) => {
  if (!Number.isInteger(count) || count < 1 || count > MAX_PUBLIC_USER_COUNT) {
    throw new Error(`--count must be an integer between 1 and ${MAX_PUBLIC_USER_COUNT}.`);
  }

  return count;
};
