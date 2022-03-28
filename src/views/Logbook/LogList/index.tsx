import React, { useContext, useState } from "react";
import { LogbookContext } from "~/hooks";

import { Card } from "./Card";
import { Sorter } from "./Sorter";

import styles from "./styles.module.css";

export const LogList = () => {
  const [ascOrder, updateAscOrder] = useState(true);
  const logbook = useContext(LogbookContext);
  const { publications } = logbook;
  let pubList = Array.from(publications);
  if (!ascOrder) {
    pubList = pubList.reverse();
  }

  return (
    <section className={styles.container}>
      <Sorter
        ascOrder={ascOrder}
        updateAscOrder={(state) => updateAscOrder(state)}
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
