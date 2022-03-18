import React from "react";
// import { ethers } from "ethers";
import { formatHash } from "~/utils";

import {
  Button,
  TextIcon,
  IconExchange,
  IconFile,
  IconShare,
  ShareDialog,
} from "~/components";

import styles from "./styles.module.css";

import { useResponsive } from "~/hooks";

export interface FooterProps {
  // decimal id
  id: string;
  title?: string;
  exchange?: string; // ethers.BigNumber;
  history?: string; // ethers.BigNumber;
  txHash?: string;
  [key: string]: any;
}

export const Footer: React.FC<FooterProps> = ({
  id,
  title,
  exchange,
  history,
  txHash,
}) => {
  const isSmallUp = useResponsive("sm-up");
  let formattedHash;
  if (!!txHash) {
    formattedHash = formatHash(txHash, isSmallUp);
  }

  let borderRadius = "1rem";
  let width = "3.25rem";
  let height = "1.75rem";
  let hashWidth = "5.1875rem";

  if (isSmallUp) {
    width = "3.6875rem";
    height = "2rem";
    hashWidth = "7.1875rem";
  }

  return (
    <section className={styles.footer}>
      <Button
        width={width}
        height={height}
        bgColor="greyLighter"
        borderRadius={borderRadius}
        is="span"
        bgActiveColor="greenLighter"
      >
        <TextIcon
          spacing="xTight"
          color="greyDark"
          icon={<IconExchange></IconExchange>}
        >
          {exchange?.toString()}
        </TextIcon>
      </Button>
      <Button
        width={width}
        height={height}
        bgColor="greyLighter"
        borderRadius={borderRadius}
        is="span"
        bgActiveColor="greenLighter"
      >
        <TextIcon
          spacing="xTight"
          color="greyDark"
          icon={<IconFile></IconFile>}
        >
          {history?.toString()}
        </TextIcon>
      </Button>
      {/* TODO: when title blank, what to display */}
      <ShareDialog title={title} path={`/logbook?id=${parseInt(id, 16)}`}>
        {({ openDialog: openShareDialog }) => (
          <Button
            width={height}
            height={height}
            bgColor="greyLighter"
            borderRadius={borderRadius}
            bgActiveColor="greenLighter"
            className={styles.button}
            onClick={(e) => {
              // console.log("e", e);
              e?.stopPropagation();
              openShareDialog();
            }}
          >
            <TextIcon
              spacing="xTight"
              color="greyDark"
              icon={<IconShare></IconShare>}
            ></TextIcon>
          </Button>
        )}
      </ShareDialog>
      {!!txHash ? (
        <Button
          width={hashWidth}
          height={height}
          bgColor="greyLighter"
          borderRadius={borderRadius}
          is="span"
          bgActiveColor="greenLighter"
        >
          <TextIcon spacing="xTight" color="greyDark">
            {formattedHash}
          </TextIcon>
        </Button>
      ) : (
        <></>
      )}
    </section>
  );
};
