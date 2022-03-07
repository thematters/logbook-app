import React from "react";
import { Button, TextIcon } from "~/components";

import styles from "./styles.module.css";
import { useResponsive } from "~/hooks";
import { formatDate, formatHash } from "~/utils";
export interface HeaderProps {
  tokenID?: string;
  createdAt?: Date;
  txHash?: string;
  [key: string]: any;
}


export const Header: React.FC<HeaderProps> = ({
  tokenID,
  createdAt,
  txHash,
}) => {
  const isSmallUp = useResponsive("sm-up");

  let formattedID;
  if (!!tokenID) {
    formattedID = `#${tokenID.slice(2, 6)}`;
  }

  let formattedDate;
  if (!!createdAt) {
    formattedDate = formatDate(createdAt);
  }

  let formattedHash;
  if (!!txHash) {
    formattedHash = formatHash(txHash,);
  }

  let borderRadius = "1rem";
  let width = "6.5625rem";
  let height = "1.75rem";

  if (isSmallUp) {
    width = "7.1875rem";
    height = "2rem";
  }

  return (
    <section className={styles.header}>
      <div>
        {!!tokenID ? (
          <TextIcon color="blueGreen" weight="medium">
            {formattedID}
          </TextIcon>
        ) : (
          <></>
        )}
        {!!createdAt ? (
          <TextIcon color="grey" weight="normal">
            <span className={styles.interpunct}>·</span>
            {formattedDate}
          </TextIcon>
        ) : (
          <></>
        )}
      </div>
      {!!txHash ? (
        <Button
          width={width}
          height={height}
          borderRadius={borderRadius}
          bgColor="greyLighter"
          is="span"
        >
          <TextIcon color="greyDark">{formattedHash}</TextIcon>
        </Button>
      ) : (
        <></>
      )}
    </section>
  );
};
