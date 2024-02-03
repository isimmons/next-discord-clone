'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, type MouseEventHandler } from 'react';

const useCategories = () => {
  const searchParams = useSearchParams();
  const cc = searchParams.get('cc');
  const initClosedCategories: { cc: Array<number> } = cc ? JSON.parse(cc) : [];
  console.log(initClosedCategories);
  const [closedCategories, setClosedCategories] = useState<Array<number>>([]);

  useEffect(() => {
    setClosedCategories((closed) => {
      if (Array.isArray(initClosedCategories.cc)) {
        return [...initClosedCategories.cc];
      } else return [];
    });
  }, [initClosedCategories.cc]);

  const closeCategory: (
    categoryId: number,
  ) => MouseEventHandler<HTMLButtonElement> = (categoryId: number) => () => {
    setClosedCategories((closed) => {
      console.log('closeCategory');
      if (Array.isArray(closed) && !closed.includes(categoryId)) {
        return [...closed, ...[categoryId]];
      } else return [];
    });
  };

  const openCategory: (
    categoryId: number,
  ) => MouseEventHandler<HTMLButtonElement> = (categoryId: number) => () => {
    if (closedCategories.includes(categoryId)) {
      console.log('is included... ', categoryId);
      setClosedCategories((closed) =>
        closed.filter((cid) => cid !== categoryId),
      );
      console.log(closedCategories);
    }
  };

  return { closedCategories, closeCategory, openCategory };
};

export default useCategories;
