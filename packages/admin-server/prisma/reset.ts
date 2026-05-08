import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { createPrismaClient, getDatabaseUrl } from '../src/db/client';
import { seedDatabase } from '../src/seed/seedDatabase';

const adminServerRoot = path.resolve(__dirname, '..');
const prismaRoot = path.join(adminServerRoot, 'prisma');
const prismaCommand = process.platform === 'win32' ? 'prisma.cmd' : 'prisma';

const ensureSqliteDatabaseFile = (databaseUrl: string) => {
  if (!databaseUrl.startsWith('file:')) {
    return;
  }

  const rawDatabasePath = databaseUrl.slice('file:'.length).split('?')[0];
  const databasePath = path.isAbsolute(rawDatabasePath)
    ? rawDatabasePath
    : path.resolve(prismaRoot, rawDatabasePath);

  fs.mkdirSync(path.dirname(databasePath), { recursive: true });
  fs.closeSync(fs.openSync(databasePath, 'a'));
};

const runPrismaMigrateReset = (databaseUrl: string) =>
  new Promise<void>((resolve, reject) => {
    const childProcess = spawn(
      prismaCommand,
      ['migrate', 'reset', '--force', '--skip-seed', '--skip-generate'],
      {
        cwd: adminServerRoot,
        env: {
          ...process.env,
          DATABASE_URL: databaseUrl,
        },
        stdio: 'inherit',
      }
    );

    childProcess.on('error', reject);
    childProcess.on('exit', (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          signal
            ? `Prisma migrate reset was terminated by ${signal}.`
            : `Prisma migrate reset exited with code ${code ?? 'unknown'}.`
        )
      );
    });
  });

const resetAndSeedDatabase = async () => {
  const databaseUrl = getDatabaseUrl();

  ensureSqliteDatabaseFile(databaseUrl);
  await runPrismaMigrateReset(databaseUrl);

  const prisma = createPrismaClient(databaseUrl);

  try {
    await seedDatabase(prisma);
  } finally {
    await prisma.$disconnect();
  }
};

resetAndSeedDatabase().catch((error) => {
  console.error(error);
  process.exit(1);
});
