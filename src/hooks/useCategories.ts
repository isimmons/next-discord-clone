'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useEffect, type MouseEventHandler, useMemo } from 'react';

const useCategories = () => {
  const searchParams = useSearchParams();
  const cc = searchParams.get('cc') as string;
  const initClosedCategories: Array<number> = useMemo(
    () => (cc ? JSON.parse(cc) : []),
    [cc],
  );
  const [closedCategories, setClosedCategories] = useState<Array<number>>([]);

  useEffect(() => {
    setClosedCategories((closed) => {
      if (Array.isArray(initClosedCategories)) {
        return [...closed, ...initClosedCategories];
      } else return [...closed];
    });
  }, [initClosedCategories]);

  const closeCategory: (
    categoryId: number,
  ) => MouseEventHandler<HTMLButtonElement> = (categoryId: number) => () => {
    setClosedCategories((closed) => {
      if (Array.isArray(closed) && !closed.includes(categoryId)) {
        return [...closed, ...[categoryId]];
      } else return [];
    });
  };

  const openCategory: (
    categoryId: number,
  ) => MouseEventHandler<HTMLButtonElement> = (categoryId: number) => () => {
    if (closedCategories.includes(categoryId)) {
      setClosedCategories((closed) =>
        closed.filter((cid) => cid !== categoryId),
      );
    }
  };

  return { closedCategories, closeCategory, openCategory };
};

export default useCategories;
