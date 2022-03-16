import React from "react";
import Markdown from "markdown-to-jsx";
import { formatHash, formatDate } from "~/utils";

import { Button, TextIcon, IconEtherScan } from "~/components";

import styles from "./styles.module.css";
import { useResponsive } from "~/hooks";

export interface CardProps {
  id: string;
  createdAt: string;
  content: string;
  authorID: string;
}

export const Card: React.FC<CardProps> = ({
  id,
  createdAt,
  content,
  authorID,
}) => {
  // console.log({ content });
  const isSmallUp = useResponsive("sm-up");
  const formattedHash = `${authorID.slice(0, 4)}...${authorID.slice(-4)}`;
  const formattedDate = formatDate(new Date(Number(createdAt) * 1000));
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
      <section>
        <Markdown>{content}</Markdown>
      </section>

      <section className={styles.footer}>
        <Button
          width={hashWidth}
          height={height}
          bgColor="greyLighter"
          borderRadius={borderRadius}
          is="span"
        >
          <TextIcon spacing="xTight" color="greyDark">
            {formattedHash}
          </TextIcon>
        </Button>

        <TextIcon color="grey">
          <span>{formattedDate}</span>
        </TextIcon>

        <TextIcon
          icon={isSmallUp ? <IconEtherScan size="md" /> : <IconEtherScan />}
        ></TextIcon>
      </section>
    </section>
  );
};
