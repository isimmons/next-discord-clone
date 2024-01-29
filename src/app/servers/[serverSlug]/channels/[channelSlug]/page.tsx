'use client';

import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  getServerBySlug,
  getCategoriesByServerId,
  getChannelBySlugByServerId,
} from '~/actions';
import Category from '~/components/Category';
import * as Icons from '~/components/Icons';
import Message from '~/components/Message';
import MessageWithUser from '~/components/MessageWithUser';
import useCategories from '~/hooks/useCategories';

type Props = {
  params: { serverSlug: string; channelSlug: string };
};

type GetServerBySlug = Awaited<ReturnType<typeof getServerBySlug>>;
type GetCategoriesByServerID = Awaited<
  ReturnType<typeof getCategoriesByServerId>
>;
type GetChannelBySlugByServerId = Awaited<
  ReturnType<typeof getChannelBySlugByServerId>
>;

const ServerPage = ({ params }: Props) => {
  const [server, setServer] = useState<GetServerBySlug>(null);
  const [categories, setCategories] = useState<GetCategoriesByServerID>([]);
  const [channel, setChannel] = useState<GetChannelBySlugByServerId>(null);
  const { closedCategories, toggleCategory } = useCategories();

  const { serverSlug, channelSlug } = params;
  if (!serverSlug || !channelSlug) notFound();

  useEffect(() => {
    console.log('Reloading Server...');
    const loadServer = async () => {
      const server = await getServerBySlug(serverSlug);
      if (server) setServer(server);
    };

    loadServer();
  }, [serverSlug]);

  useEffect(() => {
    console.log('Reloading categories...');
    const loadCategories = async () => {
      const categories = await getCategoriesByServerId(server?.id);
      if (categories) setCategories(categories);
    };

    loadCategories();
  }, [server]);

  useEffect(() => {
    const loadChannel = async () => {
      const channel = await getChannelBySlugByServerId(channelSlug, server?.id);
      if (channel) setChannel(channel);
    };

    loadChannel();
  }, [server, channelSlug]);

  // const categories = server?.categories;
  // const channel = server?.channels[0];
  // const messages = channel?.messages;
  return (
    <>
      <div className="flex w-60 flex-col bg-gray-800">
        <button className="flex h-12 items-center px-4 font-title text-[15px] text-white shadow-sm transition hover:bg-gray-550/[0.16]">
          <div className="relative mr-1 size-4">
            <Icons.Verified className="absolute size-4 text-gray-550" />
            <Icons.Check className="absolute size-4" />
          </div>
          {server?.label}
          <Icons.ChevronDown className="ml-auto size-[18px] opacity-80" />
        </button>

        <div className="scrollbar-fix flex-1 space-y-[21px] overflow-y-scroll pt-3 font-medium text-gray-300">
          {categories?.map((category) => (
            <Category
              key={category.id}
              category={category}
              closedCategories={closedCategories}
              toggleCategory={toggleCategory}
            />
          ))}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-shrink flex-col bg-gray-700">
        <div className="flex h-12 items-center px-2 shadow-sm">
          <div className="flex items-center">
            <Icons.Hashtag className="mx-2 h-6 w-6 font-semibold text-gray-400" />
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
              <Icons.HashtagWithSpeechBubble className="mx-2 h-6 w-6" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Bell className="mx-2 h-6 w-6" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Pin className="mx-2 h-6 w-6" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.People className="mx-2 h-6 w-6" />
            </button>
            <div className="relative mx-2">
              <input
                type="text"
                placeholder="Search"
                className="h-6 w-36 rounded border-none bg-gray-900 px-1.5 text-sm font-medium placeholder-gray-400"
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <Icons.Spyglass className="mr-1.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.Inbox className="mx-2 h-6 w-6" />
            </button>
            <button className="text-gray-200 hover:text-gray-100">
              <Icons.QuestionCircle className="mx-2 h-6 w-6" />
            </button>
          </div>
        </div>

        {/* <div className="flex-1 overflow-y-scroll">
          {channel?.messages.map((message, i) => (
            <div key={i}>
              {i === 0 || message.user !== channel?.messages[i - 1].user ? (
                <MessageWithUser message={message} />
              ) : (
                <Message message={message} />
              )}
            </div>
          ))}
        </div> */}
      </div>
    </>
  );
};

export default ServerPage;
