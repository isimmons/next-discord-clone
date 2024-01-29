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

export const getServerBySlug = async (serverSlug: string) => {
  return await prisma.server.findFirst({
    where: { slug: { equals: serverSlug } },
    include: {
      categories: true,
    },
  });
};

export const getChannelBySlugByServerId = async (
  channelSlug: string,
  sid: number | undefined,
) => {
  return await prisma.channel.findFirst({
    where: { slug: { equals: channelSlug }, serverId: { equals: sid } },
    include: { messages: true },
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
