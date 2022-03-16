import React from "react";
import { Card } from "./Card";

import styles from "./styles.module.css";

interface Account {
  __typename: "Account";
  id: string;
}

interface Log {
  __typename: "Log";
  id: string;
  createdAt: string;
  content: string;
  author: Account;
}

export interface Publication {
  __typename: "Publication";
  log: Log;
}

export interface LogListProps {
  publications: Array<Publication>;
}

export const LogList: React.FC<LogListProps> = ({ publications }) => {
  console.log({ publications });
  return (
    <section className={styles.container}>
      {publications.map(({ log: { id, content, createdAt, author } }) => {
        return (
          <>
            <section className={styles.item}>
              <Card
                key={id}
                id={id}
                content={content}
                createdAt={createdAt}
                authorID={author?.id}
              />
            </section>
          </>
        );
      })}
    </section>
  );
};
