import { ChevronDownSmall } from './Icons';

const CategoryFallback = () => {
  return (
    <button className="flex w-full items-center px-0.5 font-title text-xs uppercase tracking-wide hover:text-gray-100">
      <ChevronDownSmall className=" mr-0.5 size-3 transition duration-200" />
      Foobar
    </button>
  );
};

export default CategoryFallback;
