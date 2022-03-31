import React, { useContext, useState } from "react";
import { LogbookContext } from "~/hooks";
import { useRouter } from "next/router";
import { useLocalStorage } from "~/hooks";
import { SORT_TYPE } from "~/enums";

import { Card } from "./Card";
import { Sorter } from "./Sorter";

import styles from "./styles.module.css";

const useSorter = () => {
  const router = useRouter();
  let sort: string | undefined = (router.query.sort as string)?.toLowerCase();
  if (!Object.values<string>(SORT_TYPE).includes(sort)) {
    sort = undefined;
  }
  const [localSort, updateLocalSort] = useLocalStorage(
    "log_list_sort",
    SORT_TYPE.asc as string
  );
  const [sortState, updateSortState] = useState(sort || localSort);
  const updateState = (state: string) => {
    updateLocalSort(state);
    updateSortState(state);
  }
  return [sortState, updateState] as [string, (val: string) => void];
};

export const LogList = () => {
  const [sortState, updateSortState] = useSorter();
  const logbook = useContext(LogbookContext);
  const { publications } = logbook;
  let pubList = Array.from(publications);
  if (sortState === SORT_TYPE.desc) {
    pubList = pubList.reverse();
  }

  return (
    <section className={styles.container}>
      <Sorter
        sort={sortState}
        updateSort={(state) => {
          updateSortState(state)
        }}
      />
      {pubList.map(({ log: { id, content, createdAt, author, txHash } }) => {
        return (
          <section key={id} className={styles.item}>
            <Card
              id={id}
              content={content}
              createdAt={createdAt}
              authorID={author?.id}
              publicationTxHash={txHash}
            />
          </section>
        );
      })}
    </section>
  );
};
