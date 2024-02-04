import { prisma } from './seed';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';

export const createMessages = (channelId: number) => {
  return [...Array(faker.number.int({ min: 7, max: 25 }))]
    .map(() => {
      let user = faker.internet.userName();
      let avatarUrl = `/avatars/${faker.number.int({
        min: 0,
        max: 25,
      })}.jpg`;

      return [...Array(faker.number.int({ min: 1, max: 4 }))].map(() => ({
        user,
        avatarUrl,
        text: faker.lorem.sentences(3),
        createdAt: new Date(faker.date.past()),
        channelId,
      }));
    })
    .flat();
};

export const getAllChannelIds = async () => {
  const channelIds = await prisma.channel.findMany({
    select: { id: true },
  });

  return channelIds;
};

export const getServerId = async (slug: string) => {
  const res = await prisma.server.findFirst({
    select: { id: true },
    where: { slug },
  });

  return res?.id;
};

// categories made at this time. Need to get category.serverId too so we don't have duplicates
// which results in missing records. Like no channels for next-js community category because
// this function returned the first category matching the slug whish is the one for tailwind-css

export const getCategoryId = async (
  serverSlug: string,
  categorySlug: string,
) => {
  const sid = await getServerId(serverSlug);

  const res = await prisma.category.findFirst({
    select: { id: true },
    where: { AND: { slug: categorySlug, serverId: { equals: sid } } },
  });

  return res?.id;
};

export const servers = [
  {
    label: 'Tailwind CSS',
    img: 'tailwind.png',
    slug: 'tailwind-css',
  },
  {
    label: 'Next.js',
    img: 'next.png',
    slug: 'next-js',
  },
  {
    label: 'Mirage JS',
    img: 'mirage.png',
    slug: 'mirage-js',
  },
];

export const createCategories = async () => {
  return [
    // tailwind categories
    {
      label: 'Default Category',
      slug: 'default-category',
      serverId: await getServerId('tailwind-css'),
    },
    {
      label: 'Tailwind CSS',
      slug: 'tailwind-css',
      serverId: await getServerId('tailwind-css'),
    },
    {
      label: 'Tailwind Labs',
      slug: 'tailwind-labs',
      serverId: await getServerId('tailwind-css'),
    },
    {
      label: 'Off Topic',
      slug: 'off-topic',
      serverId: await getServerId('tailwind-css'),
    },
    {
      label: 'Community',
      slug: 'community',
      serverId: await getServerId('tailwind-css'),
    },
    // nextjs categories
    {
      label: 'Default Category',
      slug: 'default-category',
      serverId: await getServerId('next-js'),
    },

    {
      label: 'Need Help',
      slug: 'need-help',
      serverId: await getServerId('next-js'),
    },
    {
      label: 'Community',
      slug: 'community',
      serverId: await getServerId('next-js'),
    },
    // miragejs categories
    {
      label: 'Default Category',
      slug: 'default-category',
      serverId: await getServerId('mirage-js'),
    },
    {
      label: 'Text Channels',
      slug: 'text-channels',
      serverId: await getServerId('mirage-js'),
    },
  ];
};

export const createChannels = async () => {
  return [
    // tailwindcss channels
    {
      label: 'welcome',
      slug: 'welcome',
      description: 'Introduction to the Tailwind CSS framework and community.',
      icon: 'book',
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'default-category'),
    },
    {
      label: 'announcements',
      slug: 'announcements',
      description: 'announcements about Tailwindcss.',
      icon: 'speaker-phone',
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'default-category'),
    },
    {
      label: 'general',
      slug: 'general',
      description:
        'General discussion of Tailwind CSS (please move off-topic discussion in the off-topic channels).',
      unread: true,
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'tailwind-css'),
    },
    {
      label: 'plugins',
      slug: 'plugins',
      description: 'Tailwind CSS plugins.',
      unread: true,
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'tailwind-css'),
    },
    {
      label: 'help',
      slug: 'help',
      description: 'Help with Tailwind CSS and build process integration.',
      unread: true,
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'tailwind-css'),
    },
    {
      label: 'internals',
      slug: 'internals',
      description: 'Development of the Tailwind CSS framework itself.',
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'tailwind-css'),
    },
    {
      label: 'tailwind-ui',
      slug: 'tailwind-ui',
      description: 'General discussion of Tailwind UI.',
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'tailwind-labs'),
    },
    {
      label: 'headless-ui',
      slug: 'headless-ui',
      description: 'General discussion of Headless UI.',
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'tailwind-labs'),
    },
    {
      label: 'refactoring-ui',
      slug: 'refactoring-ui',
      description: 'General discussion of Refactoring UI.',
      unread: true,
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'tailwind-labs'),
    },
    {
      label: 'heroicons',
      slug: 'heroicons',
      description: 'General discussion of Heroicons.',
      unread: true,
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'tailwind-labs'),
    },
    {
      label: 'design',
      slug: 'design',
      description: 'General discussion of web design.',
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'off-topic'),
    },
    {
      label: 'development',
      slug: 'development',
      description: 'General discussion of web development.',
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'off-topic'),
    },
    {
      label: 'random',
      slug: 'random',
      description: 'General discussion of everything else!',
      unread: true,
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'off-topic'),
    },
    {
      label: 'jobs',
      slug: 'jobs',
      description:
        'Job board. Please put [HIRING] or [FOR HIRE] at the beginning of your post.',
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'community'),
    },
    {
      label: 'showcase',
      slug: 'showcase',
      description: 'Share your projects built with Tailwind CSS!',
      unread: true,
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'community'),
    },
    {
      label: 'bots',
      slug: 'bots',
      description: 'Bot spam containment.',
      serverId: await getServerId('tailwind-css'),
      categoryId: await getCategoryId('tailwind-css', 'community'),
    },

    // nextjs channels
    {
      label: 'welcome',
      slug: 'welcome',
      description: 'Welcome to the Next.js Discord.',
      icon: 'book',
      serverId: await getServerId('next-js'),
      categoryId: await getCategoryId('next-js', 'default-category'),
    },
    {
      label: 'announcements',
      slug: 'announcements',
      description: 'Announcements related to this Discord server and Next.js',
      icon: 'speaker-phone',
      serverId: await getServerId('next-js'),
      categoryId: await getCategoryId('next-js', 'default-category'),
    },
    {
      label: 'introductions',
      slug: 'introductions',
      unread: true,
      description: 'Welcome to the server! Feel free to introduce yourself',
      serverId: await getServerId('next-js'),
      categoryId: await getCategoryId('next-js', 'default-category'),
    },
    {
      label: 'community-help',
      slug: 'community-help',
      description:
        'Members of the community can help each other here, but we recommend checking GitHub discussions first: ',
      serverId: await getServerId('next-js'),
      categoryId: await getCategoryId('next-js', 'need-help'),
    },
    {
      label: 'general',
      slug: 'general',
      icon: 'hashtag-with-speech-bubble',
      description: 'Discussions about Next.js in general',
      serverId: await getServerId('next-js'),
      categoryId: await getCategoryId('next-js', 'community'),
    },
    {
      label: 'off-topic',
      slug: 'off-topic',
      unread: true,
      description:
        'Discussions about topics not related to Next.js or other channels',
      serverId: await getServerId('next-js'),
      categoryId: await getCategoryId('next-js', 'community'),
    },
    {
      label: 'showcase',
      slug: 'showcase',
      unread: true,
      serverId: await getServerId('next-js'),
      categoryId: await getCategoryId('next-js', 'community'),
    },
    {
      label: 'jobs-board',
      slug: 'jobs-board',
      description:
        'Is your company looking for Next.js developers? Discuss here!',
      serverId: await getServerId('next-js'),
      categoryId: await getCategoryId('next-js', 'community'),
    },
    {
      label: 'hire-me',
      slug: 'hire-me',
      unread: true,
      description: 'Are you a developer looking to work with Next.js?',
      serverId: await getServerId('next-js'),
      categoryId: await getCategoryId('next-js', 'community'),
    },
    {
      label: 'makers',
      slug: 'makers',
      description:
        'Share as you build in public. Welcoming all makers and indie hackers.',
      serverId: await getServerId('next-js'),
      categoryId: await getCategoryId('next-js', 'community'),
    },
    {
      label: 'moderation-feedback',
      slug: 'moderation-feedback',
      description: 'Discussion about this Discord server and moderation topics',
      serverId: await getServerId('next-js'),
      categoryId: await getCategoryId('next-js', 'community'),
    },

    // mirage channels
    {
      label: 'welcome',
      slug: 'welcome',
      description: 'Welcome to the Mirage JS Discord',
      icon: 'book',
      serverId: await getServerId('mirage-js'),
      categoryId: await getCategoryId('mirage-js', 'default-category'),
    },
    {
      label: 'announcements',
      slug: 'announcements',
      description: 'Announcements about new and upcomming Mirage events.',
      icon: 'speaker-phone',
      serverId: await getServerId('mirage-js'),
      categoryId: await getCategoryId('mirage-js', 'default-category'),
    },
    {
      label: 'general',
      slug: 'general',
      serverId: await getServerId('mirage-js'),
      categoryId: await getCategoryId('mirage-js', 'text-channels'),
    },
    {
      label: 'graphql',
      slug: 'graphql',
      unread: true,
      serverId: await getServerId('mirage-js'),
      categoryId: await getCategoryId('mirage-js', 'text-channels'),
    },
    {
      label: 'typescript',
      slug: 'typescript',
      unread: true,
      serverId: await getServerId('mirage-js'),
      categoryId: await getCategoryId('mirage-js', 'text-channels'),
    },
  ];
};
