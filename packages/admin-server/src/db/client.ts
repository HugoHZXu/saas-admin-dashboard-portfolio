import path from 'path';
import { PrismaClient } from '@prisma/client';

const DEFAULT_DATABASE_URL = `file:${path.resolve(__dirname, '../../prisma/dev.db')}`;

export const getDatabaseUrl = () => process.env.DATABASE_URL ?? DEFAULT_DATABASE_URL;

export const createPrismaClient = (databaseUrl = getDatabaseUrl()) =>
  new PrismaClient({
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  });

export const prisma = createPrismaClient();
