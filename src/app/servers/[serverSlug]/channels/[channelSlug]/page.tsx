import { notFound } from 'next/navigation';
import Categories from '~/components/Categories';
import ChannelHead from '~/components/ChannelHead';
import Messages from '~/components/Messages';
import prisma from '~/db';

type Props = {
  params: { serverSlug: string; channelSlug: string };
};

const servers = await prisma.server.findMany();

const ServerPage = ({ params: { serverSlug, channelSlug } }: Props) => {
  if (!serverSlug || !channelSlug) notFound();

  const server = servers.find((s) => s.slug === serverSlug);

  if (!server) notFound();

  return (
    <>
      <div className="flex w-60 flex-col bg-gray-800">
        <Categories server={server} />
      </div>

      <div className="flex min-w-0 flex-1 flex-shrink flex-col bg-gray-700">
        <ChannelHead channelSlug={channelSlug} server={server} />

        <Messages channelSlug={channelSlug} serverId={server?.id} />
      </div>
    </>
  );
};

export default ServerPage;
