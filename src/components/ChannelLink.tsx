import * as Icons from '~/components/Icons';

type Props = {
  channel: {
    id: number;
    label: string;
    icon?: string;
  };
};

const ChannelLink = ({ channel }: Props) => {
  const Icon = channel.icon
    ? Icons[channel.icon as keyof typeof Icons]
    : Icons.Hashtag;
  return (
    <a
      href="#"
      className="group mx-2 flex items-center rounded px-2 py-1 text-gray-300 hover:bg-gray-550/[0.16] hover:text-gray-100"
    >
      <Icon className="mr-1.5 size-5 text-gray-400 " />

      {channel.label}
      <Icons.AddPerson className="ml-auto size-4 text-gray-200 opacity-0 hover:text-gray-100 group-hover:opacity-100" />
    </a>
  );
};

export default ChannelLink;
