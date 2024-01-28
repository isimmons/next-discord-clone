import { PrismaClient } from '@prisma/client';
import {
  servers,
  createChannels,
  getAllChannelIds,
  createMessages,
  createCategories,
} from './seedData';
import { empty } from '@prisma/client/runtime/library';

export const prisma = new PrismaClient();

const seed = async () => {
  console.log('🌱 Seeding...');
  console.time(`🌱 Database has been seeded`);

  console.time('🧹 Cleaned up the database...');
  await prisma.server.deleteMany();
  console.timeEnd('🧹 Cleaned up the database...');

  /* Create Servers */
  console.time('Creating servers...');
  await prisma.server
    .createMany({
      data: servers,
    })
    .catch((e) => {
      console.error('Error creating servers... ', e);
      return null;
    });
  console.timeEnd('Creating servers...');

  /* Create Categories */
  console.time('Creating categories...');
  await prisma.category
    .createMany({
      data: await createCategories(),
    })
    .catch((e) => {
      console.error('Error creating categories... ', e);
      return null;
    });
  console.timeEnd('Creating categories...');

  /* Create Channels */
  console.time('Creating channels...');
  await prisma.channel
    .createMany({
      data: await createChannels(),
    })
    .catch((e) => {
      console.error('Error creating channels... ', e);
      return null;
    });
  console.timeEnd('Creating channels...');

  /* Create Messages */
  console.time('Creating messages...');
  const channelIds = await getAllChannelIds();
  channelIds.forEach(async (cid) => {
    console.log(cid.id);
    await prisma.message
      .createMany({
        data: createMessages(cid.id),
      })
      .catch((e) => {
        console.error('Error creating messages... ', e);
        return null;
      });
  });
  console.timeEnd('Creating messages...');
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
