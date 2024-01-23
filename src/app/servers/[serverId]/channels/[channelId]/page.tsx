'use client';

import { notFound } from 'next/navigation';
import Category from '~/components/Category';
import * as Icons from '~/components/Icons';
import { servers, fakeMessages } from '~/data';
import data from '~/data/categories.json';
import useCategories from '~/hooks/useCategories';

type Props = {
  params: { serverId: string };
};

const ServerPage = ({ params }: Props) => {
  const categories: Array<Category> = data[1].categories;

  const { closedCategories, toggleCategory } = useCategories();

  const serverId = parseInt(params.serverId);
  if (isNaN(serverId)) notFound();

  const server = servers.find((s) => parseInt(s.id) === serverId);
  if (!server) notFound();

  return (
    <>
      <div className="flex w-60 flex-col bg-gray-800">
        <button className="flex h-12 items-center px-4 font-title text-[15px] text-white shadow-sm transition hover:bg-gray-550/[0.16]">
          <div className="relative mr-1 size-4">
            <Icons.Verified className="absolute size-4 text-gray-550" />
            <Icons.Check className="absolute size-4" />
          </div>
          {server.name}
          <Icons.ChevronDown className="ml-auto size-[18px] opacity-80" />
        </button>

        <div className="scrollbar-fix flex-1 space-y-[21px] overflow-y-scroll pt-3 font-medium text-gray-300">
          {categories.map((category) => (
            <Category
              key={category.id}
              category={category}
              closedCategories={closedCategories}
              toggleCategory={toggleCategory}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-gray-700">
        <div className="flex h-12 items-center px-3 font-title shadow-sm">
          General
        </div>
        <div className="scrollbar-fix flex-1 space-y-4 overflow-y-scroll px-3">
          {fakeMessages.map((value, index) => (
            <p key={index}>{`Message ${index + 1}: ${value}`}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default ServerPage;
