import ChannelLink from './ChannelLink';
import { CategoryWithChannels } from '~/types';

type Props = {
  category: CategoryWithChannels;
  closedCategories: Array<number>;
};

const ChannelLinks = ({ category, closedCategories }: Props) => {
  return (
    <div className="mt-[5px] space-y-0.5">
      {category.channels
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
