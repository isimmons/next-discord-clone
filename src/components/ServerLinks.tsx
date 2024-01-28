'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getServers } from '~/actions';
import { Discord } from './Icons';
import ServerLink from './ServerLink';

type Servers = Awaited<ReturnType<typeof getServers>>;

const ServerLinks = () => {
  const [servers, setServers] = useState<Servers>([]);

  useEffect(() => {
    const loadServers = async () => {
      const serversRes = await getServers();
      if (serversRes) setServers([...serversRes]);
    };

    loadServers();
  }, []);

  const { serverId } = useParams<{
    serverId: string;
  }>();

  return (
    <div className="scrollbar-fix space-y-2 overflow-y-scroll bg-gray-900 p-3 px-4">
      <ServerLink href="/">
        <Discord className="h-5 w-7" />
      </ServerLink>
      <hr className="mx-2 rounded border-t-2 border-t-white/[.06]" />

      {servers &&
        servers.map((s) => {
          // let channelSlug: string = '1';
          // if (s.channels[0]) channelSlug = s.channels[0].slug;
          return (
            <ServerLink
              key={s.id}
              href={`/servers/${s.slug}/channels/${s.channels[0].slug}`}
              active={s.id === parseInt(serverId)}
            >
              <Image
                src={`/images/server-icons/${s.img}`}
                alt={s.label}
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
