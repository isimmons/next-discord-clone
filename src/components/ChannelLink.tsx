'use client';

import { type Channel } from '@prisma/client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import * as Icons from '~/components/Icons';

type Props = {
  channel: Channel;
  closedCategories: number[];
};

const ChannelLink = ({ channel, closedCategories }: Props) => {
  const closedCatQueryString =
    closedCategories.length > 0
      ? encodeURIComponent(JSON.stringify({ cc: closedCategories }))
      : null;

  const params = useParams<{ channelSlug: string; serverSlug: string }>();

  const isActive = channel.slug === params.channelSlug;
  const activeState = isActive
    ? 'active'
    : channel.unread
      ? 'inactiveUnread'
      : 'inactiveRead';

  const classNames = {
    active: 'bg-gray-550/[0.32] text-white',
    inactiveUnread:
      'text-white hover:bg-gray-550/[0.16] active:bg-gray-550/[0.24]',
    inactiveRead:
      'text-gray-300 hover:bg-gray-550/[0.16] hover:text-gray-100 active:bg-gray-550/[0.24]',
  };

  const Icon = channel.icon
    ? Icons[channel.icon as keyof typeof Icons]
    : Icons.Hashtag;
  return (
    <Link
      href={`/servers/${params.serverSlug}/channels/${channel.slug}${closedCatQueryString ? `/?cc=${closedCatQueryString}` : ''}`}
      className={`${classNames[activeState]} group relative mx-2 flex items-center rounded px-2 py-1`}
    >
      {activeState === 'inactiveUnread' && (
        <div className="absolute left-0 -ml-2 h-2 w-1 rounded-r-full bg-white"></div>
      )}
      <Icon className="mr-1.5 size-5 text-gray-400 " />

      {channel.label}
      <Icons.AddPerson className="ml-auto size-4 text-gray-200 opacity-0 hover:text-gray-100 group-hover:opacity-100" />
    </Link>
  );
};

export default ChannelLink;
