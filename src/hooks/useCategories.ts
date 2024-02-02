import { useSearchParams } from 'next/navigation';
import { useState, useEffect, type MouseEventHandler } from 'react';

const useCategories = () => {
  const searchParams = useSearchParams();
  const cc = searchParams.get('cc');
  const initClosedCategories: { cc: Array<number> } = cc ? JSON.parse(cc) : [];

  const [closedCategories, setClosedCategories] = useState<Array<number>>([]);

  useEffect(() => {
    setClosedCategories(initClosedCategories.cc);
  }, [initClosedCategories.cc]);

  // const toggleCategory: (
  //   categoryId: number,
  // ) => MouseEventHandler<HTMLButtonElement> = (categoryId: number) => () => {
  //   setClosedCategories((closed) => {
  //     if (closed.includes(categoryId)) {
  //       console.log('includes: ', categoryId);
  //       return closed.filter((cid) => cid !== categoryId);
  //     } else if (!closed.includes(categoryId)) {
  //       console.log('not includes: ', categoryId);
  //       return [...closed, ...[categoryId]];
  //     } else return [];
  //   });
  //   console.log(closedCategories);
  // };

  const closeCategory: (
    categoryId: number,
  ) => MouseEventHandler<HTMLButtonElement> = (categoryId: number) => () => {
    if (!closedCategories.includes(categoryId)) {
      console.log('not included... ', categoryId);
      setClosedCategories((closed) => [...closed, ...[categoryId]]);
      console.log('ids... ', closedCategories);
    }
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
