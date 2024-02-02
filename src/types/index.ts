import type { Server, Category, Channel } from '@prisma/client';

export type ServerWithCategoriesWithChannels =
  | ({
      categories: Array<
        {
          channels: Array<Channel>;
        } & Category
      >;
    } & Server)
  | undefined;

export type CategoryWithChannels = {
  channels: Array<Channel>;
} & Category;
