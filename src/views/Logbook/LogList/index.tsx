import React, { useContext, useState } from "react";
import { LogbookContext } from "~/hooks";

import { Card } from "./Card";
import { Sorter } from "./Sorter";

import styles from "./styles.module.css";

export const LogList = () => {
  const logbook = useContext(LogbookContext);
  const { publications } = logbook;

  return (
    <section className={styles.container}>
      <Sorter />
      {publications.map(
        ({
          txHash: publicationTxHash,
          log: { id, content, createdAt, author, txHash },
        }) => {
          return (
            <section key={publicationTxHash} className={styles.item}>
              <Card
                id={id}
                content={content}
                createdAt={createdAt}
                authorID={author?.id}
                publicationTxHash={publicationTxHash}
              />
            </section>
          );
        }
      )}
    </section>
  );
};
