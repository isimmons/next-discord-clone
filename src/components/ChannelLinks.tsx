import { type Category } from '@prisma/client';
import { useEffect, useState } from 'react';
import { getChannelsByCategoryId } from '~/actions';
import ChannelLink from './ChannelLink';

type Props = {
  category: Category;
  closedCategories: Array<number>;
};

type ChannelsByCategoryId = Awaited<ReturnType<typeof getChannelsByCategoryId>>;

const ChannelLinks = ({ category, closedCategories }: Props) => {
  const [channels, setChannels] = useState<ChannelsByCategoryId>([]);
  useEffect(() => {
    console.log('Reloading channels...');

    const loadChannels = async () => {
      const channels = await getChannelsByCategoryId(category.id);
      setChannels(channels);
    };

    loadChannels();
  }, [category]);

  return (
    <div className="mt-[5px] space-y-0.5">
      {channels
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
