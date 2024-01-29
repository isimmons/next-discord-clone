import { Prisma } from '@prisma/client';
import ServerLinks from '~/components/ServerLinks';

import prisma from '~/db';

const servers = await prisma.server.findMany({
  select: { id: true, label: true, slug: true, img: true, channels: true },
});

const serversWithWelcome = servers.map((s) => {
  for (let channel of s.channels) {
    if (channel.slug === 'welcome' && channel.serverId === s.id)
      return { id: s.id, label: s.label, slug: s.slug, img: s.img, channel };
  }
});

export type ServersWithWelcome = typeof serversWithWelcome;

// console.log(serversWithWelcome);

type Props = {
  children: React.ReactNode;
};

const Document = ({ children }: Props) => {
  return (
    <main>
      <div className="flex h-screen text-gray-100">
        <ServerLinks servers={serversWithWelcome} />

        {children}
      </div>
    </main>
  );
};

export default Document;
