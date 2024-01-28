'use server';

import prisma from '~/db';

export const getServers = async () => {
  try {
    return await prisma.server.findMany({
      select: {
        id: true,
        slug: true,
        img: true,
        label: true,
        channels: {
          where: { slug: { equals: 'welcome' } },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const getServerBySlug = async (
  serverSlug: string,
  channelSlug: string,
) => {
  return await prisma.server.findFirst({
    where: { slug: { equals: serverSlug } },
    include: {
      categories: true,
      channels: {
        where: { slug: { equals: channelSlug } },
        include: { messages: true },
      },
    },
  });
};

export const getChannelsByCategoryId = async (cid: number) => {
  return prisma.channel.findMany({
    where: { categoryId: { equals: cid } },
  });
};

export const getCategoriesByServerId = async (sid: number | undefined) => {
  return prisma.category.findMany({
    where: { serverId: { equals: sid } },
  });
};
