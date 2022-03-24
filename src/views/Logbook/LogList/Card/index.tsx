import React from "react";
import Markdown from "markdown-to-jsx";
import { maskAddress, toPolygonHashUrl, datetimeFormat } from "~/utils";

import { Button, TextIcon, IconEtherScan } from "~/components";
import { useResponsive } from "~/hooks";

import styles from "./styles.module.css";
export interface CardProps {
  id: string;
  createdAt: string;
  content: string;
  authorID: string;
  publicationTxHash: string;
}

export const Card: React.FC<CardProps> = ({
  id,
  createdAt,
  content,
  authorID,
  publicationTxHash,
}) => {
  const isSmallUp = useResponsive("sm-up");

  const formattedDate = datetimeFormat.absolute(new Date(Number(createdAt) * 1000));

  let borderRadius = "1rem";
  let width = "3.25rem";
  let height = "1.75rem";
  let hashWidth = "6.8125rem";

  if (isSmallUp) {
    width = "3.6875rem";
    height = "2rem";
    hashWidth = "7.4375rem";
  }
  return (
    <section className={styles.container}>
      <section className={styles.markdown}>
        <Markdown>{content}</Markdown>
      </section>

      <section className={styles.footer}>
        <Button
          width={hashWidth}
          height={height}
          bgColor="greyLighter"
          borderRadius={borderRadius}
          href={`/bookcase?address=${authorID}`}
        >
          <TextIcon spacing="xTight" color="greyDark">
            {maskAddress(authorID, 4)}
          </TextIcon>
        </Button>

        <TextIcon color="grey">
          <span>{formattedDate}</span>
        </TextIcon>

        <a
          href={toPolygonHashUrl(publicationTxHash)}
          target="_blank"
          rel="noreferrer"
        >
          <TextIcon
            icon={isSmallUp ? <IconEtherScan size="md" /> : <IconEtherScan />}
          ></TextIcon>
        </a>
      </section>
    </section>
  );
};
