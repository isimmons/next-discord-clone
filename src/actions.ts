'use server';
import { Category, Channel, Server } from '@prisma/client';
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

type ServerBySlugOptions =
  | {
      with: 'categories' | 'channels';
    }
  | {
      with: Array<'categories' | 'channels'>;
    };

type ServerBySlugReturn = Promise<
  | ({
      channels: Array<Channel>;
    } & Server)
  | ({ categories: Array<Category> } & Server)
  | ({ channels: Array<Channel>; categories: Array<Category> } & Server)
  | Server
  | never[]
>;

export const getServerBySlug = async (
  serverSlug: string,
  options?: ServerBySlugOptions,
): Promise<ServerBySlugReturn> => {
  if (options && options.with === 'channels') {
    return (
      (await prisma.server.findFirst({
        where: { slug: { equals: serverSlug } },
        include: { channels: true },
      })) || []
    );
  } else if (options && options.with === 'categories') {
    return (
      (await prisma.server.findFirst({
        where: { slug: { equals: serverSlug } },
        include: { categories: true },
      })) || []
    );
  } else if (options && Array.isArray(options?.with)) {
    return (
      (await prisma.server.findFirst({
        where: { slug: { equals: serverSlug } },
        include: { channels: true, categories: true },
      })) || []
    );
  } else {
    return (
      (await prisma.server.findFirst({
        where: { slug: { equals: serverSlug } },
      })) || []
    );
  }
};
