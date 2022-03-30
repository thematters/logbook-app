import React, { useContext, useEffect, useState } from "react";
import { LogbookContext } from "~/hooks";
import { useRouter } from "next/router";
import { useLocalStorage } from "~/hooks";
import { SORT_ASC, SORT_DESC } from "~/enums";

import { Card } from "./Card";
import { Sorter, sortType } from "./Sorter";

import styles from "./styles.module.css";

export const LogList = () => {
  const router = useRouter();
  let sort: sortType | undefined = router.query.sort as sortType;
  if (![SORT_ASC, SORT_DESC].includes(sort)) {
    sort = undefined;
  }
  const [localSort, updateLocalSort] = useLocalStorage(
    "log_list_sort",
    SORT_ASC
  );
  const [sortState, updateSortState] = useState(
    sort || (localSort as sortType)
  );

  const logbook = useContext(LogbookContext);
  const { publications } = logbook;
  let pubList = Array.from(publications);
  if (sortState === SORT_DESC) {
    pubList = pubList.reverse();
  }

  return (
    <section className={styles.container}>
      <Sorter
        sort={sortState as sortType}
        updateSort={(state) => {
          updateLocalSort(state);
          updateSortState(state);
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
