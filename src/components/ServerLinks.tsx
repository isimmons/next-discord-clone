'use client';

import Image from 'next/image';
import ServerLink from './ServerLink';
import { Discord } from './Icons';
import { useParams } from 'next/navigation';
import { getServers, getChannels } from '~/app/actions';
import { useEffect, useState } from 'react';

type Servers = Awaited<ReturnType<typeof getServers>>;
type Channels = Awaited<ReturnType<typeof getChannels>>;

const ServerLinks = () => {
  const [servers, setServers] = useState<Servers>([]);
  const [channels, setChannels] = useState<Channels>([]);

  useEffect(() => {
    const loadServers = async () => {
      const serversRes = await getServers();
      if (serversRes) setServers([...serversRes]);
    };

    loadServers();
  }, []);

  useEffect(() => {
    const loadChannels = async () => {
      const channelsRes = await getChannels(servers);
      setChannels([...channelsRes]);
    };

    loadChannels();
  }, [servers]);

  const { serverId } = useParams<{
    serverId: string;
  }>();

  const getChannelSlug = (sid: number) => {
    console.log(channels);
    const slug = '';
    console.log(slug);
    return slug;
  };

  return (
    <div className="scrollbar-fix space-y-2 overflow-y-scroll bg-gray-900 p-3 px-4">
      <ServerLink href="/">
        <Discord className="h-5 w-7" />
      </ServerLink>
      <hr className="mx-2 rounded border-t-2 border-t-white/[.06]" />

      {servers &&
        servers.map((s) => {
          let channelSlug = getChannelSlug(s.id) || '';
          // if (s.categories[0].channels[0])
          //   channelSlug = s.categories[0].channels[0].slug;

          return (
            <ServerLink
              key={s.id}
              href={`/servers/${s.slug}/channels/${channelSlug}`}
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
