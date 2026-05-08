import { createPrismaClient } from '../src/db/client';
import { seedDatabase } from '../src/seed/seedDatabase';

const prisma = createPrismaClient();

seedDatabase(prisma)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
