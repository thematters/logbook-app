import React, { useContext, useState } from "react";
import { LogbookContext } from "~/hooks";
import { useLazyQuery } from "@apollo/client";
import { LOGBOOK_DETAIL } from "~/components/GQL";
import { Spinner } from "~/components";

import { Card } from "./Card";
import { Sorter } from "./Sorter";
import { useSorter } from "../useSorter";

import styles from "./styles.module.css";

export const LogList = () => {
  const [sortState, updateSortState] = useSorter();
  const logbook = useContext(LogbookContext);
  const { publications } = logbook;
  let pubList = Array.from(publications);

  const [fetchLogBook, { loading, error, data }] = useLazyQuery(LOGBOOK_DETAIL);
  if (data) {
    logbook.updatePublications(data?.logbook?.publications);
    console.log({ data });
  }

  return (
    <section className={styles.container}>
      <Sorter
        sort={sortState}
        updateSort={(state) => {
          fetchLogBook({
            variables: {
              id: logbook.id,
              order: state,
            },
          });
          updateSortState(state);
        }}
      />
      {loading ? (
        <Spinner />
      ) : (
        pubList.map(({ log: { id, content, createdAt, author, txHash } }) => {
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
        })
      )}
    </section>
  );
};
