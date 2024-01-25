'use client';

import Image from 'next/image';
import ServerLink from './ServerLink';
import { Discord } from './Icons';
import { notFound, useParams } from 'next/navigation';
import { type ServerData } from '~/data/categories';
import { TChannel, TServer } from '~/types';

type Props = { servers: ServerData };

const ServerLinks = ({ servers }: Props) => {
  const { serverId } = useParams<{
    serverId: string;
  }>();

  return (
    <div className="scrollbar-fix space-y-2 overflow-y-scroll bg-gray-900 p-3 px-4">
      <ServerLink href="/">
        <Discord className="h-5 w-7" />
      </ServerLink>
      <hr className="mx-2 rounded border-t-2 border-t-white/[.06]" />

      {Object.keys(servers).map((key) => {
        const server = servers[key as unknown as keyof typeof servers];
        return (
          <ServerLink
            key={key}
            href={`/servers/${key}/channels/${server.categories[0].channels[0].id}`}
            active={key === serverId}
          >
            <Image
              src={`/images/server-icons/${server.img}`}
              alt={server.label}
              width={72}
              height={72}
            />
          </ServerLink>
        );
      })}
    </div>
  );
};

export default ServerLinks;
