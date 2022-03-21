import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

import styles from "../styles.module.css";
import { gql, useQuery } from "@apollo/client";

import { LogbookCard, InfiniteScroll, Spinner } from "~/components";

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
        description
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

export type Logbook = {
  id: string;
  title: string;
  content: string;
  publicationCount: string;
  transferCount: string;
  createdAt: Date;
};

export interface LoggedBookListProps {
  address: string;
}

export const LoggedBookList: React.FC<LoggedBookListProps> = ({ address }) => {
  const first = 10;

  const [lastLoggedAt] = useState(Date.now().toString());
  const [hasNextPage, updateHasNextPage] = useState(true);
  const isSmallUp = useResponsive("sm-up");

  const { loading, error, data, fetchMore } = useQuery(OWN_LOGBOOKS, {
    variables: {
      first,
      lastLoggedAt,
      ownID: address.toLowerCase(),
    },
  });
  const [logbookList, updateLogbookList] = useState<Array<any>>([]);
  useEffect(() => {
    updateLogbookList(data?.account?.logbooks || []);
  }, [data]);

  if (error) return <></>;
  if (loading) {
    return <Spinner />;
  }
  // TODO: link to index?
  if (data.account === null) {
    return <></>;
  }

  const loadMore = async () => {
    // const [lastLogbook] = ;
    // const loggedAt = logbookList?.[logbookList.length-1]?.loggedAt;
    const variables: Record<string, any> = {
      first,
      // lastLoggedAt: loggedAt,
      ownID: address.toLowerCase(),
    };
    if (logbookList?.length >= 1)
      variables.loggedAt = logbookList[logbookList.length - 1]?.loggedAt;
    const { data } = await fetchMore({ variables });
    // console.log({ data });

    const {
      account: { logbooks },
    } = data as any;
    updateLogbookList(logbookList.concat(logbooks));
    // console.log({ logbookList });
    updateHasNextPage(logbooks.length >= first);
  };

  const logbookMap = new Map<string, Logbook>(
    logbookList?.map(
      ({
        id,
        title,
        loggedAt,
        description,
        publications: [
          {
            log: { content },
          },
        ],
        transferCount,
        publicationCount,
      }) => [
        id,
        {
          id,
          title,
          content: description,
          publicationCount, // : ethers.BigNumber.from(publicationCount),
          transferCount, // : ethers.BigNumber.from(transferCount),
          createdAt: new Date(Number(loggedAt) * 1000),
        },
      ]
    )
  );
  // console.log({ logbookMap });

  return (
    <section>
      <section className={styles.container}>
        <InfiniteScroll hasNextPage={hasNextPage} loadMore={loadMore}>
          {Array.from(logbookMap.values()).map(({ id, ...rest }) => (
            <LogbookCard
              key={id}
              tokenID={id}
              className={styles.item}
              giftSign
              borderRadius
              shadow
              padding={isSmallUp ? "loose" : "base"}
              background="white"
              {...rest}
            />
          ))}
        </InfiniteScroll>
      </section>
    </section>
  );
};
