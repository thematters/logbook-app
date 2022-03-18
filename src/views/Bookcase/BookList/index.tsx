import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { gql, useQuery } from "@apollo/client";
import { Spinner } from "~/components";

import { Title } from "../Title";
import { EmptyBookList } from "./EmptyBookList";
import { LoggedBookList } from "./LoggedBookList";

export interface BookListProps {
  address: string;
}

const OWN_LOGBOOKS = gql`
  query OwnLogBooks($ownID: String) {
    account(id: $ownID) {
      id
      logbooks(first: 1) {
        id
        title
        loggedAt
        publicationCount
        transferCount
      }
    }
  }
`;

export const BookList: React.FC<BookListProps> = ({ address }) => {
  const { loading, error, data } = useQuery(OWN_LOGBOOKS, {
    variables: {
      ownID: address.toLowerCase(),
    },
  });

  if (error) return <></>;
  if (loading) {
    return <Spinner></Spinner>;
  }

  // console.log("OWN_LOGBOOKS", data);

  if (data?.account?.logbooks?.length > 0) {
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
  }

  return (
    <section>
      <section className={styles.container}>
        <section className={styles.item}>
          <Title address={address} />
        </section>
        <section className={styles.emptyNote}>
          <p>
            You don’t have any Logbook. Get Traveloggers from{" "}
            <a
              href="https://opensea.io/collection/traveloggers"
              target="_blank"
              rel="noreferrer"
            >
              OpenSea
            </a>{" "}
            to create stories.
          </p>
        </section>
      </section>
    </section>
  );
};
