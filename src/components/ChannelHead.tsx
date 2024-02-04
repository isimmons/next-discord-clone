'use client';

import { type Server } from '@prisma/client';
import { useEffect, useState } from 'react';
import { getChannelBySlugByServerId } from '~/actions';
import Icon from './Icon';
import { IconName } from '~/types/svg-icons';

type Props = {
  server: Server;
  channelSlug: string;
};

type GetChannelBySlugByServerId = Awaited<
  ReturnType<typeof getChannelBySlugByServerId>
>;

const ChannelHead = ({ server, channelSlug }: Props) => {
  const [channel, setChannel] = useState<GetChannelBySlugByServerId>(null);

  useEffect(() => {
    const loadChannel = async () => {
      const channel = await getChannelBySlugByServerId(channelSlug, server?.id);
      if (channel) setChannel(channel);
    };

    loadChannel();
  }, [server, channelSlug]);

  const iconId = channel?.icon ? (channel.icon as IconName) : 'hashtag';

  return (
    <div className="flex h-12 items-center px-2 shadow-sm">
      <div className="flex items-center">
        <Icon
          id={iconId}
          className="mx-2 h-6 w-6 font-semibold text-gray-400"
        />
        <span className="mr-2 whitespace-nowrap font-title text-white">
          {channel?.label}
        </span>
      </div>

      <div className="mx-2 h-6 w-px bg-white/[.06]"></div>
      <div className="mx-2 truncate text-sm font-medium text-gray-200">
        {channel?.description}
      </div>

      <div className="ml-auto flex items-center">
        <button className="text-gray-200 hover:text-gray-100">
          <Icon id="hashtag-with-speech-bubble" className="mx-2 h-6 w-6" />
        </button>
        <button className="text-gray-200 hover:text-gray-100">
          <Icon id="bell" className="mx-2 h-6 w-6" />
        </button>
        <button className="text-gray-200 hover:text-gray-100">
          <Icon id="pin" className="mx-2 h-6 w-6" />
        </button>
        <button className="text-gray-200 hover:text-gray-100">
          <Icon id="people" className="mx-2 h-6 w-6" />
        </button>
        <div className="relative mx-2">
          <input
            type="text"
            placeholder="Search"
            className="h-6 w-36 rounded border-none bg-gray-900 px-1.5 text-sm font-medium placeholder-gray-400"
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Icon
              id="magnifying-glass"
              className="mr-1.5 h-4 w-4 text-gray-400"
            />
          </div>
        </div>
        <button className="text-gray-200 hover:text-gray-100">
          <Icon id="inbox" className="mx-2 h-6 w-6" />
        </button>
        <button className="text-gray-200 hover:text-gray-100">
          <Icon id="question-circle" className="mx-2 h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default ChannelHead;
