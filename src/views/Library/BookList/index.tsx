import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useQuery } from "@apollo/client";

import styles from './styles.module.css'

import {
  LogbookCard,
  InfiniteScroll,
  Spinner,
  LIBRARY_LOGBOOKS,
} from "~/components";

export const BookList = () => {
  const first = 5;
  const [lastLoggedAt] = useState(Date.now().toString());
  const [hasNextPage, updateHasNextPage] = useState(true);
  const { loading, error, data, fetchMore } = useQuery(LIBRARY_LOGBOOKS, {
    variables: {
      first,
      lastLoggedAt,
    },
  });
  const [logbookList, updateLogbookList] = useState([]);
  useEffect(() => {
    // console.log('useEffect ', data)
    updateLogbookList(data?.logbooks);
  }, [data]);

  if (error) return <></>;
  if (loading) {
    return <Spinner />;
  }

  const loadMore = async () => {
    const [lastLogbook] = logbookList.slice(-1);
    const { loggedAt } = lastLogbook;
    const { data } = await fetchMore({
      variables: {
        first,
        lastLoggedAt: loggedAt,
      },
    });
    const { logbooks } = data;
    updateLogbookList(logbookList.concat(logbooks));
    updateHasNextPage(logbooks.length >= first);
  };

  return (
    <div>
      <h1 className={styles.title}>Latest Written</h1>
      <InfiniteScroll hasNextPage={hasNextPage} loadMore={loadMore}>
        {logbookList?.map(
          ({
            id,
            title,
            publications: [
              {
                log: { content },
              },
            ],
            transferCount,
            publicationCount,
            owner,
            loggedAt,
          }) => {
            return (
              <LogbookCard
                key={id}
                title={title}
                content={content}
                publicationCount={publicationCount}
                transferCount={transferCount}
                createdAt={new Date(parseInt(loggedAt))}
                tokenID={id}
                txHash={(owner as any).id}
                className={styles.item}
              ></LogbookCard>
            );
          }
        )}
      </InfiniteScroll>
    </div>
  );
};
