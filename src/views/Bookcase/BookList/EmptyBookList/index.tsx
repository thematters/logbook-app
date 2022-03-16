import React, { useEffect, useState } from "react";

import styles from "../styles.module.css";
import { gql, useQuery } from "@apollo/client";

import { LogbookCard, Spinner } from "~/components";

import { useResponsive } from "~/hooks";

const OWN_EMPTY_LOGBOOKS = gql`
  query OwnEmptyLogBooks($ownID: String) {
    account(id: $ownID) {
      id
      logbooks(where: { publicationCount: 0 }) {
        id
        title
        loggedAt
        publicationCount
        transferCount
      }
    }
  }
`;

export type Logbook = {
  id: string;
  title: string;
  content: string;
  publicationCount: string;
  transferCount: string;
  createdAt: Date;
};

export interface EmptyBookListProps {
  address: string;
}

export const EmptyBookList: React.FC<EmptyBookListProps> = ({ address }) => {
  const isSmallUp = useResponsive("sm-up");

  const { loading, error, data } = useQuery(OWN_EMPTY_LOGBOOKS, {
    variables: {
      ownID: address.toLowerCase(),
    },
  });
  const [logbookList, updateLogbookList] = useState([]);
  useEffect(() => {
    updateLogbookList(data?.account?.logbooks);
  }, [data]);

  if (error) return <></>;
  if (loading) {
    return <></>;
  }
  return (
    <>
      {logbookList?.map(({ id }) => {
        return (
          <LogbookCard
            key={id}
            tokenID={id}
            className={styles.item}
            title="Empty book"
            content="Leave some message..."
            publicationCount="0"
            transferCount="0"
            borderRadius
            shadow
            padding={isSmallUp ? "loose" : "base"}
            background="white"
          ></LogbookCard>
        );
      })}
    </>
  );
};
