import fs from 'fs';
import os from 'os';
import path from 'path';
import { PrismaClient } from '@prisma/client';
import { createPrismaClient } from '../db/client';
import { seedDatabase } from '../seed/seedDatabase';

type TestDb = {
  prisma: PrismaClient;
  cleanup: () => Promise<void>;
};

const migrationsPath = path.resolve(__dirname, '../../prisma/migrations');

const loadMigrationStatements = () =>
  fs
    .readdirSync(migrationsPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort()
    .flatMap((migrationName) =>
      fs
        .readFileSync(path.join(migrationsPath, migrationName, 'migration.sql'), 'utf8')
        .split(';')
        .map((statement) => statement.trim())
        .filter(Boolean)
    );

export const createTestDb = async (): Promise<TestDb> => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'admin-server-test-'));
  const databasePath = path.join(directory, 'test.db');
  const prisma = createPrismaClient(`file:${databasePath}`);

  for (const statement of loadMigrationStatements()) {
    await prisma.$executeRawUnsafe(statement);
  }

  await seedDatabase(prisma);

  return {
    prisma,
    cleanup: async () => {
      await prisma.$disconnect();
      fs.rmSync(directory, { recursive: true, force: true });
    },
  };
};
