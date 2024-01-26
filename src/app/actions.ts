'use server';
import prisma from '~/db';
import { type Server, type Channel } from '@prisma/client';
export const getServers = async () => {
  try {
    return await prisma.server.findMany();
  } catch (error) {
    console.error(error);
  }
};

export const getChannels = async (servers: Array<Server> | undefined) => {
  let channels: Array<Channel> = [];

  servers?.forEach(async (server) => {
    try {
      const c = await prisma.channel.findMany({
        where: { serverId: { equals: server.id } },
      });

      channels = [...channels, ...c];
    } catch (error) {
      console.error(error);
    }
  });
  return channels;
};
