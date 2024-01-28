import { useSearchParams } from 'next/navigation';
import { useState, type MouseEventHandler } from 'react';

const useCategories = () => {
  const searchParams = useSearchParams();
  const initClosedCategories: { cc: Array<number> } = JSON.parse(
    searchParams.get('cc') || '{ "cc": [] }',
  );

  const [closedCategories, setClosedCategories] = useState<Array<number>>(
    initClosedCategories.cc,
  );

  const toggleCategory: (
    categoryId: number,
  ) => MouseEventHandler<HTMLButtonElement> = (categoryId: number) => () => {
    setClosedCategories((closedCategories) =>
      closedCategories.includes(categoryId)
        ? closedCategories.filter((cid) => cid !== categoryId)
        : [...closedCategories, categoryId],
    );
  };

  return { closedCategories, toggleCategory };
};

export default useCategories;
