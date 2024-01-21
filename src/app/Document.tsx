import Image from 'next/image';
import { DiscordIcon } from '~/components/Icons';
import ServerLink from '~/components/ServerLink';
import { servers } from '~/data';

type Props = {
  children: React.ReactNode;
};

const Document = ({ children }: Props) => {
  return (
    <main>
      <div className="flex h-screen text-gray-100">
        <div className="scrollbar-fix space-y-2 overflow-y-scroll bg-gray-900 p-3 px-4">
          <ServerLink href="/">
            <DiscordIcon className="h-5 w-7" />
          </ServerLink>
          <hr className="mx-2 rounded border-t-2 border-t-white/[.06]" />
          {servers.map((s) => (
            <ServerLink key={s.id} href={`/servers/${s.id}`}>
              <Image
                src={`/images/server-icons/${s.img}`}
                alt={s.name}
                width={72}
                height={72}
              />
            </ServerLink>
          ))}
        </div>

        {children}
      </div>
    </main>
  );
};

export default Document;
