import React from "react";

import { useQuery, gql } from "@apollo/client";

import { LogbookCard, Spinner } from "~/components";

import styles from "./styles.module.css";

const SEARCH_LOGBOOK = gql`
  # hex id
  query SEARCH_LOGBOOK($id: String) {
    logbook(id: $id) {
      id
      owner {
        id
      }
      title
      description
      transferCount
      publicationCount
      loggedAt
    }
  }
`;

export interface SearchResultProps {
  id: string;
}

export const SearchResult: React.FC<SearchResultProps> = ({ id }) => {
  const { loading, error, data } = useQuery(SEARCH_LOGBOOK, {
    variables: {
      id: `0x${Number(id).toString(16)}`,
    },
  });
  if (error) return <></>;
  if (loading) {
    return <Spinner />;
  }
  if (data.logbook) {
    const {
      title,
      description,
      publicationCount,
      transferCount,
      loggedAt,
      owner,
    } = data.logbook;
    return (
      <LogbookCard
        title={title}
        content={description}
        publicationCount={publicationCount}
        transferCount={transferCount}
        createdAt={new Date(Number(loggedAt) * 1000)}
        tokenID={id}
        showHeader
        txHash={(owner as any).id}
        className={styles.item}
      ></LogbookCard>
    );
  }
  return (
    <section className={styles.empty}>
      <h1>Sorry! We couldn’t find any result for “{id}” </h1>
      <p>Try to enter a string of arabic numerals of Logbook ID.</p>
    </section>
  );
};
