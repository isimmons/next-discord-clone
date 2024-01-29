'use client';

import { Category, Server } from '@prisma/client';
import Category from './Category';
import * as Icons from '~/components/Icons';
import { useEffect, useState } from 'react';
import { getCategoriesByServerId } from '~/actions';
import useCategories from '~/hooks/useCategories';

type ServerWithCategories =
  | ({
      categories: Array<Category>;
    } & Server)
  | null;

type Props = {
  server: ServerWithCategories;
};

type GetCategoriesByServerID = Awaited<
  ReturnType<typeof getCategoriesByServerId>
>;

const Categories = ({ server }: Props) => {
  const [categories, setCategories] = useState<GetCategoriesByServerID>([]);
  const { closedCategories, toggleCategory } = useCategories();

  useEffect(() => {
    console.log('Reloading categories...');
    const loadCategories = async () => {
      const categories = await getCategoriesByServerId(server?.id);
      if (categories) setCategories(categories);
    };

    loadCategories();
  }, [server]);

  return (
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
  );
};

export default Categories;
