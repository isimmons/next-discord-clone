import { Channel, type Category } from '@prisma/client';
import { useEffect, useState } from 'react';
import {
  getChannelsByCategoryId,
  getChannelsByCategoryIdByServerId,
} from '~/actions';
import ChannelLink from './ChannelLink';

type Props = {
  category: Category;
  closedCategories: Array<number>;
};

type ChannelsByCategoryId = Awaited<ReturnType<typeof getChannelsByCategoryId>>;
type ChannelsByCategoryIdByServerId = Awaited<
  ReturnType<typeof getChannelsByCategoryIdByServerId>
>;

const ChannelLinks = ({ category, closedCategories }: Props) => {
  const [channels, setChannels] = useState<ChannelsByCategoryIdByServerId>([]);
  useEffect(() => {
    console.log('Reloading channels...');

    const loadChannels = async () => {
      const channels = await getChannelsByCategoryIdByServerId(
        category.id,
        category.serverId,
      );
      if (channels) setChannels(channels);
    };

    loadChannels();
  }, [category]);

  console.log('categoryId: ', category.id, 'channels: ', channels);
  return (
    <div className="mt-[5px] space-y-0.5">
      {channels &&
        channels
          .filter(
            (channel) =>
              !closedCategories.includes(category.id) || channel.unread,
          )
          .map((channel) => (
            <ChannelLink
              key={channel.id}
              channel={channel}
              closedCategories={closedCategories}
            />
          ))}
    </div>
  );
};

export default ChannelLinks;
