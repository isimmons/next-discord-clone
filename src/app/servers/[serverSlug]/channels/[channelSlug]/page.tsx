import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Categories from '~/components/Categories';
import CategoryFallback from '~/components/CategoryFallback';
import ChannelHead from '~/components/ChannelHead';
import Messages from '~/components/Messages';
import prisma from '~/db';

type Props = {
  params: { serverSlug: string; channelSlug: string };
};

const servers = await prisma.server.findMany({
  include: { categories: { include: { channels: true } } },
});

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
        <Suspense fallback={<p>Foobar</p>}>
          <ChannelHead channelSlug={channelSlug} server={server} />
        </Suspense>
        <Suspense fallback={<p>Loading messages...</p>}>
          <Messages channelSlug={channelSlug} serverId={server?.id} />
        </Suspense>
      </div>
    </>
  );
};

export default ServerPage;
