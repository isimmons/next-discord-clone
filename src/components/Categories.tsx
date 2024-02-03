'use client';

import Category from './Category';
import * as Icons from '~/components/Icons';

import CategoryFallback from './CategoryFallback';
import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import { ServerWithCategoriesWithChannels } from '~/types';
import useCategories from '~/hooks/useCategories';

// type Props = {
//   server:
//     | ({
//         categories: Array<CategoryType> & { channels: Array<Channel>};
//       } & Server)
//     | undefined;
// };

type Props = {
  server: ServerWithCategoriesWithChannels;
};

const Categories = ({ server }: Props) => {
  const { closedCategories, openCategory, closeCategory } = useCategories();

  if (!server) notFound();

  console.log('Categories Component: ', closedCategories);

  // return <p>Testing</p>;

  return (
    <Suspense fallback={<CategoryFallback />}>
      <div className="flex w-60 flex-col bg-gray-800">
        <button className="flex h-12 items-center px-4 font-title text-[15px] text-white shadow-sm transition hover:bg-gray-550/[0.16]">
          <div className="relative mr-1 size-4">
            <Icons.Verified className="absolute size-4 text-gray-550" />
            <Icons.Check className="absolute size-4" />
          </div>
          {server.label}
          <Icons.ChevronDown className="ml-auto size-[18px] opacity-80" />
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
      </div>
    </Suspense>
  );
};

export default Categories;
