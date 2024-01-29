import Image from 'next/image';
import { Discord } from './Icons';
import ServerLink from './ServerLink';
import { type ServersWithWelcome } from '~/app/Document';

type Props = {
  servers: ServersWithWelcome;
};

const ServerLinks = ({ servers }: Props) => {
  return (
    <div className="scrollbar-fix space-y-2 overflow-y-scroll bg-gray-900 p-3 px-4">
      <ServerLink to="/">
        <Discord className="h-5 w-7" />
      </ServerLink>
      <hr className="mx-2 rounded border-t-2 border-t-white/[.06]" />

      {servers?.map(async (s) => {
        if (!s) return null;
        return (
          <ServerLink
            key={s.id}
            to={`/servers/${s.slug}/channels/${s.channel.slug}`}
            sid={s.id}
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
