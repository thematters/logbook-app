import React, { useContext } from "react";
import { LogbookContext } from "~/hooks";

import { Card } from "./Card";

import styles from "./styles.module.css";

export const LogList = () => {
  const logbook = useContext(LogbookContext);
  return (
    <section className={styles.container}>
      {logbook.publications.map(
        ({ txHash, log: { id, content, createdAt, author } }) => {
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
        }
      )}
    </section>
  );
};
