'use client';

import { useEffect, useState } from 'react';
import { getChannelBySlugByServerId, getMessagesByChannelId } from '~/actions';
import MessageWithUser from './MessageWithUser';
import Message from './Message';

type Props = {
  channelSlug: string;
  serverId?: number;
};

type MessagesByChannelId = Awaited<ReturnType<typeof getMessagesByChannelId>>;

const Messages = ({ channelSlug, serverId }: Props) => {
  const [messages, setMessages] = useState<MessagesByChannelId>([]);

  useEffect(() => {
    const loadMessages = async () => {
      const channel = await getChannelBySlugByServerId(channelSlug, serverId);

      const messages = await getMessagesByChannelId(channel?.id);
      setMessages(messages);
    };

    loadMessages();
  }, [channelSlug, serverId]);

  return (
    <div className="flex-1 overflow-y-scroll">
      {messages.map((message, i) => (
        <div key={i}>
          {i === 0 || message.user !== messages[i - 1].user ? (
            <MessageWithUser message={message} />
          ) : (
            <Message message={message} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;
