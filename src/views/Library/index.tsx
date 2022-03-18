import React, { useState } from "react";

import { Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

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
                console.log("e", e);
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
            @media (min-width: 768px) {
              div.l-container > main.l-row {
                z-index: var(--z-index-header);
              }
            }
          `}
        </style>
      </section>
    </>
  );
};

export default Library;
