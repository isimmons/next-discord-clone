'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as Icons from '~/components/Icons';
import { type Channel } from '~/types';

type Props = {
  channel: Channel;
};

const ChannelLink = ({ channel }: Props) => {
  const params = useParams<{ channelId: string; serverId: string }>();
  const isActive = channel.id.toString() === params.channelId;

  const Icon = channel.icon
    ? Icons[channel.icon as keyof typeof Icons]
    : Icons.Hashtag;
  return (
    <Link
      href={`/servers/${params.serverId}/channels/${channel.id}`}
      className={`${isActive ? 'bg-gray-550/[0.32] text-white' : 'text-gray-300 hover:bg-gray-550/[0.16] hover:text-gray-100'} group mx-2 flex items-center rounded px-2 py-1`}
    >
      <Icon className="mr-1.5 size-5 text-gray-400 " />

      {channel.label}
      <Icons.AddPerson className="ml-auto size-4 text-gray-200 opacity-0 hover:text-gray-100 group-hover:opacity-100" />
    </Link>
  );
};

export default ChannelLink;
