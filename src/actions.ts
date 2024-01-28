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

export const getServerBySlugWithCategories = async (serverSlug: string) => {
  return await prisma.server.findFirst({
    where: { slug: { equals: serverSlug } },
    include: { categories: true },
  });
};

export const getServerBySlugWithChannels = async (serverSlug: string) => {
  return await prisma.server.findFirst({
    where: { slug: { equals: serverSlug } },
    include: { channels: true },
  });
};
