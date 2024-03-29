'use client';

import Category from './Category';
import Icon from './Icon';
import { notFound } from 'next/navigation';
import { ServerWithCategoriesWithChannels } from '~/types';
import useCategories from '~/hooks/useCategories';

type Props = {
  server: ServerWithCategoriesWithChannels;
};

const Categories = ({ server }: Props) => {
  const { closedCategories, openCategory, closeCategory } = useCategories();

  if (!server) notFound();

  return (
    <>
      <button className="flex h-12 items-center px-4 font-title text-[15px] text-white shadow-sm transition hover:bg-gray-550/[0.16]">
        <div className="relative mr-1 size-4">
          <Icon id="verified" className="absolute size-4 text-gray-550" />
          <Icon id="check" className="absolute size-4" />
        </div>
        {server.label}
        <Icon id="cheveron-down" className="ml-auto size-[18px] opacity-80" />
      </button>

      <div className="scrollbar-fix flex-1 space-y-[21px] overflow-y-scroll pt-3 font-medium text-gray-300">
        {server.categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            closedCategories={closedCategories}
            openCategory={openCategory}
            closeCategory={closeCategory}
          />
        ))}
      </div>
    </>
  );
};

export default Categories;
