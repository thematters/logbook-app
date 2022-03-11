import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

import styles from "./styles.module.css";
import { gql, useQuery } from "@apollo/client";

import { LogbookCard, InfiniteScroll, Spinner } from "~/components";

import { Title } from "../Title";

import { useResponsive } from "~/hooks";

const OWN_LOGBOOKS = gql`
  query OwnLogBooks($first: Int, $ownID: String, $lastLoggedAt: String) {
    account(id: $ownID) {
      id
      logbooks(
        first: $first
        where: { loggedAt_lt: $lastLoggedAt }
        orderBy: loggedAt
        orderDirection: desc
      ) {
        id
        title
        loggedAt
        publications {
          log {
            content
          }
        }
        publicationCount
        transferCount
      }
    }
  }
`;

export const BookList = () => {
  const first = 10;
  const ownID = "0x479029844f8bdd76b8b9271f577a8f8919bf16cc";
  const [lastLoggedAt] = useState(Date.now().toString());
  const [hasNextPage, updateHasNextPage] = useState(true);
  const isSmallUp = useResponsive("sm-up");

  const router = useRouter();
  const {
    address = "0x479029844f8bdd76b8b9271f577a8f8919bf16cc", // the default to be removed later
    id = "",
  } = router.query;

  const { loading, error, data, fetchMore } = useQuery(OWN_LOGBOOKS, {
    variables: {
      first,
      lastLoggedAt,
      ownID: address,
    },
  });
  const [logbookList, updateLogbookList] = useState([]);
  useEffect(() => {
    console.log("useEffect ", data);
    // const {account: {logbooks} } = data
    updateLogbookList(data?.account?.logbooks);
  }, [data]);

  if (error) return <></>;
  if (loading) {
    return <Spinner />;
  }
  // console.log({ logbookList });

  const loadMore = async () => {
    const [lastLogbook] = logbookList.slice(-1);
    const { loggedAt } = lastLogbook;
    const { data } = await fetchMore({
      variables: {
        first,
        lastLoggedAt: loggedAt,
        ownID,
      },
    });
    console.log({ data });
    const {
      account: { logbooks },
    } = data;
    updateLogbookList(logbookList.concat(logbooks));
    updateHasNextPage(logbooks.length >= first);
  };

  return (
    <section>
      <section className={styles.container}>
        <section className={styles.item}>
          <Title />
        </section>
        <InfiniteScroll hasNextPage={hasNextPage} loadMore={loadMore}>
          {logbookList?.map(
            ({
              id,
              title,
              loggedAt,
              publications: [
                {
                  log: { content },
                },
              ],
              transferCount,
              publicationCount,
            }) => {
              return (
                <LogbookCard
                  key={id}
                  title={title}
                  content={content}
                  publicationCount={publicationCount}
                  transferCount={transferCount}
                  createdAt={new Date(Number(loggedAt) * 1000)}
                  // tokenID={id}
                  className={styles.item}
                  giftSign
                  borderRadius
                  shadow
                  padding={isSmallUp ? "loose" : "base"}
                  background="white"
                ></LogbookCard>
              );
            }
          )}
        </InfiniteScroll>
      </section>
    </section>
  );
};
