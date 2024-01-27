'use server';
import prisma from '~/db';
import { type Server, type Channel, Prisma } from '@prisma/client';
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

export const getChannels = async (servers: Array<Server> | undefined) => {
  let channels: Array<Channel> = [];

  servers?.forEach(async (server) => {
    const c = await prisma.channel.findMany({
      where: { serverId: { equals: server.id } },
    });
    channels = [...c, ...channels];
  });
};
