import { useEffect, useState } from 'react';
import ChannelLink from './ChannelLink';
import { getChannelsByCategoryId } from '~/actions';
import { type Category } from '@prisma/client';

type Props = {
  category: Category;
  closedCategories: Array<number>;
};

type ChannelsByCategoryId = Awaited<ReturnType<typeof getChannelsByCategoryId>>;

const ChannelLinks = ({ category, closedCategories }: Props) => {
  const [channels, setChannels] = useState<ChannelsByCategoryId>([]);
  useEffect(() => {
    const loadChannels = async () => {
      const channels = await getChannelsByCategoryId(category.id);
      setChannels(channels);
    };

    loadChannels();
  }, [category.id]);

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
