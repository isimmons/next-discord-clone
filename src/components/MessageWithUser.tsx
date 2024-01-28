import { type Message } from '@prisma/client';
import Image from 'next/image';

type Props = {
  message: Message;
};

const MessageWithUser = ({ message }: Props) => {
  return (
    <div className="mt-[17px] flex py-0.5 pl-4 pr-16 leading-[22px] hover:bg-gray-950/[.07]">
      <Image
        className="mr-4 mt-0.5 h-10 w-10 rounded-full"
        src={message.avatarUrl}
        alt={`User ${message.user}`}
        width={40}
        height={40}
      />
      <div>
        <p className="flex items-baseline">
          <span className="mr-2 font-medium text-green-400">
            {message.user}
          </span>
          <span className="text-xs font-medium text-gray-400">
            {message.createdAt.toLocaleDateString()}
          </span>
        </p>
        <p className="text-gray-100">{message.text}</p>
      </div>
    </div>
  );
};

export default MessageWithUser;
