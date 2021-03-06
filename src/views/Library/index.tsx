import React, { useState } from "react";

import styles from "./styles.module.css";

import { Head, SearchBar } from "~/components";

import { BookList } from "./BookList";
import { SearchResult } from "./SearchResult";

const Library: React.FC = () => {
  const [searchingID, updateSeachingID] = useState("");

  return (
    <>
      <Head title="Library" />

      <section className={styles.maxWidth}>
        <section className={styles.header}>
          <h1 className={styles.title}>Library</h1>
          <div className={styles.searchBarWrapper}>
            <SearchBar
              onSearch={(e) => {
                updateSeachingID(e);
              }}
            />
          </div>
        </section>
        {searchingID == "" ? (
          <section>
            <h1 className={styles.resultTitle}>Latest Written</h1>
            <BookList />
          </section>
        ) : (
          <section>
            <h1 className={styles.resultTitle}>Search Result</h1>
            <SearchResult id={searchingID} />
          </section>
        )}
        <style jsx global>
          {`
            html {
              background-color: var(--color-white);
            }
          `}
        </style>
      </section>
    </>
  );
};

export default Library;
