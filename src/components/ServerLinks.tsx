'use client';

import Image from 'next/image';
import ServerLink from './ServerLink';
import { Discord } from './Icons';
import { useParams } from 'next/navigation';

type Props = {
  servers: {
    id: string;
    name: string;
    img: string;
  }[];
};

const ServerLinks = ({ servers }: Props) => {
  const params = useParams<{ serverId: string }>();

  return (
    <div className="scrollbar-fix space-y-2 overflow-y-scroll bg-gray-900 p-3 px-4">
      <ServerLink href="/">
        <Discord className="h-5 w-7" />
      </ServerLink>
      <hr className="mx-2 rounded border-t-2 border-t-white/[.06]" />
      {servers.map((s) => (
        <ServerLink
          key={s.id}
          href={`/servers/${s.id}/channels/1`}
          active={s.id.toString() === params.serverId}
        >
          <Image
            src={`/images/server-icons/${s.img}`}
            alt={s.name}
            width={72}
            height={72}
          />
        </ServerLink>
      ))}
    </div>
  );
};

export default ServerLinks;
