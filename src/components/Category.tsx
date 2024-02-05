'use client';
import { type Category } from '@prisma/client';
import ChannelLinks from './ChannelLinks';
import Icon from './Icon';
import { type CategoryWithChannels } from '~/types';
import { type MouseEventHandler } from 'react';

type Props = {
  category: CategoryWithChannels;
  closedCategories: Array<number>;
  openCategory: (categoryId: number) => MouseEventHandler<HTMLButtonElement>;
  closeCategory: (categoryId: number) => MouseEventHandler<HTMLButtonElement>;
};

const Category = ({
  category,
  closedCategories,
  openCategory,
  closeCategory,
}: Props) => {
  return (
    <>
      {category && (
        <button
          onClick={
            closedCategories.includes(category.id)
              ? openCategory(category.id)
              : closeCategory(category.id)
          }
          className="flex w-full items-center px-0.5 font-title text-xs uppercase tracking-wide hover:text-gray-100"
        >
          <Icon
            id="cheveron-down-small"
            className={`${closedCategories.includes(category.id) ? '-rotate-90' : ''} mr-0.5 size-3 transition duration-200`}
          />
          {category.label}
        </button>
      )}

      <ChannelLinks category={category} closedCategories={closedCategories} />
    </>
  );
};

export default Category;
