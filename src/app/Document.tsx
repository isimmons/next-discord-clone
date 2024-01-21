import Image from "next/image";
import { DiscordIcon } from "~/components/Icons";
import ServerLink from "~/components/ServerLink";
import { servers } from "~/data";

type Props = {
  children: React.ReactNode;
};

const Document = ({ children }: Props) => {
  return (
    <main>
      <div className="flex text-gray-100 h-screen">
        <div className="bg-gray-900 p-3 px-4 space-y-2 overflow-y-scroll scrollbar-fix">
          <ServerLink href="/">
            <DiscordIcon className="w-7 h-5" />
          </ServerLink>
          <hr className="border-t-white/[.06] border-t-2 rounded mx-2" />
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
