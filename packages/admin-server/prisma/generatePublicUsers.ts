import { createPrismaClient } from '../src/db/client';
import {
  generatePublicUsers,
  parsePublicUserGenerationArgs,
  PUBLIC_USER_ORGANIZATION_ID,
} from '../src/seed/publicUserGeneration';

const prisma = createPrismaClient();

const runPublicUserGeneration = async () => {
  const options = parsePublicUserGenerationArgs(process.argv.slice(2));
  const generatedUsers = await generatePublicUsers(prisma, options);

  console.log(`Generated ${generatedUsers.length} public users in ${PUBLIC_USER_ORGANIZATION_ID}:`);

  for (const user of generatedUsers) {
    console.log(user.email);
  }
};

runPublicUserGeneration()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
