import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ethers } from "ethers";

import styles from "./styles.module.css";
import { gql, useQuery } from "@apollo/client";

import { LogbookCard, InfiniteScroll, Spinner } from "~/components";

import BookcaseDetail from "./BookcaseDetail";

const OWN_LOGBOOKS = gql`
  query QueryLogbooks($address: String!) {
    account(id: $address) {
      id
      logbooks(
        first: 10
        where: { loggedAt_not: null }
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
  const [lastLoggedAt] = useState(Date.now().toString());
  const [hasNextPage, updateHasNextPage] = useState(true);

  const router = useRouter();
  const {
    address = "0x479029844f8bdd76b8b9271f577a8f8919bf16cc", // the default to be removed later
    id = "",
  } = router.query;

  const { loading, error, data, fetchMore } = useQuery(OWN_LOGBOOKS, {
    variables: { address },
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
  console.log({ logbookList });

  if (id) return <BookcaseDetail id={id as string} />;

  return (
    <div>
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
              border
              shadow
              padding="base"
            ></LogbookCard>
          );
        }
      )}
    </div>
  );
};
