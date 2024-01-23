import { type MouseEventHandler } from 'react';
import { type Category } from '~/types';
import ChannelLinks from './ChannelLinks';
import { ChevronDownSmall } from './Icons';

type Props = {
  category: Category;
  closedCategories: Array<number>;
  toggleCategory: (categoryId: number) => MouseEventHandler<HTMLButtonElement>;
};

const Category = ({ category, closedCategories, toggleCategory }: Props) => {
  return (
    <div key={category.id}>
      {category.label && (
        <button
          onClick={toggleCategory(category.id)}
          className="flex w-full items-center px-0.5 font-title text-xs uppercase tracking-wide hover:text-gray-100"
        >
          <ChevronDownSmall
            className={`${closedCategories.includes(category.id) ? '-rotate-90' : ''} mr-0.5 size-3 transition duration-200`}
          />
          {category.label}
        </button>
      )}

      <ChannelLinks category={category} closedCategories={closedCategories} />
    </div>
  );
};

export default Category;
