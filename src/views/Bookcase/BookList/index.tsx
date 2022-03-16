import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

import { Title } from "../Title";
import { EmptyBookList } from "./EmptyBookList";
import { LoggedBookList } from "./LoggedBookList";

export interface BookListProps {
  address: string;
}

export const BookList: React.FC<BookListProps> = ({ address }) => {
  return (
    <section>
      <section className={styles.container}>
        <section className={styles.item}>
          <Title address={address} />
        </section>
        <EmptyBookList address={address} />
        <LoggedBookList address={address} />
      </section>
    </section>
  );
};
