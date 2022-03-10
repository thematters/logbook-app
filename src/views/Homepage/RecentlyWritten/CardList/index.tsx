import React , { useState }from "react";
import useEmblaCarousel from "embla-carousel-react";
import classNames from "classnames";
import { ethers } from "ethers";
import { useQuery } from "@apollo/client";

import SLIDE_CURSOR from "/public/images/recently-written-cursor.svg";

import {
  LogbookCard,
  LogbookCardProps,
  LIBRARY_LOGBOOKS,
  Spinner,
} from "~/components";

import styles from "./styles.module.css";

interface Account {
  __typename: 'Account'
  id: string
}

interface Log {
  __typename: "Log";
  content: string
}

interface Publication {
  __typename: "Publication"
  log: Log
}
interface Logbook {
  __typename: "Logbook";
  id: string;
  loggedAt: string;
  owner: Account;
  publicationCount: ethers.BigNumber;
  publications: Array<Publication>;
  title: string;
  transferCount: ethers.BigNumber;
}

export const CardList = () => {
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    draggable: true,
    loop: false,
    containScroll: "trimSnaps",
  });
  const first = 10
  const [lastLoggedAt] = useState(Date.now().toString());
  const { loading, error, data } = useQuery(LIBRARY_LOGBOOKS, {
    variables: {
      first,
      lastLoggedAt,
    },
  });
  if (loading) return <Spinner />;
  if (error) return <></>;

  // console.log(data.logbooks);
  const listItems = data.logbooks.map(
    ({
      id,
      title,
      publications,
      transferCount,
      publicationCount,
      owner,
    }: Logbook) => {
      const cardProps: LogbookCardProps = {
        title,
        content: publications[0].log.content,
        publicationCount,
        transferCount,
        // tokenID: id,
        txHash: owner.id,
        footerHash: true,
      };

      return (
        // TODO: use Link href
        <li key={id}>
          <LogbookCard padding="loose" borderHover shadow fixedHeight {...cardProps} />
        </li>
      );
    }
  );

  const cls = classNames([styles.container, "cardListContainer"]);

  return (
    <div className={cls} ref={emblaRef}>
      <ul className={styles.cardList}>{listItems}</ul>
      <style global jsx>
        {`
          .cardListContainer {
            cursor: url(${SLIDE_CURSOR}), auto;
          }
        `}
      </style>
    </div>
  );
};
