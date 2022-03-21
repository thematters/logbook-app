import React from "react";
import classNames from "classnames";
import { ethers } from "ethers";
import Link from "next/link";

import { capitalizeFirstLetter } from "~/utils";

import { Header } from "./Header";
import { Title } from "./Title";
import { Footer } from "./Footer";

import styles from "./styles.module.css";

type paddingType = "base" | "loose";

type backgroundType = "white" | "transparent";

export interface LogbookCardProps {
  title: string;
  content: string;
  publicationCount: string;
  transferCount: string;
  tokenID: string;
  showHeader?: boolean;
  createdAt?: Date;
  giftSign?: boolean;
  txHash?: string;
  footerHash?: boolean;
  padding?: paddingType;
  background?: backgroundType;
  shadow?: boolean;
  border?: boolean;
  borderRadius?: boolean;
  borderHover?: boolean;
  fixedHeight?: boolean;
  inheritCursor?: boolean;
  [key: string]: any;
}

export const LogbookCard: React.FC<LogbookCardProps> = ({
  title,
  content,
  publicationCount,
  transferCount,
  tokenID,
  showHeader,
  createdAt,
  giftSign,
  txHash,
  footerHash,
  padding = "",
  background = "transparent",
  shadow,
  border,
  borderRadius,
  borderHover,
  fixedHeight,
  inheritCursor,
  className,
}) => {
  const containerClass = classNames(
    {
      [styles.logbookCard]: true,
      [styles[`padding${capitalizeFirstLetter(padding)}`]]: padding !== "",
      [styles[`bg${capitalizeFirstLetter(background)}`]]: true,
      [styles.shadow]: !!shadow,
      [styles.border]: !!border,
      [styles.borderRadius]: !!borderRadius,
      [styles.borderHover]: !!borderHover,
      [styles.fixedHeight]: !!fixedHeight,
      [styles.cursorPoint]: !inheritCursor,
    },
    className
  );

  const contentClasses = classNames({
    [styles.content]: true,
    [styles.fixedHeight]: !!fixedHeight,
  });

  const displayTitle = title === "" ? "Untitled" : title;

  return (
    // TODO: link to log book inside page
    <Link href={`logbook?id=${parseInt(tokenID, 16)}`} passHref>
      <div className={containerClass}>
        {!!tokenID && showHeader ? (
          <Header tokenID={tokenID} createdAt={createdAt} txHash={txHash} />
        ) : (
          ""
        )}
        <Title
          title={displayTitle}
          date={createdAt}
          giftSign={giftSign}
          fixedHeight={fixedHeight}
        />
        <section>
          <p className={contentClasses}>{content}</p>
        </section>
        <Footer
          id={tokenID}
          title={displayTitle}
          exchange={transferCount}
          history={publicationCount}
          txHash={!!footerHash && !!txHash ? txHash : ""}
        ></Footer>
      </div>
    </Link>
  );
};
