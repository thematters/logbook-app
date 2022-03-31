import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useLocalStorage } from "~/hooks";
import { SORT_TYPE } from "~/enums";

export const useLogListSorter = () => {
  const router = useRouter();
  let sort: string | undefined = (router.query.sort as string)?.toLowerCase();
  if (!Object.values<string>(SORT_TYPE).includes(sort)) {
    sort = undefined;
  }
  const [localSort, updateLocalSort] = useLocalStorage(
    "log_list_sorter",
    SORT_TYPE.asc as string
  );
  const [sortState, updateSortState] = useState(sort || localSort);
  useEffect(() => {
    sort && updateSortState(sort);
  }, [sort]);

  const updateState = (state: string) => {
    updateLocalSort(state);
    updateSortState(state);
  };
  return [sortState, updateState] as [string, (val: string) => void];
};
